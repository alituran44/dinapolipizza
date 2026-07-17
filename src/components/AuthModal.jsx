import React, { useState } from 'react';
import { X, Mail, Lock, Phone, User, Check, MapPin, Truck, ChevronRight, ChevronLeft, Search, Plus } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  // Registration and Address wizard step state
  // 1: Register Form, 2: Delivery Method, 3: Address List, 4: Branch Map Select, 5: Add Address Details
  const [wizardStep, setWizardStep] = useState(1); 
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    consent1: false,
    consent2: false
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Dynamic user address management
  const [addresses, setAddresses] = useState([
    { id: '1', title: 'Ev', text: 'İsmetpaşa, Atikhisar Cd., Çanakkale / Merkez' }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState('1');

  // New address form state
  const [newAddress, setNewAddress] = useState({
    street: 'Atikhisar Cd.',
    binaNo: '',
    katNo: '',
    daireNo: '',
    title: '',
    description: ''
  });

  // Branch map selection state
  const [selectedBranch, setSelectedBranch] = useState('kordon'); // 'kordon' or 'kepez'

  const [showGoogleSimulation, setShowGoogleSimulation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
    setErrorMessage('');
  };

  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    setErrorMessage('');
  };

  const handleAddressInputChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
      return;
    }
    const isAdmin = loginData.email.toLowerCase() === 'admin@dinapolipizza.com';
    const loggedUser = {
      name: isAdmin ? 'Yönetici' : loginData.email.split('@')[0].toUpperCase(),
      email: loginData.email,
      phone: isAdmin ? '0286 217 00 17' : '0542 388 30 10',
      avatar: null,
      isAdmin: isAdmin
    };
    localStorage.setItem('dinapoli_user', JSON.stringify(loggedUser));
    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setErrorMessage('Lütfen ad, soyad ve telefon alanlarını doldurun.');
      return;
    }
    if (!formData.consent1 || !formData.consent2) {
      setErrorMessage('Lütfen üyelik koşullarını ve rıza metnini onaylayın.');
      return;
    }
    // Proceed to Step 2: Delivery Selection
    setWizardStep(2);
  };

  const handleSelectDeliveryMode = (mode) => {
    if (mode === 'delivery') {
      setWizardStep(3); // Go to Address List
    } else {
      setWizardStep(4); // Go to Branch Map Select
    }
  };

  const handleAddNewAddressClick = () => {
    setWizardStep(5); // Go to Address details entry form
  };

  const handleSaveAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.binaNo || !newAddress.daireNo) return;

    const fullText = `İsmetpaşa, ${newAddress.street} Bina No: ${newAddress.binaNo}, Kat: ${newAddress.katNo}, Daire: ${newAddress.daireNo}, Çanakkale`;
    const addedAddr = {
      id: `addr-${Date.now()}`,
      title: newAddress.title || 'Yeni Adres',
      text: fullText
    };

    const updatedAddresses = [...addresses, addedAddr];
    setAddresses(updatedAddresses);
    setSelectedAddressId(addedAddr.id);
    
    // Go back to address list
    setWizardStep(3);
  };

  const handleFinalizeFlow = () => {
    const loggedUser = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email || `${formData.firstName.toLowerCase()}@gmail.com`,
      phone: formData.phone,
      avatar: null
    };
    localStorage.setItem('dinapoli_user', JSON.stringify(loggedUser));
    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleGoogleLogin = () => {
    setShowGoogleSimulation(true);
  };

  const handleSelectGoogleAccount = (accountName, accountEmail) => {
    const isAdmin = accountEmail === 'chef.luigi@dinapolipizza.com';
    const googleUser = {
      name: accountName,
      email: accountEmail,
      avatar: '/logo.png',
      isGoogle: true,
      isAdmin: isAdmin
    };
    localStorage.setItem('dinapoli_user', JSON.stringify(googleUser));
    onLoginSuccess(googleUser);
    setShowGoogleSimulation(false);
    onClose();
  };

  return (
    <div className="cart-drawer-overlay" style={{ zIndex: 2500 }} onClick={onClose}>
      <div className="auth-modal-card wizard-flow-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {showGoogleSimulation ? (
          /* Google Sign In view */
          <div className="google-simulation-container">
            <div className="google-sim-header">
              <svg className="google-svg-icon-large" viewBox="0 0 24 24" style={{ height: '32px', marginBottom: '8px' }}>
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
        ) : (
          /* Normal Auth Tab & Wizard Flow */
          <>
            {activeTab === 'login' ? (
              /* LOGIN TAB */
              <>
                <div className="auth-tabs">
                  <button className="auth-tab-btn active" onClick={() => setActiveTab('login')}>Giriş Yap</button>
                  <button className="auth-tab-btn" onClick={() => { setActiveTab('register'); setWizardStep(1); }}>Kayıt Ol</button>
                </div>

                <form onSubmit={handleLoginSubmit} className="auth-form">
                  {errorMessage && <p className="auth-error-msg">{errorMessage}</p>}

                  <div className="auth-input-group">
                    <Mail className="input-icon" size={16} />
                    <input 
                      type="email" 
                      name="email"
                      placeholder="E-posta Adresi"
                      value={loginData.email}
                      onChange={handleLoginInputChange}
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <Lock className="input-icon" size={16} />
                    <input 
                      type="password" 
                      name="password"
                      placeholder="Şifre"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      required
                    />
                  </div>

                  <button type="submit" className="auth-submit-btn">Giriş Yap</button>

                  <div className="auth-divider">
                    <span>veya</span>
                  </div>

                  <button type="button" className="google-auth-btn" onClick={handleGoogleLogin}>
                    <svg className="google-svg-icon" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Google ile Giriş Yap</span>
                  </button>
                </form>
              </>
            ) : (
              /* REGISTER & ADDRESS TUNNEL FLOW */
              <div className="register-wizard-container">
                
                {/* STEP 1: Signup Form (Matches Screenshot 1) */}
                {wizardStep === 1 && (
                  <>
                    <div className="wizard-form-header">
                      <h3>Üye Ol</h3>
                    </div>
                    
                    <form onSubmit={handleRegisterSubmit} className="auth-form wizard-form">
                      {errorMessage && <p className="auth-error-msg">{errorMessage}</p>}

                      <div className="form-row">
                        <div className="input-wrapper-labeled">
                          <label>Telefon Numarası</label>
                          <div className="auth-input-group">
                            <Phone className="input-icon" size={16} />
                            <input 
                              type="tel" 
                              name="phone"
                              placeholder="0543736066"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row grid-2">
                        <div className="input-wrapper-labeled">
                          <label>Ad</label>
                          <div className="auth-input-group">
                            <input 
                              type="text" 
                              name="firstName"
                              placeholder="Ali"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="input-wrapper-labeled">
                          <label>Soyad</label>
                          <div className="auth-input-group">
                            <input 
                              type="text" 
                              name="lastName"
                              placeholder="Turan"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="input-wrapper-labeled">
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>E-Posta Adresi</label>
                            <span className="optional-lbl">*İsteğe Bağlı</span>
                          </div>
                          <div className="auth-input-group">
                            <Mail className="input-icon" size={16} />
                            <input 
                              type="email" 
                              name="email"
                              placeholder="alituran44@gmail.com"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Consents text block matching screenshot 1 */}
                      <div className="consent-text-box">
                        <p>Kişisel verilerinize dair aydınlatma metnine <span className="blue-link">buradan</span> ulaşabilirsiniz.</p>
                        <p>Üye Ol butonuna tıklayarak <span className="blue-link">Üyelik Koşullarını</span> kabul etmektesiniz.</p>
                      </div>

                      <div className="consent-checkbox-row">
                        <label className="checkbox-container">
                          <input 
                            type="checkbox" 
                            name="consent1" 
                            checked={formData.consent1}
                            onChange={handleInputChange}
                          />
                          <span className="checkmark"></span>
                          <span className="checkbox-text">
                            <span className="blue-link">Açık Rıza Metni</span> kapsamında kişisel verilerimin işlenmesine ve paylaşılmasına, fırsatlardan haberdar olmak için <span className="blue-link">İletişim İznine</span> onay veriyorum.
                          </span>
                        </label>
                      </div>

                      <div className="consent-checkbox-row">
                        <label className="checkbox-container">
                          <input 
                            type="checkbox" 
                            name="consent2" 
                            checked={formData.consent2}
                            onChange={handleInputChange}
                          />
                          <span className="checkmark"></span>
                          <span className="checkbox-text">
                            Her 10 dilimde 1 ödül kazandıran ayrıcalıklı <span className="blue-link">Di Napoli Ye-Kazan Sadakat Programı Üyelik Koşullarını</span> okudum ve onaylıyorum, fırsatlardan haberdar olmak için <span className="blue-link">İletişim İznine</span> onay veriyorum.
                          </span>
                        </label>
                      </div>

                      <button type="submit" className="auth-submit-btn register-green-btn">Üye Ol</button>

                      <div className="auth-footer-link-box">
                        <button type="button" className="switch-to-login-btn" onClick={() => setActiveTab('login')}>
                          Hesabınız Var Mı? <span className="blue-underline">Üye Girişi</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {/* STEP 2: Delivery Selection (Matches Screenshot 2) */}
                {wizardStep === 2 && (
                  <div className="delivery-step-wrapper">
                    <div className="wizard-delivery-header">
                      <h2>Merhaba {formData.firstName}!</h2>
                      <p>Siparişini nasıl almak istersin?</p>
                    </div>

                    <div className="delivery-cards-stack">
                      <div className="delivery-selection-card mode-delivery" onClick={() => handleSelectDeliveryMode('delivery')}>
                        <div className="delivery-card-content">
                          <div className="icon-badge bg-green-light">
                            <Truck size={32} color="#10b981" />
                          </div>
                          <div className="text-info">
                            <h3>Adrese Teslim</h3>
                            <p>Siparişini adresine getirelim.</p>
                          </div>
                        </div>
                        <ChevronRight className="arrow-icon" size={24} />
                      </div>

                      <div className="delivery-selection-card mode-pickup" onClick={() => handleSelectDeliveryMode('pickup')}>
                        <div className="delivery-card-content">
                          <div className="icon-badge bg-blue-light">
                            <MapPin size={32} color="#3b82f6" />
                          </div>
                          <div className="text-info">
                            <h3>Beklemeden Gel Al</h3>
                            <p>Sıra beklemeden şubeden teslim al.</p>
                          </div>
                        </div>
                        <ChevronRight className="arrow-icon" size={24} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Address Selection (Matches Screenshot 3) */}
                {wizardStep === 3 && (
                  <div className="address-step-wrapper">
                    <div className="wizard-step-title-row">
                      <button className="back-step-btn" onClick={() => setWizardStep(2)}>
                        <ChevronLeft size={20} />
                      </button>
                      <h3>Adreslerim</h3>
                    </div>

                    <div className="address-selection-list">
                      <button className="btn-add-new-address" onClick={handleAddNewAddressClick}>
                        <Plus size={16} />
                        <span>Yeni Adres Ekle</span>
                      </button>

                      {addresses.map(addr => (
                        <div 
                          key={addr.id}
                          className={`address-option-row ${selectedAddressId === addr.id ? 'active' : ''}`}
                          onClick={() => setSelectedAddressId(addr.id)}
                        >
                          <label className="radio-container">
                            <input 
                              type="radio" 
                              name="selectedAddress" 
                              checked={selectedAddressId === addr.id}
                              onChange={() => setSelectedAddressId(addr.id)}
                            />
                            <span className="radiomark"></span>
                            <div className="addr-txt-block">
                              <span className="addr-title">{addr.title}</span>
                              <span className="addr-body">{addr.text}</span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="auth-submit-btn finalize-addr-btn" 
                      onClick={handleFinalizeFlow}
                      disabled={!selectedAddressId}
                    >
                      Seçili Adres ile Devam Et
                    </button>
                  </div>
                )}

                {/* STEP 4: Branch Map / Pickup Select (Matches Screenshot 4) */}
                {wizardStep === 4 && (
                  <div className="branch-step-wrapper">
                    <div className="wizard-step-title-row">
                      <button className="back-step-btn" onClick={() => setWizardStep(2)}>
                        <ChevronLeft size={20} />
                      </button>
                      <h3>Teslimat Yöntemini Belirle</h3>
                    </div>

                    <div className="branch-split-view">
                      {/* Simulated Interactive Map */}
                      <div className="simulated-map-container">
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.8856230491024!2d26.4026362!3d40.1503649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1a13e2f50db81%3A0xe541c4aa9df04fa6!2sSaat%20Kulesi!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                          width="100%" 
                          height="200" 
                          style={{ border: 0, borderRadius: '8px' }} 
                          allowFullScreen="" 
                          loading="lazy"
                        ></iframe>
                        <div className="map-search-bar-sim">
                          <Search size={14} className="search-icon" />
                          <input type="text" placeholder="Örn. Kordon şubesi..." disabled />
                        </div>
                      </div>

                      {/* Branch options cards list */}
                      <div className="branch-cards-grid">
                        <div 
                          className={`branch-option-card ${selectedBranch === 'kordon' ? 'active' : ''}`}
                          onClick={() => setSelectedBranch('kordon')}
                        >
                          <div className="branch-card-meta">
                            <h4>ÇANAKKALE KORDON</h4>
                            <span className="dist-lbl">2.1 KM</span>
                          </div>
                          <p>Cevatpaşa Mahallesi İnönü Caddesi No:64/1 Merkez ÇANAKKALE</p>
                          <div className="branch-status-row">
                            <span className="status-badge closed">KAPALI</span>
                            <span className="hours-lbl">11:00 - 01:00</span>
                          </div>
                        </div>

                        <div 
                          className={`branch-option-card ${selectedBranch === 'kepez' ? 'active' : ''}`}
                          onClick={() => setSelectedBranch('kepez')}
                        >
                          <div className="branch-card-meta">
                            <h4>ÇANAKKALE KEPEZ</h4>
                            <span className="dist-lbl">5.4 KM</span>
                          </div>
                          <p>Kepez Beldesi Boğazkent Mah. No:41/A Merkez ÇANAKKALE</p>
                          <div className="branch-status-row">
                            <span className="status-badge open">AÇIK</span>
                            <span className="hours-lbl">11:00 - 01:00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="auth-submit-btn finalize-branch-btn" onClick={handleFinalizeFlow}>
                      Seçili şube ile devam et
                    </button>
                  </div>
                )}

                {/* STEP 5: Add Address Details Form (Matches Screenshot 5) */}
                {wizardStep === 5 && (
                  <div className="address-details-wrapper">
                    <div className="wizard-step-title-row">
                      <button className="back-step-btn" onClick={() => setWizardStep(3)}>
                        <ChevronLeft size={20} />
                      </button>
                      <h3>Adres Detayları Ekle</h3>
                    </div>

                    {/* Simulated Mini Map Preview */}
                    <div className="address-mini-map-preview">
                      <div className="preview-label">İsmetpaşa, Merkez, Çanakkale</div>
                      <button className="btn-change-sim-map">Değiştir</button>
                    </div>

                    <form onSubmit={handleSaveAddressSubmit} className="auth-form details-entry-form">
                      <div className="form-row">
                        <div className="input-wrapper-labeled">
                          <label>*Cadde/Sokak</label>
                          <div className="auth-input-group">
                            <input 
                              type="text" 
                              name="street"
                              value={newAddress.street}
                              onChange={handleAddressInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row grid-3">
                        <div className="input-wrapper-labeled">
                          <label>*Bina No</label>
                          <div className="auth-input-group">
                            <input 
                              type="text" 
                              name="binaNo"
                              placeholder="1"
                              value={newAddress.binaNo}
                              onChange={handleAddressInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="input-wrapper-labeled">
                          <label>*Kat No</label>
                          <div className="auth-input-group">
                            <input 
                              type="text" 
                              name="katNo"
                              placeholder="7"
                              value={newAddress.katNo}
                              onChange={handleAddressInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="input-wrapper-labeled">
                          <label>*Daire No</label>
                          <div className="auth-input-group">
                            <input 
                              type="text" 
                              name="daireNo"
                              placeholder="29"
                              value={newAddress.daireNo}
                              onChange={handleAddressInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="input-wrapper-labeled">
                          <label>*Adres Başlığı</label>
                          <div className="auth-input-group">
                            <input 
                              type="text" 
                              name="title"
                              placeholder="Örn: Ev, İş"
                              value={newAddress.title}
                              onChange={handleAddressInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="input-wrapper-labeled">
                          <label>Adres Tarifi (İsteğe bağlı)</label>
                          <div className="auth-input-group">
                            <input 
                              type="text" 
                              name="description"
                              placeholder="Örn: Sahile inen yokuşun olduğu sokak"
                              value={newAddress.description}
                              onChange={handleAddressInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Informative yellow banner warning */}
                      <div className="address-info-warning-box">
                        <span className="warning-icon">i</span>
                        <p>İl, ilçe, mahalle ve sokak bilgisini değiştirirsen sepetindeki ürünler silinebilir ya da fiyat değişikliği olabilir.</p>
                      </div>

                      <button type="submit" className="auth-submit-btn save-addr-btn">Adresi Kaydet</button>
                    </form>
                  </div>
                )}

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
