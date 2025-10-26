import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import coupons from '../data/coupons.json';

function Checkout({ cart, setCart, onTransaction, usedCoupons, defaultContactInfo }) {
  const [purchased, setPurchased] = useState(false);
  const [boughtList, setBoughtList] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState('---');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    houseStreet: '',
    barangay: '',
    city: '',
    postalCode: ''
  });

  const [contactError, setContactError] = useState('');

  useEffect(() => {
    if (defaultContactInfo) {
      setContactInfo({
        firstName: defaultContactInfo.firstName || '',
        lastName: defaultContactInfo.lastName || '',
        houseStreet: defaultContactInfo.houseStreet || '',
        barangay: defaultContactInfo.barangay || '',
        city: defaultContactInfo.city || '',
        postalCode: defaultContactInfo.postalCode || '',
      });
    }
  }, [defaultContactInfo]);

  const shippingFee = 0;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const boughtTotal = boughtList.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateCoupon = (code) => {
    const coupon = coupons.find(c => c.code === code);
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code', discount: 0 };
    }
    if (usedCoupons.includes(code)) {
      return { valid: false, message: 'Coupon has already been used', discount: 0 };
    }
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
    if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.houseStreet) {
      setContactError('Please fill in required contact information');
      return;
    }
    setContactError('');

    setBoughtList(cart);
    setPurchased(true);
    setCart([]);

    if (onTransaction) {
      // pass the contact info and payment method to be used for transaction history
      onTransaction(cart, appliedDiscount, appliedCouponCode, contactInfo, paymentMethod);
    }
  };

  const finalTotal = Math.max(0, total - appliedDiscount + shippingFee);
  const boughtFinalTotal = Math.max(0, boughtTotal - appliedDiscount + shippingFee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (purchased) {
    return (
      <div className="container mt-4">
        <h2>Thank you for your purchase!</h2>
        <p>You have bought the following products:</p>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
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
        <h3>Subtotal: ₱{boughtTotal.toFixed(2)}</h3>
        <h3>Discount: ₱{appliedDiscount.toFixed(2)}</h3>
        <h3>Shipping Fee: ₱{shippingFee.toFixed(2)}</h3>
        {appliedCouponCode !== '---' && (
          <h3 className="text-success">Coupon Used: {appliedCouponCode}</h3>
        )}
        <h3>Total Price: ₱{boughtFinalTotal.toFixed(2)}</h3>
        <h4 className="mt-3">Payment Method: {paymentMethod === 'cod' ? 'Cash On Delivery' : paymentMethod === 'gcash' ? 'Gcash' : 'Debit/Credit Card'}</h4>
        <div className="mt-4">
          <Link to="/">
            <button className="btn btn-primary">Return Home</button>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <p>No items in your cart.</p>
        <Link to="/products">
          <button className="btn btn-primary">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Payment Transaction</h2>

      <div className="row">
        <div className="col-md-7">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Contact Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={contactInfo.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={contactInfo.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">House No./Street</label>
                  <input
                    type="text"
                    className="form-control"
                    name="houseStreet"
                    value={contactInfo.houseStreet}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Barangay</label>
                  <input
                    type="text"
                    className="form-control"
                    name="barangay"
                    value={contactInfo.barangay}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={contactInfo.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="postalCode"
                    value={contactInfo.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {contactError && <div className="text-danger mt-2">{contactError}</div>}
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Payment Method</h5>

              <div className="form-check mb-3 p-3 border rounded">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label ms-2" htmlFor="cod">
                  <strong>Cash On Delivery (COD)</strong>
                  <div className="text-muted small">Pay with cash upon delivery</div>
                </label>
              </div>

              <div className="form-check mb-3 p-3 border rounded">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="gcash"
                  value="gcash"
                  checked={paymentMethod === 'gcash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label ms-2" htmlFor="gcash">
                  <strong>Gcash</strong>
                  <div className="text-muted small">Pay instantly with Gcash</div>
                </label>
              </div>

              <div className="form-check mb-3 p-3 border rounded">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="card"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label ms-2" htmlFor="card">
                  <strong>Debit/Credit Card</strong>
                  <div className="text-muted small">Pay with your card</div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Order Summary</h5>

              {cart.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <div
                    className="bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: '60px', height: '60px', borderRadius: '8px', fontSize: '10px' }}
                  >
                    Product<br />Image
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold">{item.name}</div>
                    <div className="text-muted small">Qty: {item.quantity}</div>
                  </div>
                  <div className="fw-bold">₱{item.price.toFixed(2)}</div>
                </div>
              ))}

              <div className="mb-3">
                <label className="form-label">Redeem Code</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    disabled={couponApplied}
                  />
                  {!couponApplied ? (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleApplyCoupon}
                    >
                      ✓
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleRemoveCoupon}
                    >
                      ✗
                    </button>
                  )}
                </div>
                {couponMessage && (
                  <div className={`alert ${couponApplied ? 'alert-success' : 'alert-danger'} mt-2 py-1 px-2 small`}>
                    {couponMessage}
                  </div>
                )}
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount:</span>
                    <span>-₱{appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping Fee:</span>
                  <span>₱{shippingFee.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2">
                  <span>Total:</span>
                  <span>₱{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="btn btn-dark w-100 mt-3"
                onClick={handleBuyProduct}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
