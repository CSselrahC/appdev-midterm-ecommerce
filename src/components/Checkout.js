import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Checkout() {
  const { state } = useLocation();
  const cartList = state?.cart || [];

  // Calculate the total price (Sum of price per quantity)
  const total = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ margin: '20px' }}>
      <h1>Checkout</h1>

      {cartList.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div>
          <table
            border="1"
            cellPadding="8"
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              marginBottom: '20px',
              textAlign: 'left'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th>Product Name</th>
                <th>Price (₱)</th>
                <th>Quantity</th>
                <th>Total (₱)</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₱{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Total Price: ₱{total.toFixed(2)}</h2>

          <div style={{ marginTop: '20px' }}>
            <Link to="/">
              <button style={{ padding: '10px 15px', cursor: 'pointer' }}>
                Return Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
