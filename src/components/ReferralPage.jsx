import React, { useState } from 'react';
import { Share2, ChevronDown, ChevronUp, Gift, Key, HelpCircle } from 'lucide-react';

export default function ReferralPage({ user, usersList, onUpdateUserWallet, onGoToMenu }) {
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [couponStatus, setCouponStatus] = useState({ type: '', message: '' });
  const [faqOpen, setFaqOpen] = useState({ 0: true }); // FSS akordeon adımları

  // Generate unique code based on user phone or random generator
  const userReferralCode = user 
    ? `DN-75TL-${user.phone ? user.phone.replace(/\D/g, '').slice(-4) : 'LUIGI'}`
    : 'DN-75TL-MISAFIR';

  const handleShare = () => {
    navigator.clipboard.writeText(userReferralCode);
    alert(`Davet kodunuz kopyalandı!\n\nKod: ${userReferralCode}\nArkadaşınızla paylaşarak 75 TL kazanabilirsiniz.`);
  };

  const handleApplyReferral = (e) => {
    e.preventDefault();
    if (!user) {
      setCouponStatus({ type: 'error', message: 'Lütfen kod kullanmak için önce giriş yapın.' });
      return;
    }
    if (!referralCodeInput.trim()) return;

    const formattedCode = referralCodeInput.trim().toUpperCase();

    // Check self use
    if (formattedCode === userReferralCode) {
      setCouponStatus({ type: 'error', message: 'Kendi davet kodunuzu kullanamazsınız.' });
      return;
    }

    if (formattedCode.startsWith('DN-75TL-')) {
      // Valid format, reward the user 75 TL in their wallet
      const matchedUser = usersList.find(u => u.phone === user.phone || u.email === user.email);
      if (matchedUser) {
        const newBalance = (matchedUser.walletBalance || 0) + 75;
        onUpdateUserWallet(matchedUser.id, newBalance);
        setCouponStatus({
          type: 'success',
          message: 'Harika! Davet kodu başarıyla uygulandı ve cüzdanınıza 75 TL tanımlandı.'
        });
        setReferralCodeInput('');
      } else {
        setCouponStatus({ type: 'error', message: 'Kullanıcı kaydı bulunamadı.' });
      }
    } else {
      setCouponStatus({ type: 'error', message: 'Geçersiz veya süresi dolmuş davet kodu.' });
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      q: 'Kampanya hangi kanallarda geçerlidir?',
      a: 'Kampanya Di Napoli Pizza mobil arayüzü ve web sitesi üzerinden verilen siparişlerde geçerlidir.'
    },
    {
      q: 'Kampanyadan nasıl yararlanırım?',
      a: 'Davet eden kişinin "Arkadaşına Öner" sekmesine gelerek kodu paylaşması gerekmektedir. Davet edilen kişi üye girişi yaptıktan sonra bu kodu girdiğinde anında 75 TL cüzdan indirimi kazanır. Davet eden kişi ise davet ettiği arkadaşı siparişini tamamladığında 75 TL cüzdan ödülü kazanacaktır.'
    },
    {
      q: 'Herhangi bir arkadaş sınırı bulunmakta mıdır?',
      a: 'Hayır, dilediğiniz kadar arkadaşınızı davet edebilir ve her başarılı siparişte cüzdan bakiyenizi 75 TL artırabilirsiniz.'
    },
    {
      q: 'Cüzdan indirimi nasıl kullanılır?',
      a: 'Kazandığınız tüm cüzdan bakiyeleri sepet sayfasındaki "Cüzdan Bakiyesini Kullan" seçeneğiyle siparişinizden anında düşülür.'
    }
  ];

  return (
    <div className="referral-page-container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: 'var(--color-dark-blue)' }}>
      <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
        <span style={{ cursor: 'pointer' }} onClick={onGoToMenu}>Ana Sayfa</span>
        <span>&gt;</span>
        <span style={{ fontWeight: 'bold' }}>Arkadaşına Öner</span>
      </div>

      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: 'var(--color-burgundy)' }}>Arkadaşına Öner</h1>

      {/* Main card */}
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(235, 94, 40, 0.1)', color: 'var(--color-orange)', marginBottom: '16px' }}>
          <Gift size={32} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>
          Arkadaşına Öner ile arkadaşın sipariş verdiğinde sen de 75 TL kazan.
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          Senin davet kodun: <strong style={{ color: 'var(--color-burgundy)', fontSize: '16px' }}>{userReferralCode}</strong>
        </p>

        <button 
          onClick={handleShare}
          style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '9999px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
        >
          <Share2 size={16} />
          <span>Kodu Paylaş</span>
        </button>
      </div>

      {/* Referral Input Area */}
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
          Arkadaşına Öner kodunu girerek fırsatlardan yararlanabilirsin.
        </h3>
        <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
          Arkadaşından gelen 8 haneli davet kodunu girerek anında 75 TL cüzdan bakiyesi kazan.
        </p>

        <form onSubmit={handleApplyReferral} style={{ display: 'flex', gap: '12px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <input 
            type="text" 
            placeholder="DN-75TL-XXXX" 
            value={referralCodeInput}
            onChange={(e) => setReferralCodeInput(e.target.value)}
            style={{ flex: 1, padding: '10px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
          />
          <button 
            type="submit"
            style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Onayla
          </button>
        </form>

        {couponStatus.message && (
          <div style={{ marginTop: '16px', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', backgroundColor: couponStatus.type === 'success' ? '#ecfdf5' : '#fef2f2', color: couponStatus.type === 'success' ? '#065f46' : '#991b1b', border: `1px solid ${couponStatus.type === 'success' ? '#a7f3d0' : '#fecaca'}` }}>
            {couponStatus.message}
          </div>
        )}
      </div>

      {/* Conditions Accordion */}
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <HelpCircle size={20} color="var(--color-burgundy)" />
          <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Katılım Koşulları & SSS</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = faqOpen[idx];
            return (
              <div key={idx} style={{ border: '1px solid #f1f5f9', borderRadius: '8px', overflow: 'hidden' }}>
                <div 
                  onClick={() => toggleFaq(idx)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', backgroundColor: '#f8fafc', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {isOpen && (
                  <div style={{ padding: '16px', fontSize: '12px', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #f1f5f9', backgroundColor: 'white' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
