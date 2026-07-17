import React from 'react';
import { 
  Clock, PhoneCall, MapPin, Heart, Mail,
  Instagram, Facebook, Youtube 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
      {/* Video Background (Google Drive Custom Video) */}
      <video 
        src="/footer-video.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="footer-video-bg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
          opacity: 0.8
        }}
      />
      {/* Dark Bordo Overlay */}
      <div 
        className="footer-video-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(31, 0, 0, 0.85), rgba(41, 4, 4, 0.95))',
          zIndex: -1
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Footer Top Contact Badges */}
        <div className="footer-badges">
          <div className="badge-item">
            <Clock size={28} className="badge-icon" />
            <div className="badge-text">
              <h4>Çalışma Saatleri</h4>
              <p>Hafta içi: 11:00 - 02:00 / Hafta sonu: 11:00 - 03:00</p>
            </div>
          </div>
          <div className="badge-item">
            <PhoneCall size={28} className="badge-icon" />
            <div className="badge-text">
              <h4>Sipariş & WhatsApp Hattı</h4>
              <p className="bold text-gold">+90 505 726 17 17</p>
            </div>
          </div>
          <div className="badge-item">
            <MapPin size={28} className="badge-icon" />
            <div className="badge-text">
              <h4>Saat Kulesi Şubesi</h4>
              <p>Kemalpaşa Mah. Şair Ece Ayhan Meydanı No:9/A</p>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Footer Main Content Grid */}
        <div className="footer-links-grid">
          <div className="footer-brand-column">
            <img 
              src="/logo.png" 
              alt="di napoli pizza" 
              className="footer-logo" 
            />
            <p className="brand-desc">
              1997'den beri Çanakkale'nin en sevilen pizzacısı! Di Napoli Pizza, günlük taze hamur, bol malzeme ve usta ellerden çıkan lezzetlerle Saat Kulesi karşısında hizmetinizde.
            </p>
          </div>

          <div className="footer-column">
            <h4>Sipariş Telefonlarımız</h4>
            <ul className="footer-phone-list">
              <li><a href="tel:+905057261717" className="bold text-gold">📞 +90 505 726 17 17</a></li>
              <li><a href="tel:02862125051">☎ 0 286 212 50 51</a></li>
              <li><a href="tel:02862123017">☎ 0 286 212 30 17</a></li>
              <li><a href="tel:02862123276">☎ 0 286 212 32 76</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Bize Ulaşın</h4>
            <ul className="footer-contact-list">
              <li className="contact-address-text">
                <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Kemalpaşa Mah. Şair Ece Ayhan Meydanı No:9/A Saat Kulesi Karşısı Merkez / Çanakkale
              </li>
              <li>
                <a href="mailto:dinapolipizza1997@gmail.com">
                  <Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  dinapolipizza1997@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Sosyal Medyada Biz</h4>
            <p className="social-tip">En yeni lezzetlerimizi ve kampanyalarımızı Instagram'da takip edin.</p>
            <div className="social-links-row">
              <a href="https://www.instagram.com/dinapolicanakkale/" target="_blank" rel="noreferrer" className="social-icon-link instagram" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/905057261717" target="_blank" rel="noreferrer" className="social-icon-link whatsapp-social" aria-label="WhatsApp">
                <PhoneCall size={20} />
              </a>
            </div>
            <span className="insta-username" style={{ fontSize: '12px', display: 'block', marginTop: '8px', color: '#B4A9A9' }}>
              @dinapolicanakkale
            </span>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Footer Bottom Rights Section */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © 1997-{new Date().getFullYear()} Di Napoli Pizza Çanakkale. Tüm Hakları Saklıdır.
          </p>
          <p className="love-text">
            Made with <Heart size={14} className="heart-icon-gold" /> in Çanakkale since 1997.
          </p>
        </div>
      </div>
    </footer>
  );
}
