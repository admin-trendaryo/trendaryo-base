import { useState, useRef, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  as?: "button" | "a" | "Link";
  to?: string;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick, 
  href, 
  type = "button", 
  disabled = false,
  as = "button",
  to,
  ...props 
}: MagneticButtonProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 100) {
        const strength = Math.max(0, 1 - distance / 100);
        const maxMove = 4;
        setTransform({
          x: (deltaX / distance) * strength * maxMove,
          y: (deltaY / distance) * strength * maxMove
        });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };

    const isTouchDevice = 'ontouchstart' in window;
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (!isTouchDevice) {
        document.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [disabled]);

  const baseStyle = {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: 'transform 0.2s ease-out'
  };

  const combinedClassName = `${className} transition-all duration-200 ease-out`;

  if (as === "a") {
    return (
      <a
        ref={buttonRef as any}
        href={href}
        className={combinedClassName}
        style={baseStyle}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (as === "Link") {
    return (
      <Link
        ref={buttonRef as any}
        to={to || "/"}
        className={combinedClassName}
        style={baseStyle}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      type={type}
      className={combinedClassName}
      style={baseStyle}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}