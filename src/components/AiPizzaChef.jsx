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
      text: 'Selamlar sinyor! Ben Di Napoli fırınının usta İtalyan şefi Luigi. 🧑‍🍳 Bugün canın nasıl bir pizza çekiyor? Malzemeleri, hamur kalınlığını veya acı seviyesini bana anlat, senin için usta ellerimle özel bir pizza açayım! Üstelik Di Napoli Ye-Kazan programı ile her siparişinde bedava pizzaya bir adım daha yaklaşırsın! 🍕'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  
  // Track dynamically detected elements from chat text
  const [detectedDough, setDetectedDough] = useState(doughOptions?.[0] || { id: 'ince', name: 'İnce Hamur', price: 0 });
  const [detectedCrust, setDetectedCrust] = useState(crustOptions?.[0] || { id: 'klasik', name: 'Klasik Kenar', price: 0 });
  const [detectedExtras, setDetectedExtras] = useState([]); // extra ingredients identified
  const [pizzaName, setPizzaName] = useState('Şef Luigi Özel Pizzası');
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Calculate dynamic price based on detected selections
  const calculatePizzaPrice = () => {
    let price = 290; // base price for custom AI pizza
    price += (detectedDough?.price || 0);
    price += (detectedCrust?.price || 0);
    detectedExtras.forEach(extra => {
      price += (extra?.price || 0);
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
    const textLower = text.toLowerCase().trim();
    
    // Check intents
    const isAffirmative = ['olsun', 'evet', 'tamam', 'olur', 'istiyorum', 'ekle', 'seç', 'aynen', 'hadi', 'koy', 'eklensin'].some(w => textLower.includes(w));
    const isNegative = ['olmasın', 'hayır', 'istemiyorum', 'kalsın', 'yok', 'çıkar', 'sade', 'istemem'].some(w => textLower.includes(w));
    const isFinalize = ['fırına', 'sepete', 'sipariş', 'hazır', 'bitti', 'tamamdır'].some(w => textLower.includes(w));

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

    // Update state variables first
    let finalDough = foundDough;
    let finalCrust = foundCrust;
    let finalExtras = updatedExtras;

    // Decision tree
    let chefResponse = '';

    if (isFinalize) {
      chefResponse = 'Mamma mia! Pizzan tam istediğin kıvamda odun ateşine girdi. 1 saniye içinde sepetine ekliyorum. Di Napoli Ye-Kazan dilimin de sepetine yansıyacak sinyor, afiyet olsun!';
      setMessages([...currentMessages, { sender: 'chef', text: chefResponse }]);
      setTimeout(() => {
        // Directly trigger cart insertion
        const finalPrice = 290 + (finalDough?.price || 0) + (finalCrust?.price || 0) + finalExtras.reduce((s, e) => s + e.price, 0);
        const aiPizzaItem = {
          id: `ai-custom-pizza-${Date.now()}`,
          name: finalExtras.length > 0 ? (finalExtras.length >= 3 ? 'Şef Luigi Bol Malzemeli Özel' : `Şef Luigi ${finalExtras.map(e => e.name).join(' & ')} Pizza`) : 'Şef Luigi Özel Pizzası',
          description: `Şef Luigi tarafından hazırlanan özel lezzet. Hamur: ${finalDough.name}, Kenar: ${finalCrust.name}. Malzemeler: ${finalExtras.length > 0 ? finalExtras.map(e => e.name).join(', ') : 'Sadece Sos & Peynir'}`,
          basePrice: finalPrice,
          price: finalPrice,
          image: '/logo.png',
          customizable: true,
          quantity: 1,
          customInfo: {
            isCampaignWizard: false,
            selectedPizzas: [{
              name: finalExtras.length > 0 ? (finalExtras.length >= 3 ? 'Şef Luigi Bol Malzemeli Özel' : `Şef Luigi ${finalExtras.map(e => e.name).join(' & ')} Pizza`) : 'Şef Luigi Özel Pizzası',
              image: '/logo.png',
              selectedDough: finalDough,
              selectedCrust: finalCrust,
              removedIngredients: [],
              extras: finalExtras
            }]
          }
        };
        onAddToCart(aiPizzaItem);
        onClose();
      }, 1200);
      return;
    }

    if (matchedNames.length > 0) {
      chefResponse += `Mamma mia! Harika tercihler. Taze fırın tepsimize hemen **${matchedNames.join(', ')}** ekledim. `;
    }
    
    if (foundDough.id !== detectedDough.id) {
      chefResponse += `Hamurumuzu tam istediğin gibi **${foundDough.name}** olarak usta ellerimle hazırlıyorum. `;
    }

    if (foundCrust.id !== detectedCrust.id) {
      chefResponse += `Kenar tipini de nefis **${foundCrust.name}** olarak sardım! `;
    }

    // Handle yes/no or empty inputs smart
    if (matchedNames.length === 0 && foundDough.id === detectedDough.id && foundCrust.id === detectedCrust.id) {
      if (isAffirmative) {
        // User said "yes" to general recommendation, let's add popular items automatically
        const popularItems = ingredientOptions.filter(ing => ['sucuk', 'mantar', 'zeytin'].includes(ing.id));
        if (popularItems.length > 0) {
          popularItems.forEach(item => {
            if (!finalExtras.some(e => e.id === item.id)) {
              finalExtras.push(item);
            }
          });
          chefResponse = `Harika sinyor! O zaman fırın tepsimize hemen **Sucuk, Mantar ve Zeytin** kombinasyonunu ekledim. Pizzan fırına girmeye hazır görünüyor! Fırına verelim mi, yoksa başka bir isteğin var mı?`;
        } else {
          chefResponse = 'Süper! Pizzana hangi nefis malzemeleri ekleyelim? Sucuk, sosis, mantar veya zeytin ister misin?';
        }
      } else if (isNegative) {
        chefResponse = 'Anladım sinyor! Pizzanı sade, sadece özel Di Napoli sosu ve eriyen mozzarella peyniriyle hazırlıyorum. İnce hamur mu istersin, klasik hamur mu?';
      } else {
        // Fallback variations to prevent repetition loop
        const fallbacks = [
          "Anladım sinyor! Pizzanda sucuk, sosis, mantar, zeytin, mısır veya köz biber gibi usta malzemeler olsun mu? Yoksa sadece peynirli mi istersin?",
          "Şef Luigi fırını hazırladı! Pizzana dana salam, sosis veya acı sos eklememi ister misin? Canın şu an hangisini çekiyor?",
          "Hamur kalınlığını (ince/klasik) veya kenar tipini (sarımsaklı/peynirli) de değiştirebilirim. Canın ne çekiyor, bana söyle sinyor!",
          "Di Napoli Ye-Kazan sadakat programıyla vereceğin her siparişte dilim kazandığını biliyor muydun sinyor? 10 dilim biriktirince bedava pizza seni bekliyor! Pizzana başka malzeme ekleyelim mi?",
          "Eğer pizzan hazırsa 'sepete ekle' veya 'fırına at' yazarak siparişe geçebiliriz. Fırına verelim mi?"
        ];
        // Select random fallback
        const randomIdx = Math.floor(Math.random() * fallbacks.length);
        chefResponse = fallbacks[randomIdx];
      }
    } else {
      chefResponse += `Şu an pizzan fırına girmeye hazır sinyor! Fiyatımız ${290 + (foundDough.price || 0) + (foundCrust.price || 0) + finalExtras.reduce((s, e) => s + e.price, 0)} TL. Fırına atalım mı (sepete ekle), yoksa başka bir malzeme ekleyelim mi?`;
    }

    // Apply states
    setDetectedDough(finalDough);
    setDetectedCrust(finalCrust);
    setDetectedExtras(finalExtras);

    // Dynamic name generator
    if (finalExtras.length > 0) {
      if (finalExtras.length >= 3) {
        setPizzaName('Şef Luigi Bol Malzemeli Özel');
      } else {
        setPizzaName(`Şef Luigi ${finalExtras.map(e => e.name).join(' & ')} Pizza`);
      }
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
                <h3>Şef Luigi - AI Pizza Asistanı</h3>
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
              <label htmlFor="ai-chef-chat-input" style={{ display: 'none' }}>Şef Luigi ile Mesajlaş</label>
              <input 
                id="ai-chef-chat-input"
                aria-label="Şef Luigi ile Mesajlaş"
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
