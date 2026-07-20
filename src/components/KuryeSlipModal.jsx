import React from 'react';
import { Printer, MessageSquare, X, CheckCircle } from 'lucide-react';

export default function KuryeSlipModal({ 
  order, 
  cart, 
  onClose, 
  deliveryMode, 
  address, 
  showPrint,
  socialShares = [],
  onRegisterSocialShare
}) {
  if (!order) return null;

  const orderDate = new Date().toLocaleString('tr-TR');
  const whatsappNumber = '905423883010'; // Resmi Di Napoli Telefonu

  const getPaymentName = (method) => {
    switch (method) {
      case 'cash': return 'KAPIDA NAKİT 💵';
      case 'card': return 'KAPIDA KREDİ KARTI 💳';
      case 'multinet': return 'MULTİNET (YEMEK KARTI) 🟢';
      case 'metropol': return 'METROPOL CARD (YEMEK KARTI) 🔴';
      case 'setcard': return 'SETCARD (YEMEK KARTI) 🔵';
      case 'yemeksepeti': return 'YEMEKSEPETİ (CÜZDAN) 🛵';
      default: return 'KAPIDA NAKİT 💵';
    }
  };

  const handleShareClick = (platform) => {
    if (typeof onRegisterSocialShare === 'function') {
      onRegisterSocialShare(order.id, platform);
    }
    if (platform === 'Instagram') {
      window.open('https://www.instagram.com/dinapolicanakkale/', '_blank');
      return;
    }
    const text = `Di Napoli Pizza'dan ${order.total} TL'ye harika bir sipariş verdim! Kesinlikle tavsiye ederim! 🍕🍕 #dinapolipizza`;
    const shareUrl = platform === '𝕏 (X)' 
      ? `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  };

  // Formulate WhatsApp message text
  const itemsText = (order.items || cart || []).map(item => {
    let details = '';
    if (item.customInfo && item.customInfo.selectedPizzas) {
      details = ' (' + item.customInfo.selectedPizzas.map((p, idx) => {
        const extList = p.extras || [];
        const remList = p.removedIngredients || [];
        const dName = p.selectedDough ? p.selectedDough.name : 'Standart Hamur';
        const cName = p.selectedCrust ? p.selectedCrust.name : 'Standart Kenar';
        const ext = extList.length > 0 ? ` + ${extList.map(e => e.name).join(', ')}` : '';
        const rem = remList.length > 0 ? ` - ${remList.join(', ')}` : '';
        return `${idx + 1}. ${p.name} [${dName}, ${cName}${ext}${rem}]`;
      }).join(' | ') + ')';
    }
    return `• ${item.quantity}x ${item.name}${details} - ${item.price * item.quantity} TL`;
  }).join('\n');

  const rawMessage = `*Dİ NAPOLİ PİZZA - KURYE SİPARİŞ FİŞİ*
---------------------------------------
*Sipariş No:* ${order.id}
*Tarih/Saat:* ${orderDate}
*Teslimat Tipi:* ${deliveryMode === 'delivery' ? '🚗 Adrese Teslim' : '🏪 Gel-Al'}
*Müşteri Adresi:* ${deliveryMode === 'delivery' ? address : 'Şube Teslim (Gel-Al)'}
---------------------------------------
*SİPARİŞ İÇERİĞİ:*
${itemsText}
---------------------------------------
*GENEL TOPLAM:* ${order.total} TL
---------------------------------------
_Bu sipariş kurye bilgilendirme fişidir._`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;

  // Handle browser direct print
  const handlePrint = () => {
    const printContent = document.getElementById('thermal-slip-print-area').innerHTML;
    const originalContent = document.body.innerHTML;
    
    // Create print window logic or replace body temporarily
    document.body.innerHTML = `
      <style>
        body { background: white; color: black; font-family: 'Courier New', monospace; padding: 20px; }
        .thermal-slip { width: 300px; margin: 0 auto; border: 1px dashed #ccc; padding: 15px; }
        .no-print { display: none; }
      </style>
      <div class="thermal-slip">${printContent}</div>
    `;
    window.print();
    // Reload page to restore React state cleanly
    window.location.reload();
  };

  return (
    <div className="cart-drawer-overlay" style={{ zIndex: 2000 }}>
      <div className="kurye-slip-modal" onClick={(e) => e.stopPropagation()}>
        <div className="slip-success-header">
          <CheckCircle size={44} className="success-icon" />
          <h3>Siparişiniz Başarıyla Alındı!</h3>
          <p>Kurye bilgilendirme ve şube teslimat fişiniz aşağıda hazırlanmıştır.</p>
        </div>

        {/* Thermal Slip Card */}
        <div className="thermal-slip-card" id="thermal-slip-print-area">
          <div className="receipt-brand">
            <h2>Dİ NAPOLİ PIZZA</h2>
            <p>Pizzada Usta Eller</p>
            <p className="branch-sub">Saat Kulesi Karşısı, Çanakkale</p>
          </div>
          
          <div className="receipt-divider-dash"></div>
          
          <div className="receipt-meta">
            <p><strong>FİŞ NO:</strong> {order.id}</p>
            <p><strong>TARİH:</strong> {orderDate}</p>
            <p><strong>TESLİMAT:</strong> {deliveryMode === 'delivery' ? '🚗 ADRESE TESLİM' : '🏪 GEL-AL'}</p>
            <p><strong>ÖDEME:</strong> {getPaymentName(order.paymentMethod)}</p>
          </div>

          <div className="receipt-divider-dash"></div>

          <div className="receipt-address">
            <p><strong>TESLİMAT ADRESİ:</strong></p>
            <p className="addr-txt">{deliveryMode === 'delivery' ? address : 'Müşteri Gel-Al Teslimat'}</p>
          </div>

          <div className="receipt-divider-dash"></div>

          <div className="receipt-items">
            <p className="sec-title"><strong>SİPARİŞ DETAYLARI:</strong></p>
            {(order.items || cart || []).map((item, idx) => {
              const isCustomized = item.customInfo && item.customInfo.selectedPizzas;
              return (
                <div key={idx} className="receipt-item-line">
                  <div className="item-main-row">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{item.price * item.quantity} TL</span>
                  </div>
                  {isCustomized && (
                    <div className="receipt-sub-options">
                      {item.customInfo.selectedPizzas.map((p, pIdx) => {
                        const extList = p.extras || [];
                        const remList = p.removedIngredients || [];
                        const dName = p.selectedDough ? p.selectedDough.name : 'Standart Hamur';
                        const cName = p.selectedCrust ? p.selectedCrust.name : 'Standart Kenar';
                        return (
                          <p key={pIdx}>
                            • {p.name} ({dName}, {cName}
                            {extList.length > 0 ? `, Ekstra: ${extList.map(e => e.name).join('+')}` : ''}
                            {remList.length > 0 ? `, Çıkan: ${remList.join('-')}` : ''})
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="receipt-divider-dash"></div>

          <div className="receipt-total-block">
            <div className="total-line">
              <span>GENEL TOPLAM</span>
              <span>{order.total} TL</span>
            </div>
          </div>

          <div className="receipt-footer">
            <p>Afiyet Olsun!</p>
            <p>0286 214 00 30 - 0542 388 30 10</p>
          </div>
        </div>

        {/* Sosyal Medya Paylaşım & Ödül Kartı */}
        <div style={{
          backgroundColor: '#FFFDF9',
          border: '2px dashed #d4af37',
          borderRadius: '12px',
          padding: '16px',
          margin: '20px 0',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
        }}>
          <h4 style={{ color: 'var(--color-primary-red)', fontWeight: '900', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', margin: '0 0 6px 0' }}>
            📢 Paylaş & Hediye Dilim Pizza Kazan!
          </h4>
          <p style={{ fontSize: '11px', color: '#475569', margin: '0 0 12px 0', lineHeight: '1.4' }}>
            Siparişinizi sosyal medyada tavsiye edin, her 10 tavsiye paylaşımında **+1 Ye-Kazan Pizza Dilimi** anında cüzdanınıza eklensin!
          </p>

          {/* İlerleme Çubuğu */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: '#64748b', marginBottom: '4px' }}>
              <span>Paylaşım Hedefi</span>
              <span>{socialShares.length % 10}/10</span>
            </div>
            <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((socialShares.length % 10) / 10) * 100}%`,
                backgroundColor: '#d4af37',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={() => handleShareClick('𝕏 (X)')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#000000',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              𝕏'te Paylaş
            </button>
            <button 
              onClick={() => handleShareClick('Instagram')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              📸 Instagram'da Paylaş
            </button>
            <button 
              onClick={() => handleShareClick('WhatsApp')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#25D366',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              💬 WhatsApp'ta Öner
            </button>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="slip-modal-actions">
          {showPrint && (
            <button className="slip-action-btn print-btn" onClick={handlePrint}>
              <Printer size={18} />
              <span>Fiziksel Fişi Yazdır (Kurye)</span>
            </button>
          )}
          
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="slip-action-btn whatsapp-btn"
          >
            <MessageSquare size={18} />
            <span>Siparişi WhatsApp'a Gönder</span>
          </a>

          <button className="slip-action-btn close-slip-btn" onClick={onClose}>
            <X size={18} />
            <span>Kapat ve Takip Et</span>
          </button>
        </div>
      </div>
    </div>
  );
}
