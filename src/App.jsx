import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PromoWidgets from './components/PromoWidgets';
import Menu from './components/Menu';
import CartDrawer from './components/CartDrawer';
import Tracker from './components/Tracker';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import CustomizeWizard from './components/CustomizeWizard';
import BranchMapModal from './components/BranchMapModal';
import AiPizzaChef from './components/AiPizzaChef';
import CartPage from './components/CartPage';
import KuryeSlipModal from './components/KuryeSlipModal';
import AuthModal from './components/AuthModal';
import OrdersHistoryModal from './components/OrdersHistoryModal';
import ReferralPage from './components/ReferralPage';
import RewardModal from './components/RewardModal';
import AddressesModal from './components/AddressesModal';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { 
  INITIAL_PRODUCTS, INITIAL_DOUGHS, INITIAL_CRUSTS, INITIAL_INGREDIENTS 
} from './data/products';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('menu'); // 'menu' or 'cart'
  const [deliveryMode, setDeliveryMode] = useState('delivery'); // 'delivery' or 'pickup'
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState(() => {
    try {
      return localStorage.getItem('dinapoli_announcement') || "🍕 Haftanın Kampanyası: 3 Al 2 Öde! • 🎁 Arkadaşını Davet Et, 75 TL Cüzdan Ödülü Kazan! • 🚀 Şef Luigi ile Kendi Pizzanı Tasarla!";
    } catch (e) {
      return "🍕 Haftanın Kampanyası: 3 Al 2 Öde! • 🎁 Arkadaşını Davet Et, 75 TL Cüzdan Ödülü Kazan! • 🚀 Şef Luigi ile Kendi Pizzanı Tasarla!";
    }
  });
  const [isAiChefOpen, setIsAiChefOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isAddressesModalOpen, setIsAddressesModalOpen] = useState(false);
  const [address, setAddress] = useState('Şair Ece Ayhan Meydanı, Saat Kulesi Karşısı');
  
  // Custom user addresses list
  const [userAddresses, setUserAddresses] = useState([
    { id: 'addr-1', title: 'Saat Kulesi (İş)', text: 'Şair Ece Ayhan Meydanı, Saat Kulesi Karşısı, Çanakkale / Merkez' },
    { id: 'addr-2', title: 'Ev', text: 'İsmetpaşa Mahallesi, Atikhisar Caddesi, No: 42, Çanakkale / Merkez' }
  ]);
  
  // Customization database states
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [doughs, setDoughs] = useState(INITIAL_DOUGHS);
  const [crusts, setCrusts] = useState(INITIAL_CRUSTS);
  const [ingredients, setIngredients] = useState(INITIAL_INGREDIENTS);
  
  // Wizard Active item selection state
  const [activeCustomizeItem, setActiveCustomizeItem] = useState(null);
  
  // User Authentication & Modal States
  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Ali Turan', email: 'ali.turan@example.com', phone: '(543) 736 06 60', walletBalance: 75, joinDate: '2026-05-12' },
    { id: 'u2', name: 'Şef Luigi', email: 'chef.luigi@dinapolipizza.com', phone: '(505) 726 17 17', walletBalance: 150, joinDate: '2026-01-01' },
    { id: 'u3', name: 'Mehmet Yılmaz', email: 'mehmet@example.com', phone: '(555) 123 45 67', walletBalance: 0, joinDate: '2026-06-20' },
  ]);

  const [referralTransactions, setReferralTransactions] = useState([
    { id: 't1', referrerId: 'u2', referrerName: 'Şef Luigi', code: 'DN-75TL-1717', refereeName: 'Mehmet Yılmaz', refereePhone: '(555) 123 45 67', rewardAmount: 75, status: 'completed', date: '2026-07-10' },
    { id: 't2', referrerId: 'u1', referrerName: 'Ali Turan', code: 'DN-75TL-0660', refereeName: 'Selin Kaya', refereePhone: '(532) 987 65 43', rewardAmount: 75, status: 'pending', date: '2026-07-15' },
  ]);

  const getUserReferralRewardTier = (userId) => {
    const count = referralTransactions.filter(t => t.referrerId === userId && t.status === 'completed').length;
    return count >= 10 ? 100 : 75;
  };

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dinapoli_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Admin accounts
        if (parsed && (parsed.email === 'admin@dinapolipizza.com' || parsed.email === 'chef.luigi@dinapolipizza.com')) {
          parsed.isAdmin = true;
        }
        return parsed;
      }
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      try {
        localStorage.removeItem('dinapoli_user');
      } catch (ex) {}
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState(false);

  // Sync logged in user's wallet from usersList
  useEffect(() => {
    if (user) {
      const matched = usersList.find(u => u.phone === user.phone || u.email === user.email);
      if (matched && matched.walletBalance !== user.walletBalance) {
        const updated = { ...user, walletBalance: matched.walletBalance };
        setUser(updated);
        localStorage.setItem('dinapoli_user', JSON.stringify(updated));
      }
    }
  }, [usersList]);

  const handleUpdateUserWallet = (userId, newBalance) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, walletBalance: newBalance } : u));
  };

  const handleApplyReferralCode = (refereeId, referralCode) => {
    const suffix = referralCode.split('-').pop();
    const referrer = usersList.find(u => u.phone && u.phone.replace(/\D/g, '').slice(-4) === suffix);
    const referee = usersList.find(u => u.id === refereeId);
    
    if (!referrer || !referee) {
      return { success: false, message: 'Geçersiz veya bulunamayan davet kodu!' };
    }
    if (referrer.id === referee.id) {
      return { success: false, message: 'Kendi davet kodunuzu kullanamazsınız.' };
    }
    
    // Tek kullanımlık davet kodu kontrolü (bu referee telefonu daha önce kullanmış mı?)
    const alreadyUsed = referralTransactions.some(t => t.refereePhone === referee.phone);
    if (alreadyUsed) {
      return { success: false, message: 'Bu hesap için davet indirim kodu zaten kullanılmış.' };
    }
    
    const rewardTier = getUserReferralRewardTier(referrer.id);
    
    const newTx = {
      id: `tx-${Date.now()}`,
      referrerId: referrer.id,
      referrerName: referrer.name,
      code: referralCode,
      refereeName: referee.name,
      refereePhone: referee.phone,
      rewardAmount: rewardTier,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    
    setReferralTransactions(prev => [...prev, newTx]);
    handleUpdateUserWallet(referee.id, (referee.walletBalance || 0) + rewardTier);
    
    return { success: true, rewardAmount: rewardTier };
  };

  const handleCompleteReferralSale = (refereePhone) => {
    setReferralTransactions(prev => prev.map(t => {
      if (t.refereePhone === refereePhone && t.status === 'pending') {
        const referrer = usersList.find(u => u.id === t.referrerId);
        if (referrer) {
          const rewardAmount = getUserReferralRewardTier(referrer.id);
          handleUpdateUserWallet(referrer.id, (referrer.walletBalance || 0) + rewardAmount);
        }
        return { ...t, status: 'completed' };
      }
      return t;
    }));
  };

  const handleSendMailNotification = (emails, subject, message) => {
    alert(`Duyuru E-Postası Başarıyla Gönderildi!\n\nAlıcılar: ${emails.join(', ')}\nKonu: ${subject}\n\nMesaj: ${message.substring(0, 100)}...`);
  };

  const handleAddAddress = (newAddr) => {
    setUserAddresses(prev => [...prev, newAddr]);
  };

  const handleDeleteAddress = (addrId) => {
    setUserAddresses(prev => prev.filter(a => a.id !== addrId));
  };

  const handleUpdateAddress = (addrId, updatedFields) => {
    setUserAddresses(prev => prev.map(a => a.id === addrId ? { ...a, ...updatedFields } : a));
  };

  // Cart & Order Tracking States
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [yeKazanSlices, setYeKazanSlices] = useState(4); 
  const [orders, setOrders] = useState([]); 
  const [activeOrder, setActiveOrder] = useState(null); 
  const [activeOrderSlip, setActiveOrderSlip] = useState(null);
  const [showTracker, setShowTracker] = useState(false);

  // --- ADMIN ACTIONS FOR DATABASE ---
  
  // Product modifications
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  const handleUpdateProduct = (productId, updatedProduct) => {
    setProducts(products.map(p => p.id === productId ? updatedProduct : p));
  };

  // Dough modifications
  const handleAddDough = (newDough) => setDoughs([...doughs, newDough]);
  const handleDeleteDough = (id) => setDoughs(doughs.filter(d => d.id !== id));
  const handleUpdateDough = (id, updatedDough) => setDoughs(doughs.map(d => d.id === id ? updatedDough : d));

  // Crust modifications
  const handleAddCrust = (newCrust) => setCrusts([...crusts, newCrust]);
  const handleDeleteCrust = (id) => setCrusts(crusts.filter(c => c.id !== id));
  const handleUpdateCrust = (id, updatedCrust) => setCrusts(crusts.map(c => c.id === id ? updatedCrust : c));

  // Ingredient modifications
  const handleAddIngredient = (newIng) => setIngredients([...ingredients, newIng]);
  const handleDeleteIngredient = (id) => setIngredients(ingredients.filter(i => i.id !== id));
  const handleUpdateIngredient = (id, updatedIng) => setIngredients(ingredients.map(i => i.id === id ? updatedIng : i));

  // Order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder({ ...activeOrder, status: newStatus });
    }
  };

  // --- CART ACTIONS ---
  
  // Add item to cart
  const handleAddToCart = (item) => {
    if (!item) return;
    
    // If product is customizable/campaign pizza and clicked from the menu directly, open wizard instead
    if (item.customizable && !item.customInfo) {
      setActiveCustomizeItem(item);
      return;
    }

    const existingIndex = cart.findIndex((cartItem) => {
      if (!cartItem || cartItem.id !== item.id) return false;
      
      // If it's a wizard/customized item, check if selections match
      if (cartItem.customInfo && item.customInfo) {
        return JSON.stringify(cartItem.customInfo.selectedPizzas) === JSON.stringify(item.customInfo.selectedPizzas);
      }
      return !cartItem.customInfo && !item.customInfo;
    });

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += item.quantity || 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: item.quantity || 1 }]);
    }
    
    setCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (index, quantity) => {
    if (quantity <= 0) return;
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Place order
  const handlePlaceOrder = (summary) => {
    const orderId = `DN-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Create text summary of items including pizza selection and dough/crust custom options
    const itemsSummary = cart.map(item => {
      let customStr = '';
      if (item.customInfo && item.customInfo.selectedPizzas) {
        customStr = ' [' + item.customInfo.selectedPizzas.map((pizza, pIdx) => {
          const removedStr = pizza.removedIngredients.length > 0 ? ` (Çıkan: ${pizza.removedIngredients.join(', ')})` : '';
          const extrasStr = pizza.extras.length > 0 ? ` (Ekstra: ${pizza.extras.map(e => e.name).join(', ')})` : '';
          return `${pIdx + 1}. ${pizza.name} (${pizza.selectedDough.name}, ${pizza.selectedCrust.name}${removedStr}${extrasStr})`;
        }).join(' | ') + ']';
      }
      return `${item.quantity}x ${item.name}${customStr}`;
    }).join(', ');

    const newOrder = {
      id: orderId,
      itemsSummary,
      deliveryMode,
      total: summary.total,
      slicesGained: summary.slicesGained,
      status: '1' // Initial status: 'Sipariş Alındı'
    };

    setOrders([...orders, newOrder]);
    setActiveOrder(newOrder);
    
    // Complete referral transaction if user phone matches any invite
    if (user && user.phone) {
      handleCompleteReferralSale(user.phone);
    }
    
    let newSlices = yeKazanSlices + summary.slicesGained;
    if (newSlices < 0) newSlices = 0;
    setYeKazanSlices(newSlices);

    setCartOpen(false);
    
    if (!user) {
      setIsAuthModalOpen(true);
      setShowTracker(false);
    } else {
      setIsOrdersHistoryOpen(true);
      setShowTracker(false);
    }
  };

  // Reset
  const handleResetOrder = () => {
    setCart([]);
    setActiveOrder(null);
    setShowTracker(false);
  };

  // Apply deal promo
  const handleApplyDeal = (dealId, price) => {
    const targetProduct = products.find(p => p.id === dealId);
    if (targetProduct) {
      setActiveCustomizeItem(targetProduct);
    }
  };

  return (
    <div className="app-container">
      {!isAdminMode ? (
        activeCustomizeItem ? (
          /* Render Pizza customizer/campaign selection wizard */
          <CustomizeWizard 
            product={activeCustomizeItem}
            pizzas={products.filter(p => p.category === 'pizzalar')}
            doughOptions={doughs}
            crustOptions={crusts}
            ingredientOptions={ingredients}
            onAddToCart={handleAddToCart}
            onClose={() => setActiveCustomizeItem(null)}
          />
        ) : currentPage === 'cart' ? (
          /* Tam Ekran Sepet Sayfası */
          <CartPage 
            cart={cart}
            onUpdateQuantity={(index, q) => handleUpdateQuantity(index, q)}
            onRemoveItem={(index) => handleRemoveItem(index)}
            onCheckout={() => {
              const itemsSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
              const deliveryFee = deliveryMode === 'delivery' ? 15 : 0;
              handlePlaceOrder({
                total: itemsSubtotal + deliveryFee,
                slicesGained: cart.reduce((sum, item) => sum + ((item.yeKazanSlice || 0) * item.quantity), 0)
              });
              setCurrentPage('menu');
            }}
            onClose={() => setCurrentPage('menu')}
            deliveryMode={deliveryMode}
            selectedAddress={address}
            user={user}
            onUpdateUserWallet={handleUpdateUserWallet}
            userAddresses={userAddresses}
            onSelectAddress={(addrText) => setAddress(addrText)}
            onOpenAddresses={() => setIsAddressesModalOpen(true)}
          />
        ) : (
          /* Default customer view with persistent Header and Footer */
          <>
            {/* Scrolling Announcement Marquee */}
            <div style={{
              backgroundColor: '#D4AF37',
              color: '#2B0505',
              padding: '8px 0',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(43, 5, 5, 0.1)',
              zIndex: 1010,
              height: '32px'
            }}>
              <div className="marquee-content" style={{
                display: 'inline-block',
                paddingLeft: '100%',
                fontSize: '11px',
                fontWeight: '900',
                letterSpacing: '0.8px'
              }}>
                {announcementText}
              </div>
            </div>

            <Header 
              deliveryMode={deliveryMode} 
              setDeliveryMode={setDeliveryMode}
              cart={cart}
              setCartOpen={setCartOpen}
              address={address}
              onOpenMap={() => setIsMapModalOpen(true)}
              onGoToCartPage={() => setCurrentPage('cart')}
              user={user}
              onLoginClick={() => setIsAuthModalOpen(true)}
              onLogout={() => {
                localStorage.removeItem('dinapoli_user');
                setUser(null);
              }}
              onShowHistory={() => setIsOrdersHistoryOpen(true)}
              onAdminClick={() => setIsAdminMode(true)}
              yeKazanSlices={yeKazanSlices}
              onGoToReferral={() => setCurrentPage('referral')}
              onOpenRewards={() => setIsRewardModalOpen(true)}
              onOpenAddresses={() => setIsAddressesModalOpen(true)}
              onGoToAbout={() => setCurrentPage('about')}
              onGoToContact={() => setCurrentPage('contact')}
              onGoToMenu={() => setCurrentPage('menu')}
            />

            {currentPage === 'menu' && (
              <>
                {/* Header Altı Video Banner Akışı */}
                <div className="header-video-banner">
                  <video 
                    src="/header-video.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="banner-video-element"
                  />
                  <div className="banner-video-overlay-tint">
                    <div className="container">
                      <span className="banner-badge-gold">1997'DEN BERİ TAŞ FIRIN LEZZETİ</span>
                      <h2>Pizzada Usta Eller</h2>
                      <p className="banner-subtitle">Odun ateşinde pişen, el yapımı nefis İtalyan pizzaları ve doyuran menülerimizle hizmetinizdeyiz.</p>
                      <a href="#menu" className="banner-action-btn" style={{ marginTop: '16px', display: 'inline-block' }}>
                        Lezzetleri Keşfet
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}

            <main className="main-content">
              {currentPage === 'menu' && (
                <>
                  <PromoWidgets yeKazanSlices={yeKazanSlices} />

                  {/* Usta AI Pizza Asistanı Giriş Banner'ı */}
                  <div className="ai-chef-promo-banner" onClick={() => setIsAiChefOpen(true)}>
                    <div className="ai-promo-content">
                      <div className="ai-badge">✨ YAPAY ZEKA DESTEKLİ</div>
                      <h3>Kendi Pizzanı Kendin Tasarla! 🧑‍🍳</h3>
                      <p>Nasıl bir pizza canın çekiyor? Şef Luigi'ye anlat, hamuru ve malzemeleri anında senin için fırına hazırlasın!</p>
                    </div>
                    <button className="ai-start-btn">
                      Şef Luigi'yi Başlat
                    </button>
                  </div>
                  
                  <Menu onAddToCart={handleAddToCart} products={products} />
                </>
              )}

              {currentPage === 'referral' && (
                <ReferralPage 
                  user={user}
                  usersList={usersList}
                  onUpdateUserWallet={handleUpdateUserWallet}
                  onGoToMenu={() => setCurrentPage('menu')}
                  referralTransactions={referralTransactions}
                  onApplyReferralCode={handleApplyReferralCode}
                  rewardAmountTier={user ? getUserReferralRewardTier(user.id) : 75}
                />
              )}

              {currentPage === 'about' && (
                <AboutPage 
                  onGoToMenu={() => setCurrentPage('menu')} 
                  onGoToContact={() => setCurrentPage('contact')} 
                />
              )}

              {currentPage === 'contact' && (
                <ContactPage onGoToMenu={() => setCurrentPage('menu')} />
              )}
            </main>

            <Footer 
              onGoToAbout={() => setCurrentPage('about')} 
              onGoToContact={() => setCurrentPage('contact')} 
            />

            {/* Cart Drawer */}
            <CartDrawer 
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              deliveryMode={deliveryMode}
              yeKazanSlices={yeKazanSlices}
              onPlaceOrder={handlePlaceOrder}
              onGoToCartPage={() => setCurrentPage('cart')}
            />



            {/* Kurye Sipariş Fişi Modalı */}
            {activeOrderSlip && (
              <KuryeSlipModal 
                order={activeOrderSlip}
                cart={cart}
                onClose={() => {
                  setActiveOrderSlip(null);
                  setCart([]); // Sipariş onaylandıktan sonra sepeti sıfırla
                }}
                deliveryMode={deliveryMode}
                address={address}
              />
            )}

            {/* Branch Map Modal */}
            <BranchMapModal 
              isOpen={isMapModalOpen}
              onClose={() => setIsMapModalOpen(false)}
              deliveryMode={deliveryMode}
              onChangeDeliveryMode={(mode) => setDeliveryMode(mode)}
              onSelectAddress={(addrText) => setAddress(addrText)}
              onSelectBranch={(branchAddr) => {
                setAddress(branchAddr);
                setDeliveryMode('pickup');
              }}
            />

            {/* AI Pizza Chef Chatbot */}
            <AiPizzaChef 
              isOpen={isAiChefOpen}
              onClose={() => setIsAiChefOpen(false)}
              doughOptions={doughs}
              crustOptions={crusts}
              ingredientOptions={ingredients}
              onAddToCart={handleAddToCart}
            />

            {/* Auth Login/Register Modal */}
            <AuthModal 
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              onLoginSuccess={(loggedUser) => setUser(loggedUser)}
            />

            {/* Orders History Modal */}
            <OrdersHistoryModal 
              isOpen={isOrdersHistoryOpen}
              onClose={() => setIsOrdersHistoryOpen(false)}
              orders={orders}
              onShowSlip={(order) => {
                setActiveOrderSlip(order);
                setIsOrdersHistoryOpen(false); // Close history to view slip modal
              }}
            />

            {/* Reward / Sadakat Modalı */}
            <RewardModal 
              isOpen={isRewardModalOpen}
              onClose={() => setIsRewardModalOpen(false)}
            />

            {/* Addresses / Adreslerim Modalı */}
            <AddressesModal 
              isOpen={isAddressesModalOpen}
              onClose={() => setIsAddressesModalOpen(false)}
              userAddresses={userAddresses}
              activeAddress={address}
              onSelectAddress={(addrText) => {
                setAddress(addrText);
                setDeliveryMode('delivery');
              }}
              onAddAddress={handleAddAddress}
              onDeleteAddress={handleDeleteAddress}
              onUpdateAddress={handleUpdateAddress}
            />
          </>
        )
      ) : (
        /* Admin Mode */
        <AdminPanel 
          products={products}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onShowSlip={(order) => setActiveOrderSlip(order)}
          
          doughs={doughs}
          onAddDough={handleAddDough}
          onDeleteDough={handleDeleteDough}
          onUpdateDough={handleUpdateDough}
          
          crusts={crusts}
          onAddCrust={handleAddCrust}
          onDeleteCrust={handleDeleteCrust}
          onUpdateCrust={handleUpdateCrust}
          
          ingredients={ingredients}
          onAddIngredient={handleAddIngredient}
          onDeleteIngredient={handleDeleteIngredient}
          onUpdateIngredient={handleUpdateIngredient}
          
          usersList={usersList}
          onUpdateUserWallet={handleUpdateUserWallet}
          onSendMailNotification={handleSendMailNotification}
          referralTransactions={referralTransactions}
          announcementText={announcementText}
          onUpdateAnnouncement={(txt) => {
            setAnnouncementText(txt);
            localStorage.setItem('dinapoli_announcement', txt);
          }}
          onClose={() => setIsAdminMode(false)}
        />
      )}
    </div>
  );
}
