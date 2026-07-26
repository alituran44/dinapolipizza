import React from 'react';
import { 
  Clock, PhoneCall, MapPin, Heart, Mail,
  Instagram, Facebook, Youtube 
} from 'lucide-react';

export default function Footer({ onGoToAbout, onGoToContact, onAdminClick }) {
  return (
    <footer className="site-footer" style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
      {/* Video Background (Google Drive Custom Video) */}
      <video 
        src="/footer-video.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
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
          background: 'linear-gradient(rgba(31, 0, 0, 0.45), rgba(41, 4, 4, 0.6))',
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
            <p className="brand-desc-nlp" style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.4', marginTop: '8px' }}>
              Di Napoli Pizza; Çanakkale Merkez, Saat Kulesi karşısı, Kemalpaşa Mahallesi, Kordon boyu, Şair Ece Ayhan Meydanı, Çanakkale Onsekiz Mart Üniversitesi (ÇOMÜ) Terzioğlu ve Kepez yerleşkeleri dahil tüm yakın bölgelere 30 dakikada sıcak paket servis ulaştırmaktadır. Şef Luigi liderliğinde İtalyan pizzaları (Margarita, Romano, Fungi, Tonno, Mista), yerel Karadeniz pideleri, kapalı bohça Kalzone, çıtır tavuklu pizza ve gurme burgerler odun ateşinde taş fırında taze olarak pişirilmektedir. Her gün 11:00 ile 23:00 saatleri arasında gel-al ve hızlı eve teslimat sipariş imkanı sunulmaktadır.
            </p>
            <button 
              onClick={onGoToAbout}
              style={{ border: 'none', background: 'none', color: '#ffb703', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, marginTop: '10px' }}
            >
              <span>Hikayemizi Okuyun (Hakkımızda) &rarr;</span>
            </button>
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
              <li>
                <button 
                  onClick={onGoToContact}
                  style={{ border: 'none', background: 'none', color: '#ffb703', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}
                >
                  <span>✉ Bize Mesaj Gönderin &rarr;</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Sosyal Medyada Biz</h4>
            <p className="social-tip">En yeni lezzetlerimizi, videolarımızı ve kampanyalarımızı sosyal medyada takip edin.</p>
            <div className="social-links-row">
              <a href="https://www.instagram.com/dinapolicanakkale/" target="_blank" rel="noreferrer" className="social-icon-link instagram" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@dinapolipizzacanakkale" target="_blank" rel="noreferrer" className="social-icon-link tiktok-social" aria-label="TikTok" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000', color: '#ffffff', borderRadius: '50%', width: '36px', height: '36px', transition: 'all 0.2s ease', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.89 2.21 1.45 3.51 1.62v3.91c-1.12-.04-2.22-.38-3.19-.97-.68-.42-1.28-.97-1.74-1.63L16.6 20.3c.09 1.44-.45 2.87-1.46 3.86-1.5 1.54-3.9 2-5.96 1.15-2.21-.91-3.64-3.32-3.46-5.71.09-2.31 1.83-4.32 4.14-4.66.42-.06.84-.06 1.25-.01v3.96c-.34-.05-.7-.03-1.03.07-1.18.34-1.92 1.64-1.66 2.84.22 1 .12 2.12-.29 3.01.59.84 1.66 1.24 2.69 1.02 1.34-.28 2.26-1.61 2.08-2.96L12.525.02z" />
                </svg>
              </a>
              <a href="https://wa.me/905057261717" target="_blank" rel="noreferrer" className="social-icon-link whatsapp-social" aria-label="WhatsApp">
                <PhoneCall size={20} />
              </a>
            </div>
            <span className="insta-username" style={{ fontSize: '11px', display: 'block', marginTop: '8px', color: '#B4A9A9', lineHeight: '1.4' }}>
              Instagram: @dinapolicanakkale <br /> TikTok: @dinapolipizzacanakkale
            </span>
          </div>
        </div>

        {/* Anlaşmalı Ödeme Markaları Bandı */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          margin: '24px 0 16px 0',
          padding: '12px 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <span style={{ fontSize: '11px', fontWeight: '900', color: '#ffb703', letterSpacing: '1px', textTransform: 'uppercase', marginRight: '8px' }}>
            Kabul Edilen Kartlar:
          </span>
          {[
            { name: 'Multinet', icon: '🟢', color: '#22c55e', text: 'multinet' },
            { name: 'Metropol Card', icon: '🔴', color: '#ef4444', text: 'METROPOL' },
            { name: 'Yemeksepeti', icon: '🛵', color: '#db2777', text: 'yemeksepeti' },
            { name: 'Setcard', icon: '🔵', color: '#2563eb', text: 'SETCARD' }
          ].map(logo => (
            <div 
              key={logo.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                fontSize: '11px',
                fontWeight: '900',
                letterSpacing: '0.8px'
              }}
            >
              <span style={{ fontSize: '14px' }}>{logo.icon}</span>
              <span style={{ color: '#ffffff' }}>
                {logo.name === 'Multinet' ? (
                  <>multi<span style={{ color: '#22c55e' }}>net</span></>
                ) : logo.name === 'Metropol Card' ? (
                  <>Metropol<span style={{ color: '#ef4444', fontSize: '9px', marginLeft: '2px' }}>Card</span></>
                ) : logo.name === 'Setcard' ? (
                  <span style={{ color: '#2563eb', fontWeight: '950', letterSpacing: '1.2px' }}>SETCARD</span>
                ) : (
                  <>Yemek<span style={{ color: '#db2777' }}>sepeti</span></>
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="footer-divider"></div>

        {/* Footer Bottom Rights Section */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © 1997-{new Date().getFullYear()} Di Napoli Pizza Çanakkale. Tüm Hakları Saklıdır.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <p className="love-text">
              Made with <Heart size={14} className="heart-icon-gold" /> in Çanakkale since 1997.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
