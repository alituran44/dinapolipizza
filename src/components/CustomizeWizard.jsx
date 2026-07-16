import React, { useState } from 'react';
import { 
  ChevronRight, ChevronLeft, Plus, Minus, X, Check, Search
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
  const isSinglePizza = !product.requiredPizzaSelections || product.requiredPizzaSelections <= 1;

  // Wizard stages: 'summary' (main screen), 'pizza-select' (selecting a slot), 'pizza-customize' (fine tuning a selected pizza)
  const [wizardStage, setWizardStage] = useState(isSinglePizza ? 'pizza-customize' : 'summary'); 
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(isSinglePizza ? 0 : null);
  
  // Track selected pizzas for each required slot
  const [pizzaSlots, setPizzaSlots] = useState(() => {
    if (isSinglePizza) {
      return [{
        ...product,
        selectedDough: doughOptions[0],
        selectedCrust: crustOptions[0],
        removedIngredients: [],
        extras: []
      }];
    }
    return Array(product.requiredPizzaSelections).fill(null);
  });

  // Temporary pizza selection being customized
  const [tempCustomization, setTempCustomization] = useState(() => {
    if (isSinglePizza) {
      return {
        ...product,
        selectedDough: doughOptions[0],
        selectedCrust: crustOptions[0],
        removedIngredients: [],
        extras: []
      };
    }
    return null;
  });
  
  // Overall campaign quantity
  const [quantity, setQuantity] = useState(1);

  // Calculate single pizza price
  const calculateSinglePizzaPrice = (pizza) => {
    if (!pizza) return product.basePrice;
    let price = product.basePrice;
    price += (pizza.selectedDough.price || 0);
    price += (pizza.selectedCrust.price || 0);
    pizza.extras.forEach(extra => {
      price += (extra.price || 0);
    });
    return price;
  };

  // Calculate customized price
  const calculateTotalPrice = () => {
    if (isSinglePizza) {
      return calculateSinglePizzaPrice(tempCustomization || pizzaSlots[0]) * quantity;
    }

    let price = product.basePrice;
    
    // Add up any extra ingredients or premium dough/crust options selected in slots
    pizzaSlots.forEach(slot => {
      if (slot) {
        price += (slot.selectedDough.price || 0);
        price += (slot.selectedCrust.price || 0);
        slot.extras.forEach(extra => {
          price += (extra.price || 0);
        });
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
    const isRemoved = tempCustomization.removedIngredients.includes(ingredientName);
    const updatedRemoved = isRemoved
      ? tempCustomization.removedIngredients.filter(name => name !== ingredientName)
      : [...tempCustomization.removedIngredients, ingredientName];
      
    setTempCustomization({
      ...tempCustomization,
      removedIngredients: updatedRemoved
    });
  };

  // Toggle extra ingredient additions
  const handleToggleExtraIngredient = (ingredient) => {
    const exists = tempCustomization.extras.some(item => item.id === ingredient.id);
    const updatedExtras = exists
      ? tempCustomization.extras.filter(item => item.id !== ingredient.id)
      : [...tempCustomization.extras, ingredient];
      
    setTempCustomization({
      ...tempCustomization,
      extras: updatedExtras
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
          
          <div className="wizard-image-card">
            <img 
              src={isSinglePizza && tempCustomization ? tempCustomization.image : product.image} 
              alt={product.name} 
              className="wizard-main-img" 
            />
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
                    <span className="slot-number-label">{index + 1}. Pizza Seçimi</span>
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
                <span>{selectedSlotIndex + 1}. Pizza Seçimi</span>
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
                      const isSelected = tempCustomization.selectedDough.id === dough.id;
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
                      const isSelected = tempCustomization.selectedCrust.id === crust.id;
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
                {tempCustomization.ingredients && (
                  <div className="custom-option-group">
                    <h4 className="option-group-title">Standart Malzemeler (Çıkarabilirsiniz)</h4>
                    <div className="ingredients-tags-row">
                      {tempCustomization.ingredients.map((ing) => {
                        const isRemoved = tempCustomization.removedIngredients.includes(ing);
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
                      const isSelected = tempCustomization.extras.some(e => e.id === ingredient.id);
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
    </div>
  );
}
