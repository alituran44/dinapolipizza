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
        <span style={{ fontWeight: 'bold' }}>İletişim</span>
      </div>

      <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--color-burgundy)', marginBottom: '32px', textAlign: 'left' }}>
        İletişime Geçin
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'start'
      }} className="contact-grid">
        
        {/* Left Side: Map & Address Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            border: '1px solid #e2e8f0',
            height: '420px'
          }}>
            <iframe 
              src="https://maps.google.com/maps?q=%C5%9Eair%20Ece%20Ayhan%20Meydan%C4%B1%20Saat%20Kulesi%20Di%20Napoli%20Pizza%20%C3%87anakkale&t=&z=17&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Di Napoli Pizza Saat Kulesi Şubesi"
            ></iframe>
          </div>

          {/* Quick contact tags */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <MapPin size={18} color="var(--color-burgundy)" />
              <span>Kemalpaşa Mah. Şair Ece Ayhan Meydanı No:9/A Saat Kulesi Karşısı Merkez / Çanakkale</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <Phone size={18} color="var(--color-burgundy)" />
              <span style={{ fontWeight: 'bold' }}>+90 505 726 17 17 / 0 286 217 00 17</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <Mail size={18} color="var(--color-burgundy)" />
              <span>dinapolipizza1997@gmail.com</span>
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
    </div>
  );
}
