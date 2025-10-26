import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const adImages = [
  'https://racetechnologies.com/sites/default/files/content/misc/moto-calipers-and-discs.jpg',
  'https://t3.ftcdn.net/jpg/15/22/83/76/240_F_1522837683_Q8hUL0DzaqBVuEABmjeAGO8yigYySe9N.jpg',
  'https://t3.ftcdn.net/jpg/13/95/70/56/360_F_1395705660_0TAXq2SHNz0AQKqiWMeEZ7hXzHNlcmiB.jpg'
];

function HomePage() {
  const [currentAd, setCurrentAd] = useState(0);
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Shopee-like search suggestions
  const suggestionData = [
    'hot wheels', 'hot wheels cars', 'hot wheels organizer',
    'hot wheels premium', 'hot wheels fast and furious', 'hot wheels display rack', 'hot wheels f1', 'hotwheels motorcycle', 'hot wheels lamborghini'
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      setSuggestions(suggestionData.filter(item => item.toLowerCase().includes(value.toLowerCase())));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const onSuggestionClick = value => {
    setSearch(value);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (search.trim().length === 0) return;
    alert('Search for: ' + search);
    setShowSuggestions(false);
  };

  const featuredProducts = [
    { id: 1, name: 'PRODUCT NAME', price: 0, sold: 0 },
    { id: 2, name: 'PRODUCT NAME', price: 0, sold: 0 },
    { id: 3, name: 'PRODUCT NAME', price: 0, sold: 0 },
    { id: 4, name: 'PRODUCT NAME', price: 0, sold: 0 }
  ];

  return (
    <div className="container mt-4">
      {/* SEARCH NAV */}
      <div className="d-flex align-items-center mb-4">
        <form onSubmit={handleSearchSubmit} className="flex-grow-1" style={{ position: 'relative' }}>
          <div
            className="d-flex align-items-center border px-0 py-0 shadow-sm"
            style={{
              borderRadius: '8px',
              backgroundColor: '#f9fafc',
              height: 38,
              overflow: 'hidden'
            }}
          >
            {/* Left search icon */}
            <span className="px-3" style={{fontSize: 20, color: '#888'}}>
              <i className="ri-search-2-line"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent"
              placeholder="Find more products"
              style={{ boxShadow: 'none', fontSize: '0.98rem' }}
              value={search}
              onChange={handleSearchChange}
              onFocus={() => search && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 130)}
              autoComplete="off"
            />
            <button className="btn btn-dark px-3 border-0" style={{ borderRadius: 0, height: 38 }} type="submit">
              <i className="ri-search-line text-white"></i>
            </button>
          </div>
          {/* Suggestions Dropdown (Shopee-like) */}
          {showSuggestions && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#fff',
                border: '1px solid #e8e8e8',
                borderTop: 'none',
                zIndex: 99,
                boxShadow: '0px 8px 18px rgba(0,0,0,0.04)'
              }}
            >
              {suggestions.length === 0 && (
                <div className="px-3 py-2 text-muted">No results</div>
              )}
              {suggestions.map((s, idx) => (
                <div
                  key={s + idx}
                  style={{ cursor: 'pointer', padding: '7px 18px', fontSize: '1rem' }}
                  className="suggestion-item"
                  onMouseDown={() => onSuggestionClick(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </form>
        {/* NAV ICONS - ONLY 3, unhighlighted, cart/account/dark */}
        <div className="d-flex align-items-center gap-4 ms-3">
          <button className="btn btn-link p-0" title="Products" onClick={() => navigate('/products')}>
            <i className="ri-shopping-cart-line fs-5" style={{ color: "#222" }}></i>
          </button>
          <button className="btn btn-link p-0" title="User" onClick={() => navigate('/user')}>
            <i className="ri-user-line fs-5" style={{ color: "#222" }}></i>
          </button>
          <button className="btn btn-link p-0" title="Dark Mode" tabIndex={-1}>
            <i className="ri-moon-line fs-5" style={{ color: "#222" }}></i>
          </button>
        </div>
      </div>

      {/* ADVERTISEMENT SLIDER */}
      <div
        className="border bg-light d-flex align-items-center justify-content-center rounded mb-5"
        style={{ height: '180px', position: 'relative', overflow: 'hidden' }}
      >
        <img
          src={adImages[currentAd]}
          alt={`Advertisement ${currentAd + 1}`}
          style={{ height: '100%', maxHeight: '160px', maxWidth: '100%', objectFit: 'cover', borderRadius: '8px', transition: 'opacity .4s' }}
        />
        {/* Navigation Dots */}
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
          {adImages.map((_, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                height: 10,
                width: 10,
                borderRadius: '50%',
                background: idx === currentAd ? '#000' : '#ccc',
                opacity: idx === currentAd ? 1 : 0.4,
                margin: '0 3px',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentAd(idx)}
            />
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <h5 className="text-center fw-bold mb-4">FEATURED PRODUCTS</h5>
      <div className="row justify-content-center">
        {featuredProducts.map((item) => (
          <div key={item.id} className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center">
            <div
              className="card border-0"
              style={{
                width: '220px',
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <div
                className="bg-light d-flex align-items-center justify-content-center"
                style={{
                  height: '160px',
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '15px'
                }}
              >
                <span className="text-muted">Product Image</span>
              </div>
              <div className="card-body text-start">
                <h6 className="fw-semibold mb-1">{item.name}</h6>
                <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>₱{item.price.toFixed(2)}</p>
                <p className="text-muted" style={{ fontSize: '0.8rem' }}>{item.sold} sold</p>
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-dark flex-fill" style={{ borderRadius: '8px' }}>
                    BUY
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    style={{ borderRadius: '8px', width: '55px' }}
                  >
                    <i className="ri-shopping-cart-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

);
}

export default HomePage;
