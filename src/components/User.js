import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function User({
  userName,
  setUserName,
  paymentMethod,
  setPaymentMethod,
  deliveryAddress,
  setDeliveryAddress,
  transactions
}) {
  const [edit, setEdit] = useState(false);
  const [formName, setFormName] = useState(userName);
  const [formPaymentMethod, setFormPaymentMethod] = useState(paymentMethod);
  const [formAddress, setFormAddress] = useState(deliveryAddress);

  const handleSave = (e) => {
    e.preventDefault();
    setUserName(formName.trim() === "" ? "Unnamed" : formName);
    setPaymentMethod(formPaymentMethod);
    setDeliveryAddress(formAddress.trim() === "" ? "No address" : formAddress);
    setEdit(false);
  };

  const handleCancel = () => {
    setFormName(userName);
    setFormPaymentMethod(paymentMethod);
    setFormAddress(deliveryAddress);
    setEdit(false);
  };

  return (
    <div className="text-center">
      <Link to="/" className="btn btn-primary mt-2">Back</Link>
      <h1 className="fw-bold mt-4">User Page</h1>
      {!edit ? (
        <div>
          <p>Name: {userName}</p>
          <p>Payment Option: {paymentMethod}</p>
          <p>Delivery Address: {deliveryAddress}</p>
          <button className="btn btn-secondary mb-3" onClick={() => setEdit(true)}>
            Edit Details
          </button>
        </div>
      ) : (
        <form
          style={{
            display: "inline-block",
            textAlign: "left",
            margin: "0 auto",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px"
          }}
          onSubmit={handleSave}
        >
          <div className="mb-2">
            <label>Name: </label>
            <input
              className="form-control"
              type="text"
              value={formName}
              onChange={e => setFormName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Payment Method: </label>
            <select
              className="form-control"
              value={formPaymentMethod}
              onChange={e => setFormPaymentMethod(e.target.value)}
              required
            >
              <option value="GCash">GCash</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Delivery Address: </label>
            <input
              className="form-control"
              type="text"
              value={formAddress}
              onChange={e => setFormAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success me-2">
            Save
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
      <p className="mt-4">Transaction History:</p>
      <div style={{ overflowX: "auto" }}>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table border="1" cellPadding="8" style={{
            borderCollapse: "collapse",
            margin: "0 auto",
            textAlign: "left",
            minWidth: "400px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>Order Number</th>
                <th>Price (₱)</th>
                <th>Discount (₱)</th>
                <th>Total Price (₱)</th>
                <th>Payment Method</th>
                <th>Delivery Address</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i}>
                  <td>{tx.orderNumber}</td>
                  <td>₱{tx.price.toFixed(2)}</td>
                  <td>₱{tx.discount}</td>
                  <td>₱{tx.totalPrice.toFixed(2)}</td>
                  <td>{tx.paymentMethod}</td>
                  <td>{tx.deliveryAddress}</td>
                  <td>{tx.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default User;
