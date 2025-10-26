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

  // User details
  const [firstName, setFirstName] = useState("Juan");
  const [lastName, setLastName] = useState("Dela Cruz");
  const [houseStreet, setHouseStreet] = useState("Blk 2 Lot 4");
  const [barangay, setBarangay] = useState("Pulo");
  const [city, setCity] = useState("Cabuyao");
  const [postalCode, setPostalCode] = useState("4025");

  // Payment method default
  const defaultPaymentMethod = "COD";
  const shippingFee = 50;

  useEffect(() => {
    document.title = "KOTSELL";
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

  const handleTransaction = (orderItems, discount = 0, couponCode = '---', contactInfo = null, paymentMethod = defaultPaymentMethod) => {
    const orderNumber = transactions.length + 1;
    const price = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPrice = price - discount + shippingFee;
    const dateTime = new Date().toLocaleString();
    const deliveryAddress = contactInfo
      ? `${contactInfo.houseStreet}, ${contactInfo.barangay}, ${contactInfo.city}, ${contactInfo.postalCode}`
      : `${houseStreet}, ${barangay}, ${city}, ${postalCode}`;
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
      },
    ]);

    if (couponCode !== '---') {
      setUsedCoupons([...usedCoupons, couponCode]);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home userName={firstName} />} />
            <Route path="/products" element={<ProductList addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/details/:id" element={<ProductDetails cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={
              <Checkout
                cart={cart}
                setCart={setCart}
                onTransaction={handleTransaction}
                usedCoupons={usedCoupons}
                defaultContactInfo={{
                  firstName,
                  lastName,
                  houseStreet,
                  barangay,
                  city,
                  postalCode,
                }}
              />
            } />
            <Route path="/user" element={
              <User
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                houseStreet={houseStreet}
                setHouseStreet={setHouseStreet}
                barangay={barangay}
                setBarangay={setBarangay}
                city={city}
                setCity={setCity}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
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
