import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/HomePage';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const cartAdd = (product) => {
    console.log(`Added ${product.name} to cart.`);
  };

  return (
    <Router>
      <div className="App">
        <NavBar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList addToCart={cartAdd} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;