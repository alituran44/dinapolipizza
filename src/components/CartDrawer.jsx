import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Tag, ChevronRight, Award } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  deliveryMode,
  yeKazanSlices,
  onPlaceOrder,
  onGoToCartPage
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [useYeKazanAward, setUseYeKazanAward] = useState(false);

  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Delivery fee rules
  const deliveryFee = deliveryMode === 'delivery' ? 25 : 0;

  // Coupon code simulation
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'DOMINOS20') {
      const calculatedDiscount = Math.round(subtotal * 0.2);
      setDiscount(calculatedDiscount);
      setCouponApplied(true);
    } else {
      alert('Geçersiz kupon kodu! İpucu: DOMINOS20 yazarak %20 indirim kazanabilirsiniz.');
    }
  };

  // Ye-Kazan Award check
  const hasYeKazanFreePizza = yeKazanSlices >= 10;
  const yeKazanDiscount = useYeKazanAward ? 149 : 0; // Value of a free Margherita pizza

  const finalTotal = Math.max(0, subtotal - discount - yeKazanDiscount + deliveryFee);

  // Slices to be gained from this order
  const slicesGained = cart.reduce((sum, item) => sum + ((item.yeKazanSlice || 0) * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    onPlaceOrder({
      subtotal,
      discount: discount + yeKazanDiscount,
      deliveryFee,
      total: finalTotal,
      slicesGained: useYeKazanAward ? -10 + slicesGained : slicesGained
    });
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="header-left">
            <h2>Sepetim</h2>
            <span className="cart-item-count">{totalItems} Ürün</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="cart-drawer-content">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <svg viewBox="0 0 100 100" width="80" height="80" fill="var(--color-text-muted)">
                <circle cx="50" cy="50" r="45" stroke="var(--color-border)" strokeWidth="2" fill="none" />
                <path d="M30 40 h40 M35 40 l5 40 h20 l5-40" stroke="var(--color-border)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="45" cy="55" r="2" />
                <circle cx="55" cy="55" r="2" />
                <path d="M45 65 q5-5 10 0" stroke="var(--color-border)" strokeWidth="2" fill="none" />
              </svg>
              <h3>Sepetiniz Boş</h3>
              <p>Menümüzden en leziz pizzaları seçip sepetinize eklemeye başlayın.</p>
              <button className="browse-menu-btn" onClick={onClose}>Lezzetleri İncele</button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="cart-items-list">
                {cart.map((item, index) => (
                  <div className="cart-item" key={`${item.id}-${index}`}>
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      {item.customInfo && item.customInfo.isCampaignWizard && item.customInfo.selectedPizzas && (
                        <div className="cart-item-campaign-details" style={{ marginTop: '4px' }}>
                          {item.customInfo.selectedPizzas.map((pizza, pIdx) => {
                            const removedStr = pizza.removedIngredients.length > 0 ? ` (Çıkan: ${pizza.removedIngredients.join(', ')})` : '';
                            const extrasStr = pizza.extras.length > 0 ? ` (Ekstra: ${pizza.extras.map(e => e.name).join(', ')})` : '';
                            return (
                              <p key={pIdx} className="cart-item-custom-label" style={{ fontSize: '11px', color: 'var(--color-primary-red)', margin: '2px 0' }}>
                                • {pizza.name} ({pizza.selectedDough.name}, {pizza.selectedCrust.name}{removedStr}{extrasStr})
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {item.customInfo && !item.customInfo.isCampaignWizard && (
                        <p className="cart-item-custom-label">
                          {item.customInfo.size.name} Boy, {item.customInfo.crust.name}
                        </p>
                      )}
                      <span className="cart-item-price">{item.price} TL</span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controller">
                        <button 
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className="remove-item-btn" onClick={() => onRemoveItem(index)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loyalty Program (Ye-Kazan) Option */}
              {hasYeKazanFreePizza && (
                <div className="ye-kazan-offer-card">
                  <div className="offer-header">
                    <Award size={20} className="award-green" />
                    <h4>1 Bedava Pizzanız Var!</h4>
                  </div>
                  <p>10 adet Ye-Kazan diliminiz birikti. Bu siparişte bedava Margherita kazanmak ister misiniz?</p>
                  <button 
                    className={`use-award-btn ${useYeKazanAward ? 'active' : ''}`}
                    onClick={() => setUseYeKazanAward(!useYeKazanAward)}
                  >
                    {useYeKazanAward ? 'Seçimi Kaldır' : 'Ödülü Kullan (-149 TL)'}
                  </button>
                </div>
              )}

              {/* Promo Coupon Form */}
              <form className="coupon-form" onSubmit={handleApplyCoupon}>
                <div className="coupon-input-wrapper">
                  <Tag size={16} className="coupon-icon" />
                  <input 
                    type="text" 
                    placeholder="Kupon veya Promosyon Kodu"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                </div>
                <button type="submit" className="apply-coupon-btn" disabled={couponApplied}>
                  {couponApplied ? 'Uygulandı' : 'Uygula'}
                </button>
              </form>

              {/* Summary pricing */}
              <div className="cart-summary-section">
                <div className="summary-row">
                  <span>Sepet Toplamı</span>
                  <span>{subtotal} TL</span>
                </div>
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Kupon İndirimi</span>
                    <span>-{discount} TL</span>
                  </div>
                )}
                {useYeKazanAward && (
                  <div className="summary-row discount">
                    <span>Ye-Kazan Bedava Pizza</span>
                    <span>-149 TL</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Teslimat Ücreti ({deliveryMode === 'delivery' ? 'Eve Servis' : 'Gel-Al'})</span>
                  <span>{deliveryFee > 0 ? `${deliveryFee} TL` : 'Ücretsiz'}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Ödenecek Tutar</span>
                  <span>{finalTotal} TL</span>
                </div>

                {slicesGained > 0 && (
                  <div className="slices-alert">
                    <Award size={16} />
                    <span>Bu sipariş ile <strong>{slicesGained} dilim</strong> kazanacaksınız!</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              className="place-order-btn" 
              style={{ backgroundColor: '#2d3748' }}
              onClick={() => {
                onGoToCartPage();
                onClose();
              }}
            >
              <span>Sepete Git (Kupon & Detaylar)</span>
              <ChevronRight size={20} />
            </button>
            
            <button className="place-order-btn" onClick={handleCheckout}>
              <span>Hızlı Siparişi Tamamla</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
