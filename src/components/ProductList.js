import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';

function ProductList({ addToCart }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const handleShowQuantityForm = (productId) => {
    setActiveProduct(productId);
    setQuantities({ ...quantities, [productId]: 1 });
    setConfirmationMessage(null);
  };

  const handleQuantityChange = (productId, value) => {
    // Only allow positive whole numbers
    const numValue = parseInt(value);
    if (value === '' || (numValue >= 1 && Number.isInteger(Number(value)))) {
      setQuantities({ ...quantities, [productId]: value === '' ? '' : numValue });
    }
  };

  const handleIncrement = (productId) => {
    const currentQty = quantities[productId] || 1;
    setQuantities({ ...quantities, [productId]: currentQty + 1 });
  };

  const handleDecrement = (productId) => {
    const currentQty = quantities[productId] || 1;
    if (currentQty > 1) {
      setQuantities({ ...quantities, [productId]: currentQty - 1 });
    }
  };

  const handleAddToCartWithQuantity = (product) => {
    const quantity = quantities[product.id] || 1;
    
    // Validate quantity before adding
    if (quantity < 1 || !Number.isInteger(quantity)) {
      return;
    }

    // Add to cart with the specified quantity
    if (addToCart) {
      addToCart(product, quantity);
    }

    // Show confirmation message
    const message = quantity === 1 
      ? `${product.name} has been added to cart`
      : `${quantity} ${product.name} has been added to cart`;
    
    setConfirmationMessage({ productId: product.id, message });

    // Hide quantity form and reset
    setActiveProduct(null);
    setQuantities({ ...quantities, [product.id]: 1 });

    // Clear confirmation after 3 seconds
    setTimeout(() => {
      setConfirmationMessage(null);
    }, 3000);
  };

  const handleInputBlur = (productId) => {
    // If input is empty or invalid, reset to 1
    if (!quantities[productId] || quantities[productId] < 1) {
      setQuantities({ ...quantities, [productId]: 1 });
    }
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
                
                {/* Show Add to Cart button if quantity form is not active */}
                {activeProduct !== product.id && (
                  <button 
                    onClick={() => handleShowQuantityForm(product.id)} 
                    className="btn btn-success btn-sm"
                  >
                    Add to Cart
                  </button>
                )}

                {/* Show quantity form if this product is active */}
                {activeProduct === product.id && (
                  <div className="d-inline-flex align-items-center gap-2 mt-2">
                    <div className="btn-group" role="group">
                      <button
                        onClick={() => handleDecrement(product.id)}
                        className="btn btn-outline-secondary btn-sm"
                        type="button"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        style={{ width: '60px' }}
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        onBlur={() => handleInputBlur(product.id)}
                        min="1"
                        step="1"
                      />
                      <button
                        onClick={() => handleIncrement(product.id)}
                        className="btn btn-outline-secondary btn-sm"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCartWithQuantity(product)}
                      className="btn btn-success btn-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}

                {/* Show confirmation message */}
                {confirmationMessage && confirmationMessage.productId === product.id && (
                  <div className="alert alert-success mt-2 mb-0 py-2 small" role="alert">
                    {confirmationMessage.message}
                  </div>
                )}
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
