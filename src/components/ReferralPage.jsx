import React, { useState } from 'react';
import { Share2, ChevronDown, ChevronUp, Gift, Key, HelpCircle } from 'lucide-react';

export default function ReferralPage({ 
  user, 
  usersList, 
  onUpdateUserWallet, 
  onGoToMenu, 
  referralTransactions = [], 
  onApplyReferralCode,
  rewardAmountTier = 75
}) {
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [couponStatus, setCouponStatus] = useState({ type: '', message: '' });
  const [faqOpen, setFaqOpen] = useState({ 0: true });

  const userReferralCode = user 
    ? `DN-${rewardAmountTier}TL-${user.phone ? user.phone.replace(/\D/g, '').slice(-4) : 'LUIGI'}`
    : 'DN-75TL-MISAFIR';

  const myReferrals = user ? referralTransactions.filter(t => t.referrerId === user.id) : [];
  const successfulReferralsCount = myReferrals.filter(t => t.status === 'completed').length;

  const handleShare = () => {
    navigator.clipboard.writeText(userReferralCode);
    alert(`Davet kodunuz kopyalandı!\n\nKod: ${userReferralCode}\nArkadaşınızla paylaşarak ${rewardAmountTier} TL kazanabilirsiniz.`);
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

    const res = onApplyReferralCode(user.id, formattedCode);
    if (res.success) {
      setCouponStatus({
        type: 'success',
        message: `Harika! Davet kodu başarıyla uygulandı ve cüzdanınıza ${res.rewardAmount} TL tanımlandı.`
      });
      setReferralCodeInput('');
    } else {
      setCouponStatus({ type: 'error', message: res.message });
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
      q: '10 Davet / 100 TL Kuralı nedir?',
      a: 'Eğer davet kodunuz ile sitemize getirdiğiniz 10 yeni üye sipariş (satış) verirse, bundan sonraki her davetiniz ve kendi siparişleriniz için kazanacağınız cüzdan indirimi kalıcı olarak 100 TL olacaktır!'
    },
    {
      q: 'Davet indirimi tek kullanımlık mıdır?',
      a: 'Evet, her davet kodu ve her yeni üyenin davet indirim hakkı tek kullanımlıktır.'
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

      {/* Invite progress bar */}
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>10 Sipariş Hedefi İlerlemesi</h4>
          <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-burgundy)' }}>{successfulReferralsCount} / 10 Başarılı Davet</span>
        </div>
        <div style={{ width: '100%', height: '12px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
          <div style={{ width: `${Math.min(100, (successfulReferralsCount / 10) * 100)}%`, height: '100%', backgroundColor: '#10b981', transition: 'width 0.4s ease' }} />
        </div>
        <p style={{ margin: 0, fontSize: '11px', color: '#64748b', textAlign: 'left' }}>
          {successfulReferralsCount >= 10 
            ? 'Tebrikler! 10 başarılı davet barajını aştınız. Bundan sonraki tüm kazançlarınız kalıcı olarak sipariş başına 100 TL olacaktır!' 
            : `10 başarılı davete ulaştığınızda, kazancınız ve arkadaş indirimi otomatik olarak 100 TL'ye yükselecektir! (Kalan: ${10 - successfulReferralsCount} davet)`
          }
        </p>
      </div>

      {/* My Invites list */}
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', marginBottom: '32px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', textAlign: 'left' }}>Davet Ettiklerim ve Durumları</h4>
        {myReferrals.length === 0 ? (
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', textAlign: 'left' }}>Henüz kodunuzu kullanan bir arkadaşınız bulunmuyor.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
                <th style={{ padding: '8px 4px' }}>Arkadaş Adı</th>
                <th style={{ padding: '8px 4px' }}>Telefon</th>
                <th style={{ padding: '8px 4px' }}>Durum</th>
                <th style={{ padding: '8px 4px' }}>Senin Kazancın</th>
                <th style={{ padding: '8px 4px' }}>Tarih</th>
              </tr>
            </thead>
            <tbody>
              {myReferrals.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 4px', fontWeight: 'bold' }}>{t.refereeName}</td>
                  <td style={{ padding: '10px 4px' }}>{t.refereePhone}</td>
                  <td style={{ padding: '10px 4px' }}>
                    <span style={{ 
                      padding: '2px 8px', 
                      borderRadius: '9999px', 
                      fontSize: '10px', 
                      fontWeight: 'bold', 
                      backgroundColor: t.status === 'completed' ? '#ecfdf5' : '#fffbeb', 
                      color: t.status === 'completed' ? '#065f46' : '#b45309' 
                    }}>
                      {t.status === 'completed' ? 'Sipariş Verdi' : 'Üye Oldu (Beklemede)'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 4px', fontWeight: 'bold', color: t.status === 'completed' ? '#10b981' : '#64748b' }}>
                    {t.status === 'completed' ? `+${t.rewardAmount} TL` : 'Beklemede'}
                  </td>
                  <td style={{ padding: '10px 4px', color: '#64748b' }}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Conditions Accordion */}
      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', marginBottom: '32px' }}>
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
