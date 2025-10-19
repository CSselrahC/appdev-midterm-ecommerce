import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>🐳 Ecommerce</h1>
            <p>Welcome to our Ecommerce store!</p>
            <p>Browse our latest products now!</p>
            <Link to="/products" className="nav-link">View Products</Link>
        </div>
    );
}

export default HomePage;