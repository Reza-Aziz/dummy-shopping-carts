import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import { Loader2 } from "lucide-react";

const ShoppingCartsPages = lazy(() => import("./Pages/ShoppingCartsPages"));
const Carts = lazy(() => import("./Pages/Carts"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <Loader2 className="animate-spin text-indigo-600" size={48} />
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<ShoppingCartsPages />} />
            <Route path="/carts" element={<Carts />} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;
