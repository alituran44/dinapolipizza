import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ContactPage({ onGoToMenu }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedBranchTab, setSelectedBranchTab] = useState('saat-kulesi');

  const branches = [
    {
      id: 'saat-kulesi',
      title: 'Merkez Şube: Saat Kulesi',
      badge: 'Ana Merkez',
      address: 'Kemalpaşa Mah. Şair Ece Ayhan Meydanı No:9/A Saat Kulesi Karşısı Merkez / Çanakkale',
      mapUrl: 'https://maps.google.com/maps?q=40.14917,26.40114(Di%20Napoli%20Pizza%20Saat%20Kulesi)&t=&z=18&ie=UTF8&iwloc=B&output=embed',
      directionsUrl: 'https://maps.google.com/maps?q=40.14917,26.40114(Di%20Napoli%20Pizza%20Saat%20Kulesi)',
      phones: ['+90 505 726 17 17', '0 286 212 50 51', '0 286 212 30 17', '0 286 212 32 76']
    },
    {
      id: 'hamidiye',
      title: 'Şube: Dinapolipizza Hamidiye',
      badge: 'Yeni Şube',
      address: 'Hamidiye Mh. Rauf Denktaş Cd. Sahra Sit. No: 1 B2 Blok Kepez / Çanakkale',
      mapUrl: 'https://maps.google.com/maps?q=Hamidiye+Mahallesi+Rauf+Denkta%C5%9F+Caddesi+Sahra+Sitesi+No:1+Kepez+%C3%87anakkale&t=&z=16&ie=UTF8&iwloc=B&output=embed',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Hamidiye+Mahallesi+Rauf+Denkta%C5%9F+Caddesi+Sahra+Sitesi+No:1+Kepez+%C3%87anakkale',
      phones: ['0 505 640 17 35', '0 286 212 50 51']
    }
  ];

  const currentBranch = branches.find(b => b.id === selectedBranchTab) || branches[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Lütfen gerekli alanları doldurun (Ad, E-Posta ve Mesaj).');
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', color: 'var(--color-dark-blue)' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>
        <span style={{ cursor: 'pointer' }} onClick={onGoToMenu}>Ana Sayfa</span>
        <span>&gt;</span>
        <span style={{ fontWeight: 'bold' }}>İletişim & Şubelerimiz</span>
      </div>

      <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--color-burgundy)', marginBottom: '24px', textAlign: 'left' }}>
        Şubelerimiz & İletişim
      </h1>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '40px',
        alignItems: 'start'
      }} className="contact-grid">
        
        {/* Left Side: Map & Address Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Branch Selector Tabs */}
          <div style={{ display: 'flex', gap: '10px', background: '#f1f5f9', padding: '6px', borderRadius: '14px' }}>
            {branches.map(br => (
              <button
                key={br.id}
                type="button"
                onClick={() => setSelectedBranchTab(br.id)}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '800',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                  backgroundColor: selectedBranchTab === br.id ? 'var(--color-burgundy)' : 'transparent',
                  color: selectedBranchTab === br.id ? 'white' : '#475569',
                  boxShadow: selectedBranchTab === br.id ? '0 4px 12px rgba(139,0,0,0.2)' : 'none'
                }}
              >
                <MapPin size={16} />
                <span>{br.title}</span>
              </button>
            ))}
          </div>

          {/* Interactive Google Map */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            border: '1px solid #e2e8f0',
            height: '380px',
            position: 'relative'
          }}>
            <iframe 
              src={currentBranch.mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={currentBranch.title}
            ></iframe>
          </div>

          {/* Quick contact tags for selected branch */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: '900', fontSize: '15px', color: 'var(--color-burgundy)' }}>
                📍 {currentBranch.title}
              </div>
              <a
                href={currentBranch.directionsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 6px rgba(37,99,235,0.3)'
                }}
              >
                🗺️ Yol Tarifi Al ↗
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#334155' }}>
              <MapPin size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ lineHeight: '1.5' }}>{currentBranch.address}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px' }}>
              <Phone size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', fontWeight: 'bold' }}>
                {currentBranch.phones.map((phone, pIdx) => (
                  <React.Fragment key={pIdx}>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ color: pIdx === 0 ? 'var(--color-burgundy)' : '#1e293b', textDecoration: 'none' }}>
                      {phone}
                    </a>
                    {pIdx < currentBranch.phones.length - 1 && <span style={{ color: '#cbd5e1' }}>•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <Mail size={18} color="var(--color-burgundy)" />
              <a href="mailto:dinapolipizza1997@gmail.com" style={{ color: '#475569', textDecoration: 'none' }}>
                dinapolipizza1997@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)'
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Mesajınız Gönderildi!</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px', lineHeight: '1.6' }}>
                Bizimle iletişime geçtiğiniz için teşekkür ederiz. Mesajınız ekibimize ulaştı, en kısa sürede dönüş sağlayacağız.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                style={{ backgroundColor: 'var(--color-burgundy)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', textAlign: 'left' }}>Bize Mesaj Bırakın</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Ad Soyad *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Adınız ve Soyadınız"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>E-Posta *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="E-posta adresiniz"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Telefon</label>
                  <input 
                    type="tel" 
                    placeholder="Telefon numaranız"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Konu</label>
                  <input 
                    type="text" 
                    placeholder="Mesaj konusu"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Mesajınız *</label>
                <textarea 
                  required 
                  rows={4}
                  placeholder="Mesajınızı detaylıca yazın..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  backgroundColor: '#880c0c',
                  color: '#ffffff',
                  border: '1px solid #d4af37',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: '900',
                  fontSize: '14px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 12px rgba(136, 12, 12, 0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#eb5e28';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#880c0c';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <Send size={16} color="#ffffff" />
                <span style={{ color: '#ffffff' }}>Mesajı Gönder</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* İnteraktif Çalışma & Sipariş Yoğunluk Takvimi */}
      <div style={{
        marginTop: '48px',
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
        textAlign: 'left'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: 'var(--color-primary-red)' }}>📅 Haftalık Çalışma & Sipariş Takvimi</h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
          Di Napoli Pizza Saat Kulesi şubemizin haftalık sipariş kabul takvimi ve anlık mutfak yoğunluk durumları. Sipariş vermeden önce yoğunluk kontrolü yapabilirsiniz.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px'
        }}>
          {[
            { day: 'Pazartesi', hours: '11:00 - 02:00', status: 'Sakin', color: '#10b981' },
            { day: 'Salı', hours: '11:00 - 02:00', status: 'Normal', color: '#3b82f6' },
            { day: 'Çarşamba', hours: '11:00 - 02:00', status: 'Yoğun', color: '#f59e0b' },
            { day: 'Perşembe', hours: '11:00 - 02:00', status: 'Normal', color: '#3b82f6' },
            { day: 'Cuma', hours: '11:00 - 03:00', status: 'Çok Yoğun', color: '#ef4444' },
            { day: 'Cumartesi', hours: '11:00 - 03:00', status: 'Çok Yoğun', color: '#ef4444' },
            { day: 'Pazar', hours: '11:00 - 03:00', status: 'Normal', color: '#3b82f6' }
          ].map((item, idx) => {
            const isToday = new Date().getDay() === (idx === 6 ? 0 : idx + 1);
            return (
              <div 
                key={item.day}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: isToday ? '2px solid var(--color-primary-red)' : '1px solid #e2e8f0',
                  backgroundColor: isToday ? 'rgba(122, 12, 12, 0.03)' : '#f8fafc',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                {isToday && (
                  <span style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--color-primary-red)',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: '900',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    textTransform: 'uppercase'
                  }}>Bugün</span>
                )}
                <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px', color: 'var(--color-dark-blue)' }}>{item.day}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px' }}>{item.hours}</div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: item.color,
                  padding: '3px 8px',
                  borderRadius: '20px'
                }}>{item.status}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
