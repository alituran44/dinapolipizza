import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    bgClass: 'banner-bg-dark-blue',
    badge: 'CEPTE30 KODUYLA',
    title: '605 TL',
    subtitle: 'Ek %30 İndirim Fırsatı!',
    description: 'Seçili nefis Napoli pizzalarında sepetinize özel ek indirimler.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    bgClass: 'banner-bg-red', // Burgundy in CSS
    badge: 'Dİ NAPOLİ KAZANDIRIR',
    title: 'Siparişini Cüzdanla Öde',
    subtitle: 'Her Siparişte Ödül Kazan!',
    description: 'Cüzdan ödemelerinde anında %10 usta iade kazanımı.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    bgClass: 'banner-bg-light-blue', // Golden Amber in CSS
    badge: 'USTA ELLERDEN',
    title: 'Di Napoli\'ye',
    subtitle: 'Hoş Geldin!',
    description: 'Yeni üyelerimize özel usta fırınından sıcak sufle hediye.',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Hero({ onApplyDeal }) {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  return (
    <section className="hero-carousel-section">
      <div className="container hero-carousel-wrapper">
        {/* Navigation Arrows */}
        <button className="carousel-arrow left" onClick={handlePrev} aria-label="Önceki Kampanya">
          <ChevronLeft size={20} />
        </button>
        
        {/* Carousel Tracks */}
        <div className="carousel-track">
          {BANNERS.map((banner, index) => {
            const offsetIndex = (index + startIndex) % BANNERS.length;
            const currentBanner = BANNERS[offsetIndex];
            
            return (
              <div 
                key={currentBanner.id} 
                className={`carousel-slide-card ${currentBanner.bgClass}`}
                onClick={() => onApplyDeal('banner-deal', 299)}
              >
                <div className="slide-content">
                  <span className="slide-badge">{currentBanner.badge}</span>
                  <h2 className="slide-title">{currentBanner.title}</h2>
                  <h3 className="slide-subtitle">{currentBanner.subtitle}</h3>
                  <p className="slide-desc">{currentBanner.description}</p>
                </div>
                <div className="slide-media">
                  <img src={currentBanner.image} alt={currentBanner.title} className="slide-img" />
                </div>
              </div>
            );
          })}
        </div>

        <button className="carousel-arrow right" onClick={handleNext} aria-label="Sonraki Kampanya">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
