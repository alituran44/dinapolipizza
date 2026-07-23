import React, { useState } from 'react';
import RewardModal from './RewardModal';

export default function PromoWidgets({ yeKazanSlices, products = [], onDealClick }) {
  const [isRewardOpen, setIsRewardOpen] = useState(false);

  // Derive campaigns dynamically from products database
  const deals = products.filter(p => p.category === 'ozel-kampanya' || p.category === 'kampanya');

  return (
    <section className="promo-widgets-section" style={{ padding: '32px 0', overflow: 'hidden' }}>
      <div className="container">
        <h3 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--color-dark-blue)', marginBottom: '20px', textAlign: 'left' }}>
          Özel Kampanyalar
        </h3>
        
        <div className="deals-scroll-layout" style={{ 
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          paddingBottom: '16px',
          paddingTop: '4px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-primary-blue) transparent'
        }}>
          {deals.map((deal, idx) => (
            <article key={deal.id || idx} className="deal-card-item" style={{ 
              flex: '0 0 300px',
              scrollSnapAlign: 'start',
              position: 'relative', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              height: '220px', 
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => onDealClick && onDealClick(deal)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            >
              <img src={deal.image} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async" />
              <div className="deal-slide-overlay" style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                background: 'linear-gradient(to top, rgba(43,5,5,0.92) 20%, rgba(43,5,5,0.1) 100%)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-end', 
                padding: '20px', 
                color: 'white', 
                textAlign: 'left' 
              }}>
                <span className="deal-badge" style={{ 
                  width: 'fit-content', 
                  padding: '4px 10px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '11px', 
                  fontWeight: '800', 
                  marginBottom: '8px',
                  background: deal.popular ? 'var(--color-primary-red)' : 'var(--color-primary-blue)',
                  color: 'white'
                }}>
                  {deal.popular ? 'POPÜLER FIRSAT' : 'ÖZEL KAMPANYA'}
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>{deal.name}</h4>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginBottom: '8px', lineHeight: '1.4' }}>{deal.description}</p>
                <span style={{ fontSize: '18px', fontWeight: '900', color: 'var(--color-primary-blue)' }}>{deal.basePrice} TL</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <RewardModal isOpen={isRewardOpen} onClose={() => setIsRewardOpen(false)} />
    </section>
  );
}
