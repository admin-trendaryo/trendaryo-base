
import "./global.css";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { PersonalizationProvider } from "@/components/PersonalizationProvider";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import SchemaData from "@/components/SchemaData";
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
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOverview from "./pages/AdminOverview";
import ProductManagement from "./pages/ProductManagement";
import ContentManagement from "./pages/ContentManagement";
import OrdersManagement from "./pages/OrdersManagement";
import CustomersManagement from "./pages/CustomersManagement";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SettingsPanel from "./pages/SettingsPanel";

const queryClient = new QueryClient();

// Simple test component first
const TestApp = () => (
  <div style={{ padding: '20px', fontSize: '24px', color: 'blue' }}>
    <h1>Trendaryo Test - React is Working!</h1>
    <p>If you see this, React is loading correctly.</p>
  </div>
);

const App = () => (
  <HelmetProvider>
    <PersonalizationProvider>
      <AccessibilityProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AccessibilityToolbar />
            
            {/* Global Schema.org Organization Data */}
            <SchemaData type="organization" data={{}} />
            
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/technology-products" element={<Shop />} />
                  <Route path="/wellness-products" element={<Shop />} />
                  <Route path="/smartphones" element={<Shop />} />
                  <Route path="/fitness-trackers" element={<Shop />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/shopping-cart" element={<Cart />} />
                  <Route path="/secure-checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/my-account" element={<Account />} />
                  <Route path="/about-trendaryo" element={<About />} />
                  <Route path="/contact-us" element={<Contact />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/overview" element={
                    <ProtectedRoute>
                      <AdminOverview />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/products" element={
                    <ProtectedRoute>
                      <ProductManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/content" element={
                    <ProtectedRoute>
                      <ContentManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <ProtectedRoute>
                      <OrdersManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/customers" element={
                    <ProtectedRoute>
                      <CustomersManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/analytics" element={
                    <ProtectedRoute>
                      <AnalyticsDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/settings" element={
                    <ProtectedRoute requiredRole="admin">
                      <SettingsPanel />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AccessibilityProvider>
    </PersonalizationProvider>
  </HelmetProvider>
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