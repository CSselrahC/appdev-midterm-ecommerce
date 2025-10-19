import React, {useState} from 'react';

function Checkout() {
    const [cartList, setCartList] = useState([]);

    return (
        <div>
            <h1>Shopping Cart</h1>
            <p>Your selected products:</p>
            <ul>
                {cartList.map(item => (
                    <li key={item.id}>
                        {item.name} - ₱{item.price.toFixed(2)}
                        <button>Remove from Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Checkout;
