import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function RewardModal({ isOpen, onClose }) {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="reward-modal-overlay" onClick={onClose}>
      <div 
        className="reward-modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="reward-modal-close-btn" onClick={onClose} aria-label="Kapat">
          <X size={20} />
        </button>

        <div className="reward-modal-content">
          {/* Top Pizza Art (Yellow circle with detailed pizza illustration) */}
          <div className="reward-modal-pizza-art">
            <div className="pizza-art-circle">
              <svg viewBox="0 0 100 100" className="pizza-svg-illustration">
                {/* Yellow background circle inside art */}
                <circle cx="50" cy="50" r="44" fill="#ffd573" />
                
                {/* Pizza base shadow */}
                <circle cx="50" cy="52" r="32" fill="#d4af37" opacity="0.3" />
                
                {/* Pizza Crust */}
                <circle cx="48" cy="52" r="30" fill="#fbc02d" stroke="#2d2d2d" strokeWidth="2.5" />
                {/* Cheese layer */}
                <circle cx="48" cy="52" r="26" fill="#fff9c4" stroke="#2d2d2d" strokeWidth="1.5" />
                
                {/* Pepperoni slices */}
                <circle cx="34" cy="42" r="4" fill="#d32f2f" stroke="#2d2d2d" strokeWidth="1.5" />
                <circle cx="58" cy="46" r="4" fill="#d32f2f" stroke="#2d2d2d" strokeWidth="1.5" />
                <circle cx="44" cy="62" r="4" fill="#d32f2f" stroke="#2d2d2d" strokeWidth="1.5" />
                <circle cx="48" cy="38" r="3" fill="#d32f2f" stroke="#2d2d2d" strokeWidth="1" />
                
                {/* Olive bits */}
                <circle cx="38" cy="52" r="2" fill="#2d2d2d" />
                <circle cx="52" cy="58" r="2" fill="#2d2d2d" />
                
                {/* Pizza Cut Lines */}
                <line x1="48" y1="22" x2="48" y2="82" stroke="#2d2d2d" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="18" y1="52" x2="78" y2="52" stroke="#2d2d2d" strokeWidth="1.5" strokeDasharray="3,3" />
                
                {/* Pulled Slice */}
                <g transform="translate(10, -10)">
                  {/* Cheese Pull strings */}
                  <path d="M 22 55 Q 32 45 42 42" stroke="#fbc02d" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 24 59 Q 34 49 40 46" stroke="#fff9c4" strokeWidth="2" fill="none" strokeLinecap="round" />
                  
                  {/* Slice base */}
                  <path d="M 25 50 L 5 15 A 30 30 0 0 1 35 5 Z" fill="#fbc02d" stroke="#2d2d2d" strokeWidth="2.5" />
                  <path d="M 23 48 L 7 17 A 26 26 0 0 1 31 9 Z" fill="#fff9c4" stroke="#2d2d2d" strokeWidth="1.5" />
                  
                  {/* Slice Pepperoni */}
                  <circle cx="18" cy="26" r="3.5" fill="#d32f2f" stroke="#2d2d2d" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </div>

          <h2 className="reward-modal-title">Nasıl Ödül Kazanırım?</h2>
          <p className="reward-modal-subtitle">
            Adrese Teslim ya da Beklemeden Gel-Al siparişlerinden kazandığın dilimleri ödüle çevirebilir ve yedikçe daha çok kazanabilirsin.
          </p>

          {/* Timeline Steps with custom SVG illustrations resembling the reference image */}
          <div className="reward-timeline">
            
            {/* Step 1: Membership (Hand holding phone with Ye-Kazan app) */}
            <div className="reward-timeline-item">
              <div className="reward-timeline-icon-wrapper">
                <div className="reward-timeline-icon-circle-custom bg-blue-light">
                  <svg viewBox="0 0 64 64" className="timeline-svg-icon">
                    {/* Phone body */}
                    <rect x="22" y="10" width="20" height="36" rx="3" fill="#ffffff" stroke="#2d2d2d" strokeWidth="2.5" />
                    {/* Phone screen inner */}
                    <rect x="25" y="14" width="14" height="26" fill="#e3f2fd" />
                    {/* Home button */}
                    <circle cx="32" cy="42" r="1.5" fill="#2d2d2d" />
                    {/* Ye-Kazan badge inside phone screen */}
                    <rect x="27" y="18" width="10" height="12" rx="1" fill="#ef4444" />
                    <text x="32" y="24" fontSize="4" fontWeight="bold" fill="#ffffff" textAnchor="middle">Ye-</text>
                    <text x="32" y="28" fontSize="4" fontWeight="bold" fill="#ffffff" textAnchor="middle">Kazan</text>
                    {/* Hand holding phone */}
                    <path d="M 16 48 C 22 46, 24 38, 25 32 L 21 32 C 20 38, 18 42, 12 44 Z" fill="#ffcc80" stroke="#2d2d2d" strokeWidth="2" />
                    <path d="M 21 34 Q 23 35 23 37" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M 21 37 Q 23 38 23 40" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="reward-timeline-line"></div>
              </div>
              <div className="reward-timeline-text">
                <h3>Di Napoli Ye-Kazan'a Üye Ol</h3>
                <p>
                  Di Napoli Ye-Kazan programı Di Napoli'nin sadakat programıdır. Bu programda üyeler sipariş verdikçe daha çok kazanırlar.
                </p>
              </div>
            </div>

            {/* Step 2: Order (Tablet with pizza options and add buttons) */}
            <div className="reward-timeline-item">
              <div className="reward-timeline-icon-wrapper">
                <div className="reward-timeline-icon-circle-custom bg-orange-light">
                  <svg viewBox="0 0 64 64" className="timeline-svg-icon">
                    {/* Tablet frame */}
                    <rect x="14" y="16" width="36" height="26" rx="2" fill="#ffffff" stroke="#2d2d2d" strokeWidth="2.5" />
                    {/* Screen content */}
                    <rect x="18" y="20" width="28" height="18" fill="#fffde7" />
                    {/* Mini Pizza icon on screen */}
                    <circle cx="26" cy="29" r="6" fill="#ffd54f" stroke="#2d2d2d" strokeWidth="1.5" />
                    <circle cx="24" cy="27" r="1.5" fill="#ef5350" />
                    <circle cx="28" cy="31" r="1.5" fill="#ef5350" />
                    {/* Add Buttons (+ sign) */}
                    <circle cx="40" cy="25" r="3" fill="#e91e63" />
                    <line x1="39" y1="25" x2="41" y2="25" stroke="#ffffff" strokeWidth="1" />
                    <line x1="40" y1="24" x2="40" y2="26" stroke="#ffffff" strokeWidth="1" />
                    
                    <circle cx="40" cy="33" r="3" fill="#e91e63" />
                    <line x1="39" y1="33" x2="41" y2="33" stroke="#ffffff" strokeWidth="1" />
                    <line x1="40" y1="32" x2="40" y2="34" stroke="#ffffff" strokeWidth="1" />
                  </svg>
                </div>
                <div className="reward-timeline-line"></div>
              </div>
              <div className="reward-timeline-text">
                <h3>Sipariş Ver</h3>
                <p>
                  Di Napoli kanallarından üye girişi yaparak veya Şef Luigi üzerinden vereceğin her Adrese Teslim ya da Beklemeden Gel-Al siparişinde dilim kazan.
                </p>
              </div>
            </div>

            {/* Step 3: Collect Slices (Three pizza slices clustered) */}
            <div className="reward-timeline-item">
              <div className="reward-timeline-icon-wrapper">
                <div className="reward-timeline-icon-circle-custom bg-purple-light">
                  <svg viewBox="0 0 64 64" className="timeline-svg-icon">
                    {/* Slice 1 (pointing top-right) */}
                    <g transform="translate(10, 8) rotate(-15)">
                      <path d="M 20 20 L 5 5 A 15 15 0 0 1 20 0 Z" fill="#ffe082" stroke="#2d2d2d" strokeWidth="1.5" />
                      <circle cx="14" cy="10" r="1.5" fill="#e53935" />
                    </g>
                    {/* Slice 2 (pointing top-left) */}
                    <g transform="translate(26, 12) rotate(45)">
                      <path d="M 20 20 L 5 5 A 15 15 0 0 1 20 0 Z" fill="#ffe082" stroke="#2d2d2d" strokeWidth="1.5" />
                      <circle cx="14" cy="10" r="1.5" fill="#e53935" />
                    </g>
                    {/* Slice 3 (pointing down) */}
                    <g transform="translate(18, 26) rotate(-110)">
                      <path d="M 20 20 L 5 5 A 15 15 0 0 1 20 0 Z" fill="#ffe082" stroke="#2d2d2d" strokeWidth="1.5" />
                      <circle cx="14" cy="10" r="1.5" fill="#e53935" />
                    </g>
                  </svg>
                </div>
                <div className="reward-timeline-line"></div>
              </div>
              <div className="reward-timeline-text">
                <h3>Dilimlerini Biriktir</h3>
                <p>
                  Kazandığın dilimleri ödüle çevirmek için biriktir. 10 dilimi tamamla, büyük finalde 1 adet seçili orta boy gurme Margherita pizzanı anında bedava kazan.
                </p>
              </div>
            </div>

            {/* Step 4: Use Reward (Circular loops with pizza and gift) */}
            <div className="reward-timeline-item">
              <div className="reward-timeline-icon-wrapper">
                <div className="reward-timeline-icon-circle-custom bg-green-light">
                  <svg viewBox="0 0 64 64" className="timeline-svg-icon">
                    {/* Blue circular flow outline */}
                    <circle cx="32" cy="32" r="22" fill="none" stroke="#0d47a1" strokeWidth="3" />
                    {/* Small arrow heads on loop */}
                    <path d="M 32 10 L 36 14 L 32 18 Z" fill="#0d47a1" />
                    {/* Pizza icon inside flow */}
                    <g transform="translate(22, 22) scale(0.6)">
                      <circle cx="16" cy="16" r="14" fill="#ffd54f" stroke="#2d2d2d" strokeWidth="2" />
                      <circle cx="12" cy="12" r="2.5" fill="#d32f2f" />
                      <circle cx="20" cy="20" r="2.5" fill="#d32f2f" />
                    </g>
                    {/* Small gift package overlay */}
                    <rect x="42" y="38" width="10" height="10" fill="#f44336" stroke="#2d2d2d" strokeWidth="1.5" />
                    <line x1="47" y1="38" x2="47" y2="48" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="42" y1="43" x2="52" y2="43" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <div className="reward-timeline-text">
                <h3>Ödülünü Kullan</h3>
                <p>
                  Biriktirdiğin dilimleri ödüle çevir. Ödüllerini istediğin zaman Adrese Teslim ya da Beklemeden Gel-Al siparişinde kullan.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
