import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mt-4">
      {/* 🔍 Top bar: Search + Icons beside it */}
      <div className="d-flex align-items-center mb-4">
        {/* Search bar */}
        <div
          className="d-flex align-items-center border px-3 py-2 shadow-sm flex-grow-1"
          style={{
            height: '38px',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
        >
          <i className="ri-search-2-line text-secondary me-2"></i>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Find more products"
            style={{
              boxShadow: 'none',
              background: 'transparent',
              fontSize: '0.9rem',
            }}
          />
        </div>

        {/* Right icons beside search bar */}
        <div className="d-flex align-items-center gap-4 ms-3">
          <i className="ri-shopping-cart-line fs-5" style={{ cursor: 'pointer' }}></i>
          <i className="ri-user-line fs-5" style={{ cursor: 'pointer' }}></i>
          <i className="ri-moon-line fs-5" style={{ cursor: 'pointer' }}></i>
        </div>
      </div>

      {/* 🧾 Advertisement section */}
      <div
        className="border bg-light d-flex align-items-center justify-content-center rounded mb-5"
        style={{ height: '180px' }}
      >
        <h5 className="text-secondary">Advertisement</h5>
      </div>

      {/* ⭐ Featured Products */}
      <h5 className="text-center fw-bold mb-4">FEATURED PRODUCTS</h5>

      <div className="row justify-content-center">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center">
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
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
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

              <div className="card-body text-start">
                <h6 className="fw-semibold mb-1">PRODUCT NAME</h6>
                <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>₱0.00</p>
                <p className="text-muted" style={{ fontSize: '0.8rem' }}>0 sold</p>

                {/* 🛒 Action Buttons */}
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-dark flex-fill" style={{ borderRadius: '8px' }}>BUY</button>
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
