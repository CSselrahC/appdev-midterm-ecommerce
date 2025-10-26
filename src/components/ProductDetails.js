import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.json';

const defaultImage = '/images/default-product.png'; // Default image path

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');

  if (!product) return <div>Product not found for ID {id}</div>;

  const images = product.images && product.images.length > 0 ? product.images : [defaultImage];

  const handleImageError = (event) => {
    if (!imageError) {
      setImageError(true);
      event.target.src = defaultImage;
    }
  };

  const prevImage = () => {
    setImageError(false);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setImageError(false);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const selectImage = (index) => {
    setImageError(false);
    setCurrentImageIndex(index);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value === '' ? 0 : parseInt(value, 10));
    }
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      const existingIndex = cart.findIndex(item => item.id === product.id);
      let newCart = [...cart];
      if (existingIndex !== -1) {
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
      } else {
        newCart.push({ ...product, quantity });
      }
      setCart(newCart);
      const msg = quantity === 1
        ? `${product.name} has been added to the cart`
        : `${quantity} ${product.name} have been added to the cart`;
      setMessage(msg);
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/products" className="btn btn-secondary mb-3">Back to Product List</Link>
      <div className="card p-3 shadow-sm">
        <h3>{product.name}</h3>

        <div className="product-image-box mb-3" style={{ position: 'relative', maxWidth: '400px', margin: 'auto' }}>
          <img
            src={images[currentImageIndex]}
            alt={`${product.name} ${currentImageIndex + 1}`}
            onError={handleImageError}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <button
            onClick={prevImage}
            aria-label="Previous Image"
            style={{
              position: 'absolute', top: '50%', left: '10px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff',
              border: 'none', borderRadius: '50%', width: '30px', height: '30px',
              cursor: 'pointer'
            }}
          >&lt;</button>
          <button
            onClick={nextImage}
            aria-label="Next Image"
            style={{
              position: 'absolute', top: '50%', right: '10px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff',
              border: 'none', borderRadius: '50%', width: '30px', height: '30px',
              cursor: 'pointer'
            }}
          >&gt;</button>

          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            {images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => selectImage(idx)}
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  margin: '0 5px',
                  backgroundColor: idx === currentImageIndex ? '#007bff' : '#ccc',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
                aria-label={`Select image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <p>{product.description}</p>
        <h5 style={{ fontSize: '0.8rem', color: '#666' }}>Category: {product.category}</h5>
        <p>Price: ₱{product.price.toFixed(2)}</p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
          maxWidth: '350px',
          marginBottom: '15px'
        }}>
          <div className="d-flex align-items-center" style={{ flexGrow: 1, minWidth: '160px' }}>
            <button
              className="btn btn-outline-secondary"
              onClick={decrementQuantity}
              aria-label="Decrease quantity"
              disabled={quantity <= 0}
              style={{ minWidth: '38px', height: '38px' }}
            >-</button>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              style={{
                textAlign: 'center',
                width: '70px',
                margin: '0 5px',
                height: '38px',
                fontSize: '1rem',
                borderRadius: '4px',
                border: '1px solid #ced4da'
              }}
              aria-label="Quantity input"
            />
            <button
              className="btn btn-outline-secondary"
              onClick={incrementQuantity}
              aria-label="Increase quantity"
              style={{ minWidth: '38px', height: '38px' }}
            >+</button>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn"
            style={{
              backgroundColor: quantity > 0 ? 'green' : 'grey',
              color: 'white',
              cursor: quantity > 0 ? 'pointer' : 'not-allowed',
              flexGrow: 1,
              minWidth: '120px',
              height: '38px'
            }}
            disabled={quantity <= 0}
          >
            Add to Cart
          </button>
        </div>

        {message && <p className="mt-3 text-success">{message}</p>}
      </div>
    </div>
  );
}

export default ProductDetails;
