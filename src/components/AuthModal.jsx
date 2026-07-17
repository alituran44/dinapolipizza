import React, { useState } from 'react';
import { X, Mail, Lock, Phone, User, CheckCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [showGoogleSimulation, setShowGoogleSimulation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMessage('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'login') {
      if (!formData.email || !formData.password) {
        setErrorMessage('Lütfen tüm alanları doldurun.');
        return;
      }
      // Simple local login logic
      const loggedUser = {
        name: formData.email.split('@')[0].toUpperCase(),
        email: formData.email,
        avatar: null
      };
      localStorage.setItem('dinapoli_user', JSON.stringify(loggedUser));
      onLoginSuccess(loggedUser);
      onClose();
    } else {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setErrorMessage('Lütfen tüm alanları doldurun.');
        return;
      }
      // Simple local registration
      const registeredUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: null
      };
      localStorage.setItem('dinapoli_user', JSON.stringify(registeredUser));
      onLoginSuccess(registeredUser);
      onClose();
    }
  };

  const handleGoogleLogin = () => {
    setShowGoogleSimulation(true);
  };

  const handleSelectGoogleAccount = (accountName, accountEmail) => {
    const googleUser = {
      name: accountName,
      email: accountEmail,
      avatar: '/logo.png', // custom profile sign
      isGoogle: true
    };
    localStorage.setItem('dinapoli_user', JSON.stringify(googleUser));
    onLoginSuccess(googleUser);
    setShowGoogleSimulation(false);
    onClose();
  };

  return (
    <div className="cart-drawer-overlay" style={{ zIndex: 2500 }} onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {!showGoogleSimulation ? (
          <>
            <div className="auth-tabs">
              <button 
                className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
              >
                Giriş Yap
              </button>
              <button 
                className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => { setActiveTab('register'); setErrorMessage(''); }}
              >
                Kayıt Ol
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="auth-form">
              {errorMessage && <p className="auth-error-msg">{errorMessage}</p>}

              {activeTab === 'register' && (
                <div className="auth-input-group">
                  <User className="input-icon" size={16} />
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Ad Soyad"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="auth-input-group">
                <Mail className="input-icon" size={16} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="E-posta Adresi"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {activeTab === 'register' && (
                <div className="auth-input-group">
                  <Phone className="input-icon" size={16} />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Telefon Numarası"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="auth-input-group">
                <Lock className="input-icon" size={16} />
                <input 
                  type="password" 
                  name="password"
                  placeholder="Şifre"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                {activeTab === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
              </button>

              <div className="auth-divider">
                <span>veya</span>
              </div>

              {/* Google login button */}
              <button type="button" className="google-auth-btn" onClick={handleGoogleLogin}>
                <svg className="google-svg-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google ile Giriş Yap</span>
              </button>
            </form>
          </>
        ) : (
          /* Google pop-up simulation view */
          <div className="google-simulation-container">
            <div className="google-sim-header">
              <svg className="google-svg-icon-large" viewBox="0 0 24 24" style={{ height: '32px' }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <h4>Google Hesabı ile Oturum Açın</h4>
              <p>dinapolipizza.com.tr adresine devam et</p>
            </div>

            <div className="google-accounts-list">
              <div 
                className="google-account-row" 
                onClick={() => handleSelectGoogleAccount('Hp', 'Hp@gmail.com')}
              >
                <div className="google-avatar-sim">H</div>
                <div className="google-account-info">
                  <span className="account-name">Hp</span>
                  <span className="account-email">Hp@gmail.com</span>
                </div>
              </div>
              
              <div 
                className="google-account-row"
                onClick={() => handleSelectGoogleAccount('Usta AI Chef', 'chef.luigi@dinapolipizza.com')}
              >
                <div className="google-avatar-sim text-red">L</div>
                <div className="google-account-info">
                  <span className="account-name">Şef Luigi (Di Napoli)</span>
                  <span className="account-email">chef.luigi@dinapolipizza.com</span>
                </div>
              </div>
            </div>

            <button className="google-sim-cancel-btn" onClick={() => setShowGoogleSimulation(false)}>
              İptal Et
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
