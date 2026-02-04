
import "./global.css";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { PersonalizationProvider } from "@/components/PersonalizationProvider";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Simple test component first
const TestApp = () => (
  <div style={{ padding: '20px', fontSize: '24px', color: 'blue' }}>
    <h1>Trendaryo Test - React is Working!</h1>
    <p>If you see this, React is loading correctly.</p>
  </div>
);

const App = () => (
  <PersonalizationProvider>
    <AccessibilityProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AccessibilityToolbar />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AccessibilityProvider>
</PersonalizationProvider>
);

// Safely create root only once to prevent HMR issues
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  // Full Trendaryo app is now loading
  root.render(<App />);
} else {
  console.error('Root element not found!');
}