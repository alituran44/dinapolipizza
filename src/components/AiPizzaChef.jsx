import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Check, Sparkles, ShoppingBag } from 'lucide-react';

export default function AiPizzaChef({ 
  isOpen, 
  onClose, 
  doughOptions, 
  crustOptions, 
  ingredientOptions, 
  onAddToCart 
}) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      sender: 'chef',
      text: 'Selamlar sinyor! Ben Di Napoli fırınının usta şefi AI. 🧑‍🍳 Bugün canın nasıl bir pizza çekiyor? Malzemeleri, hamur kalınlığını, acı seviyesini bana anlat, senin için usta ellerimle özel bir pizza açayım!'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  
  // Track dynamically detected elements from chat text
  const [detectedDough, setDetectedDough] = useState(doughOptions[0]); // default: İnce Hamur
  const [detectedCrust, setDetectedCrust] = useState(crustOptions[0]); // default: Klasik Kenar
  const [detectedExtras, setDetectedExtras] = useState([]); // extra ingredients identified
  const [pizzaName, setPizzaName] = useState('Usta AI Özel Pizzası');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Calculate dynamic price based on detected selections
  const calculatePizzaPrice = () => {
    let price = 290; // base price for custom AI pizza
    price += (detectedDough.price || 0);
    price += (detectedCrust.price || 0);
    detectedExtras.forEach(extra => {
      price += (extra.price || 0);
    });
    return price;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInputText('');

    // Analyze input text (Simple NLP matching)
    setTimeout(() => {
      analyzeChefInput(userText, newMessages);
    }, 800);
  };

  const analyzeChefInput = (text, currentMessages) => {
    const textLower = text.toLowerCase();
    
    // 1. Dough matching
    let foundDough = detectedDough;
    doughOptions.forEach(d => {
      if (textLower.includes(d.name.toLowerCase()) || textLower.includes(d.name.toLowerCase().replace(' hamur', ''))) {
        foundDough = d;
      }
    });

    // 2. Crust matching
    let foundCrust = detectedCrust;
    crustOptions.forEach(c => {
      if (textLower.includes(c.name.toLowerCase()) || textLower.includes(c.name.toLowerCase().replace(' kenar', ''))) {
        foundCrust = c;
      }
    });

    // 3. Extra ingredients matching
    let updatedExtras = [...detectedExtras];
    let matchedNames = [];
    
    ingredientOptions.forEach(ing => {
      const ingNameLower = ing.name.toLowerCase();
      // Match raw name or plural forms (sucuk -> sucuklar, mantar -> mantarlı)
      if (textLower.includes(ingNameLower) || 
          (ingNameLower === 'sucuk' && textLower.includes('sucuklu')) ||
          (ingNameLower === 'sosis' && textLower.includes('sosisli')) ||
          (ingNameLower === 'mantar' && textLower.includes('mantarlı')) ||
          (ingNameLower === 'biber' && textLower.includes('biberli')) ||
          (ingNameLower === 'zeytin' && textLower.includes('zeytinli')) ||
          (ingNameLower === 'mısır' && textLower.includes('mısırlı')) ||
          (ingNameLower === 'pepperoni' && textLower.includes('pepperonili')) ||
          (ingNameLower === 'jambon' && textLower.includes('jambonlu'))
      ) {
        if (!updatedExtras.some(item => item.id === ing.id)) {
          updatedExtras.push(ing);
          matchedNames.push(ing.name);
        }
      }
    });

    // Update state
    setDetectedDough(foundDough);
    setDetectedCrust(foundCrust);
    setDetectedExtras(updatedExtras);

    // Dynamic pizza name generator based on ingredients
    if (updatedExtras.length > 0) {
      if (updatedExtras.length >= 3) {
        setPizzaName('Usta AI Bol Malzemeli Özel');
      } else {
        setPizzaName(`Usta AI ${updatedExtras.map(e => e.name).join(' & ')} Pizza`);
      }
    }

    // Build chef feedback response
    let chefResponse = '';
    
    if (matchedNames.length > 0) {
      chefResponse += `Mamma mia! Harika tercihler. Taze fırın tepsimize hemen **${matchedNames.join(', ')}** ekledim. `;
    }
    
    if (foundDough.id !== detectedDough.id) {
      chefResponse += `Hamurumuzu tam istediğin gibi **${foundDough.name}** olarak usta ellerimle hazırlıyorum. `;
    }

    if (foundCrust.id !== detectedCrust.id) {
      chefResponse += `Kenar tipini de nefis **${foundCrust.name}** olarak sardım! `;
    }

    // Fallback response if nothing matched
    if (matchedNames.length === 0 && foundDough.id === detectedDough.id && foundCrust.id === detectedCrust.id) {
      chefResponse = 'Anladım! Pizzanda sucuk, sosis, mantar, zeytin, mısır veya köz biber gibi usta malzemeler olsun mu? Hamurunu ince mi, klasik mi istersin? Bana söyle, hemen açayım!';
    } else {
      chefResponse += `Şu an pizzan fırına girmeye hazır sinyor! Fiyatımız ${290 + (foundDough.price || 0) + (foundCrust.price || 0) + updatedExtras.reduce((s, e) => s + e.price, 0)} TL. Fırına atalım mı, yoksa başka bir malzeme eklemek ister misin?`;
    }

    setMessages([...currentMessages, { sender: 'chef', text: chefResponse }]);
  };

  const handleCreateAndAdd = () => {
    // Compile final pizza product
    const finalPrice = calculatePizzaPrice();
    const aiPizzaItem = {
      id: `ai-custom-pizza-${Date.now()}`,
      name: pizzaName,
      description: `Usta AI tarafından hazırlanan özel lezzet. Hamur: ${detectedDough.name}, Kenar: ${detectedCrust.name}. Malzemeler: ${detectedExtras.length > 0 ? detectedExtras.map(e => e.name).join(', ') : 'Sadece Sos & Peynir'}`,
      basePrice: finalPrice,
      price: finalPrice,
      image: '/logo.png', // logo placeholder for custom pizza
      customizable: true,
      quantity: 1,
      customInfo: {
        isCampaignWizard: false,
        selectedPizzas: [{
          name: pizzaName,
          image: '/logo.png',
          selectedDough: detectedDough,
          selectedCrust: detectedCrust,
          removedIngredients: [],
          extras: detectedExtras
        }]
      }
    };

    onAddToCart(aiPizzaItem);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content ai-chef-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Kapat">
          <X size={22} />
        </button>

        <div className="ai-chef-layout">
          {/* Left Panel: Chat Interface */}
          <div className="ai-chat-section">
            <div className="chef-header-bar">
              <Bot className="chef-bot-icon" size={24} />
              <div>
                <h3>Usta AI Pizza Asistanı</h3>
                <span className="online-tag">● Fırın Sıcak (250°C)</span>
              </div>
            </div>

            <div className="chat-messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message-row ${msg.sender === 'chef' ? 'chef' : 'user'}`}>
                  <div className="msg-avatar">
                    {msg.sender === 'chef' ? '🧑‍🍳' : '👤'}
                  </div>
                  <div className="msg-text-bubble">
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-bar">
              <input 
                type="text" 
                placeholder="Örn: İnce hamurlu, bol sucuklu, zeytinli bir pizza istiyorum..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="chat-send-btn" onClick={handleSendMessage}>
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Right Panel: Interactive Visual Builder */}
          <div className="ai-builder-preview-section">
            <div className="preview-header">
              <Sparkles size={16} className="sparkle-icon" />
              <h4>Fırın Tepsisi (Canlı Seçimler)</h4>
            </div>

            {/* Interactive Pizza Visual representation */}
            <div className="pizza-visual-container">
              <div className="pizza-visual-dough">
                <div className="pizza-visual-crust">
                  <div className="pizza-visual-sauce-cheese">
                    {/* Render emojis of detected ingredients dynamically */}
                    {detectedExtras.map((extra, idx) => {
                      const getEmoji = (name) => {
                        const n = name.toLowerCase();
                        if (n.includes('sucuk') || n.includes('pepperoni')) return '🍕';
                        if (n.includes('sosis')) return '🌭';
                        if (n.includes('mantar')) return '🍄';
                        if (n.includes('zeytin')) return '🫒';
                        if (n.includes('mısır')) return '🌽';
                        if (n.includes('biber') || n.includes('jalapeno')) return '🌶️';
                        if (n.includes('jambon') || n.includes('salam')) return '🥓';
                        return '🧀';
                      };
                      
                      // Position ingredients in a circle inside the pizza
                      const angle = (idx * 360) / detectedExtras.length;
                      const radius = 50; // percent offset from center
                      const x = 50 + radius * Math.cos((angle * Math.PI) / 180) * 0.6;
                      const y = 50 + radius * Math.sin((angle * Math.PI) / 180) * 0.6;

                      return (
                        <span 
                          key={extra.id} 
                          className="pizza-visual-ingredient-emoji"
                          style={{ left: `${x}%`, top: `${y}%` }}
                        >
                          {getEmoji(extra.name)}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Selection summary cards */}
            <div className="builder-summary-card">
              <h5 className="pizza-title">{pizzaName}</h5>
              <div className="summary-pills-row">
                <span className="summary-pill">{detectedDough.name}</span>
                <span className="summary-pill">{detectedCrust.name}</span>
                {detectedExtras.map(e => (
                  <span key={e.id} className="summary-pill ingredient">{e.name}</span>
                ))}
              </div>

              <div className="price-order-row">
                <div className="price-block">
                  <span>Toplam Fiyat</span>
                  <h4>{calculatePizzaPrice()} TL</h4>
                </div>
                
                <button className="confirm-ai-pizza-btn" onClick={handleCreateAndAdd}>
                  <ShoppingBag size={16} />
                  <span>Sepete Ekle & Sipariş Ver</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
