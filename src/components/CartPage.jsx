import React, { useState } from 'react';
import { 
  ArrowLeft, Trash2, Plus, Minus, Ticket, Check, Info, ShieldCheck, MapPin, Truck
} from 'lucide-react';

export default function CartPage({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  onClose,
  deliveryMode, // 'delivery' or 'pickup'
  selectedAddress,
  user,
  onUpdateUserWallet,
  userAddresses = [],
  onSelectAddress,
  onOpenAddresses
}) {
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0); // in TL
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [useWallet, setUseWallet] = useState(false);

  // Calculate items total
  const itemsSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Delivery fee
  const deliveryFee = deliveryMode === 'delivery' ? 15 : 0;

  // Coupon apply
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    
    if (code === 'DINAPOLI10') {
      const discount = Math.round(itemsSubtotal * 0.1);
      setCouponDiscount(discount);
      setAppliedCoupon(code);
      setCouponCode('');
    } else if (code === 'LUIGI20') {
      const discount = Math.min(itemsSubtotal, 20);
      setCouponDiscount(discount);
      setAppliedCoupon(code);
      setCouponCode('');
    } else {
      setCouponError('Geçersiz veya süresi dolmuş kupon kodu!');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon('');
  };

  const userWalletBalance = user ? (user.walletBalance || 0) : 0;
  const walletDiscountApplied = useWallet ? Math.min(itemsSubtotal - couponDiscount, userWalletBalance) : 0;
  const totalAmount = Math.max(0, itemsSubtotal - couponDiscount - walletDiscountApplied + deliveryFee);

  const handleCheckoutClick = () => {
    if (useWallet && user) {
      const remainingBalance = userWalletBalance - walletDiscountApplied;
      onUpdateUserWallet(user.id || 'u1', remainingBalance);
    }
    onCheckout();
  };

  return (
    <div className="cart-page-wrapper">
      {/* Header */}
      <header className="site-header-blue">
        <div className="container header-inner-blue">
          <div className="header-left-group">
            <button className="nav-link-white" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={20} />
              <span>Menüye Dön</span>
            </button>
          </div>
          <div className="header-right-group">
            <img src="/logo.png" alt="logo" style={{ height: '48px', objectFit: 'contain' }} />
          </div>
        </div>
      </header>

      <div className="container cart-page-body">
        <div className="cart-grid">
          {/* Left Column: Items List */}
          <div className="cart-left-col">
            <div className="cart-card-panel">
              <div className="panel-header">
                <h2>Sepetim ({cart.reduce((sum, i) => sum + i.quantity, 0)} Ürün)</h2>
                {cart.length > 0 && (
                  <button className="btn-text-danger" onClick={() => cart.forEach(() => onRemoveItem(0))}>
                    Tümünü Temizle
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="empty-cart-state">
                  <div className="empty-icon-circle">🍕</div>
                  <h3>Sepetiniz Henüz Boş</h3>
                  <p>Menümüzdeki eşsiz Napoli lezzetlerini keşfetmeye hazır mısınız?</p>
                  <button className="btn-primary-blue-filled" onClick={onClose}>
                    Alışverişe Başla
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item, idx) => {
                    const isCustomized = item.customInfo && item.customInfo.selectedPizzas;
                    return (
                      <div key={item.id} className="cart-item-row">
                        {/* Image */}
                        <div className="cart-item-thumb">
                          <img src={item.image} alt={item.name} />
                        </div>

                        {/* Details */}
                        <div className="cart-item-details">
                          <h4 className="item-title">{item.name}</h4>
                          
                          {/* Customization sub-details */}
                          {isCustomized ? (
                            <div className="item-customizations-desc">
                              {item.customInfo.selectedPizzas.map((pizza, idx) => (
                                <div key={idx} className="sub-pizza-desc">
                                  <span className="pizza-order-label">
                                    {item.customInfo.isCampaignWizard ? `${idx + 1}. Pizza: ` : ''}
                                  </span>
                                  <strong>{pizza.name}</strong>
                                  <span> ({pizza.selectedDough.name}, {pizza.selectedCrust.name})</span>
                                  {pizza.extras.length > 0 && (
                                    <span className="pizza-extras">
                                      {' '}+ {pizza.extras.map(e => e.name).join(', ')}
                                    </span>
                                  )}
                                  {pizza.removedIngredients.length > 0 && (
                                    <span className="pizza-removed">
                                      {' '}- {pizza.removedIngredients.join(', ')} çıkarıldı
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="item-description">{item.description}</p>
                          )}

                          <div className="cart-item-price-row">
                            <span className="item-unit-price">{item.price} TL</span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="cart-item-controls">
                          <div className="quantity-selector-custom">
                            <button 
                              onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="quantity-val">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(idx, item.quantity + 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                          <button className="remove-btn" onClick={() => onRemoveItem(idx)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Delivery address panel */}
            {cart.length > 0 && (
              <div className="cart-card-panel address-summary-card">
                <div className="panel-icon-title">
                  {deliveryMode === 'delivery' ? <Truck size={20} className="blue-icon" /> : <MapPin size={20} className="blue-icon" />}
                  <h3>Teslimat Yöntemi: {deliveryMode === 'delivery' ? 'Adrese Teslim' : 'Beklemeden Gel-Al'}</h3>
                </div>
                <div className="address-details-box" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {deliveryMode === 'delivery' ? (
                    <>
                      <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                        <strong>Aktif Adres:</strong> {selectedAddress || 'Adres seçilmedi.'}
                      </p>
                      
                      {userAddresses.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Farklı Bir Kayıtlı Adres Seçin:</label>
                          <select 
                            value={selectedAddress}
                            onChange={(e) => onSelectAddress(e.target.value)}
                            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px', color: '#1e293b', outline: 'none' }}
                          >
                            {userAddresses.map(addr => (
                              <option key={addr.id} value={addr.text}>{addr.title} - {addr.text.substring(0, 45)}...</option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      <button 
                        onClick={onOpenAddresses}
                        style={{ alignSelf: 'flex-start', border: 'none', background: 'none', color: 'var(--color-burgundy)', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}
                      >
                        <Plus size={14} />
                        <span>Yeni Adres Ekle / Düzenle</span>
                      </button>
                    </>
                  ) : (
                    <p style={{ margin: 0 }}><strong>Saat Kulesi Karşısı, Merkez/Çanakkale</strong> şubemizden beklemeden teslim alacaksınız.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          {cart.length > 0 && (
            <div className="cart-right-col">
              {/* Order pricing summary panel */}
              <div className="cart-card-panel summary-pricing-card">
                <h3>Sipariş Özeti</h3>
                
                <div className="summary-row">
                  <span>Ara Toplam</span>
                  <span>{itemsSubtotal} TL</span>
                </div>
                
                {deliveryMode === 'delivery' && (
                  <div className="summary-row">
                    <span>Teslimat Ücreti</span>
                    <span>{deliveryFee} TL</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="summary-row discount-row">
                    <span className="discount-label">İndirim ({appliedCoupon})</span>
                    <span>-{couponDiscount} TL</span>
                  </div>
                )}

                {walletDiscountApplied > 0 && (
                  <div className="summary-row discount-row" style={{ color: '#10b981' }}>
                    <span className="discount-label" style={{ color: '#10b981' }}>Cüzdan İndirimi</span>
                    <span style={{ color: '#10b981' }}>-{walletDiscountApplied} TL</span>
                  </div>
                )}

                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span>Toplam</span>
                  <span>{totalAmount} TL</span>
                </div>

                {/* Wallet Balance Integration Checkbox */}
                {userWalletBalance > 0 && (
                  <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', margin: 0, fontWeight: 'bold' }}>
                      <input 
                        type="checkbox" 
                        checked={useWallet} 
                        onChange={(e) => setUseWallet(e.target.checked)} 
                        style={{ cursor: 'pointer' }}
                      />
                      <span>Cüzdan Bakiyesini Kullan</span>
                    </label>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#10b981' }}>{userWalletBalance} TL</span>
                  </div>
                )}

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <div className="coupon-input-group">
                    <input 
                      type="text" 
                      placeholder="KUPON KODU GİRİN" 
                      value={couponCode} 
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    <button type="submit" disabled={!!appliedCoupon || !couponCode.trim()}>
                      Uygula
                    </button>
                  </div>
                  {couponError && <p className="coupon-error">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="applied-coupon-badge">
                      <ShieldCheck size={16} />
                      <span>{appliedCoupon} Aktif!</span>
                      <button type="button" className="remove-coupon-btn" onClick={handleRemoveCoupon}>
                        Kaldır
                      </button>
                    </div>
                  )}
                </form>

                <div className="info-coupon-tip">
                  <Info size={14} />
                  <span>İpucu: İlk siparişinize özel <strong>DINAPOLI10</strong> kupon kodunu kullanabilirsiniz!</span>
                </div>

                <button className="checkout-btn-full" onClick={handleCheckoutClick}>
                  <span>Siparişi Tamamla</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
