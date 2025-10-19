import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/HomePage';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout'; // ✅ Added import for Checkout


function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    document.title = "Docker Motorsports";
  }, []);

  const addToCart = (productToAdd) => {
    const existingProduct = cart.find(item => item.id === productToAdd.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }

  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <main className="main-content flex-fill p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<Checkout />} /> {/* ✅ Defined properly */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
