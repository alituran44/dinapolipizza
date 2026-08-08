import React, { useState } from 'react';
import { 
  ShoppingBag, User, Search, MapPin, ChevronDown, Edit2, ShieldCheck, Map,
  Bell, CreditCard, Smartphone, Sparkles, Percent, ChevronRight, Gift,
  Menu as MenuIcon, X as XIcon, LogOut
} from 'lucide-react';

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
  yeKazanSlices,
  onGoToReferral,
  onOpenRewards,
  onOpenAddresses,
  onGoToAbout,
  onGoToContact,
  onGoToMenu
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidesDropdownOpen, setSidesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>

          <a href="/" className="brand-logo-white" onClick={(e) => { e.preventDefault(); onGoToMenu(); }}>
            <img 
              src="/logo.png" 
              alt="di napoli pizza" 
              className="di-napoli-header-logo" 
              style={{ height: '48px', objectFit: 'contain' }}
            />
          </a>
          
          <nav className="header-nav-links">
            <a href="#menu" className="nav-link-white" onClick={(e) => { 
              e.preventDefault(); 
              onGoToMenu();
              setTimeout(() => {
                const element = document.querySelector('.promo-widgets-section') || document.querySelector('.header-video-banner');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }}>Tüm Kampanyalar</a>
            
            <a href="#menu" className="nav-link-white" onClick={(e) => { 
              e.preventDefault(); 
              onGoToMenu();
              setTimeout(() => {
                const element = document.getElementById('sec-pizzalar');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }}>Tüm Pizzalar</a>

            <div 
              className="dropdown-container"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setSidesDropdownOpen(true)}
              onMouseLeave={() => setSidesDropdownOpen(false)}
            >
              <a 
                href="#menu" 
                className="nav-link-white" 
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={(e) => { 
                  e.preventDefault(); 
                  onGoToMenu();
                  setTimeout(() => {
                    const element = document.getElementById('sec-fastfood');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }, 120);
                }}
              >
                <span>Yan Ürünler</span>
                <ChevronDown size={14} />
              </a>
              {sidesDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'var(--color-dark-blue)',
                  border: '2px solid var(--color-primary-blue)',
                  borderRadius: '8px',
                  padding: '8px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '220px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  zIndex: 1500,
                  marginTop: '4px'
                }}>
                  <a href="#menu" style={{ color: 'white', padding: '8px 16px', fontSize: '13px', fontWeight: 'bold', display: 'block', textAlign: 'left', transition: 'all 0.2s' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-blue)'}
                     onMouseLeave={e => e.currentTarget.style.color = 'white'}
                     onClick={(e) => {
                       e.preventDefault();
                       setSidesDropdownOpen(false);
                       onGoToMenu();
                       setTimeout(() => {
                         const element = document.getElementById('sec-fastfood');
                         if (element) element.scrollIntoView({ behavior: 'smooth' });
                       }, 120);
                     }}>
                    🍟 Patates & Yan Lezzetler
                  </a>
                  <a href="#menu" style={{ color: 'white', padding: '8px 16px', fontSize: '13px', fontWeight: 'bold', display: 'block', textAlign: 'left', transition: 'all 0.2s' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-blue)'}
                     onMouseLeave={e => e.currentTarget.style.color = 'white'}
                     onClick={(e) => {
                       e.preventDefault();
                       setSidesDropdownOpen(false);
                       onGoToMenu();
                       setTimeout(() => {
                         const element = document.getElementById('sec-salatalar');
                         if (element) element.scrollIntoView({ behavior: 'smooth' });
                       }, 120);
                     }}>
                    🥗 Taze Salatalar
                  </a>
                  <a href="#menu" style={{ color: 'white', padding: '8px 16px', fontSize: '13px', fontWeight: 'bold', display: 'block', textAlign: 'left', transition: 'all 0.2s' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-blue)'}
                     onMouseLeave={e => e.currentTarget.style.color = 'white'}
                     onClick={(e) => {
                       e.preventDefault();
                       setSidesDropdownOpen(false);
                       onGoToMenu();
                       setTimeout(() => {
                         const element = document.getElementById('sec-tatlilar');
                         if (element) element.scrollIntoView({ behavior: 'smooth' });
                       }, 120);
                     }}>
                    🍰 Nefis Tatlılar
                  </a>
                  <a href="#menu" style={{ color: 'white', padding: '8px 16px', fontSize: '13px', fontWeight: 'bold', display: 'block', textAlign: 'left', transition: 'all 0.2s' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-blue)'}
                     onMouseLeave={e => e.currentTarget.style.color = 'white'}
                     onClick={(e) => {
                       e.preventDefault();
                       setSidesDropdownOpen(false);
                       onGoToMenu();
                       setTimeout(() => {
                         const element = document.getElementById('sec-icecekler');
                         if (element) element.scrollIntoView({ behavior: 'smooth' });
                       }, 120);
                     }}>
                    🥤 Soğuk İçecekler
                  </a>
                  <a href="#menu" style={{ color: 'white', padding: '8px 16px', fontSize: '13px', fontWeight: 'bold', display: 'block', textAlign: 'left', transition: 'all 0.2s' }}
                     onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-blue)'}
                     onMouseLeave={e => e.currentTarget.style.color = 'white'}
                     onClick={(e) => {
                       e.preventDefault();
                       setSidesDropdownOpen(false);
                       onGoToMenu();
                       setTimeout(() => {
                         const element = document.getElementById('sec-soslar');
                         if (element) element.scrollIntoView({ behavior: 'smooth' });
                       }, 120);
                     }}>
                    🍯 Di Napoli Özel Sosları
                  </a>
                </div>
              )}
            </div>

            <a href="#about" className="nav-link-white" onClick={(e) => { e.preventDefault(); onGoToAbout(); }}>Hakkımızda</a>
            <a href="#contact" className="nav-link-white" onClick={(e) => { e.preventDefault(); onGoToContact(); }}>İletişim</a>
          </nav>
        </div>

        {/* Right Side: Delivery Picker, User & Cart actions */}
        <div className="header-right-group">
          {/* Kompakt Adres Çubuğu (Mobilde Tıklanabilir İkon) */}
          <div className="compact-address-trigger-mobile" onClick={() => onOpenAddresses()} title="Teslimat Adresim">
            <MapPin size={20} color="white" />
            <span className="compact-address-mobile-text">
              {address ? (address.length > 12 ? address.slice(0, 12) + '...' : address) : 'Konum Seçin'}
            </span>
          </div>

          {/* Location / Address Picker Widget (Masaüstü) */}
          <div className="address-picker-widget">
            <div className="delivery-toggle-container" style={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '30px',
              padding: '2px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setDeliveryMode('delivery');
                  onOpenMap();
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '30px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: deliveryMode === 'delivery' ? 'var(--color-primary-blue)' : 'transparent',
                  color: deliveryMode === 'delivery' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  transition: 'all 0.2s'
                }}
              >
                Adrese Teslim
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setDeliveryMode('pickup');
                  onOpenMap();
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '30px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: deliveryMode === 'pickup' ? 'var(--color-primary-blue)' : 'transparent',
                  color: deliveryMode === 'pickup' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  transition: 'all 0.2s'
                }}
              >
                Gel-Al
              </button>
            </div>
            
            <div 
              className="address-details" 
              onClick={() => onOpenAddresses()}
              style={{ cursor: 'pointer' }}
            >
              <MapPin size={14} className="pin-icon" />
              <span className="address-text">{address}</span>
              <button className="address-edit-btn" aria-label="Adreslerim" onClick={(e) => { e.stopPropagation(); onOpenAddresses(); }}>
                <Edit2 size={12} />
              </button>
            </div>
          </div>

          {/* User Sign In / Profile dropdown */}
          {user ? (
            <div className="user-profile-dropdown-container">
              {/* Direct Admin Panel Button in Header Bar */}
              {user.isAdmin && (
                <button 
                  onClick={() => onAdminClick()}
                  className="admin-header-btn-white"
                  title="Yönetici Panelini Aç"
                >
                  <ShieldCheck size={14} />
                  <span>YÖNETİCİ PANELİ</span>
                </button>
              )}

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
                <div className="profile-dropdown-list" style={{ width: '320px', padding: '16px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', background: '#F4F5F7', position: 'absolute', right: 0, top: '45px', zIndex: 9999 }}>
                  
                  {/* Profil Kartı */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(235, 94, 40, 0.1)', color: 'var(--color-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                        {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'DN'}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{user.name}</h4>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{user.phone || '(543) 736 06 60'}</span>
                      </div>
                    </div>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }} onClick={() => alert('Bildirimleriniz güncel.')}>
                      <Bell size={20} />
                    </button>
                  </div>

                  {/* Telefon Onay Bannerı */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2563eb', color: 'white', padding: '10px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '12px', textAlign: 'left' }} onClick={() => alert('Telefon numaranız doğrulanmıştır!')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Smartphone size={16} />
                      <span>Telefon numaranı onayla, fırsatları kaçırma!</span>
                    </div>
                    <ChevronRight size={14} />
                  </div>

                  {/* 3'lü Buton Grubu */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    <button onClick={() => { onShowHistory(); setProfileMenuOpen(false); }} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 4px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <ShoppingBag size={18} color="var(--color-burgundy)" />
                      <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}>Siparişlerim</span>
                    </button>
                    <button onClick={() => { onOpenAddresses(); setProfileMenuOpen(false); }} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 4px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={18} color="var(--color-burgundy)" />
                      <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}>Adreslerim</span>
                    </button>
                    <button onClick={() => alert('Kayıtlı kart bulunmamaktadır.')} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 4px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <CreditCard size={18} color="var(--color-burgundy)" />
                      <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569' }}>Kartlarım</span>
                    </button>
                  </div>

                  {/* Ye-Kazan Kartı */}
                  <div onClick={() => { onOpenRewards(); setProfileMenuOpen(false); }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px 14px', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px', textAlign: 'left' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>Di Napoli Ye-Kazan</h4>
                      <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>Sipariş verdikçe ödül kazan. ({yeKazanSlices} Dilim)</p>
                    </div>
                    <ChevronRight size={14} color="#64748b" />
                  </div>

                  {/* Cüzdan Kartı */}
                  <div onClick={() => { onGoToReferral(); setProfileMenuOpen(false); }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px 14px', borderRadius: '12px', cursor: 'pointer', marginBottom: '12px', textAlign: 'left' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>Di Napoli Cüzdan</h4>
                      <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>Arkadaşını davet et, 75 TL cüzdan indirimi kazan.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#10b981' }}>{user.walletBalance || 0} TL</span>
                      <ChevronRight size={14} color="#64748b" />
                    </div>
                  </div>

                  {/* Fırsatlar Listesi */}
                  <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', textAlign: 'left' }}>
                    <div onClick={() => { onOpenRewards(); setProfileMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Gift size={16} color="var(--color-burgundy)" />
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Fırsatlar</span>
                      </div>
                      <ChevronRight size={14} color="#64748b" />
                    </div>
                    <div onClick={() => { alert('Sepette indirim kodunuzu uygulayabilirsiniz.'); setProfileMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Percent size={16} color="var(--color-burgundy)" />
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Promosyon Kodu</span>
                      </div>
                      <ChevronRight size={14} color="#64748b" />
                    </div>
                    <div onClick={() => { onGoToReferral(); setProfileMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Sparkles size={16} color="var(--color-burgundy)" />
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Arkadaşına Öner</span>
                      </div>
                      <ChevronRight size={14} color="#64748b" />
                    </div>
                  </div>

                  {/* Admin & Logout Linkleri */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    {user.isAdmin && (
                      <button 
                        onClick={() => { onAdminClick(); setProfileMenuOpen(false); }} 
                        style={{ flex: 1, backgroundColor: '#dc2626', color: '#ffffff', border: 'none', padding: '10px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(220, 38, 38, 0.35)' }}
                      >
                        ⚡ Yönetici Paneli
                      </button>
                    )}
                    <button onClick={() => { onLogout(); setProfileMenuOpen(false); }} style={{ flex: 1, backgroundColor: '#e2e8f0', color: '#475569', border: 'none', padding: '10px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                      Çıkış Yap
                    </button>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <button className="auth-btn-white desktop-auth-btn" onClick={onLoginClick}>
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
            <span className="cart-text-desktop">Sepetim</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Slide-out Sidebar Menu) */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <img src="/logo.png" alt="logo" className="mobile-drawer-logo" />
              <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Kapat">
                <XIcon size={24} />
              </button>
            </div>
            
            {/* User Info / Login in Mobile Drawer */}
            <div className="mobile-drawer-user-section">
              {user ? (
                <div className="mobile-user-card">
                  <div className="mobile-user-avatar-wrap">
                    <div className="avatar-fallback">{user.name ? user.name[0].toUpperCase() : 'DN'}</div>
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: 'var(--color-dark-blue)' }}>{user.name}</h4>
                      <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>{user.phone || 'Telefon doğrulanmadı'}</p>
                    </div>
                  </div>
                  <div className="mobile-user-wallet">
                    <span>Cüzdan Bakiyesi:</span>
                    <strong>{user.walletBalance || 0} TL</strong>
                  </div>
                </div>
              ) : (
                <button className="mobile-drawer-login-btn" onClick={() => { setMobileMenuOpen(false); onLoginClick(); }}>
                  <User size={18} />
                  <span>Giriş Yap / Üye Ol</span>
                </button>
              )}
            </div>

            {/* Delivery Toggle & Address in Mobile Drawer */}
            <div className="mobile-drawer-delivery-section">
              <h4 className="drawer-section-title">Teslimat Yöntemi</h4>
              <div className="mobile-delivery-toggle">
                <button 
                  className={deliveryMode === 'delivery' ? 'active' : ''}
                  onClick={() => { setDeliveryMode('delivery'); onOpenMap(); }}
                >
                  Adrese Teslim
                </button>
                <button 
                  className={deliveryMode === 'pickup' ? 'active' : ''}
                  onClick={() => { setDeliveryMode('pickup'); onOpenMap(); }}
                >
                  Gel-Al
                </button>
              </div>
              
              <div className="mobile-drawer-address" onClick={() => { setMobileMenuOpen(false); onOpenAddresses(); }}>
                <MapPin size={16} />
                <span className="drawer-address-text">{address || 'Adres Seçilmedi'}</span>
                <Edit2 size={12} />
              </div>
            </div>

            {/* Navigation Links in Mobile Drawer */}
            <div className="mobile-drawer-nav-links">
              <h4 className="drawer-section-title">Menü Hızlı Bağlantıları</h4>
              
              <a href="#menu" className="drawer-nav-item" onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onGoToMenu();
                setTimeout(() => {
                  const element = document.querySelector('.promo-widgets-section') || document.querySelector('.header-video-banner');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}>
                📢 Tüm Kampanyalar
              </a>

              <a href="#menu" className="drawer-nav-item" onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onGoToMenu();
                setTimeout(() => {
                  const element = document.getElementById('sec-pizzalar');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}>
                🍕 Tüm Pizzalar
              </a>

              <a href="#menu" className="drawer-nav-item" onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onGoToMenu();
                setTimeout(() => {
                  const element = document.getElementById('sec-fastfood');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}>
                🍟 Yan Ürünler
              </a>
              
              <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '8px 0' }} />

              <a href="#about" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onGoToAbout(); }}>
                ℹ️ Hakkımızda
              </a>
              
              <a href="#contact" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onGoToContact(); }}>
                📞 İletişim & Şubemiz
              </a>

              {user && (
                <>
                  <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '8px 0' }} />
                  
                  <a href="#orders" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onShowHistory(); }}>
                    🛍️ Geçmiş Siparişlerim
                  </a>
                  
                  <a href="#addresses" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onOpenAddresses(); }}>
                    📍 Kayıtlı Adreslerim
                  </a>
                  
                  <a href="#referral" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onGoToReferral(); }}>
                    👥 Davet Et & 75 TL Kazan
                  </a>
                </>
              )}
            </div>

            {/* Admin and Logout */}
            <div className="mobile-drawer-footer">
              {user && user.isAdmin && (
                <button className="mobile-drawer-admin-btn" onClick={() => { setMobileMenuOpen(false); onAdminClick(); }}>
                  ⚡ Yönetici Paneli
                </button>
              )}
              {user && (
                <button className="mobile-drawer-logout-btn" onClick={() => { setMobileMenuOpen(false); onLogout(); }}>
                  <LogOut size={16} />
                  <span>Çıkış Yap</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
