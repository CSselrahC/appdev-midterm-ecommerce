import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <div>
                <h1>🚗Docker Motorsports</h1>
                <p>Your one stop shop for tires, suspensions, diecast cars, and everything motorsports!</p>
                <p>Browse our latest products now!</p>
                <Link to="/products" className="nav-link">View Products</Link>
            </div>

            <br></br>
            <div>
                Ads 1
                <br></br>
                Ads 2
                <br></br>
                Ads 3
            </div>  
        </div>
    );
}

export default HomePage;