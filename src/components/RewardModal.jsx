import React, { useEffect } from 'react';
import { X, Smartphone, ShoppingCart, Award, Gift } from 'lucide-react';

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
          <X size={24} />
        </button>

        <div className="reward-modal-content">
          {/* Top Pizza Art */}
          <div className="reward-modal-pizza-art">
            <div className="pizza-art-circle">
              <svg viewBox="0 0 100 100" className="pizza-svg">
                {/* Pizza Base */}
                <circle cx="50" cy="50" r="40" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" />
                {/* Pepperonis */}
                <circle cx="38" cy="35" r="5" fill="#ef4444" />
                <circle cx="62" cy="45" r="5" fill="#ef4444" />
                <circle cx="48" cy="65" r="5" fill="#ef4444" />
                {/* Cheese Details */}
                <path d="M30 45 C35 48, 45 42, 50 48 C55 54, 65 48, 70 52" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Slice Cutout */}
                <path d="M 50 50 L 22 22 A 40 40 0 0 1 50 10 Z" fill="#fffbeb" stroke="#ea580c" strokeWidth="2" />
                {/* Floating Slice */}
                <g transform="translate(-5, -5)">
                  <path d="M 50 50 L 22 22 A 40 40 0 0 1 50 10 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" />
                  <circle cx="38" cy="28" r="4" fill="#ef4444" />
                </g>
              </svg>
            </div>
          </div>

          <h2 className="reward-modal-title">Nasıl Ödül Kazanırım?</h2>
          <p className="reward-modal-subtitle">
            Adrese Teslim ya da Beklemeden Gel-Al siparişlerinden kazandığın dilimleri ödüle çevirebilir ve yedikçe daha çok kazanabilirsin.
          </p>

          {/* Timeline Steps */}
          <div className="reward-timeline">
            {/* Step 1 */}
            <div className="reward-timeline-item">
              <div className="reward-timeline-icon-wrapper">
                <div className="reward-timeline-icon-circle">
                  <Smartphone className="step-icon text-blue-600" size={28} />
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

            {/* Step 2 */}
            <div className="reward-timeline-item">
              <div className="reward-timeline-icon-wrapper">
                <div className="reward-timeline-icon-circle">
                  <ShoppingCart className="step-icon text-orange-500" size={28} />
                </div>
                <div className="reward-timeline-line"></div>
              </div>
              <div className="reward-timeline-text">
                <h3>Sipariş Ver</h3>
                <p>
                  Di Napoli kanallarından üye girişi yaparak vereceğin her Adrese Teslim ya da Beklemeden Gel-Al siparişinde 1 dilim kazan.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="reward-timeline-item">
              <div className="reward-timeline-icon-wrapper">
                <div className="reward-timeline-icon-circle">
                  <Award className="step-icon text-amber-500" size={28} />
                </div>
                <div className="reward-timeline-line"></div>
              </div>
              <div className="reward-timeline-text">
                <h3>Dilimlerini Biriktir</h3>
                <p>
                  Kazandığın dilimleri ödüle çevirmek için biriktir. 2 dilimden itibaren ödül kazanmaya başla. 6 dilimi biriktir, büyük finalde 1 adet seçili orta boy pizzanı kazan.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="reward-timeline-item">
              <div className="reward-timeline-icon-wrapper">
                <div className="reward-timeline-icon-circle">
                  <Gift className="step-icon text-emerald-500" size={28} />
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
