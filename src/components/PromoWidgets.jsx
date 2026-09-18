import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import RewardModal from './RewardModal';

export default function PromoWidgets({ yeKazanSlices, products = [], onDealClick }) {
  const [isRewardOpen, setIsRewardOpen] = useState(false);

  // Derive campaigns dynamically from products database
  const deals = products.filter(p => p.category === 'ozel-kampanya' || p.category === 'kampanya');

  // Duplicate items 4 times to ensure infinite smooth seamless scrolling
  const repeatedDeals = [...deals, ...deals, ...deals, ...deals];

  // Dynamic CSS variables for precise transform looping (310px card width + 20px gap)
  const totalItemWidth = 330;
  const scrollWidth = -(totalItemWidth * deals.length) + 'px';
  const animationDuration = Math.max(12, deals.length * 4.5) + 's';

  return (
    <section className="promo-widgets-section" style={{ padding: '28px 0 36px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '5px',
                padding: '4px 12px', 
                borderRadius: '20px', 
                background: 'rgba(122, 12, 12, 0.08)', 
                color: 'var(--color-primary-red)', 
                fontSize: '11px', 
                fontWeight: '800',
                letterSpacing: '0.4px'
              }}>
                <Sparkles size={13} /> SÜPER FIRSATLAR
              </span>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '850', color: 'var(--color-dark-blue)', margin: 0, textAlign: 'left' }}>
              Özel Kampanyalar & Menüler
            </h3>
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-muted)' }}>
            Kaydırarak keşfet & tıkla
          </span>
        </div>
        
        <div className="promo-marquee-container">
          <div 
            className="promo-marquee-track animated" 
            style={{ 
              '--marquee-scroll-width': scrollWidth,
              animationDuration: animationDuration
            }}
          >
            {repeatedDeals.map((deal, idx) => (
              <article 
                key={`${deal.id}-${idx}`} 
                className="deal-card-item"
                onClick={() => onDealClick && onDealClick(deal)}
              >
                {/* Media Container: 100% visible, bright, unshaded food photo */}
                <div className="deal-card-media">
                  <img 
                    src={deal.image} 
                    alt={deal.name} 
                    className="deal-card-img" 
                    loading="lazy" 
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/super_kampanya.png';
                    }}
                  />
                  
                  {/* Popular Deal Badge */}
                  <span className="deal-card-badge-left">
                    {deal.popular ? 'POPÜLER FIRSAT' : 'ÖZEL KAMPANYA'}
                  </span>

                  {/* Ye-Kazan Slice Reward Badge */}
                  {deal.yeKazanSlice > 0 && (
                    <span className="deal-card-badge-right">
                      +{deal.yeKazanSlice} Dilim
                    </span>
                  )}
                </div>

                {/* Body Content */}
                <div className="deal-card-body">
                  <div>
                    <h4 className="deal-card-title" title={deal.name}>{deal.name}</h4>
                    <p className="deal-card-desc">{deal.description}</p>
                  </div>

                  <div className="deal-card-footer">
                    <div className="deal-card-price-wrap">
                      <span className="deal-card-price-label">Fırsat Fiyatı</span>
                      <span className="deal-card-price">{deal.basePrice} TL</span>
                    </div>

                    <div className="deal-card-btn">
                      <span>Fırsatı Seç</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <RewardModal isOpen={isRewardOpen} onClose={() => setIsRewardOpen(false)} />
    </section>
  );
}
