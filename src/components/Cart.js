import React from 'react';

function Cart({ cart = [] }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px', width: '300px' }}>
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
    </div>
  );
}

export default Cart;