import React, { useState } from 'react';
import { Plus, Play, X } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('1');

  const getPrice = () => {
    if (product.pricesByPeople) {
      if (product.pricesByPeople[selectedGroup]) {
        return product.pricesByPeople[selectedGroup];
      }
    }
    if (product.category === 'pizzalar' || product.category === 'doyuran-menuler') {
      if (selectedGroup === '2') return 729;
      if (selectedGroup === '4') return 999;
      if (selectedGroup === '6') return 1249;
    }
    return product.basePrice;
  };

  const getGroupName = () => {
    if (product.pricesByPeople) {
      if (selectedGroup === '2') return '2 Kişilik Porsiyon';
      if (selectedGroup === '4') return '4 Kişilik Porsiyon';
      if (selectedGroup === '6') return '6 Kişilik Porsiyon';
      return 'Tek Kişilik (Küçük)';
    }
    if (selectedGroup === '2') return '2 Kişilik (Grup)';
    if (selectedGroup === '4') return '4 Kişilik (Aile)';
    if (selectedGroup === '6') return '6 Kişilik (Dev)';
    return '1 Kişilik';
  };

  const handleAddClick = () => {
    const finalPrice = getPrice();
    const groupName = getGroupName();
    onAddToCart({
      ...product,
      price: finalPrice,
      customInfo: selectedGroup !== '1' ? { size: { name: groupName }, crust: { name: 'Grup Menüsü' } } : null
    });
  };

  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  return (
    <>
      <div className="product-card">
        {/* Image & Badge */}
        <div className="product-card-media" style={{ position: 'relative' }}>
          <img src={product.image} alt={product.name} className="product-card-img" loading="lazy" decoding="async" />
          {product.popular && <span className="badge-popular">Çok Satan</span>}
          {product.yeKazanSlice > 0 && (
            <span className="badge-ye-kazan">+{product.yeKazanSlice} Dilim</span>
          )}

          {/* Premium Video Play Button Over Media */}
          {product.videoUrl && (
            <button 
              className="product-play-video-btn" 
              onClick={(e) => { e.stopPropagation(); setShowVideoModal(true); }}
              title="Tanıtım Videosunu Oynat"
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: '0.2s',
                zIndex: 10
              }}
            >
              <Play size={14} fill="var(--color-primary-red)" color="var(--color-primary-red)" />
            </button>
          )}
        </div>

        {/* Info */}
        <div className="product-card-body">
          <div className="product-card-title" style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-dark-blue)', marginBottom: '8px' }}>{product.name}</div>
          <p className="product-card-description">{product.description}</p>
          
          {(product.category === 'pizzalar' || product.category === 'doyuran-menuler') && (
            <div className="group-selection-box" style={{ marginTop: 'auto', marginBottom: '12px', textAlign: 'left' }}>
              <label htmlFor={`group-select-${product.id}`} style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Porsiyon / Kişilik Seçimi:</label>
              <select 
                id={`group-select-${product.id}`}
                aria-label={`${product.name} Porsiyon ve Kişilik Seçimi`}
                value={selectedGroup} 
                onChange={(e) => setSelectedGroup(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--color-border)', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: 'var(--color-dark-blue)', 
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {product.pricesByPeople ? (
                  <>
                    <option value="1">1 Kişilik (Tek) - {product.basePrice} TL</option>
                    {product.pricesByPeople['2'] && <option value="2">2 Kişilik Porsiyon - {product.pricesByPeople['2']} TL</option>}
                    {product.pricesByPeople['4'] && <option value="4">4 Kişilik Porsiyon - {product.pricesByPeople['4']} TL</option>}
                    {product.pricesByPeople['6'] && <option value="6">6 Kişilik Porsiyon - {product.pricesByPeople['6']} TL</option>}
                  </>
                ) : (
                  <>
                    <option value="1">1 Kişilik (Standart) - {product.basePrice} TL</option>
                    <option value="2">2 Kişilik (Grup Fırsatı) - 729 TL</option>
                    <option value="4">4 Kişilik (Aile Fırsatı) - 999 TL</option>
                    <option value="6">6 Kişilik (Dev Fırsat) - 1249 TL</option>
                  </>
                )}
              </select>
            </div>
          )}

          <div className="product-card-footer" style={{ marginTop: (product.category === 'pizzalar' || product.category === 'doyuran-menuler') ? '0' : 'auto' }}>
            <div className="price-info">
              <span className="price-label">{selectedGroup !== '1' ? 'Seçilen Tutar' : 'Başlayan fiyatlar'}</span>
              <span className="price-value">{getPrice()} TL</span>
            </div>
            
            <button className="add-to-cart-btn" onClick={handleAddClick}>
              <Plus size={18} />
              <span>{product.customizable && selectedGroup === '1' ? 'Seç' : 'Ekle'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Video Player Modal */}
      {showVideoModal && (
        <div className="cart-drawer-overlay" style={{ zIndex: 3000 }} onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '90%', maxWidth: '640px', background: 'black', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <button 
              onClick={() => setShowVideoModal(false)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
            >
              <X size={16} />
            </button>
            {isYouTubeUrl(product.videoUrl) ? (
              <iframe 
                width="100%" 
                height="360" 
                src={`https://www.youtube.com/embed/${getYouTubeId(product.videoUrl)}?autoplay=1`} 
                title={product.name} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ display: 'block' }}
              ></iframe>
            ) : (
              <video 
                src={product.videoUrl} 
                controls 
                autoPlay 
                style={{ width: '100%', maxHeight: '450px', display: 'block' }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
