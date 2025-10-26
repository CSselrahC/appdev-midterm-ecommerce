import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.json';

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  if (!product) return <div>Product not found for ID: {id}</div>;

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mt-4">
      <Link to="/products" className="btn btn-secondary mb-3">Back to Product List</Link>
      <div className="card p-3 shadow-sm">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ₱{product.price.toFixed(2)}</p>
        <button onClick={handleAddToCart} className="btn btn-success">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetails;