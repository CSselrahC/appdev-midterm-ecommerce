import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/HomePage';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  useEffect(() => { document.title = "Docker Motorsports"; }, []);

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
      <Footer />
    </Router>
  );

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
          <p className="mb-0 fw-semibold" style={{ color: '#bbb', letterSpacing: '0.5px' }} >
            Contact: CSselrahC | cntaxc
          </p>
        </div>
      </footer>
    );
  }
}

export default App;