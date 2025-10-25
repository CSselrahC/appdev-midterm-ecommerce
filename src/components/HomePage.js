import React from 'react';
import { Link } from 'react-router-dom';
//import ad1 from '../designs/images/ads.png';

function HomePage() {
  return (
    <div className="text-center">
      <h1 className="fw-bold mt-4">🚗 Docker Motorsports</h1>
      <p>Your one-stop shop for tires, suspensions, diecast cars, and everything motorsports!</p>
      <p>Browse our latest products now!</p>
      <p> hello</p>
      <Link to="/products" className="btn btn-primary mt-2">View Products</Link>

      <div className="mt-5">
        <div className="bg-light border rounded p-3 mb-2">
          {/*<img src={ad1} alt="advertisement 1" /> */}
          Ad 1
        </div>
        <div className="bg-light border rounded p-3 mb-2">
          Ad 2
        </div>
        <div className="bg-light border rounded p-3">
          Ad 3
        </div>
      </div>
    </div>
  );
}

export default HomePage;
