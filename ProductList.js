import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import './ProductList.css';

function ProductList({ addToCart }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  // 🔎 Filter products based on search, category, and price
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;

    let matchesPrice = true;
    if (priceRange === 'low') matchesPrice = product.price < 10000;
    else if (priceRange === 'medium') matchesPrice = product.price >= 10000 && product.price < 20000;
    else if (priceRange === 'high') matchesPrice = product.price >= 20000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleBuyNow = (product) => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className="product-container container">
      <h1 className="mb-4">Marketplace</h1>

      {/* 🔍 Search and Filter Bar */}
      <div className="filter-bar d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Helmets">Helmets</option>
          <option value="Jackets">Jackets</option>
          <option value="Accessories">Accessories</option>
          <option value="Gloves">Gloves</option>
        </select>
        <select
          className="form-select filter-select"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="low">Below ₱10,000</option>
          <option value="medium">₱10,000 - ₱19,999</option>
          <option value="high">₱20,000 and above</option>
        </select>
      </div>

      {/* 🛍️ Product Cards */}
      <div className="row">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-3 col-sm-6 mb-4 d-flex">
            <div
              className="card product-card flex-fill"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
              }}
            >
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
                <p className="fw-bold mb-3">₱{product.price.toLocaleString()}</p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <button
                    className="btn btn-dark buy-now-btn flex-grow-1"
                    onClick={() => handleBuyNow(product)}
                  >
                    BUY NOW
                  </button>
                  <button
                    className="btn btn-outline-secondary cart-btn ms-2"
                    onClick={() => addToCart(product, 1)}
                    title="Add to Cart"
                  >
                    <i className="ri-shopping-cart-2-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-muted text-center w-100 mt-4">No products found.</p>
      )}
    </div>
  );
}

export default ProductList;
