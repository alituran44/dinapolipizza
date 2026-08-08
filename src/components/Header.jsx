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

  const [deferredPwaPrompt, setDeferredPwaPrompt] = useState(null);
  const [pwaBarVisible, setPwaBarVisible] = useState(true);
  const [pwaGuideModalOpen, setPwaGuideModalOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPwaPrompt(e);
      setPwaBarVisible(true);
      try {
        e.prompt();
      } catch (err) {}
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleTriggerInstall = () => {
    if (deferredPwaPrompt) {
      try {
        deferredPwaPrompt.prompt();
        deferredPwaPrompt.userChoice.then((choiceResult) => {
          if (choiceResult && choiceResult.outcome === 'accepted') {
            setPwaBarVisible(false);
            setPwaGuideModalOpen(false);
          }
          setDeferredPwaPrompt(null);
        }).catch(() => {
          setPwaGuideModalOpen(true);
        });
      } catch (err) {
        setPwaGuideModalOpen(true);
      }
    } else {
      setPwaGuideModalOpen(true);
    }
  };

  const handleSelectMode = (mode) => {
    setDeliveryMode(mode);
    setDropdownOpen(false);
    if (mode === 'pickup') {
      onOpenMap();
    }
  };

  return (
    <>
      {pwaBarVisible && (
        <div style={{
          background: 'linear-gradient(90deg, #D9251D 0%, #B91C1C 100%)',
          padding: '12px 20px',
          color: '#FFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #FFB70D',
          boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
          position: 'relative',
          zIndex: 99999,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" style={{ height: '36px', width: '36px', objectFit: 'contain', borderRadius: '8px' }} alt="Di Napoli" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-title, sans-serif)', color: '#FFFFFF' }}>
                📱 Di Napoli Mobil Uygulamasını İndir
              </div>
              <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.9)' }}>
                Ana ekrana ekle, tek tıkla hızlı sipariş ver!
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={handleTriggerInstall}
              style={{
                background: '#FFB70D',
                color: '#1A1715',
                border: 'none',
                padding: '9px 18px',
                borderRadius: '20px',
                fontWeight: '800',
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Smartphone size={16} /> UYGULAMAYI İNDİR
            </button>
            <button 
              onClick={() => setPwaBarVisible(false)}
              style={{
                background: 'rgba(0,0,0,0.4)',
                color: '#FFF',
                border: '1px solid rgba(255,255,255,0.2)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                fontWeight: '800',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {pwaGuideModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 999999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#1A1715',
            border: '2px solid #FFB70D',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '420px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.95)',
            margin: 'auto'
          }}>
            <button 
              onClick={() => setPwaGuideModalOpen(false)}
              style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.15)', color: '#FFF', border: 'none', width: '34px', height: '34px', borderRadius: '50%', fontWeight: '800', cursor: 'pointer', fontSize: '1rem' }}
            >
              ✕
            </button>
            
            <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>📲</div>
            <div style={{ fontFamily: 'var(--font-title, sans-serif)', fontSize: '1.3rem', fontWeight: '800', color: '#FFB70D', marginBottom: '8px' }}>
              Uygulamayı Telefonunuza Yükleyin
            </div>
            <div style={{ fontSize: '0.8rem', color: '#E2D9CF', marginBottom: '16px' }}>
              Telefonunuza indirmek için aşağıdaki adımları uygulayın:
            </div>

            <div style={{ textAlign: 'left', background: '#12100F', padding: '16px', borderRadius: '16px', border: '1px solid #332D29', marginBottom: '20px' }}>
              <div style={{ color: '#FFB70D', fontWeight: '800', fontSize: '0.9rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🤖</span> Android & Chrome Kullanıcıları:
              </div>
              <div style={{ fontSize: '0.82rem', color: '#D1C7BD', lineHeight: '1.5', marginBottom: '14px' }}>
                1. Aşağıdaki <strong>"UYGULAMAYI ŞİMDİ YÜKLE"</strong> butonuna basın.<br/>
                2. Ekranınızda beliren Chrome sağ üst <strong>(⋮) menüsünden "Uygulamayı Yükle"</strong> seçeneğine dokunun.
              </div>

              <div style={{ color: '#FFB70D', fontWeight: '800', fontSize: '0.9rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid #262220', paddingTop: '10px' }}>
                <span>📱</span> iPhone (Safari) Kullanıcıları:
              </div>
              <div style={{ fontSize: '0.82rem', color: '#D1C7BD', lineHeight: '1.5' }}>
                1. Safari alt çubuğundaki <strong>Paylaş ⎋</strong> simgesine dokunun.<br/>
                2. Açılan menüden <strong>"Ana Ekrana Ekle ➕"</strong> seçeneğini seçin.
              </div>
            </div>

            <button 
              onClick={handleTriggerInstall}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #FFB70D 0%, #F59E0B 100%)',
                color: '#1A1715',
                border: 'none',
                padding: '14px',
                borderRadius: '14px',
                fontFamily: 'var(--font-title, sans-serif)',
                fontWeight: '800',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(255, 183, 13, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}
            >
              <Smartphone size={18} /> ⚡ UYGULAMAYI ŞİMDİ YÜKLE
            </button>

            <button 
              onClick={() => setPwaGuideModalOpen(false)}
              style={{
                width: '100%',
                background: 'transparent',
                color: '#B3ACA7',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '10px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Anladım / Kapat
            </button>
          </div>
        </div>
      )}

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
  </>
  );
}
