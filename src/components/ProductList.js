import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ addToCart }) {
  const products = [
    { id: 1, name: 'Product 1', description: "nice product", price: 10.00 },
    { id: 2, name: 'Product 2', description: "another nice product", price: 20.00 },
    { id: 3, name: 'Product 3', description: "yet another nice product", price: 30.00 },
    { id: 4, name: 'Product 4', description: "nice product", price: 20.00 },
    { id: 5, name: 'Product 5', description: "nice product", price: 30.00 }
  ];

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
