import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/HomePage';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import User from './components/User';


function App() {
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [usedCoupons, setUsedCoupons] = useState([]);
  // User details in state
  const [userName, setUserName] = useState("Cagayan");
  const [paymentMethod, setPaymentMethod] = useState("GCash");
  const [deliveryAddress, setDeliveryAddress] = useState("dyan sa may kanto");


  useEffect(() => {
    document.title = "Docker Motorsports";
  }, []);


  const addToCart = (productToAdd, quantityToAdd = 1) => {
    const existingProduct = cart.find(item => item.id === productToAdd.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      ));
    } else {
      setCart([...cart, { ...productToAdd, quantity: quantityToAdd }]);
    }
  };


  const handleTransaction = (orderItems, discount = 0, couponCode = '---') => {
    const orderNumber = transactions.length + 1;
    const price = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPrice = price - discount;
    const dateTime = new Date().toLocaleString();
    setTransactions([
      ...transactions,
      {
        orderNumber,
        price,
        discount,
        totalPrice,
        couponCode,
        paymentMethod,
        deliveryAddress,
        dateTime,
        items: orderItems,
      }
    ]);

    // Mark coupon as used if one was applied
    if (couponCode !== '---') {
      setUsedCoupons([...usedCoupons, couponCode]);
    }
  };


  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <main className="main-content flex-fill p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} onTransaction={handleTransaction} usedCoupons={usedCoupons} />} />
            <Route path="/user" element={
              <User
                userName={userName}
                setUserName={setUserName}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
                transactions={transactions}
              />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;
