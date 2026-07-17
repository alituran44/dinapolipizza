import React, { useState } from 'react';
import { X, MapPin, Plus, Trash2, Edit2, Check } from 'lucide-react';

export default function AddressesModal({ 
  isOpen, 
  onClose, 
  userAddresses = [], 
  activeAddress = '',
  onSelectAddress,
  onAddAddress,
  onDeleteAddress,
  onUpdateAddress 
}) {
  if (!isOpen) return null;

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  
  const [form, setForm] = useState({
    title: '',
    street: '',
    binaNo: '',
    katNo: '',
    daireNo: '',
    description: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title || !form.street) {
      alert('Lütfen en azından Adres Başlığı ve Sokak/Cadde alanlarını doldurun.');
      return;
    }

    const fullText = `${form.street} No: ${form.binaNo || '-'}, Kat: ${form.katNo || '-'}, Daire: ${form.daireNo || '-'} ${form.description ? `(${form.description})` : ''}, Çanakkale / Merkez`;

    if (editingAddressId) {
      onUpdateAddress(editingAddressId, {
        title: form.title,
        text: fullText
      });
      setEditingAddressId(null);
    } else {
      onAddAddress({
        id: `addr-${Date.now()}`,
        title: form.title,
        text: fullText
      });
    }

    // Reset form
    setForm({ title: '', street: '', binaNo: '', katNo: '', daireNo: '', description: '' });
    setIsAddingNew(false);
  };

  const startEdit = (addr) => {
    setEditingAddressId(addr.id);
    setIsAddingNew(true);
    // Parse address text roughly to prefill form
    const parts = addr.text.split(', ');
    setForm({
      title: addr.title,
      street: parts[0] || '',
      binaNo: '',
      katNo: '',
      daireNo: '',
      description: ''
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1500,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 24px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <MapPin size={20} />
            <span>Adreslerim</span>
          </h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {isAddingNew ? (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1e293b' }}>
                {editingAddressId ? 'Adresi Güncelle' : 'Yeni Adres Ekle'}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Adres Başlığı (Örn: Ev, İş, Okul)</label>
                <input 
                  type="text"
                  required
                  placeholder="Başlık girin..."
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Sokak, Cadde, Mahalle</label>
                <input 
                  type="text"
                  required
                  placeholder="Mahalle, Sokak ismi girin..."
                  value={form.street}
                  onChange={e => setForm({...form, street: e.target.value})}
                  style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Bina No</label>
                  <input 
                    type="text"
                    placeholder="No"
                    value={form.binaNo}
                    onChange={e => setForm({...form, binaNo: e.target.value})}
                    style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Kat</label>
                  <input 
                    type="text"
                    placeholder="Kat"
                    value={form.katNo}
                    onChange={e => setForm({...form, katNo: e.target.value})}
                    style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Daire No</label>
                  <input 
                    type="text"
                    placeholder="Daire"
                    value={form.daireNo}
                    onChange={e => setForm({...form, daireNo: e.target.value})}
                    style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>Adres Tarifi / Ekstra Not (İsteğe Bağlı)</label>
                <input 
                  type="text"
                  placeholder="Zile basmayın vb..."
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  style={{ padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button 
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingAddressId(null);
                  }}
                  style={{ flex: 1, padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'white', color: '#64748b', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  İptal
                </button>
                <button 
                  type="submit"
                  style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', backgroundColor: '#10b981', color: 'white', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {editingAddressId ? 'Değişiklikleri Kaydet' : 'Adresi Ekle'}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Kayıtlı Adresleriniz</span>
                <button 
                  onClick={() => setIsAddingNew(true)}
                  style={{ border: 'none', background: 'none', color: 'var(--color-burgundy)', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                  <Plus size={16} />
                  <span>Yeni Ekle</span>
                </button>
              </div>

              {userAddresses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: '#64748b' }}>
                  <MapPin size={36} style={{ margin: '0 auto 12px auto', opacity: 0.3 }} />
                  <p style={{ margin: 0, fontSize: '13px' }}>Henüz kayıtlı bir adresiniz bulunmuyor.</p>
                </div>
              ) : (
                userAddresses.map(addr => {
                  const isActive = activeAddress === addr.text;
                  return (
                    <div 
                      key={addr.id} 
                      style={{
                        border: `1.5px solid ${isActive ? '#10b981' : '#e2e8f0'}`,
                        borderRadius: '12px',
                        padding: '16px',
                        backgroundColor: isActive ? '#f0fdf4' : 'white',
                        position: 'relative',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        onSelectAddress(addr.text);
                        onClose();
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--color-dark-blue)' }}>{addr.title}</span>
                        {isActive && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', backgroundColor: '#10b981', color: 'white', fontSize: '9px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '9999px' }}>
                            <Check size={8} />
                            <span>Aktif Adres</span>
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#475569', lineHeight: '1.5', paddingRight: '24px' }}>
                        {addr.text}
                      </p>
                      
                      {/* Action buttons */}
                      <div 
                        style={{ display: 'flex', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '10px', justifyContent: 'flex-end' }}
                        onClick={e => e.stopPropagation()} // Card click override
                      >
                        <button 
                          onClick={() => startEdit(addr)}
                          style={{ border: 'none', background: 'none', color: '#64748b', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        >
                          <Edit2 size={12} />
                          <span>Düzenle</span>
                        </button>
                        <button 
                          onClick={() => onDeleteAddress(addr.id)}
                          style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        >
                          <Trash2 size={12} />
                          <span>Sil</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
