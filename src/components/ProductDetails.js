import React from 'react';

// The ProductDetails component receives data as props
const ProductDetails = (product) => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-description">
                    {product.description}<br></br>
                    ₱{product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
