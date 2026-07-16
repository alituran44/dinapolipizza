import React from 'react';
import { Award, ChevronRight, Gift } from 'lucide-react';

export default function PromoWidgets({ yeKazanSlices }) {
  const totalSlicesNeeded = 6;
  
  return (
    <section className="promo-widgets-section">
      <div className="container promo-widgets-grid">
        {/* Left Column: Fırsatlar */}
        <div className="deals-card">
          <div className="deals-card-header">
            <h3>Fırsatlar</h3>
            <a href="#menu" className="see-all-link">
              <span>Tümünü Gör</span>
              <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="deals-images-row">
            {/* Deal 1 */}
            <div className="deal-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" 
                alt="1 Alana 1 Bedava" 
                className="deal-thumb"
              />
              <div className="deal-overlay-text">
                <span className="deal-badge">USTA İKİLİ</span>
                <h4>1 Alana 1 Bedava</h4>
              </div>
            </div>

            {/* Deal 2 */}
            <div className="deal-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=400&q=80" 
                alt="CEPTE30 İndirim" 
                className="deal-thumb"
              />
              <div className="deal-overlay-text">
                <span className="deal-badge red">KOD: CEPTE30</span>
                <h4>%30 İndirimi Kaçırma!</h4>
              </div>
            </div>

            {/* Deal 3 */}
            <div className="deal-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80" 
                alt="Arkadaşına Öner" 
                className="deal-thumb"
              />
              <div className="deal-overlay-text">
                <span className="deal-badge blue">USTALAR KAZANIYOR</span>
                <h4>Arkadaşına Öner 100 TL Kazan</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Di Napoli Ye-Kazan Progress */}
        <div className="ye-kazan-loyalty-card">
          <div className="loyalty-header">
            <h3>Di Napoli Ye-Kazan</h3>
            <a href="#menu" className="loyalty-details-link">Detayı Gör &gt;</a>
          </div>
          
          <div className="loyalty-body">
            <div className="loyalty-info-row">
              <div className="loyalty-sub-text">
                <Award size={18} className="loyalty-award-icon" />
                <span>Sipariş ver, Napoli dilimi kazan!</span>
              </div>
              <button className="loyalty-join-btn">Ustalara Katıl</button>
            </div>

            {/* Slices progression */}
            <div className="slices-timeline-container">
              <div className="slices-timeline-line">
                <div 
                  className="slices-timeline-fill" 
                  style={{ width: `${Math.min((yeKazanSlices / totalSlicesNeeded) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="slices-timeline-nodes">
                {[1, 2, 3, 4, 5, 6].map((slice) => {
                  const isCompleted = yeKazanSlices >= slice;
                  const isGiftNode = slice === 6;
                  
                  return (
                    <div 
                      key={slice} 
                      className={`slice-node ${isCompleted ? 'completed' : ''} ${isGiftNode ? 'gift-node' : ''}`}
                    >
                      <div className="node-circle-icon">
                        {isGiftNode ? (
                          <Gift size={14} className={isCompleted ? 'gift-gold' : ''} />
                        ) : (
                          <span className="slice-number">{slice}</span>
                        )}
                      </div>
                      <span className="node-label">
                        {slice} {isGiftNode ? 'Bedava' : 'Dilim'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="loyalty-footer-tip">
              <span>Her pizza siparişinde 1 dilim kazanırsınız.</span>
              <a href="#menu" className="faq-link">Nasıl hediye kazanırım?</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
