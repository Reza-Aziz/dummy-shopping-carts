import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingCartsPages from "./Pages/ShoppingCartsPages";
import Carts from "./Pages/Carts";
import { CartProvider } from "./Context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ShoppingCartsPages />} />
          <Route path="/carts" element={<Carts />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
