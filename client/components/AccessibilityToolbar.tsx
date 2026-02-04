import { useState } from 'react';
import { Contrast, Keyboard, Eye, Settings } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { highContrast, toggleHighContrast, focusVisible } = useAccessibility();

  const skipToMain = () => {
    const main = document.querySelector('main') || document.querySelector('[role="main"]');
    if (main) {
      (main as HTMLElement).focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 font-medium"
        onClick={skipToMain}
      >
        Skip to main content
      </a>

      {/* Accessibility toolbar */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40">
        <div className={`bg-white rounded-lg shadow-lg border transition-all duration-300 ${
          isOpen ? 'w-64 p-4' : 'w-12 h-12 p-2'
        }`}>
          {!isOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="w-full h-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Open accessibility options"
              title="Accessibility Options"
            >
              <Eye className="w-5 h-5" />
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-gray-900">Accessibility</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close accessibility options"
                >
                  ×
                </button>
              </div>

              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Contrast className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">High Contrast</span>
                </div>
                <button
                  onClick={toggleHighContrast}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    highContrast ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    highContrast ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Keyboard Navigation Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Keyboard Nav</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  focusVisible ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              </div>

              {/* Font Size Controls */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Font Size</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => document.documentElement.style.fontSize = '14px'}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                    aria-label="Small font size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => document.documentElement.style.fontSize = '16px'}
                    className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                    aria-label="Normal font size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => document.documentElement.style.fontSize = '18px'}
                    className="px-2 py-1 text-base bg-gray-100 hover:bg-gray-200 rounded"
                    aria-label="Large font size"
                  >
                    A
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}