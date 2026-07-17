import React, { useState } from 'react';
import { ShoppingBag, User, Search, MapPin, ChevronDown, Edit2, ShieldCheck, Map } from 'lucide-react';

export default function Header({ 
  deliveryMode, 
  setDeliveryMode, 
  cart, 
  setCartOpen,
  address,
  onOpenMap,
  onGoToCartPage,
  user,
  onLoginClick,
  onLogout,
  onShowHistory,
  onAdminClick,
  yeKazanSlices
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSelectMode = (mode) => {
    setDeliveryMode(mode);
    setDropdownOpen(false);
    if (mode === 'pickup') {
      onOpenMap();
    }
  };

  return (
    <header className="site-header-blue">
      <div className="container header-inner-blue">
        {/* Left Side: Logo & Main Navigation */}
        <div className="header-left-group">
          <a href="/" className="brand-logo-white">
            <img 
              src="/logo.png" 
              alt="di napoli pizza" 
              className="di-napoli-header-logo" 
              style={{ height: '56px', objectFit: 'contain' }}
            />
          </a>
          
          <nav className="header-nav-links">
            <a href="#menu" className="nav-link-white">Tüm Kampanyalar</a>
            <a href="#menu" className="nav-link-white">Tüm Pizzalar</a>
            <a href="#menu" className="nav-link-white">Yan Ürünler</a>
          </nav>
        </div>

        {/* Right Side: Delivery Picker, User & Cart actions */}
        <div className="header-right-group">
          {/* Search Icon */}
          <button className="header-search-btn" aria-label="Arama Yap">
            <Search size={20} color="white" />
          </button>

          {/* Location / Address Picker Dropdown */}
          <div className="address-picker-widget" style={{ position: 'relative' }}>
            <div 
              className="delivery-type-pill" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <span className="delivery-dot"></span>
              <span className="delivery-mode-text">
                {deliveryMode === 'delivery' ? 'Adrese Teslim' : 'Gel-Al'}
              </span>
              <ChevronDown size={14} className="dropdown-arrow" />
            </div>

            {dropdownOpen && (
              <div className="delivery-dropdown-list">
                <div 
                  className={`dropdown-item-row ${deliveryMode === 'delivery' ? 'active' : ''}`}
                  onClick={() => handleSelectMode('delivery')}
                >
                  <span className="delivery-dot"></span>
                  <span>Adrese Teslim</span>
                </div>
                <div 
                  className={`dropdown-item-row ${deliveryMode === 'pickup' ? 'active' : ''}`}
                  onClick={() => handleSelectMode('pickup')}
                >
                  <span className="delivery-dot pickup"></span>
                  <span>Beklemeden Gel-Al</span>
                </div>
              </div>
            )}
            
            <div className="address-details" onClick={onOpenMap} style={{ cursor: 'pointer' }}>
              <MapPin size={14} className="pin-icon" />
              <span className="address-text">{address}</span>
              <button className="address-edit-btn" aria-label="Haritayı Aç">
                <Map size={12} />
              </button>
            </div>
          </div>

          {/* User Sign In / Profile dropdown */}
          {user ? (
            <div className="user-profile-dropdown-container" style={{ position: 'relative' }}>
              <button 
                className="auth-btn-white user-logged-btn" 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="header-user-avatar" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <User size={16} />
                )}
                <span>{user.name.length > 8 ? user.name.slice(0, 8) + '..' : user.name}</span>
                <ChevronDown size={12} className="logged-arrow" />
              </button>
              
              {profileMenuOpen && (
                <div className="profile-dropdown-list">
                  <div className="profile-dropdown-header">
                    <span className="user-email-lbl">{user.email}</span>
                    <span className="user-slices-lbl">🍕 {yeKazanSlices} Dilim Pizzam Var</span>
                  </div>
                  <div className="profile-dropdown-divider"></div>
                  {user.isAdmin && (
                    <>
                      <button className="profile-dropdown-item admin-link" onClick={() => { onAdminClick(); setProfileMenuOpen(false); }} style={{ color: 'var(--color-primary-red)', fontWeight: '800' }}>
                        🛡 Yönetici Paneli
                      </button>
                      <div className="profile-dropdown-divider"></div>
                    </>
                  )}
                  <button className="profile-dropdown-item" onClick={() => { onShowHistory(); setProfileMenuOpen(false); }}>
                    Siparişlerim
                  </button>
                  <button className="profile-dropdown-item logout" onClick={() => { onLogout(); setProfileMenuOpen(false); }}>
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="auth-btn-white" onClick={onLoginClick}>
              <User size={16} />
              <span>Giriş Yap</span>
            </button>
          )}

          {/* Sepetim Button */}
          <button className="cart-btn-white" onClick={onGoToCartPage}>
            <div className="cart-icon-container">
              <ShoppingBag size={18} />
              {totalItems > 0 && <span className="cart-badge-blue">{totalItems}</span>}
            </div>
            <span>Sepetim</span>
          </button>
        </div>
      </div>
    </header>
  );
}
