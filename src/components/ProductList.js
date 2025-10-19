import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ addToCart }) {
    const products = [
        { id: 1, name: 'Product 1', price: 10.00 },
        { id: 2, name: 'Product 2', price: 20.00 },
        { id: 3, name: 'Product 3', price: 30.00 },
        { id: 4, name: 'Product 4', price: 20.00 },
        { id: 5, name: 'Product 5', price: 30.00 }
    ];

    const handleAddToCart = (product) => {
        if (addToCart) {
            addToCart(product);
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            <p>Here are some products available in our store:</p>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ₱{product.price.toFixed(2)}
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>

            <br></br>
            <Link to="/cart" className="nav-link">Cart</Link>
        </div>
    );
}

export default ProductList;