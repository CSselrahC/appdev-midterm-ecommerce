import React from 'react';
import { Link } from 'react-router-dom';

function HomePage({ userName }) {
return ( <div className="container mt-4">
{/* Header section */} <div className="d-flex align-items-center justify-content-between mb-4">
{/* Welcome message */} <h5 className="fw-bold mb-0">Welcome, {userName}!</h5>

    {/* Icons (Cart and Account) */}
    <div className="d-flex align-items-center gap-4">
      <Link to="/cart">
        <i
          className="ri-shopping-cart-line fs-5 text-dark"
          style={{ cursor: 'pointer' }}
          title="Cart"
        ></i>
      </Link>
      <Link to="/user">
        <i
          className="ri-user-line fs-5 text-dark"
          style={{ cursor: 'pointer' }}
          title="Account"
        ></i>
      </Link>
    </div>
  </div>

  {/* Advertisement section */}
  <div
    className="border bg-light d-flex align-items-center justify-content-center rounded mb-5"
    style={{ height: '180px' }}
  >
    <h5 className="text-secondary">Advertisement</h5>
  </div>

  {/* Featured Products */}
  <h5 className="text-center fw-bold mb-4">FEATURED PRODUCTS</h5>

  <div className="row justify-content-center">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center"
      >
        <div
          className="card border-0"
          style={{
            width: '220px',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow =
              '0 8px 20px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 4px 12px rgba(0, 0, 0, 0.1)';
          }}
        >
          {/* Product Image Placeholder */}
          <div
            className="bg-light d-flex align-items-center justify-content-center"
            style={{
              height: '160px',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
            }}
          >
            <span className="text-muted">Product Image</span>
          </div>

          {/* Product Info */}
          <div className="card-body text-start">
            <h6 className="fw-semibold mb-1">PRODUCT NAME</h6>
            <p
              className="mb-1 text-muted"
              style={{ fontSize: '0.9rem' }}
            >
              ₱0.00
            </p>
            <p
              className="text-muted"
              style={{ fontSize: '0.8rem' }}
            >
              0 sold
            </p>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mt-2">
              <button
                className="btn btn-dark flex-fill"
                style={{ borderRadius: '8px' }}
              >
                BUY
              </button>
              <button
                className="btn btn-outline-dark"
                style={{ borderRadius: '8px', width: '55px' }}
              >
                <i className="ri-shopping-cart-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

);
}

export default HomePage;
