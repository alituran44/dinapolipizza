import React from 'react';
import { Phone, ArrowLeft, Heart, Sparkles, MapPin } from 'lucide-react';

export default function AboutPage({ onGoToMenu }) {
  const handleContactClick = () => {
    const footerElement = document.querySelector('.site-footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('İletişim Bilgileri:\n\nTelefon: 0286 217 00 17\nAdres: Şair Ece Ayhan Meydanı, Saat Kulesi Karşısı, Çanakkale / Merkez');
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', color: 'var(--color-dark-blue)' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>
        <span style={{ cursor: 'pointer' }} onClick={onGoToMenu}>Ana Sayfa</span>
        <span>&gt;</span>
        <span style={{ fontWeight: 'bold' }}>Hakkımızda</span>
      </div>

      {/* Main Layout Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 45%) 1fr',
        gap: '48px',
        alignItems: 'center',
        marginTop: '20px'
      }} className="about-grid">
        
        {/* Left Column: Image */}
        <div style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          height: '560px'
        }}>
          <img 
            src="/about_clocktower_pizza.png" 
            alt="Di Napoli Pizza Saat Kulesi" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Right Column: Text & Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '32px', height: '2px', backgroundColor: 'var(--color-burgundy)' }}></span>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-burgundy)', letterSpacing: '2px' }}>
              HAKKIMIZDA
            </span>
          </div>

          <h1 style={{
            fontSize: '38px',
            fontWeight: '900',
            lineHeight: '1.2',
            color: 'var(--color-burgundy)',
            margin: '0 0 10px 0'
          }}>
            Bir Dilim Napoli,<br />
            Bir Şehir Lezzeti.
          </h1>

          <div style={{
            fontSize: '14.5px',
            color: '#475569',
            lineHeight: '1.8',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <p>
              Di Napoli Pizza, 1997 yılından bu yana Çanakkale'de, geleneksel Napoli pizza kültürünü, yerel malzemelerle birleştirerek sunuyor.
            </p>
            <p>
              Her pizza, günlük taze hamurla elde açılır, bol malzemeyle hazırlanır ve usta ellerden çıkar. Lezzetin özünde samimiyet, tutku ve sadelik var.
            </p>
            <p style={{ fontWeight: 'bold', color: '#1e293b' }}>
              Yıllardır değişmeyen tek şey: Her dilimde aynı kalite ve aynı özen.<br />
              Bizi ziyaret edin ya da bir dilim Napoli için hemen sipariş verin.
            </p>
          </div>

          <div style={{ marginTop: '16px' }}>
            <button 
              onClick={handleContactClick}
              style={{
                backgroundColor: 'var(--color-burgundy)',
                color: 'white',
                border: 'none',
                padding: '14px 36px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(136, 12, 12, 0.3)',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              İLETİŞİME GEÇ
            </button>
          </div>
        </div>

      </div>

      {/* Brand Values Block */}
      <div style={{
        marginTop: '64px',
        paddingTop: '48px',
        borderTop: '1px solid #e2e8f0',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '24px',
        textAlign: 'center'
      }} className="about-values">
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(136, 12, 12, 0.1)', color: 'var(--color-burgundy)', marginBottom: '12px' }}>
            <Heart size={24} />
          </div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold' }}>Samimiyet & Tutku</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>İşimizi ilk günkü aşkla yapıyor, lezzetimize sevgi katıyoruz.</p>
        </div>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '12px' }}>
            <Sparkles size={24} />
          </div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold' }}>%100 Taze Malzeme</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>Hergün taze hamur yoğuruyor, yöresel en kaliteli malzemeleri seçiyoruz.</p>
        </div>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', marginBottom: '12px' }}>
            <MapPin size={24} />
          </div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold' }}>Kordon & Saat Kulesi</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>Çanakkale'nin kalbinde, Saat Kulesi manzarasıyla hizmet veriyoruz.</p>
        </div>
      </div>
    </div>
  );
}
