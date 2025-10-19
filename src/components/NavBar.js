import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <header className="navbar">
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/products" className="nav-link">Products</Link>
                <Link to="/cart" className="nav-link">Cart</Link>
            </nav>
        </header>
    );
}

export default NavBar;