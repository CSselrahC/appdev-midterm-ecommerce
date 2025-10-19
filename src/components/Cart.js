import React from 'react';

function Cart({ cart = [] }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} - ₱{item.price.toFixed(2)} (Qty: {item.quantity})
            </li>
          ))}
        </ul>
      )}
      <h3 className="mt-3">Total: ₱{total.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
