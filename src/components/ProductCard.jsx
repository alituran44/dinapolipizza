import React, { useState } from 'react';
import { Plus, Play, X } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleAddClick = () => {
    onAddToCart({
      ...product,
      price: product.basePrice,
      customInfo: null
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
          <img src={product.image} alt={product.name} className="product-card-img" />
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
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-description">{product.description}</p>
          
          <div className="product-card-footer">
            <div className="price-info">
              <span className="price-label">Başlayan fiyatlar</span>
              <span className="price-value">{product.basePrice} TL</span>
            </div>
            
            <button className="add-to-cart-btn" onClick={handleAddClick}>
              <Plus size={18} />
              <span>{product.customizable ? 'Seç' : 'Ekle'}</span>
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
