import React, { useState } from 'react';
import { 
  ShoppingBag, User, Search, MapPin, ChevronDown, Edit2, ShieldCheck, Map,
  Bell, CreditCard, Smartphone, Sparkles, Percent, ChevronRight, Gift
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
          {/* Search Icon */}
          <button className="header-search-btn" aria-label="Arama Yap">
            <Search size={20} color="white" />
          </button>

          {/* Location / Address Picker Dropdown */}
          {/* Location / Address Picker Directly Triggers Map */}
          <div className="address-picker-widget" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            <div className="user-profile-dropdown-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
              
              {/* Direct Admin Panel Button in Header Bar */}
              {user.isAdmin && (
                <button 
                  onClick={() => onAdminClick()}
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.45)',
                    transition: 'all 0.2s ease'
                  }}
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
