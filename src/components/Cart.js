import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } }); // sends state to Checkout.js
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px', width: '400px' }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ₱{item.price.toFixed(2)} (Qty: {item.quantity})
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₱{total.toFixed(2)}</h3>
      {cart.length > 0 && (
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      )}
    </div>
  );
}

export default Cart;
