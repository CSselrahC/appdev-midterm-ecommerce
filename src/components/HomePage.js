import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center">
      <Link to="/user" className="btn btn-primary mt-2">User</Link>
      <h1 className="fw-bold mt-4">🚗 Docker Motorsports</h1>
      <p>Your one-stop shop for tires, suspensions, diecast cars, and everything motorsports!</p>
      <p>Browse our latest products now!</p>
      <Link to="/products" className="btn btn-primary mt-2">View Products</Link>

      <div className="mt-5">
        <div className="bg-light border rounded p-3 mb-2">Ads 1</div>
        <div className="bg-light border rounded p-3 mb-2">Ads 2</div>
        <div className="bg-light border rounded p-3">Ads 3</div>
      </div>
    </div>
  );
}

export default HomePage;
