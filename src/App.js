import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/HomePage';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout'; // ✅ Added import for Checkout


function App() {
  useEffect(() => {
    document.title = "Docker Motorsports";
  }, []);

  const [cart, setCart] = useState([]);

  // Add or update product in the cart
  const addToCart = (productToAdd) => {
    const existingProduct = cart.find(item => item.id === productToAdd.id);

    if (existingProduct) {
      setCart(
        cart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }

    console.log(`Added ${productToAdd.name} to cart. Current cart size: ${cart.length + 1}`);
  };

  return (
    <Router>
      <div className="App">
        <NavBar />

        <main className="main-content">
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

  // Footer Component
  function Footer() {
    return (
      <footer
        className="footer text-light py-4 mt-5 shadow-lg"
        style={{
          backgroundColor: '#1d1d1dff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div className="container text-center">
          <p className="mb-0 fw-semibold" style={{ color: '#bbb', letterSpacing: '0.5px' }}>
            © 2025 <span style={{ color: '#61dafb' }}>Docker Motorsports</span> | Created with React & Bootstrap
          </p>
          <p className="mb-0 fw-semibold" style={{ color: '#bbb', letterSpacing: '0.5px' }}>
            Contact: CSselrahC | cntaxc
          </p>
        </div>
      </footer>
    );
  }
}

export default App;
