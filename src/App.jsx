import React, { useState } from 'react';
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
import { 
  INITIAL_PRODUCTS, INITIAL_DOUGHS, INITIAL_CRUSTS, INITIAL_INGREDIENTS 
} from './data/products';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('menu'); // 'menu' or 'cart'
  const [deliveryMode, setDeliveryMode] = useState('delivery'); // 'delivery' or 'pickup'
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAiChefOpen, setIsAiChefOpen] = useState(false);
  const [address, setAddress] = useState('Şair Ece Ayhan Meydanı, Saat Kulesi Karşısı');
  
  // Customization database states
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [doughs, setDoughs] = useState(INITIAL_DOUGHS);
  const [crusts, setCrusts] = useState(INITIAL_CRUSTS);
  const [ingredients, setIngredients] = useState(INITIAL_INGREDIENTS);
  
  // Wizard Active item selection state
  const [activeCustomizeItem, setActiveCustomizeItem] = useState(null);
  
  // User Authentication & Modal States
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('dinapoli_user') || 'null'));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState(false);

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

  // Crust modifications
  const handleAddCrust = (newCrust) => setCrusts([...crusts, newCrust]);
  const handleDeleteCrust = (id) => setCrusts(crusts.filter(c => c.id !== id));

  // Ingredient modifications
  const handleAddIngredient = (newIng) => setIngredients([...ingredients, newIng]);
  const handleDeleteIngredient = (id) => setIngredients(ingredients.filter(i => i.id !== id));

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
    // If product is customizable/campaign pizza and clicked from the menu directly, open wizard instead
    if (item.customizable && !item.customInfo) {
      setActiveCustomizeItem(item);
      return;
    }

    const existingIndex = cart.findIndex((cartItem) => {
      if (cartItem.id !== item.id) return false;
      
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
    
    let newSlices = yeKazanSlices + summary.slicesGained;
    if (newSlices < 0) newSlices = 0;
    setYeKazanSlices(newSlices);

    setCartOpen(false);
    setShowTracker(true);
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
          />
        ) : (
          /* Default customer view */
          <>
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
              yeKazanSlices={yeKazanSlices}
            />

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
            
            <div className="admin-entry-bar">
              <div className="container flex justify-between align-center">
                <span>🔧 Sistem Yönetim Paneline erişmek ister misiniz?</span>
                <button className="admin-toggle-btn" onClick={() => setIsAdminMode(true)}>
                  Yönetim Paneli (Admin)
                </button>
              </div>
            </div>

            <main className="main-content">
              <PromoWidgets yeKazanSlices={yeKazanSlices} />

              {/* Usta AI Pizza Asistanı Giriş Banner\'ı */}
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
            </main>

            <Footer />

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

            {/* Live Order Tracker */}
            {showTracker && activeOrder && (
              <Tracker 
                orderDetails={activeOrder}
                onReset={handleResetOrder}
              />
            )}

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
          
          crusts={crusts}
          onAddCrust={handleAddCrust}
          onDeleteCrust={handleDeleteCrust}
          
          ingredients={ingredients}
          onAddIngredient={handleAddIngredient}
          onDeleteIngredient={handleDeleteIngredient}
          
          onClose={() => setIsAdminMode(false)}
        />
      )}
    </div>
  );
}
