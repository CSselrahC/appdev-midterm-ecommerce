import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Checkout({ setCart }) {
  const { state } = useLocation();
  const cartList = state?.cart || [];
  const [purchased, setPurchased] = useState(false);
  const [boughtList, setBoughtList] = useState([]);

  const total = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const boughtTotal = boughtList.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuyProduct = () => {
    setBoughtList(cartList); // Store a snapshot before clearing
    setPurchased(true);
    setCart([]); // Empties the cart after purchase
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Checkout</h1>

      {cartList.length === 0 && !purchased ? (
        <p>No items in your cart.</p>
      ) : purchased ? (
        <div>
          <h2>Thank you for your purchase!</h2>
          <p>You have bought the following products:</p>
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
              {boughtList.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₱{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Total Price: ₱{boughtTotal.toFixed(2)}</h2>
          <div style={{ marginTop: '20px' }}>
            <Link to="/">
              <button style={{ padding: '10px 15px', cursor: 'pointer' }}>
                Return Home
              </button>
            </Link>
          </div>
        </div>
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
              <button style={{ padding: '10px 15px', cursor: 'pointer', marginRight: '10px' }}>
                Return Home
              </button>
            </Link>
            <button
              onClick={handleBuyProduct}
              style={{ padding: '10px 15px', cursor: 'pointer' }}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
