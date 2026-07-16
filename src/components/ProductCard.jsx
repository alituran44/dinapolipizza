import React from 'react';
import { Plus } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const handleAddClick = () => {
    onAddToCart({
      ...product,
      price: product.basePrice,
      customInfo: null
    });
  };

  return (
    <div className="product-card">
      {/* Image & Badge */}
      <div className="product-card-media">
        <img src={product.image} alt={product.name} className="product-card-img" />
        {product.popular && <span className="badge-popular">Çok Satan</span>}
        {product.yeKazanSlice > 0 && (
          <span className="badge-ye-kazan">+{product.yeKazanSlice} Dilim</span>
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
  );
}
