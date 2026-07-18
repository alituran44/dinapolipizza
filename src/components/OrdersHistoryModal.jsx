import React from 'react';
import { X, Receipt, ShoppingBag } from 'lucide-react';

export default function OrdersHistoryModal({ isOpen, onClose, orders, onShowSlip }) {
  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" style={{ zIndex: 2200 }} onClick={onClose}>
      <div className="auth-modal-card orders-history-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <button className="auth-modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="orders-history-header" style={{ marginBottom: '20px', borderBottom: '1px solid #edf2f7', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-dark-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} className="red-icon" />
            <span>Sipariş Geçmişim</span>
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Di Napoli fırınlarından verdiğiniz leziz siparişlerin güncel listesi.
          </p>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--color-text-muted)' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '10px' }}>🍕</span>
            <p style={{ fontSize: '13px', fontWeight: 600 }}>Henüz kayıtlı bir siparişiniz bulunmuyor sinyor!</p>
          </div>
        ) : (
          <div className="orders-history-list" style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.map((order) => {
              const getStatusText = (status) => {
                switch(status) {
                  case '1': return 'Sipariş Alındı';
                  case '2': return 'Hazırlanıyor';
                  case '3': return 'Fırında';
                  case '4': return 'Paketleniyor';
                  case '5': return 'Kurye Yolda';
                  case '6': return 'Teslim Edildi';
                  default: return 'Alındı';
                }
              };

              const getStatusClass = (status) => {
                if (status === '6') return 'status-delivered';
                return 'status-pending';
              };

              return (
                <div key={order.id} className="history-order-row" style={{ border: '1px solid #e2e8f0', borderRadius: 'var(--radius-sm)', padding: '12px 14px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--color-dark-blue)' }}>#{order.id}</span>
                    <span className={`status-tag ${getStatusClass(order.status)}`} style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '12px', background: order.status === '6' ? '#e6fffa' : '#feebc8', color: order.status === '6' ? '#234e52' : '#7b341e' }}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#4a5568', marginBottom: '8px', lineHeight: '1.4' }}>
                    {order.itemsSummary}
                  </p>

                  {/* Canlı Takip İlerleme Çubuğu */}
                  {order.status !== '6' && (
                    <div style={{ 
                      marginTop: '12px', 
                      marginBottom: '12px',
                      padding: '12px 10px', 
                      backgroundColor: '#FDFBF7', 
                      borderRadius: '8px', 
                      border: '1px solid #edf2f7',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--color-primary-red)', letterSpacing: '0.5px' }}>🍕 FIRINDAN CANLI SICAK TAKİP</span>
                      </div>
                      
                      {/* Timeline Nodes */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: '6px', padding: '0 5px' }}>
                        {/* Arka plan çizgi */}
                        <div style={{ position: 'absolute', top: '10px', left: '15px', right: '15px', height: '3px', backgroundColor: '#e2e8f0', zIndex: 1 }} />
                        {/* Aktif çizgi */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '10px', 
                          left: '15px', 
                          width: `${((parseInt(order.status) - 1) / 4) * 100}%`, 
                          height: '3px', 
                          backgroundColor: 'var(--color-primary-red)', 
                          zIndex: 2,
                          transition: 'width 0.5s ease-in-out'
                        }} />

                        {['Alındı', 'Hazırlık', 'Fırın', 'Paket', 'Kurye'].map((step, sIdx) => {
                          const stepNum = sIdx + 1;
                          const isActive = parseInt(order.status) >= stepNum;
                          return (
                            <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3, position: 'relative' }}>
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                backgroundColor: isActive ? 'var(--color-primary-red)' : 'white',
                                border: `2.5px solid ${isActive ? 'var(--color-primary-red)' : '#cbd5e1'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isActive ? 'white' : '#64748b',
                                fontSize: '10px',
                                fontWeight: '900'
                              }}>
                                {stepNum}
                              </div>
                              <span style={{ fontSize: '9px', fontWeight: '900', color: isActive ? 'var(--color-primary-red)' : '#64748b', marginTop: '4px' }}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #e2e8f0', paddingTop: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-primary-red)' }}>{order.total} TL</span>
                    <button 
                      className="btn-show-slip-action" 
                      onClick={() => onShowSlip(order)}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--color-dark-blue)', background: 'white', color: 'var(--color-dark-blue)', padding: '5px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}
                    >
                      <Receipt size={12} />
                      <span>Fişi Gör / Yazdır</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
