import React, { useState } from 'react';
import RewardModal from './RewardModal';

export default function PromoWidgets({ yeKazanSlices }) {
  const [isRewardOpen, setIsRewardOpen] = useState(false);

  const deals = [
    {
      badge: 'SÜPER KAMPANYA',
      title: 'Süper Kampanya',
      desc: '1 Medium Pizza + Cips + Soğan Halkası + 1 LT Coca-Cola',
      price: '729 TL',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
      badgeClass: 'gold'
    },
    {
      badge: '3 AL 2 ÖDE',
      title: '3 Al 2 Öde Kampanyası',
      desc: '2 Medium Pizza Alana 1 Small Pizza BEDAVA!',
      price: '825 TL',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      badgeClass: 'blue'
    },
    {
      badge: 'ŞEFİN KAMPANYASI',
      title: 'Şefin Kampanyası',
      desc: '2 Medium Pizza + 1 Coca-Cola BEDAVA!',
      price: '729 TL',
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
      badgeClass: 'red'
    },
    {
      badge: 'GRUP FIRSATI',
      title: '4 Kişilik Aile Kampanyası',
      desc: 'XLarge Pizza + 4 Adet Tavuk Parçacığı + Patates Cipsi + 1 LT Coca-Cola',
      price: '999 TL',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
      badgeClass: 'gold'
    }
  ];

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
            <div key={idx} className="deal-card-item" style={{ 
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            >
              <img src={deal.image} alt={deal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async" />
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
                <span className={`deal-badge ${deal.badgeClass}`} style={{ 
                  width: 'fit-content', 
                  padding: '4px 10px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '11px', 
                  fontWeight: '800', 
                  marginBottom: '8px',
                  background: deal.badgeClass === 'red' ? 'var(--color-primary-red)' : deal.badgeClass === 'gold' ? 'var(--color-primary-blue)' : '#2b6cb0',
                  color: deal.badgeClass === 'gold' ? 'var(--color-dark-blue)' : 'white'
                }}>
                  {deal.badge}
                </span>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>{deal.title}</h4>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginBottom: '8px', lineHeight: '1.4' }}>{deal.desc}</p>
                <span style={{ fontSize: '18px', fontWeight: '900', color: 'var(--color-primary-blue)' }}>{deal.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RewardModal isOpen={isRewardOpen} onClose={() => setIsRewardOpen(false)} />
    </section>
  );
}
