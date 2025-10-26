import React, { useState } from 'react';

function User({
  firstName, setFirstName,
  lastName, setLastName,
  houseStreet, setHouseStreet,
  barangay, setBarangay,
  city, setCity,
  postalCode, setPostalCode,
  transactions
}) {
  const [edit, setEdit] = useState(false);
  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formHouseStreet, setFormHouseStreet] = useState(houseStreet);
  const [formBarangay, setFormBarangay] = useState(barangay);
  const [formCity, setFormCity] = useState(city);
  const [formPostalCode, setFormPostalCode] = useState(postalCode);
  const handleSave = (e) => {
    e.preventDefault();
    setFirstName(formFirstName.trim() === "" ? "No first name" : formFirstName);
    setLastName(formLastName.trim() === "" ? "No last name" : formLastName);
    setHouseStreet(formHouseStreet.trim() === "" ? "No house/street" : formHouseStreet);
    setBarangay(formBarangay.trim() === "" ? "No barangay" : formBarangay);
    setCity(formCity.trim() === "" ? "No city" : formCity);
    setPostalCode(formPostalCode.trim() === "" ? "No postal code" : formPostalCode);
    setEdit(false);
  };
  const handleCancel = () => {
    setFormFirstName(firstName);
    setFormLastName(lastName);
    setFormHouseStreet(houseStreet);
    setFormBarangay(barangay);
    setFormCity(city);
    setFormPostalCode(postalCode);
    setEdit(false);
  };

  return (
    <div className="text-center">
      <h1 className="fw-bold mt-4">Account</h1>
      {!edit ? (
        <div>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>House No./Street: {houseStreet}</p>
          <p>Barangay: {barangay}</p>
          <p>City: {city}</p>
          <p>Postal Code: {postalCode}</p>
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
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              value={formFirstName}
              onChange={e => setFormFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              value={formLastName}
              onChange={e => setFormLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>House No./Street</label>
            <input
              className="form-control"
              type="text"
              value={formHouseStreet}
              onChange={e => setFormHouseStreet(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Barangay</label>
            <input
              className="form-control"
              type="text"
              value={formBarangay}
              onChange={e => setFormBarangay(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>City</label>
            <input
              className="form-control"
              type="text"
              value={formCity}
              onChange={e => setFormCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Postal Code</label>
            <input
              className="form-control"
              type="text"
              value={formPostalCode}
              onChange={e => setFormPostalCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success me-2">
            Save
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      )}

      <h3 className="mt-4">Transaction History</h3>
      <div style={{ overflowX: "auto" }}>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table border="1" cellPadding="8" style={{
            borderCollapse: "collapse",
            margin: "0 auto",
            textAlign: "left",
            minWidth: "600px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>Order Number</th>
                <th>Price (₱)</th>
                <th>Discount (₱)</th>
                <th>Total Price (₱)</th>
                <th>Coupon Code</th>
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
                  <td>{tx.couponCode || '---'}</td>
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