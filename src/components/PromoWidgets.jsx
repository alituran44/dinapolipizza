import React, { useState, useEffect } from 'react';
import { Award, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import RewardModal from './RewardModal';

export default function PromoWidgets({ yeKazanSlices }) {
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [activeDealIndex, setActiveDealIndex] = useState(0);
  const totalSlicesNeeded = 6;

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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDealIndex((prev) => (prev + 1) % deals.length);
    }, 4500); // 4.5 saniyede bir otomatik döner

    return () => clearInterval(timer);
  }, [deals.length]);



  const handleNextDeal = (e) => {
    e.preventDefault();
    setActiveDealIndex((prev) => (prev + 1) % deals.length);
  };

  const handlePrevDeal = (e) => {
    e.preventDefault();
    setActiveDealIndex((prev) => (prev - 1 + deals.length) % deals.length);
  };
  
  const handleOpenReward = (e) => {
    e.preventDefault();
    setIsRewardOpen(true);
  };
  
  return (
    <section className="promo-widgets-section">
      <div className="container promo-widgets-grid" style={{ gridTemplateColumns: '1fr' }}>
        {/* Left Column: Fırsatlar Kayan Banner */}
        <div className="deals-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="deals-card-header">
            <h3>Özel Kampanyalar</h3>
            <div className="slider-nav-arrows" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button 
                onClick={handlePrevDeal} 
                className="arrow-nav-btn" 
                style={{ 
                  background: 'var(--color-border)', 
                  border: 'none',
                  color: 'var(--color-dark-blue)',
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handleNextDeal} 
                className="arrow-nav-btn" 
                style={{ 
                  background: 'var(--color-border)', 
                  border: 'none',
                  color: 'var(--color-dark-blue)',
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="deals-slider-viewport" style={{ width: '100%', overflow: 'hidden', position: 'relative', height: '240px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div className="deals-slider-track" style={{ display: 'flex', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', transform: `translateX(-${activeDealIndex * 100}%)`, height: '100%' }}>
              {deals.map((deal, idx) => (
                <div key={idx} className="deal-slide-item" style={{ minWidth: '100%', position: 'relative', height: '100%' }}>
                  <img src={deal.image} alt={deal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="deal-slide-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(43,5,5,0.92) 15%, rgba(43,5,5,0.2) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', color: 'white', textAlign: 'left' }}>
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
                    <h4 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>{deal.title}</h4>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginBottom: '8px', lineHeight: '1.4' }}>{deal.desc}</p>
                    <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--color-primary-blue)' }}>{deal.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How to win reward modal */}
      <RewardModal isOpen={isRewardOpen} onClose={() => setIsRewardOpen(false)} />
    </section>
  );
}
