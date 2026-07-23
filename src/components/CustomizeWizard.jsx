import React, { useState } from 'react';
import { 
  ChevronRight, ChevronLeft, Plus, Minus, X, Check, Search, Share2, Twitter, Facebook, MessageSquare, Link
} from 'lucide-react';

export default function CustomizeWizard({ 
  product, 
  pizzas, 
  doughOptions, 
  crustOptions, 
  ingredientOptions, 
  onAddToCart, 
  onClose 
}) {
  const isSinglePizza = (!product.requiredPizzaSelections || product.requiredPizzaSelections <= 1) && product.category !== 'kampanya';

  const getSlotSizeInfo = (prod, idx) => {
    const id = prod.id;
    if (id === 'firsat-2al1ode') {
      return idx === 0 ? 'Medium Boy' : 'Small Boy (Bedava)';
    }
    if (id === 'firsat-3al2ode') {
      return idx < 2 ? 'Medium (Orta) Boy' : 'Small (Küçük) Boy (Bedava)';
    }
    if (id === 'firsat-sefin') {
      return 'Medium (Orta) Boy';
    }
    if (id === 'firsat-arkadas') {
      return 'Small (Küçük) Boy';
    }
    if (id === 'firsat-2kisilik') {
      return 'Large (Büyük) Boy';
    }
    if (id === 'firsat-4kisilik') {
      return 'XLarge (Battal) Boy';
    }
    if (id === 'firsat-6kisilik') {
      return 'XXLarge (Dev) Boy';
    }
    return 'Standart Boy';
  };

  const [selectedGroup, setSelectedGroup] = useState('1');
  const [linkCopied, setLinkCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Wizard stages: 'summary' (main screen), 'pizza-select' (selecting a slot), 'pizza-customize' (fine tuning a selected pizza)
  const [wizardStage, setWizardStage] = useState(isSinglePizza ? 'pizza-customize' : 'summary'); 
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(isSinglePizza ? 0 : null);
  
  // Track selected pizzas for each required slot
  const [pizzaSlots, setPizzaSlots] = useState(() => {
    const defaultDough = (doughOptions && doughOptions.length > 0) ? doughOptions[0] : { id: 'ince', name: 'İnce Hamur', price: 0 };
    const defaultCrust = (crustOptions && crustOptions.length > 0) ? crustOptions[0] : { id: 'klasik', name: 'Klasik Kenar', price: 0 };
    if (isSinglePizza) {
      return [{
        ...product,
        selectedDough: defaultDough,
        selectedCrust: defaultCrust,
        removedIngredients: [],
        extras: []
      }];
    }
    return Array(product.requiredPizzaSelections ? product.requiredPizzaSelections : 1).fill(null);
  });

  // Temporary pizza selection being customized
  const [tempCustomization, setTempCustomization] = useState(() => {
    const defaultDough = (doughOptions && doughOptions.length > 0) ? doughOptions[0] : { id: 'ince', name: 'İnce Hamur', price: 0 };
    const defaultCrust = (crustOptions && crustOptions.length > 0) ? crustOptions[0] : { id: 'klasik', name: 'Klasik Kenar', price: 0 };
    if (isSinglePizza) {
      return {
        ...product,
        selectedDough: defaultDough,
        selectedCrust: defaultCrust,
        removedIngredients: [],
        extras: []
      };
    }
    return null;
  });
  
  // Overall campaign quantity
  const [quantity, setQuantity] = useState(1);

  // Calculate single pizza price
  const getGroupModifierPrice = () => {
    if (selectedGroup === '2') return 729;
    if (selectedGroup === '4') return 999;
    if (selectedGroup === '6') return 1249;
    return 0;
  };

  const calculateSinglePizzaPrice = (pizza) => {
    if (!pizza) return product.basePrice;
    let price = product.basePrice;
    if (pizza.selectedDough) {
      price += (pizza.selectedDough.price || 0);
    }
    if (pizza.selectedCrust) {
      price += (pizza.selectedCrust.price || 0);
    }
    if (Array.isArray(pizza.extras)) {
      pizza.extras.forEach(extra => {
        if (extra) {
          price += (extra.price || 0);
        }
      });
    }
    return price;
  };

  // Calculate customized price
  const calculateTotalPrice = () => {
    const groupPrice = getGroupModifierPrice();
    if (groupPrice > 0) {
      return groupPrice * quantity;
    }

    if (isSinglePizza) {
      return calculateSinglePizzaPrice(tempCustomization || pizzaSlots[0]) * quantity;
    }

    let price = product.basePrice;
    
    // Add up any extra ingredients or premium dough/crust options selected in slots
    pizzaSlots.forEach(slot => {
      if (slot) {
        if (slot.selectedDough) {
          price += (slot.selectedDough.price || 0);
        }
        if (slot.selectedCrust) {
          price += (slot.selectedCrust.price || 0);
        }
        if (Array.isArray(slot.extras)) {
          slot.extras.forEach(extra => {
            if (extra) {
              price += (extra.price || 0);
            }
          });
        }
      }
    });

    return price * quantity;
  };

  // Open the selector for a specific pizza slot
  const handleOpenSlot = (index) => {
    setSelectedSlotIndex(index);
    setWizardStage('pizza-select');
  };

  // Start customizing a specific pizza
  const handleSelectPizzaForSlot = (pizza) => {
    setTempCustomization({
      ...pizza,
      selectedDough: doughOptions[0], 
      selectedCrust: crustOptions[0], 
      removedIngredients: [],         
      extras: []                      
    });
    setWizardStage('pizza-customize');
  };

  // Toggle standard ingredient removal
  const handleToggleStandardIngredient = (ingredientName) => {
    setTempCustomization(prev => {
      const currentRemoved = prev.removedIngredients || [];
      const isRemoved = currentRemoved.includes(ingredientName);
      const updatedRemoved = isRemoved
        ? currentRemoved.filter(name => name !== ingredientName)
        : [...currentRemoved, ingredientName];
      return {
        ...prev,
        removedIngredients: updatedRemoved
      };
    });
  };

  // Toggle extra ingredient additions
  const handleToggleExtraIngredient = (ingredient) => {
    setTempCustomization(prev => {
      const currentExtras = prev.extras || [];
      const exists = currentExtras.some(item => item.id === ingredient.id);
      const updatedExtras = exists
        ? currentExtras.filter(item => item.id !== ingredient.id)
        : [...currentExtras, ingredient];
      return {
        ...prev,
        extras: updatedExtras
      };
    });
  };

  // Save the temporary pizza selection to the active slot
  const handleSavePizzaCustomization = () => {
    if (isSinglePizza) {
      // For single pizzas, clicking "Devam Et" directly adds it to the cart and closes the wizard
      const targetPizza = tempCustomization;
      const finalPrice = calculateSinglePizzaPrice(targetPizza);
      onAddToCart({
        ...product,
        price: finalPrice,
        quantity: quantity,
        customInfo: {
          isCampaignWizard: false,
          selectedPizzas: [targetPizza]
        }
      });
      onClose();
      return;
    }

    const updatedSlots = [...pizzaSlots];
    updatedSlots[selectedSlotIndex] = tempCustomization;
    
    setPizzaSlots(updatedSlots);
    setTempCustomization(null);
    setSelectedSlotIndex(null);
    setWizardStage('summary');
  };

  const handleAddToCartClick = () => {
    const groupPrice = getGroupModifierPrice();
    if (groupPrice > 0) {
      const groupName = selectedGroup === '2' ? '2 Kişilik (Grup)' : selectedGroup === '4' ? '4 Kişilik (Aile)' : '6 Kişilik (Dev)';
      onAddToCart({
        ...product,
        price: groupPrice,
        quantity: quantity,
        customInfo: {
          isCampaignWizard: false,
          selectedPizzas: [{
            ...product,
            selectedDough: { name: 'Standart Hamur' },
            selectedCrust: { name: 'Standart Kenar' },
            selectedSize: { id: selectedGroup, name: groupName }
          }]
        }
      });
      onClose();
      return;
    }

    if (isSinglePizza) {
      const targetPizza = tempCustomization || pizzaSlots[0];
      const finalPrice = calculateSinglePizzaPrice(targetPizza);
      onAddToCart({
        ...product,
        price: finalPrice,
        quantity: quantity,
        customInfo: {
          isCampaignWizard: false,
          selectedPizzas: [targetPizza]
        }
      });
      onClose();
      return;
    }

    // Verify all slots are filled
    const allFilled = pizzaSlots.every(slot => slot !== null);
    if (!allFilled) {
      alert('Lütfen kampanya kapsamındaki tüm pizza seçimlerinizi tamamlayın.');
      return;
    }

    const finalPricePerUnit = calculateTotalPrice() / quantity;

    onAddToCart({
      ...product,
      price: finalPricePerUnit,
      quantity: quantity,
      customInfo: {
        isCampaignWizard: true,
        selectedPizzas: pizzaSlots
      }
    });

    onClose();
  };

  return (
    <div className="wizard-page-layout">
      {/* Wizard Header */}
      <header className="site-header-blue" style={{ position: 'relative' }}>
        <div className="container header-inner-blue">
          <div className="header-left-group">
            <button className="nav-link-white" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ChevronLeft size={18} />
              <span>Ana Sayfaya Dön</span>
            </button>
          </div>
          <div className="header-right-group">
            <img src="/logo.png" alt="logo" style={{ height: '48px', objectFit: 'contain' }} />
          </div>
        </div>
      </header>

      {/* Main Wizard Content */}
      <div className="container wizard-body-grid">
        {/* Left Side: Summary, Image, Quantity and Add to Cart */}
        <div className="wizard-left-panel">
          <div className="wizard-breadcrumb">
            Ana Sayfa &gt; Tüm Pizzalar &gt; {product.name}
          </div>
          
          <h1 className="wizard-product-title">
            {isSinglePizza && tempCustomization ? tempCustomization.name : product.name}
          </h1>

          {/* Sosyal Medya Paylaşım Butonları */}
          <div className="wizard-share-bar">
            <span className="share-title"><Share2 size={13} /> Paylaş:</span>
            <div className="share-buttons-group">
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Di Napoli Çanakkale\'de enfes ' + (isSinglePizza && tempCustomization ? tempCustomization.name : product.name) + ' lezzetini keşfettim! Sen de mutlaka dene: ' + window.location.href)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-icon-btn whatsapp"
                title="WhatsApp ile Paylaş"
              >
                <MessageSquare size={14} />
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Di Napoli Çanakkale\'de enfes ' + (isSinglePizza && tempCustomization ? tempCustomization.name : product.name) + ' lezzetini denemelisin! 🍕')}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-icon-btn twitter"
                title="X ile Paylaş"
              >
                <Twitter size={14} />
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-icon-btn facebook"
                title="Facebook ile Paylaş"
              >
                <Facebook size={14} />
              </a>
              <button 
                onClick={handleCopyLink} 
                className={`share-icon-btn copy-link ${linkCopied ? 'copied' : ''}`}
                title="Bağlantıyı Kopyala"
              >
                <Link size={14} />
                {linkCopied && <span className="copy-tooltip">Kopyalandı!</span>}
              </button>
            </div>
          </div>
          
          <div className="wizard-image-card">
            <img 
              src={isSinglePizza && tempCustomization ? tempCustomization.image : product.image} 
              alt={product.name} 
              className="wizard-main-img" 
            />
          </div>

          {(product.category === 'pizzalar' || product.category === 'doyuran-menuler') && (
            <div className="group-selection-box" style={{ marginTop: '16px', marginBottom: '16px', textAlign: 'left', background: 'white', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <label htmlFor="wizard-group-select" style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-dark-blue)', display: 'block', marginBottom: '8px' }}>Porsiyon / Kişilik Seçimi:</label>
              <select 
                id="wizard-group-select"
                aria-label="Kampanya Porsiyon ve Kişilik Seçimi"
                value={selectedGroup} 
                onChange={(e) => setSelectedGroup(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px 14px', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--color-border)', 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  color: 'var(--color-dark-blue)', 
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="1">1 Kişilik (Standart)</option>
                <option value="2">2 Kişilik (Grup Fırsatı) - 729 TL</option>
                <option value="4">4 Kişilik (Aile Fırsatı) - 999 TL</option>
                <option value="6">6 Kişilik (Dev Fırsat) - 1249 TL</option>
              </select>
            </div>
          )}

          {/* Şef Luigi AI Gurme Açıklama Kutusu */}
          <div className="luigi-ai-box">
            <div className="luigi-header">
              <span className="luigi-avatar">🧑‍🍳</span>
              <h4>Şef Luigi'nin Gurme Tavsiyesi (AI)</h4>
              <div className="italy-flag-tiny">
                <span className="flag-green"></span>
                <span className="flag-white"></span>
                <span className="flag-red"></span>
              </div>
            </div>
            <p className="luigi-desc-text">
              "{product.name.toLowerCase().includes('margarita') ? 'Odun ateşinin taş fırında peynir ve fesleğenle dansı. İtalyan klasiklerinin en saf hali. Şef Luigi der ki: İnce hamur seçerek hamurun çıtırlığını hissetmelisiniz!' :
                product.name.toLowerCase().includes('fungi') ? 'Taze toplanmış mantarların erimiş mozzarella ve Napoli domates sosuyla mükemmel uyumu. Kekik dokunuşuyla zenginleşen gurme lezzet.' :
                product.name.toLowerCase().includes('tonno') ? 'Leziz ton balığı parçalarının tatlı kırmızı soğan ve mozzarella ile mükemmel deniz esintisi. Şef Luigi\'nin tavsiyesi: Ekstra mısır ekleyerek lezzeti tatlandırın!' :
                product.name.toLowerCase().includes('romano') ? 'İtalyan salamının ve mantarın nefis birlikteliği. Roma sokaklarının en popüler taş fırın tariflerinden biri.' :
                product.name.toLowerCase().includes('mista') ? 'Salam, sosis, mantar ve biberlerin bol mozzarella altındaki lezzet şöleni. Zengin malzeme sevenlerin favorisi.' :
                product.name.toLowerCase().includes('meksikano') ? 'Jalapeno biberlerinin acısı ve dana kıymanın doyurucu lezzetiyle harmanlanmış, Meksika esintili ateşli bir Napoli klasiği.' :
                product.name.toLowerCase().includes('vejetaryen') ? 'Taze biberler, mısır, zeytin ve mantarlarla bezeli, doğallığın en renkli ve taze hali. Hafif ve sağlıklı bir İtalyan deneyimi.' :
                product.name.toLowerCase().includes('pide') ? 'İtalyan pizza hamurundan Türk Karadeniz usulü çıtır pide. Napoli fırın felsefesiyle tereyağı ve eriyen peynir kokusu.' :
                product.name.toLowerCase().includes('kalzone') ? 'İçi bol malzeme ve erimiş peynirle kapalı, dışı çıtır İtalyan bohça pizzası. Şef Luigi\'nin imza fırın lezzetlerinden biri.' :
                product.name.toLowerCase().includes('apollo') ? 'Türk kasap sucuklarının, mısır ve biberle Napoli sosu üzerindeki eşsiz uyumu. Yerel tatların İtalyan fırınıyla buluşması.' :
                product.name.toLowerCase().includes('sefin') ? 'Şef Luigi\'nin kendi seçtiği özel sosis, zeytin, mısır ve taze biber kombinasyonu. Napoli mutfağının özel imza lezzeti!' :
                'Di Napoli taş fırınlarında odun ateşinde pişirilen, usta ellerden çıkan taptaze malzemelerle dolu nefis gurme lezzetimiz. Buon appetito!'}"
            </p>
          </div>

          <div className="wizard-bottom-controls">
            <div className="wizard-price-block">
              <span className="price-label">Fiyat</span>
              <h2 className="price-amount">{calculateTotalPrice()} TL</h2>
            </div>

            <div className="wizard-quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span className="wizard-quantity-val">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus size={18} />
              </button>
            </div>
          </div>

          <button 
            className="wizard-add-to-cart-btn"
            onClick={handleAddToCartClick}
            disabled={!isSinglePizza && !pizzaSlots.every(slot => slot !== null)}
          >
            <span>Sepete Ekle</span>
          </button>
        </div>

        {/* Right Side: Step Wizard Selection panel */}
        <div className="wizard-right-panel">
          
          {/* Stage 1: Summary slots list */}
          {wizardStage === 'summary' && !isSinglePizza && (
            <div className="selection-slots-stack">
              {pizzaSlots.map((slot, index) => (
                <div key={index} className="selection-slot-card" onClick={() => handleOpenSlot(index)}>
                  <div className="slot-info">
                    <span className="slot-number-label">{index + 1}. Pizza Seçimi - <strong style={{ color: 'var(--color-primary-red)' }}>{getSlotSizeInfo(product, index)}</strong></span>
                    {slot ? (
                      <div className="slot-selected-details">
                        <h4>{slot.name}</h4>
                        <p>{slot.selectedDough.name}, {slot.selectedCrust.name}</p>
                        {slot.extras.length > 0 && (
                          <p className="slot-extras-desc">
                            + {slot.extras.map(e => e.name).join(', ')}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="slot-placeholder">Seçiniz..</span>
                    )}
                  </div>
                  <ChevronRight size={20} className="slot-arrow-icon" />
                </div>
              ))}
            </div>
          )}

          {/* Stage 2: Pizza Selector view */}
          {wizardStage === 'pizza-select' && !isSinglePizza && (
            <div className="wizard-sub-panel">
              <button className="wizard-back-btn" onClick={() => setWizardStage('summary')}>
                <ChevronLeft size={18} />
                <span>{selectedSlotIndex + 1}. Pizza Seçimi ({getSlotSizeInfo(product, selectedSlotIndex)})</span>
              </button>

              <div className="pizzas-selection-list">
                {pizzas.map((pizza) => (
                  <div 
                    key={pizza.id} 
                    className="pizza-selection-row"
                    onClick={() => handleSelectPizzaForSlot(pizza)}
                  >
                    <img src={pizza.image} alt={pizza.name} className="pizza-selection-thumb" />
                    <div className="pizza-selection-info">
                      <h4>{pizza.name}</h4>
                      <p>{pizza.description}</p>
                    </div>
                    <ChevronRight size={18} className="pizza-row-arrow" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stage 3: Detailed Pizza customization page */}
          {wizardStage === 'pizza-customize' && tempCustomization && (
            <div className="wizard-sub-panel">
              <button 
                className="wizard-back-btn" 
                onClick={() => {
                  if (isSinglePizza) {
                    onClose();
                  } else {
                    setWizardStage('pizza-select');
                  }
                }}
              >
                <ChevronLeft size={18} />
                <span>{tempCustomization.name} Özelleştirme</span>
              </button>

              <div className="customization-options-scrollable">
                {/* 1. Dough Selection */}
                <div className="custom-option-group">
                  <h4 className="option-group-title">Hamur Tipi</h4>
                  <div className="custom-horizontal-options">
                    {doughOptions.map((dough) => {
                      const isSelected = tempCustomization?.selectedDough?.id === dough.id;
                      return (
                        <button
                          key={dough.id}
                          className={`custom-pill-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => setTempCustomization({...tempCustomization, selectedDough: dough})}
                        >
                          <span className="pill-name">{dough.name}</span>
                          {dough.price > 0 && <span className="pill-price">+{dough.price} TL</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
 
                {/* 2. Crust Selection */}
                <div className="custom-option-group">
                  <h4 className="option-group-title">Kenar Tipi</h4>
                  <div className="custom-horizontal-options">
                    {crustOptions.map((crust) => {
                      const isSelected = tempCustomization?.selectedCrust?.id === crust.id;
                      return (
                        <button
                          key={crust.id}
                          className={`custom-pill-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => setTempCustomization({...tempCustomization, selectedCrust: crust})}
                        >
                          <span className="pill-name">{crust.name}</span>
                          {crust.price > 0 && <span className="pill-price">+{crust.price} TL</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
 
                {/* 3. Standard Ingredients Removal */}
                {tempCustomization?.ingredients && (
                  <div className="custom-option-group">
                    <h4 className="option-group-title">Standart Malzemeler (Çıkarabilirsiniz)</h4>
                    <div className="ingredients-tags-row">
                      {tempCustomization.ingredients.map((ing) => {
                        const isRemoved = tempCustomization?.removedIngredients?.includes(ing);
                        return (
                          <button
                            key={ing}
                            className={`ingredient-tag ${isRemoved ? 'removed' : ''}`}
                            onClick={() => handleToggleStandardIngredient(ing)}
                          >
                            <span>{ing}</span>
                            <X size={12} className="tag-close-icon" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
 
                {/* 4. Extra Ingredients addition grid */}
                <div className="custom-option-group">
                  <h4 className="option-group-title">Ekstra Malzemeler Ekle</h4>
                  <div className="extras-selection-grid">
                    {ingredientOptions.map((ingredient) => {
                      const isSelected = tempCustomization?.extras?.some(e => e.id === ingredient.id);
                      return (
                        <button
                          key={ingredient.id}
                          className={`extra-ingredient-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleToggleExtraIngredient(ingredient)}
                        >
                          <div className="extra-check-box">
                            {isSelected && <Check size={12} />}
                          </div>
                          <div className="extra-details">
                            <span className="extra-name">{ingredient.name}</span>
                            <span className="extra-price">+{ingredient.price} TL</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Confirm customization slot button */}
              <div className="customization-footer">
                <button className="wizard-confirm-slot-btn" onClick={handleSavePizzaCustomization}>
                  <span>Devam Et</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Diğer Ürünler Öneri Bandı */}
      <div className="wizard-suggestions-container">
        <div className="container">
          <h3 className="suggestions-section-title">Bunları da Denemek İster Misiniz? 🍕</h3>
          <div className="suggestions-band">
            {pizzas.filter(p => p.id !== product.id).slice(0, 10).map((pItem) => (
              <div key={pItem.id} className="suggestion-card">
                <div className="suggestion-thumb">
                  <img src={pItem.image} alt={pItem.name} />
                </div>
                <div className="suggestion-body">
                  <h4>{pItem.name}</h4>
                  <span className="suggestion-price">{pItem.basePrice} TL</span>
                  <button 
                    className="suggestion-add-btn"
                    onClick={() => {
                      onAddToCart({
                        ...pItem,
                        price: pItem.basePrice,
                        quantity: 1,
                        customInfo: null
                      });
                      alert(`${pItem.name} sepetinize eklendi!`);
                    }}
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
