import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingCartsPages from "./Pages/ShoppingCartsPages";
import Carts from "./Pages/Carts";
import ProductCard from "./Component/ProductCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingCartsPages />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/product/:id" element={<ProductCard />} />
      </Routes>
    </Router>
  );
}

export default App;
