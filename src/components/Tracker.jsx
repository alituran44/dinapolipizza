import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Flame, Gift, Check, ArrowRight } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Sipariş Alındı', desc: 'Ustanın eline ulaştı ve kuyruğa eklendi.', icon: 'clock' },
  { id: 2, name: 'Hazırlanıyor', desc: 'Napoli usulü hamur tazece açılıyor ve usta sos ekleniyor.', icon: 'chef' },
  { id: 3, name: 'Fırında', desc: 'Pizzanız taş fırına atıldı, odun ateşinde pişiyor.', icon: 'flame' },
  { id: 4, name: 'Paketleniyor', desc: 'Sıcak dilimleniyor, kutulanıyor ve servis için hazırlanıyor.', icon: 'package' },
  { id: 5, name: 'Kurye Yolda', desc: 'Paketiniz fırından yeni çıktı, sıcacık yola koyuldu!', icon: 'delivery' }
];

export default function Tracker({ orderDetails, onReset }) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (currentStep >= STEPS.length) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const getStepIcon = (iconName, isActive) => {
    const color = isActive ? 'var(--color-primary-red)' : 'var(--color-text-muted)';
    switch (iconName) {
      case 'clock':
        return <Clock size={24} color={color} />;
      case 'chef':
        return <CheckCircle size={24} color={color} />;
      case 'flame':
        return <Flame size={24} color={color} />;
      case 'package':
        return <Gift size={24} color={color} />;
      case 'delivery':
        return <CheckCircle size={24} color={color} />;
      default:
        return <Clock size={24} color={color} />;
    }
  };

  return (
    <div className="tracker-overlay">
      <div className="tracker-container">
        {/* Header */}
        <div className="tracker-header">
          <div className="tracker-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="di napoli" style={{ height: '36px', objectFit: 'contain' }} />
            <span>Fırından Sıcak Takip</span>
          </div>
          <div className="order-number-badge">
            Sipariş No: #NAP-{Math.floor(100000 + Math.random() * 900000)}
          </div>
        </div>

        {/* Simulation Board */}
        <div className="tracker-board">
          <div className="tracker-illustration">
            {currentStep === 1 && <div className="sim-status text-pulse">Usta Siparişi İnceliyor...</div>}
            {currentStep === 2 && <div className="sim-status text-pulse">Hamur Taş Tezgâhta Açılıyor 🧑‍🍳</div>}
            {currentStep === 3 && <div className="sim-status text-pulse">Odun Ateşli Fırın Pişiriyor 🔥</div>}
            {currentStep === 4 && <div className="sim-status text-pulse">Baharatlar ve Kenar Sosu Ekleniyor 🍕</div>}
            {currentStep === 5 && <div className="sim-status success-pulse">Kurye Gazladı! Sıcacık Teslimat.</div>}
            
            <div className="tracker-progress-track">
              <div 
                className="tracker-progress-fill"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="tracker-timeline">
            {STEPS.map((step) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              
              return (
                <div 
                  key={step.id} 
                  className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                >
                  <div className="step-left-node">
                    <div className="node-circle">
                      {isCompleted ? <Check size={14} color="white" /> : getStepIcon(step.icon, isActive)}
                    </div>
                    {step.id !== STEPS.length && <div className="node-line"></div>}
                  </div>
                  
                  <div className="step-info">
                    <h4 className="step-name">{step.name}</h4>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details */}
        <div className="order-summary-panel">
          <h3>Sipariş Detayları</h3>
          <div className="summary-details-grid">
            <div className="detail-item">
              <span className="label">Teslimat Tipi</span>
              <span className="value">{orderDetails.deliveryMode === 'delivery' ? 'Adrese Teslim' : 'Beklemeden Gel-Al'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Toplam Tutar</span>
              <span className="value">{orderDetails.total} TL</span>
            </div>
            <div className="detail-item">
              <span className="label">Kazanılan Dilimler</span>
              <span className="value">+{orderDetails.slicesGained} Napoli Dilimi</span>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="tracker-actions">
          <button className="new-order-btn" onClick={onReset}>
            <span>Ana Sayfaya Dön</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
