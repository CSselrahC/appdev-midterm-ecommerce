import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';

function ProductList({ addToCart }) {
  const handleAddToCart = (product) => {
    if (addToCart) addToCart(product);
  };

  return (
    <div className="container">
      <h1 className="mb-3">Product List</h1>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>Price: ₱{product.price.toFixed(2)}</p>
                <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm me-2">
                  View Product
                </Link>
                <button onClick={() => handleAddToCart(product)} className="btn btn-success btn-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart" className="btn btn-dark mt-3">View Cart</Link>
    </div>
  );
}

export default ProductList;
