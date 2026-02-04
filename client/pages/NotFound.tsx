import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 pt-32 pb-32 md:pt-40 md:pb-40 px-4 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <h1 className="text-foreground mb-4">Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We couldn't find the page you're looking for. Let's get you back on track.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Return Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
