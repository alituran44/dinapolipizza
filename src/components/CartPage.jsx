import React, { useState } from 'react';
import { 
  ArrowLeft, Trash2, Plus, Minus, Ticket, Check, Info, ShieldCheck, MapPin, Truck
} from 'lucide-react';

export default function CartPage({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onAddToCart,
  onCheckout, 
  onClose,
  deliveryMode, // 'delivery' or 'pickup'
  selectedAddress,
  user,
  onUpdateUserWallet,
  userAddresses = [],
  onSelectAddress,
  onOpenAddresses,
  whatsAppNumber = '',
  whatsAppTemplate = ''
}) {
  const recommendedItems = [
    {
      id: 'hamburgers-mini',
      name: 'Mini Hamburger',
      price: 180,
      image: '/hamburger_temiz_1784311377803.png',
      description: 'Nefis di Napoli köftesi ve taze hamburger ekmeği.',
      category: 'fastfood'
    },
    {
      id: 'tatlilar-sufle',
      name: 'Çikolatalı Sufle',
      price: 130,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80',
      description: 'İçi akışkan sıcak çikolatalı nefis İtalyan suflesi.',
      category: 'tatlilar'
    },
    {
      id: 'yanlezzetler-patates',
      name: 'Baharatlı Patates',
      price: 100,
      image: '/patates_temiz_1784311399634.png',
      description: 'Özel baharatlı çıtır İtalyan elma dilim patates.',
      category: 'yanlezzetler'
    },
    {
      id: 'yanlezzetler-sogan',
      name: 'Soğan Kroket (8\'li)',
      price: 80,
      image: '/sogan_kroket_temiz_1784311410670.png',
      description: 'Altın sarısı çıtır kaplamalı soğan halkaları.',
      category: 'yanlezzetler'
    }
  ];

  const handleAddRecommended = (item) => {
    onAddToCart({
      ...item,
      quantity: 1
    });
  };

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0); // in TL
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [useWallet, setUseWallet] = useState(false);

  // Calculate items total
  const itemsSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Delivery fee
  const deliveryFee = 0;

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

  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash', 'card', 'multinet', 'metropol', 'setcard', 'yemeksepeti'

  const userWalletBalance = user ? (user.walletBalance || 0) : 0;
  const walletDiscountApplied = useWallet ? Math.min(itemsSubtotal - couponDiscount, userWalletBalance) : 0;
  const totalAmount = Math.max(0, itemsSubtotal - couponDiscount - walletDiscountApplied + deliveryFee);

  const handleCheckoutClick = () => {
    try {
      if (useWalletBalance && walletDiscount > 0 && user) {
        onUpdateUserWallet(user.id, availableWallet - walletDiscount);
      }
      onCheckout(paymentMethod);
    } catch (err) {
      alert("Sipariş verilirken sepet sayfasında hata oluştu: " + err.message);
      console.error(err);
    }
  };

  const handleWhatsAppCheckout = async () => {
    if (cart.length === 0) return;

    const itemsSummary = cart.map(item => {
      let customStr = '';
      if (item.customInfo && item.customInfo.selectedPizzas) {
        customStr = ' [' + item.customInfo.selectedPizzas.map((pizza, pIdx) => {
          const removedIngredients = pizza.removedIngredients || [];
          const extras = pizza.extras || [];
          const removedStr = removedIngredients.length > 0 ? ` (Çıkan: ${removedIngredients.join(', ')})` : '';
          const extrasStr = extras.length > 0 ? ` (Ekstra: ${extras.map(e => e.name).join(', ')})` : '';
          const doughName = pizza.selectedDough ? pizza.selectedDough.name : 'Standart Hamur';
          const crustName = pizza.selectedCrust ? pizza.selectedCrust.name : 'Standart Kenar';
          return `${pIdx + 1}. ${pizza.name} (${doughName}, ${crustName}${removedStr}${extrasStr})`;
        }).join(' | ') + ']';
      }
      return `${item.quantity}x ${item.name}${customStr}`;
    }).join(', ');

    let productPhotosText = '';
    if (whatsAppIncludePhotos) {
      const photoLinks = cart.map(item => {
        const fullImgUrl = item.image && item.image.startsWith('http') 
          ? item.image 
          : `https://www.dinapolipizza.com.tr${item.image || '/logo.png'}`;
        return `▫️ *${item.name}*: ${fullImgUrl}`;
      });
      productPhotosText = '\n' + photoLinks.join('\n');
    }

    const deliveryMethodText = deliveryMode === 'delivery' ? 'Adrese Teslim 🚀' : 'Gel-Al (Şubeden) 🛍️';
    
    let messageText = whatsAppTemplate
      .replace('{sepet_detayi}', itemsSummary)
      .replace('{teslimat_tipi}', deliveryMethodText)
      .replace('{adres_detayi}', selectedAddress || 'Saat Kulesi Karşısı Merkez Şube')
      .replace('{toplam_tutar}', totalAmount)
      .replace('{urun_gorselleri}', productPhotosText || 'Fotoğraflar eklendi');

    if (whatsAppApiMode === 'cloud_api' && (whatsAppCloudEndpoint || whatsAppToken)) {
      try {
        const endpointUrl = whatsAppCloudEndpoint || `https://graph.facebook.com/v18.0/${whatsAppPhoneId}/messages`;
        const payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: whatsAppNumber,
          type: "text",
          text: { preview_url: true, body: messageText },
          order_data: {
            items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price, image: i.image })),
            total: totalAmount,
            address: selectedAddress,
            deliveryMode: deliveryMode
          }
        };

        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(whatsAppToken ? { 'Authorization': `Bearer ${whatsAppToken}` } : {})
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          alert('⚡ Siparişiniz WhatsApp Cloud API & AWS Webhook aracılığıyla otomatik olarak kaydedildi ve onaylandı!');
        } else {
          const waUrl = `https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodeURIComponent(messageText)}`;
          window.open(waUrl, '_blank');
        }
      } catch (err) {
        console.warn('Cloud API Webhook çağrısı yapıldı, WhatsApp Web fallback açılıyor:', err);
        const waUrl = `https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodeURIComponent(messageText)}`;
        window.open(waUrl, '_blank');
      }
    } else {
      const waUrl = `https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodeURIComponent(messageText)}`;
      window.open(waUrl, '_blank');
    }

    handleCheckoutClick();
  };

  return (
    <div className="cart-page-wrapper" style={{ background: 'transparent', padding: '24px 0' }}>
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
                          <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                        </div>

                        {/* Details */}
                        <div className="cart-item-details">
                          <h4 className="item-title">{item.name}</h4>
                          
                                             {isCustomized ? (
                            <div className="item-customizations-desc">
                              {item.customInfo.selectedPizzas.map((pizza, idx) => {
                                const doughName = pizza.selectedDough ? pizza.selectedDough.name : 'Standart Hamur';
                                const crustName = pizza.selectedCrust ? pizza.selectedCrust.name : 'Standart Kenar';
                                const extras = pizza.extras || [];
                                const removedIngredients = pizza.removedIngredients || [];
                                return (
                                  <div key={idx} className="sub-pizza-desc">
                                    <span className="pizza-order-label">
                                      {item.customInfo.isCampaignWizard ? `${idx + 1}. Pizza: ` : ''}
                                    </span>
                                    <strong>{pizza.name}</strong>
                                    <span> ({doughName}, {crustName})</span>
                                    {extras.length > 0 && (
                                      <span className="pizza-extras">
                                        {' '}+ {extras.map(e => e.name).join(', ')}
                                      </span>
                                    )}
                                    {removedIngredients.length > 0 && (
                                      <span className="pizza-removed">
                                        {' '}- {removedIngredients.join(', ')} çıkarıldı
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
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
                          <label htmlFor="cart-address-select" style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Farklı Bir Kayıtlı Adres Seçin:</label>
                          <select 
                            id="cart-address-select"
                            aria-label="Kayıtlı Adres Seçimi"
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

            {/* Ödeme Yöntemi Seçimi */}
            {cart.length > 0 && (
              <div className="cart-card-panel payment-summary-card" style={{ marginTop: '24px' }}>
                <div className="panel-icon-title">
                  <span style={{ fontSize: '20px' }}>💳</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--color-dark-blue)' }}>Ödeme Yöntemi Seçin</h3>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 16px 0' }}>
                  Kapıda veya şubede yapmak istediğiniz ödeme seçeneğini belirtin.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  {[
                    { id: 'cash', name: 'Kapıda Nakit', desc: 'Nakit ile ödeme', icon: '💵', color: '#10b981' },
                    { id: 'card', name: 'Kapıda Kredi Kartı', desc: 'Kart ile ödeme', icon: '💳', color: '#3b82f6' }
                  ].map(option => {
                    const isSelected = paymentMethod === option.id;
                    return (
                      <div
                        key={option.id}
                        onClick={() => setPaymentMethod(option.id)}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: isSelected ? `2.5px solid ${option.color}` : '1.5px solid #e2e8f0',
                          backgroundColor: isSelected ? `${option.color}05` : '#f8fafc',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.2s ease',
                          transform: isSelected ? 'scale(1.02)' : 'none',
                          boxShadow: isSelected ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none'
                        }}
                      >
                        <div style={{ fontSize: '24px', marginBottom: '6px' }}>{option.icon}</div>
                        <div style={{ fontWeight: '800', fontSize: '13px', color: 'var(--color-dark-blue)' }}>{option.name}</div>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{option.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Önerilen Lezzetler Paneli */}
            <div className="cart-card-panel" style={{ marginTop: '24px' }}>
              <div className="panel-header" style={{ marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--color-dark-blue)' }}>Bunları da Eklemek İster Misiniz?</h3>
              </div>
              <div className="recommended-scroll-band" style={{ 
                display: 'flex', 
                gap: '16px', 
                overflowX: 'auto', 
                paddingBottom: '12px',
                scrollbarWidth: 'thin'
              }}>
                {recommendedItems.map((item) => (
                  <div key={item.id} className="rec-item-card" style={{ 
                    flex: '0 0 160px', 
                    background: '#f8fafc', 
                    borderRadius: 'var(--radius-sm)', 
                    border: '1px solid var(--color-border)', 
                    padding: '12px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '8px' }} loading="lazy" decoding="async" />
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-dark-blue)', marginBottom: '4px', height: '36px', overflow: 'hidden' }}>{item.name}</h4>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-ye-kazan-green)', marginBottom: '8px' }}>{item.price} TL</span>
                    <button 
                      onClick={() => handleAddRecommended(item)}
                      style={{ 
                        width: '100%', 
                        backgroundColor: 'var(--color-primary-blue)', 
                        color: 'var(--color-dark-blue)', 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: '16px', 
                        fontSize: '11px', 
                        fontWeight: '800', 
                        cursor: 'pointer',
                        transition: '0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E2BF4D'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-blue)'}
                    >
                      Ekle +
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
                        id="wallet-use-checkbox"
                        aria-label="Cüzdan Bakiyesini Kullan"
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
                    <label htmlFor="cart-coupon-input" style={{ display: 'none' }}>Kupon Kodu</label>
                    <input 
                      id="cart-coupon-input"
                      aria-label="Kupon Kodu"
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

                <button 
                  className="checkout-btn-full" 
                  style={{ backgroundColor: '#25D366', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} 
                  onClick={handleWhatsAppCheckout}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.837.001-2.63-1.024-5.101-2.883-6.958-1.859-1.858-4.333-2.88-6.967-2.881-5.442 0-9.866 4.41-9.869 9.839-.001 1.77.46 3.5 1.335 5.021l-.99 3.616 3.687-.968zm14.42-7.581c-.269-.134-1.597-.787-1.845-.878-.247-.09-.427-.134-.607.134-.18.269-.696.878-.853 1.057-.157.18-.314.202-.583.067-.27-.134-1.14-.422-2.173-1.341-.803-.715-1.346-1.6-1.503-1.869-.157-.269-.017-.414.118-.548.121-.12.269-.314.404-.471.134-.157.18-.27.27-.449.09-.18.045-.337-.022-.471-.068-.134-.607-1.459-.831-2l-.584-1.4c-.16-.388-.344-.38-.475-.38h-.405c-.269 0-.706.1-1.077.505-.37.404-1.413 1.381-1.413 3.366 0 1.985 1.443 3.902 1.644 4.171.202.269 2.842 4.341 6.886 6.088 1 .432 1.778.69 2.387.882.852.27 1.63.233 2.245.141.685-.102 1.597-.652 1.821-1.28.225-.629.225-1.168.157-1.28-.068-.113-.247-.18-.517-.315z" />
                  </svg>
                  <span>WhatsApp ile Sipariş Ver</span>
                </button>

                {/* Sepet Altı Sosyal Paylaşım Tavsiye Bölümü */}
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#FFFDF9',
                  border: '1.5px dashed #d4af37',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '850', fontSize: '13px', color: 'var(--color-primary-red)', marginBottom: '4px' }}>
                    📢 Arkadaşlarına Tavsiye Et!
                  </div>
                  <p style={{ fontSize: '10px', color: '#64748b', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                    Siparişi sosyal medyada tavsiye edin, her 10 tavsiyede **+1 Hediye Dilim Pizza** kazanın!
                  </p>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button 
                      onClick={() => {
                        const text = "Di Napoli Çanakkale'de harika pizzalar var! Sipariş vermek için kesinlikle tavsiye ederim! 🍕🍕 #dinapolipizza";
                        window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                        alert("📢 Harika! Tavsiye paylaşımınız başlatıldı. Sipariş sonrasında cüzdanınıza yansıyacaktır.");
                      }}
                      style={{
                        flex: 1,
                        backgroundColor: '#000000',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      𝕏'te Paylaş
                    </button>
                    <button 
                      onClick={() => {
                        const shareText = "Di Napoli Çanakkale'de harika pizzalar var! Sipariş vermek için kesinlikle tavsiye ederim! 🍕🍕 #dinapolipizza @dinapolicanakkale";
                        if (navigator.share) {
                          navigator.share({
                            title: 'Di Napoli Pizza Siparişi',
                            text: shareText,
                            url: window.location.origin
                          }).then(() => {
                            alert("📸 Harika! Siparişiniz paylaşım menüsüne yönlendirildi. Kendi Instagram hesabınızda hikaye veya post olarak paylaşabilirsiniz.");
                          }).catch((err) => {
                            console.log("Paylaşım iptal edildi: ", err);
                            window.open('https://www.instagram.com/', '_blank');
                          });
                        } else {
                          navigator.clipboard.writeText(shareText).then(() => {
                            alert("📸 Tavsiye metniniz panoya kopyalandı!\n\nInstagram açılıyor. Kendi profilinizde paylaşırken bu metni yapıştırabilir ve bizi etiketleyebilirsiniz!\n\nKopyalanan Metin: \"" + shareText + "\"");
                            window.open('https://www.instagram.com/', '_blank');
                          }).catch(() => {
                            window.open('https://www.instagram.com/', '_blank');
                          });
                        }
                      }}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      📸 Instagram'da Paylaş
                    </button>
                    <button 
                      onClick={() => {
                        const text = "Di Napoli Çanakkale'de harika pizzalar var! Sipariş vermek için kesinlikle tavsiye ederim! 🍕🍕 #dinapolipizza";
                        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                        alert("📢 Harika! Tavsiye paylaşımınız başlatıldı. Sipariş sonrasında cüzdanınıza yansıyacaktır.");
                      }}
                      style={{
                        flex: 1,
                        backgroundColor: '#25D366',
                        color: 'white',
                        border: 'none',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      💬 WhatsApp'ta Paylaş
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
