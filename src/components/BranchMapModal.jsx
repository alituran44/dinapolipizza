import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Search, Navigation, Compass, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export default function BranchMapModal({ 
  isOpen, 
  onClose, 
  deliveryMode, 
  onChangeDeliveryMode, 
  onSelectAddress, 
  onSelectBranch 
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState(deliveryMode || 'delivery');
  const [addressInput, setAddressInput] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState('kordon');
  const [branchIndex, setBranchIndex] = useState(0);

  useEffect(() => {
    if (deliveryMode) {
      setActiveTab(deliveryMode);
    }
  }, [deliveryMode]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onChangeDeliveryMode) {
      onChangeDeliveryMode(tab);
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const finalAddress = addressInput.trim() || "Kemalpaşa Mah. Şair Ece Ayhan Meydanı No:9/A";
    onSelectAddress(finalAddress);
    onClose();
  };

  const handleBranchSubmit = () => {
    if (selectedBranchId === 'kordon') {
      onSelectBranch("Kemalpaşa Mah. Şair Ece Ayhan Meydanı No:9/A (Saat Kulesi Şubesi)");
    } else {
      onSelectBranch("Kepez Beldesi Boğazkent Mah. No:41/A (Kepez Şubesi)");
    }
    onClose();
  };

  const branches = [
    {
      id: 'kordon',
      name: 'CANAKKALE KORDON',
      distance: '2.2 KM',
      address: 'Cevatpaşa Mahallesi İnönü Caddesi No:64/1 Merkez ÇANAKKALE',
      hours: '11:00 - 01:00',
      status: 'KAPALI'
    },
    {
      id: 'kepez',
      name: 'CANAKKALE KEPEZ',
      distance: '4.8 KM',
      address: 'Kepez Beldesi Boğazkent Mah. No:41/A Merkez Çanakkale',
      hours: '11:00 - 01:00',
      status: 'KAPALI'
    }
  ];

  const filteredBranches = onlyOpen ? [] : branches; // Simulating onlyOpen filter

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        backgroundColor: '#f8fafc',
        width: '100%',
        maxWidth: '560px',
        height: '90vh',
        maxHeight: '720px',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header Navigation Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: 'white',
          position: 'relative'
        }}>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          
          <h2 style={{
            fontSize: '16px',
            fontWeight: '800',
            color: '#1e293b',
            margin: '0 auto',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {activeTab === 'delivery' ? 'Yeni Adres Ekle' : 'Teslimat Yöntemini Belirle'}
          </h2>
        </div>

        {/* Tab Selection Area always visible */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          padding: '12px 16px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <button
            onClick={() => handleTabChange('delivery')}
            style={{
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              border: '1px solid #2B0505',
              backgroundColor: activeTab === 'delivery' ? '#2B0505' : 'white',
              color: activeTab === 'delivery' ? 'white' : '#2B0505',
              transition: 'all 0.2s'
            }}
          >
            Adrese Teslim
          </button>
          <button
            onClick={() => handleTabChange('pickup')}
            style={{
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              border: '1px solid #2B0505',
              backgroundColor: activeTab === 'pickup' ? '#2B0505' : 'white',
              color: activeTab === 'pickup' ? 'white' : '#2B0505',
              transition: 'all 0.2s'
            }}
          >
            Beklemeden Gel-Al
          </button>
        </div>

        {/* Address Search Field */}
        <div style={{
          padding: '16px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            flexGrow: 1
          }}>
            <Search 
              size={18} 
              color="#64748b" 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} 
            />
            <input 
              type="text"
              placeholder="Örn. Maslak Mh. Yelkovan Sk."
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>

          {activeTab === 'pickup' && (
            <button style={{
              padding: '9px 14px',
              borderRadius: '12px',
              border: '1px solid #2B0505',
              backgroundColor: 'white',
              color: '#2B0505',
              fontWeight: 'bold',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}>
              Listeden Seç
            </button>
          )}
        </div>

        {/* Filter Area for Pickup */}
        {activeTab === 'pickup' && (
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <input 
              type="checkbox" 
              id="open-branches-checkbox"
              checked={onlyOpen}
              onChange={(e) => setOnlyOpen(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="open-branches-checkbox" style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', cursor: 'pointer' }}>
              Açık Şubeler
            </label>
          </div>
        )}

        {/* Interactive Google Map Area */}
        <div style={{
          flexGrow: 1,
          position: 'relative',
          backgroundColor: '#e2e8f0',
          overflow: 'hidden'
        }}>
          {activeTab === 'delivery' ? (
            <iframe 
              src="https://maps.google.com/maps?q=%C3%87anakkale%20Atikhisar%20Caddesi&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Adrese Teslim Harita Seçimi"
            ></iframe>
          ) : (
            <iframe 
              src="https://maps.google.com/maps?q=Kemalpa%C5%9Fa%20Mah.%20%C5%9Eair%20Ece%20Ayhan%20Meydan%C4%B1%20No%3A9%2FA%20Saat%20Kulesi%20Kar%C5%9F%C4%B1s%C4%B1%20Merkez%20%2F%20%C3%87anakkale&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Gel Al Şube Harita Seçimi"
            ></iframe>
          )}

          {/* Zoom Buttons Layer (Simulated overlay styling) */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #cbd5e1'
          }}>
            <button style={{ width: '40px', height: '40px', backgroundColor: 'white', border: 'none', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            <button style={{ width: '40px', height: '40px', backgroundColor: 'white', border: 'none', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
          </div>

          {/* Locate Me button */}
          <button style={{
            position: 'absolute',
            bottom: activeTab === 'delivery' ? '20px' : '150px',
            right: '20px',
            backgroundColor: 'white',
            border: '1px solid #cbd5e1',
            borderRadius: '30px',
            padding: '8px 16px',
            fontWeight: 'bold',
            fontSize: '12px',
            color: '#2B0505',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            <Compass size={16} />
            <span>Konumumu Bul</span>
          </button>

          {/* Slider Arrows for Pickup Card list */}
          {activeTab === 'pickup' && filteredBranches.length > 1 && (
            <>
              <button 
                onClick={() => setBranchIndex(prev => prev === 0 ? filteredBranches.length - 1 : prev - 1)}
                style={{
                  position: 'absolute',
                  bottom: '68px',
                  left: '4px',
                  backgroundColor: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  zIndex: 100,
                  border: '1px solid #e2e8f0'
                }}
              >
                <ChevronLeft size={18} color="#2B0505" />
              </button>
              <button 
                onClick={() => setBranchIndex(prev => prev === filteredBranches.length - 1 ? 0 : prev + 1)}
                style={{
                  position: 'absolute',
                  bottom: '68px',
                  right: '4px',
                  backgroundColor: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  zIndex: 100,
                  border: '1px solid #e2e8f0'
                }}
              >
                <ChevronRight size={18} color="#2B0505" />
              </button>
            </>
          )}

          {/* Horizontal Card overlay for Gel-Al */}
          {activeTab === 'pickup' && filteredBranches.length > 0 && (
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '16px',
              right: '16px',
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '4px'
            }}>
              {filteredBranches.map((br, i) => (
                <div 
                  key={br.id}
                  onClick={() => setSelectedBranchId(br.id)}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    minWidth: '240px',
                    flex: '1 0 calc(50% - 6px)',
                    border: selectedBranchId === br.id ? '2.5px solid #2B0505' : '1px solid #cbd5e1',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '8px',
                    transition: 'all 0.2s',
                    transform: selectedBranchId === br.id ? 'scale(1.01)' : 'scale(1)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: '900', color: '#1e293b', margin: 0 }}>{br.name}</h4>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{br.distance}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4', margin: '4px 0', textAlign: 'left' }}>{br.address}</p>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Çalışma Saati: {br.hours}</span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      color: 'white',
                      backgroundColor: '#ef4444',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>{br.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area with Confirmation Buttons */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: 'white'
        }}>
          {activeTab === 'delivery' ? (
            <>
              {/* Information Banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#fffbeb',
                border: '1px solid #fef3c7',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '16px',
                textAlign: 'left'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  flexShrink: 0
                }}>!</div>
                <p style={{ fontSize: '12px', color: '#b45309', margin: 0, fontWeight: '700' }}>
                  Siparişiniz seçtiğiniz adrese teslim edilecektir.
                </p>
              </div>

              <button 
                onClick={handleAddressSubmit}
                style={{
                  width: '100%',
                  backgroundColor: '#2B0505',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(43, 5, 5, 0.2)'
                }}
              >
                Bu Adresle Devam Et
              </button>
            </>
          ) : (
            <button 
              onClick={handleBranchSubmit}
              style={{
                width: '100%',
                backgroundColor: '#2B0505',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(43, 5, 5, 0.2)'
              }}
            >
              Seçili şube ile devam et
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
