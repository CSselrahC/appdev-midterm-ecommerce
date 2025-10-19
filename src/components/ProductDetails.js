import React from 'react';
import { useParams, Link } from 'react-router-dom';

const productsData = [
    { id: 1, name: 'Product 1', description: "A high-performance tire for track days.", price: 10.00 },
    { id: 2, name: 'Product 2', description: "Adjustable coil-over suspension kit.", price: 20.00 },
    { id: 3, name: 'Product 3', description: "Limited edition Diecast Model Car.", price: 30.00 },
    { id: 4, name: 'Product 4', description: "High-flow air intake system.", price: 20.00 },
    { id: 5, name: 'Product 5', description: "Brembo brake kit upgrade.", price: 30.00 }
];

function ProductDetails({ addToCart }) {
    const { id } = useParams();
    
    const productId = parseInt(id);
    const product = productsData.find(p => p.id === productId);

    if (!product) {
        return <div>Product not found for ID: {id}</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} added to cart!`);
    };
    
    return (
        <div className="card">
            <Link to="/products" className="nav-link">Back to Product List</Link>
            <br></br>
            <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-description">
                    {product.description}<br></br>
                    Price: ₱{product.price.toFixed(2)}
                </p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;