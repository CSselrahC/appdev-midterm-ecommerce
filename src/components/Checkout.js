import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import coupons from '../data/coupons.json';


function Checkout({ cart, setCart, onTransaction, usedCoupons }) {
  const [purchased, setPurchased] = useState(false);
  const [boughtList, setBoughtList] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState('---');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const boughtTotal = boughtList.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateCoupon = (code) => {
    // Case-sensitive check
    const coupon = coupons.find(c => c.code === code);
    
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code', discount: 0 };
    }

    // Check if coupon has already been used
    if (usedCoupons.includes(code)) {
      return { valid: false, message: 'Coupon has already been used', discount: 0 };
    }

    // Check if coupon is within valid date range
    const currentDate = new Date();
    const startDate = new Date(coupon.startDate);
    const endDate = new Date(coupon.endDate);

    if (currentDate < startDate) {
      return { valid: false, message: 'Coupon is not yet active', discount: 0 };
    }

    if (currentDate > endDate) {
      return { valid: false, message: 'Coupon has expired', discount: 0 };
    }

    return { 
      valid: true, 
      message: `Coupon applied! ₱${coupon.discount} discount`, 
      discount: coupon.discount 
    };
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') {
      setCouponMessage('');
      setAppliedDiscount(0);
      setAppliedCouponCode('---');
      setCouponApplied(false);
      return;
    }

    const result = validateCoupon(couponCode);
    
    if (result.valid) {
      setAppliedDiscount(result.discount);
      setAppliedCouponCode(couponCode);
      setCouponMessage(result.message);
      setCouponApplied(true);
    } else {
      setAppliedDiscount(0);
      setAppliedCouponCode('---');
      setCouponMessage(result.message);
      setCouponApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedDiscount(0);
    setAppliedCouponCode('---');
    setCouponMessage('');
    setCouponApplied(false);
  };

  const handleBuyProduct = () => {
    setBoughtList(cart); // Store a snapshot before clearing
    setPurchased(true);
    setCart([]); // Empties the cart after purchase
    if (onTransaction) {
      onTransaction(cart, appliedDiscount, appliedCouponCode);
    }
  };

  const finalTotal = Math.max(0, total - appliedDiscount);
  const boughtFinalTotal = Math.max(0, boughtTotal - appliedDiscount);

  return (
    <div style={{ margin: '20px' }}>
      <h1>Checkout</h1>

      {cart.length === 0 && !purchased ? (
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
          <h2>Price: ₱{boughtTotal.toFixed(2)}</h2>
          <h2>Discount: ₱{appliedDiscount.toFixed(2)}</h2>
          {appliedCouponCode !== '---' && (
            <h2 style={{ color: '#28a745' }}>Coupon Used: {appliedCouponCode}</h2>
          )}
          <h2>Total Price: ₱{boughtFinalTotal.toFixed(2)}</h2>
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
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₱{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginBottom: '20px', maxWidth: '500px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Coupon Code (Optional):
            </label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                disabled={couponApplied}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              {!couponApplied ? (
                <button
                  onClick={handleApplyCoupon}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Apply
                </button>
              ) : (
                <button
                  onClick={handleRemoveCoupon}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Remove
                </button>
              )}
            </div>
            {couponMessage && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: couponApplied ? '#d4edda' : '#f8d7da',
                  color: couponApplied ? '#155724' : '#721c24',
                  border: `1px solid ${couponApplied ? '#c3e6cb' : '#f5c6cb'}`
                }}
              >
                {couponMessage}
              </div>
            )}
          </div>

          <h2>Subtotal: ₱{total.toFixed(2)}</h2>
          {appliedDiscount > 0 && (
            <h2 style={{ color: '#28a745' }}>Discount: -₱{appliedDiscount.toFixed(2)}</h2>
          )}
          <h2>Total Price: ₱{finalTotal.toFixed(2)}</h2>

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
