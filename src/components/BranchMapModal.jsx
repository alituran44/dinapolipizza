import React from 'react';
import { X, MapPin, Phone, Clock, Compass, PhoneCall } from 'lucide-react';

export default function BranchMapModal({ isOpen, onClose, onSelectBranch }) {
  if (!isOpen) return null;

  const handleSelect = () => {
    onSelectBranch("Kemalpaşa Mah. Şair Ece Ayhan Meydanı No:9/A (Saat Kulesi Şubesi)");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content branch-map-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Kapat">
          <X size={22} />
        </button>

        <div className="branch-modal-layout">
          {/* Left Info Panel */}
          <div className="branch-info-panel">
            <div className="branch-badge">USTA ŞUBEMİZ</div>
            <h2>Saat Kulesi Merkez Şube</h2>
            <p className="branch-tagline">1997'den Beri Çanakkale'de Geleneksel Taş Fırın Lezzeti</p>

            <div className="branch-details-stack">
              <div className="detail-row">
                <MapPin size={20} className="detail-icon" />
                <div className="detail-text">
                  <h4>Açık Adres</h4>
                  <p>Kemalpaşa Mah. Şair Ece Ayhan Meydanı No:9/A (Saat Kulesi Karşısı) Merkez / Çanakkale</p>
                </div>
              </div>

              <div className="detail-row">
                <Phone size={20} className="detail-icon" />
                <div className="detail-text">
                  <h4>Sipariş Telefonları</h4>
                  <p>+90 505 726 17 17 (GSM & WhatsApp)</p>
                  <p>0 286 212 50 51 (Sabit Hat)</p>
                </div>
              </div>

              <div className="detail-row">
                <Clock size={20} className="detail-icon" />
                <div className="detail-text">
                  <h4>Çalışma Saatleri</h4>
                  <p>Hafta içi: 11:00 - 02:00</p>
                  <p>Hafta sonu: 11:00 - 03:00</p>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="branch-actions-row">
              <button className="select-branch-btn" onClick={handleSelect}>
                Bu Şubeden Gel-Al
              </button>

              <a 
                href="https://maps.app.goo.gl/yQ3J66L2KTLh7D5L9" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-icon-link-gold directions"
                title="Yol Tarifi Al"
              >
                <Compass size={20} />
                <span>Yol Tarifi</span>
              </a>

              <a 
                href="https://wa.me/905057261717" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-icon-link-gold whatsapp"
                title="WhatsApp Sipariş"
              >
                <PhoneCall size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Map Panel */}
          <div className="branch-map-panel">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.2413551576437!2d26.401121176767664!3d39.9996914715112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1a134a49bc131%3A0xe212be7c87c95a5f!2sDi%20Napoli%20Pizza%20%C3%87anakkale!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str"
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Di Napoli Pizza Çanakkale Şubesi Haritası"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
