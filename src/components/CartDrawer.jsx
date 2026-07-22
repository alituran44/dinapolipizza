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
  onGoToCartPage,
  whatsAppNumber = '',
  whatsAppTemplate = '',
  whatsAppApiMode = 'standard',
  whatsAppPhoneId = '',
  whatsAppToken = '',
  whatsAppCloudEndpoint = '',
  whatsAppIncludePhotos = true,
  address = ''
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

    // Generate product image links if enabled
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
      .replace('{adres_detayi}', address || 'Saat Kulesi Karşısı Merkez Şube')
      .replace('{toplam_tutar}', finalTotal)
      .replace('{urun_gorselleri}', productPhotosText || 'Fotoğraflar eklendi');

    // Cloud API Mode vs Standard Mode
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
            total: finalTotal,
            address: address,
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
          // Fallback to wa.me if API endpoint returns error
          const waUrl = `https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodeURIComponent(messageText)}`;
          window.open(waUrl, '_blank');
        }
      } catch (err) {
        console.warn('Cloud API Webhook çağrısı yapıldı, WhatsApp Web fallback açılıyor:', err);
        const waUrl = `https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodeURIComponent(messageText)}`;
        window.open(waUrl, '_blank');
      }
    } else {
      // Standard WhatsApp wa.me link
      const waUrl = `https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodeURIComponent(messageText)}`;
      window.open(waUrl, '_blank');
    }

    handleCheckout();
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
                    <img src={item.image} alt={item.name} className="cart-item-img" loading="lazy" decoding="async" />
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      {item.customInfo && item.customInfo.selectedPizzas && (
                        <div className="cart-item-campaign-details" style={{ marginTop: '4px' }}>
                          {item.customInfo.selectedPizzas.map((pizza, pIdx) => {
                            const removedIngredients = pizza.removedIngredients || [];
                            const extras = pizza.extras || [];
                            const removedStr = removedIngredients.length > 0 ? ` (Çıkan: ${removedIngredients.join(', ')})` : '';
                            const extrasStr = extras.length > 0 ? ` (Ekstra: ${extras.map(e => e.name).join(', ')})` : '';
                            const doughName = pizza.selectedDough ? pizza.selectedDough.name : 'Standart';
                            const crustName = pizza.selectedCrust ? pizza.selectedCrust.name : 'Standart';
                            return (
                              <p key={pIdx} className="cart-item-custom-label" style={{ fontSize: '11px', color: 'var(--color-primary-red)', margin: '2px 0' }}>
                                • {pizza.name} ({doughName}, {crustName}{removedStr}{extrasStr})
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {item.customInfo && !item.customInfo.selectedPizzas && item.customInfo.size && item.customInfo.crust && (
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
                  <label htmlFor="cart-drawer-coupon-input" style={{ display: 'none' }}>Kupon Kodu</label>
                  <input 
                    id="cart-drawer-coupon-input"
                    aria-label="Kupon Kodu"
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

            <button 
              className="place-order-btn" 
              style={{ backgroundColor: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} 
              onClick={handleWhatsAppCheckout}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.837.001-2.63-1.024-5.101-2.883-6.958-1.859-1.858-4.333-2.88-6.967-2.881-5.442 0-9.866 4.41-9.869 9.839-.001 1.77.46 3.5 1.335 5.021l-.99 3.616 3.687-.968zm14.42-7.581c-.269-.134-1.597-.787-1.845-.878-.247-.09-.427-.134-.607.134-.18.269-.696.878-.853 1.057-.157.18-.314.202-.583.067-.27-.134-1.14-.422-2.173-1.341-.803-.715-1.346-1.6-1.503-1.869-.157-.269-.017-.414.118-.548.121-.12.269-.314.404-.471.134-.157.18-.27.27-.449.09-.18.045-.337-.022-.471-.068-.134-.607-1.459-.831-2l-.584-1.4c-.16-.388-.344-.38-.475-.38h-.405c-.269 0-.706.1-1.077.505-.37.404-1.413 1.381-1.413 3.366 0 1.985 1.443 3.902 1.644 4.171.202.269 2.842 4.341 6.886 6.088 1 .432 1.778.69 2.387.882.852.27 1.63.233 2.245.141.685-.102 1.597-.652 1.821-1.28.225-.629.225-1.168.157-1.28-.068-.113-.247-.18-.517-.315z" />
              </svg>
              <span>WhatsApp ile Sipariş Ver</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
