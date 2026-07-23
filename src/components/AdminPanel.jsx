import React, { useState } from 'react';
import { 
  Trash2, Edit, Plus, DollarSign, ClipboardList, 
  Settings, LogOut, LayoutDashboard, PlusCircle, Check,
  Flame, Layers, Database, User
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function AdminPanel({ 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  onUpdateProduct,
  onResetDatabase,
  orders,
  onUpdateOrderStatus,
  onShowSlip,
  socialShares = [],
  
  // Customization controls
  doughs,
  onAddDough,
  onDeleteDough,
  onUpdateDough,
  
  crusts,
  onAddCrust,
  onDeleteCrust,
  onUpdateCrust,
  
  ingredients,
  onAddIngredient,
  onDeleteIngredient,
  onUpdateIngredient,

  // Users & Wallet management
  usersList = [],
  onUpdateUserWallet,
  onSendMailNotification,
  referralTransactions = [],
  announcementText = '',
  onUpdateAnnouncement,
  whatsAppNumber = '',
  whatsAppTemplate = '',
  whatsAppApiMode = 'standard',
  whatsAppPhoneId = '',
  whatsAppToken = '',
  whatsAppCloudEndpoint = '',
  whatsAppIncludePhotos = true,
  onUpdateWhatsAppConfig,
  
  onClose 
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', 'dough-crust', 'ingredients', 'dashboard', 'announcement'

  // WhatsApp states
  const [whatsAppNumberInput, setWhatsAppNumberInput] = useState(whatsAppNumber);
  const [whatsAppTemplateInput, setWhatsAppTemplateInput] = useState(whatsAppTemplate);
  const [whatsAppApiModeInput, setWhatsAppApiModeInput] = useState(whatsAppApiMode);
  const [whatsAppPhoneIdInput, setWhatsAppPhoneIdInput] = useState(whatsAppPhoneId);
  const [whatsAppTokenInput, setWhatsAppTokenInput] = useState(whatsAppToken);
  const [whatsAppCloudEndpointInput, setWhatsAppCloudEndpointInput] = useState(whatsAppCloudEndpoint);
  const [whatsAppIncludePhotosInput, setWhatsAppIncludePhotosInput] = useState(whatsAppIncludePhotos);
  const [showWhatsAppSaved, setShowWhatsAppSaved] = useState(false);

  // Form states for new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'pizzalar',
    basePrice: '',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    videoUrl: '',
    popular: false,
    customizable: false,
    requiredPizzaSelections: 0
  });

  const [editingId, setEditingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Customization edit states
  const [editingDoughId, setEditingDoughId] = useState(null);
  const [editingDough, setEditingDough] = useState(null);

  const [editingCrustId, setEditingCrustId] = useState(null);
  const [editingCrust, setEditingCrust] = useState(null);

  const [editingIngredientId, setEditingIngredientId] = useState(null);
  const [editingIngredient, setEditingIngredient] = useState(null);

  // Email & Announcement states
  const [emailSubject, setEmailSubject] = useState('Di Napoli Fırsatları Başladı! 🍕');
  const [emailMessage, setEmailMessage] = useState('Merhaba, Di Napoli lezzetlerinde bu haftaya özel 75 TL cüzdan indirimi fırsatını kaçırmayın!');
  const [announcementInput, setAnnouncementInput] = useState(announcementText);
  const [showAnnouncementSaved, setShowAnnouncementSaved] = useState(false);

  const handleFileUpload = (e, field, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setEditingProduct(prev => ({ ...prev, [field]: reader.result }));
      } else {
        setNewProduct(prev => ({ ...prev, [field]: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Form states for dough, crust, ingredients
  const [newDough, setNewDough] = useState({ name: '', price: '' });
  const [newCrust, setNewCrust] = useState({ name: '', price: '' });
  const [newIngredient, setNewIngredient] = useState({ name: '', price: '' });

  // Stats calculation
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrdersCount = orders.length;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.basePrice) return;
    
    onAddProduct({
      ...newProduct,
      id: `custom-${Date.now()}`,
      basePrice: parseFloat(newProduct.basePrice),
      requiredPizzaSelections: parseInt(newProduct.requiredPizzaSelections || 0)
    });
    
    setNewProduct({
      name: '',
      description: '',
      category: 'pizzalar',
      basePrice: '',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      videoUrl: '',
      popular: false,
      customizable: false,
      requiredPizzaSelections: 0
    });
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditingProduct({ ...product });
  };

  const handleEditSave = () => {
    try {
      if (!editingProduct) {
        alert("Hata: Düzenlenen ürün verisi bulunamadı!");
        return;
      }
      const updated = {
        ...editingProduct,
        basePrice: parseFloat(editingProduct.basePrice || 0),
        requiredPizzaSelections: parseInt(editingProduct.requiredPizzaSelections || 0)
      };
      onUpdateProduct(editingId, updated);
      setEditingId(null);
      setEditingProduct(null);
    } catch (err) {
      alert("Ürün kaydedilirken hata oluştu: " + err.message);
      console.error(err);
    }
  };

  const handleDoughEditClick = (dough) => {
    setEditingDoughId(dough.id);
    setEditingDough({ ...dough });
  };

  const handleDoughEditSave = () => {
    onUpdateDough(editingDoughId, {
      ...editingDough,
      price: parseFloat(editingDough.price || 0)
    });
    setEditingDoughId(null);
    setEditingDough(null);
  };

  const handleCrustEditClick = (crust) => {
    setEditingCrustId(crust.id);
    setEditingCrust({ ...crust });
  };

  const handleCrustEditSave = () => {
    onUpdateCrust(editingCrustId, {
      ...editingCrust,
      price: parseFloat(editingCrust.price || 0)
    });
    setEditingCrustId(null);
    setEditingCrust(null);
  };

  const handleIngredientEditClick = (ing) => {
    setEditingIngredientId(ing.id);
    setEditingIngredient({ ...ing });
  };

  const handleIngredientEditSave = () => {
    onUpdateIngredient(editingIngredientId, {
      ...editingIngredient,
      price: parseFloat(editingIngredient.price || 0)
    });
    setEditingIngredientId(null);
    setEditingIngredient(null);
  };

  // Add items
  const handleAddDoughSubmit = (e) => {
    e.preventDefault();
    if (!newDough.name) return;
    onAddDough({
      id: `dough-${Date.now()}`,
      name: newDough.name,
      price: parseFloat(newDough.price || 0)
    });
    setNewDough({ name: '', price: '' });
  };

  const handleAddCrustSubmit = (e) => {
    e.preventDefault();
    if (!newCrust.name) return;
    onAddCrust({
      id: `crust-${Date.now()}`,
      name: newCrust.name,
      price: parseFloat(newCrust.price || 0)
    });
    setNewCrust({ name: '', price: '' });
  };

  const handleAddIngredientSubmit = (e) => {
    e.preventDefault();
    if (!newIngredient.name) return;
    onAddIngredient({
      id: `ing-${Date.now()}`,
      name: newIngredient.name,
      price: parseFloat(newIngredient.price || 0)
    });
    setNewIngredient({ name: '', price: '' });
  };

  return (
    <div className="admin-panel-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/logo.png" alt="logo" className="admin-logo-img" />
          <div className="admin-brand-text">
            <h4>Di Napoli</h4>
            <span>Yönetici Paneli</span>
          </div>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ClipboardList size={18} />
            <span>Gelen Siparişler</span>
            {orders.filter(o => o.status !== 'completed').length > 0 && (
              <span className="orders-count-badge">
                {orders.filter(o => o.status !== 'completed').length}
              </span>
            )}
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <PlusCircle size={18} />
            <span>Ürün & Kampanya</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'dough-crust' ? 'active' : ''}`}
            onClick={() => setActiveTab('dough-crust')}
          >
            <Layers size={18} />
            <span>Hamur & Kenarlar</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            <Database size={18} />
            <span>Ekstra Malzemeler</span>
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <User size={18} />
            <span>Kullanıcılar & Duyuru</span>
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Genel İstatistikler</span>
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'social-shares' ? 'active' : ''}`}
            onClick={() => setActiveTab('social-shares')}
          >
            <span style={{ marginRight: '6px' }}>📢</span>
            <span>Sosyal Paylaşımlar</span>
          </button>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="exit-admin-btn" onClick={onResetDatabase} style={{ backgroundColor: '#ef4444', marginBottom: '8px', color: 'white' }}>
            <Trash2 size={18} />
            <span>Fabrika Ayarlarına Dön</span>
          </button>
          <button className="exit-admin-btn" onClick={onClose}>
            <LogOut size={18} />
            <span>Müşteri Ekranına Dön</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        
        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="admin-tab-content">
            <h2 className="admin-tab-title">Gelen Siparişler</h2>
            <div className="orders-list-panel">
              {orders.length === 0 ? (
                <div className="admin-empty-state">
                  <ClipboardList size={48} />
                  <h3>Henüz Sipariş Alınmadı</h3>
                  <p>Müşteri siparişleri anlık olarak burada listelenecektir.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sipariş Kodu</th>
                      <th>Seçilen Ürünler / Özelleştirmeler</th>
                      <th>Teslimat Tipi</th>
                      <th>Toplam Tutar</th>
                      <th>Sipariş Durumu</th>
                      <th>Aksiyon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice().reverse().map((order) => (
                      <tr key={order.id}>
                        <td className="bold">{order.id}</td>
                        <td>
                          <div className="order-details-summary" style={{ fontSize: '13px', maxWidth: '380px' }}>
                            {order.itemsSummary}
                          </div>
                        </td>
                        <td>
                          <span className={`pill-type ${order.deliveryMode}`}>
                            {order.deliveryMode === 'delivery' ? 'Adrese Teslim' : 'Gel-Al'}
                          </span>
                        </td>
                        <td className="bold text-red">{order.total} TL</td>
                        <td>
                          <select 
                            className="status-selector"
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                          >
                            <option value="1">1. Sipariş Alındı</option>
                            <option value="2">2. Hazırlanıyor</option>
                            <option value="3">3. Fırında</option>
                            <option value="4">4. Paketleniyor</option>
                            <option value="5">5. Yola Çıktı / Hazır</option>
                            <option value="completed">✔ Tamamlandı</option>
                          </select>
                        </td>
                        <td>
                          <button 
                            className="action-btn edit" 
                            onClick={() => onShowSlip(order)}
                            title="Kurye Fişini Yazdır"
                            style={{ padding: '6px 12px', backgroundColor: 'var(--color-dark-blue)', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '800' }}
                          >
                            Fiş Yazdır
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Products & Campaigns */}
        {activeTab === 'products' && (
          <div className="admin-tab-content">
            <h2 className="admin-tab-title">Ürün & Kampanya Yönetimi</h2>
            
            {/* Add Product Form */}
            <div className="add-product-card">
              <h3>Yeni Ürün / Kampanya Ekle</h3>
              <form className="add-product-form" onSubmit={handleAddSubmit}>
                <div className="form-group">
                  <label>Ürün Adı</label>
                  <input 
                    type="text" 
                    placeholder="Örn: 1 Alana 1 Bedava" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fiyat (TL)</label>
                  <input 
                    type="number" 
                    placeholder="Örn: 470" 
                    value={newProduct.basePrice}
                    onChange={(e) => setNewProduct({...newProduct, basePrice: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Pizza Seçim Adeti (Kampanyalar için)</label>
                  <input 
                    type="number" 
                    placeholder="Örn: 2 (Müşteri 2 pizza seçer)" 
                    value={newProduct.requiredPizzaSelections}
                    onChange={(e) => setNewProduct({...newProduct, requiredPizzaSelections: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Açıklama</label>
                  <input 
                    type="text" 
                    placeholder="Detaylar, malzemeler..." 
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="new-product-image">Ürün Görsel URL / Dosya Yükle</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      id="new-product-image"
                      aria-label="Ürün Görsel URL"
                      type="text" 
                      placeholder="Resim linki veya public path..." 
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      style={{ flex: 1 }}
                    />
                    <input 
                      aria-label="Ürün Görsel Dosyası Yükle"
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, 'image')}
                      style={{ display: 'none' }}
                      id="product-image-upload"
                    />
                    <label htmlFor="product-image-upload" style={{ backgroundColor: 'var(--color-dark-blue)', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: 0 }}>
                      Dosya Seç
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="new-product-video">Tanıtım Videosu URL / Dosya Yükle</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      id="new-product-video"
                      aria-label="Tanıtım Videosu URL"
                      type="text" 
                      placeholder="Örn: https://www.youtube.com/watch?v=... veya yerel MP4" 
                      value={newProduct.videoUrl}
                      onChange={(e) => setNewProduct({...newProduct, videoUrl: e.target.value})}
                      style={{ flex: 1 }}
                    />
                    <input 
                      aria-label="Tanıtım Videosu Dosyası Yükle"
                      type="file" 
                      accept="video/*" 
                      onChange={(e) => handleFileUpload(e, 'videoUrl')}
                      style={{ display: 'none' }}
                      id="product-video-upload"
                    />
                    <label htmlFor="product-video-upload" style={{ backgroundColor: 'var(--color-dark-blue)', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: 0 }}>
                      Dosya Seç
                    </label>
                  </div>
                </div>
                <div className="form-group flex-row checkbox-group">
                  <label htmlFor="new-product-popular-chk">
                    <input 
                      id="new-product-popular-chk"
                      aria-label="Çok Satan / Popüler"
                      type="checkbox" 
                      checked={newProduct.popular}
                      onChange={(e) => setNewProduct({...newProduct, popular: e.target.checked})}
                    />
                    <span>Çok Satan / Popüler</span>
                  </label>
                  <label htmlFor="new-product-customizable-chk">
                    <input 
                      id="new-product-customizable-chk"
                      aria-label="Sihirbaz Özelleştirmesi Aktif"
                      type="checkbox" 
                      checked={newProduct.customizable}
                      onChange={(e) => setNewProduct({...newProduct, customizable: e.target.checked})}
                    />
                    <span>Sihirbaz Özelleştirmesi Aktif</span>
                  </label>
                </div>
                <button type="submit" className="add-submit-btn">
                  <Plus size={16} />
                  <span>Ürün Ekle</span>
                </button>
              </form>
            </div>

            {/* Products list */}
            <div className="products-list-panel" style={{ marginTop: '24px' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Görsel</th>
                    <th>Ürün Adı</th>
                    <th>Fiyat</th>
                    <th>Kategori</th>
                    <th>Pizza Seçim Adeti</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const isEditing = editingId === product.id;
                    return (
                      <tr key={product.id}>
                        <td><img src={product.image} alt={product.name} className="table-thumb" /></td>
                        <td>
                          {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '220px' }}>
                              <input 
                                aria-label="Düzenlenen Ürün Adı"
                                type="text" 
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                className="table-inline-input"
                                placeholder="Ürün Adı"
                                style={{ fontWeight: 'bold' }}
                              />
                              <input 
                                aria-label="Düzenlenen Ürün Açıklaması"
                                type="text" 
                                value={editingProduct.description || ''}
                                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                                className="table-inline-input"
                                placeholder="Açıklama"
                                style={{ fontSize: '11px' }}
                              />
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <input 
                                  aria-label="Düzenlenen Ürün Görsel URL"
                                  type="text" 
                                  value={editingProduct.image || ''}
                                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                                  className="table-inline-input"
                                  placeholder="Görsel URL"
                                  style={{ fontSize: '11px', flex: 1 }}
                                />
                                <input 
                                  aria-label="Düzenlenen Ürün Görseli Yükle"
                                  type="file" 
                                  accept="image/*" 
                                  onChange={(e) => handleFileUpload(e, 'image', true)}
                                  style={{ display: 'none' }}
                                  id={`edit-image-upload-${product.id}`}
                                />
                                <label htmlFor={`edit-image-upload-${product.id}`} style={{ backgroundColor: 'var(--color-dark-blue)', color: 'white', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                  Yükle
                                </label>
                              </div>
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <input 
                                  aria-label="Düzenlenen Video URL"
                                  type="text" 
                                  value={editingProduct.videoUrl || ''}
                                  onChange={(e) => setEditingProduct({...editingProduct, videoUrl: e.target.value})}
                                  className="table-inline-input"
                                  placeholder="Video URL"
                                  style={{ fontSize: '11px', flex: 1 }}
                                />
                                <input 
                                  aria-label="Düzenlenen Video Yükle"
                                  type="file" 
                                  accept="video/*" 
                                  onChange={(e) => handleFileUpload(e, 'videoUrl', true)}
                                  style={{ display: 'none' }}
                                  id={`edit-video-upload-${product.id}`}
                                />
                                <label htmlFor={`edit-video-upload-${product.id}`} style={{ backgroundColor: 'var(--color-dark-blue)', color: 'white', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                  Yükle
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span className="bold">{product.name}</span>
                              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>{product.description}</span>
                              {product.videoUrl && (
                                <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                                  🎥 Tanıtım Videosu Aktif
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="bold text-red">
                          {isEditing ? (
                            <input 
                              aria-label="Düzenlenen Fiyat"
                              type="number" 
                              value={editingProduct.basePrice}
                              onChange={(e) => setEditingProduct({...editingProduct, basePrice: e.target.value})}
                              className="table-inline-input inline-price"
                              style={{ width: '80px' }}
                            />
                          ) : (
                            <span>{product.basePrice} TL</span>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <select
                              aria-label="Düzenlenen Ürün Kategorisi"
                              value={editingProduct.category}
                              onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                              className="table-inline-input"
                              style={{ padding: '4px', fontSize: '12px' }}
                            >
                              {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          ) : (
                            <span>{CATEGORIES.find(c => c.id === product.category)?.name || product.category}</span>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input 
                              aria-label="Düzenlenen Pizza Seçim Adeti"
                              type="number" 
                              value={editingProduct.requiredPizzaSelections}
                              onChange={(e) => setEditingProduct({...editingProduct, requiredPizzaSelections: e.target.value})}
                              className="table-inline-input inline-price"
                              style={{ width: '60px' }}
                            />
                          ) : (
                            <span>{product.requiredPizzaSelections || 'Yok'}</span>
                          )}
                        </td>
                        <td>
                          <div className="table-actions">
                            {isEditing ? (
                              <button className="action-btn save" onClick={handleEditSave}><Check size={16} /></button>
                            ) : (
                              <button className="action-btn edit" onClick={() => handleEditClick(product)}><Edit size={16} /></button>
                            )}
                            <button className="action-btn delete" onClick={() => onDeleteProduct(product.id)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Dough & Crust Options */}
        {activeTab === 'dough-crust' && (
          <div className="admin-tab-content">
            <h2 className="admin-tab-title">Hamur & Kenar Yönetimi</h2>
            
            <div className="dashboard-stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {/* Dough Panel */}
              <div className="deals-card" style={{ padding: '24px' }}>
                <h3>Kayıtlı Hamur Seçenekleri</h3>
                <form className="add-product-form" onSubmit={handleAddDoughSubmit} style={{ gridTemplateColumns: '1fr 1fr', marginTop: '16px' }}>
                  <input 
                    aria-label="Hamur Adı"
                    type="text" 
                    placeholder="Örn: Klasik Kalın Hamur" 
                    value={newDough.name}
                    onChange={(e) => setNewDough({...newDough, name: e.target.value})}
                    required 
                    style={{ border: '1px solid #EFEAE2', padding: '8px', borderRadius: '4px' }}
                  />
                  <input 
                    aria-label="Hamur Ek Fiyatı"
                    type="number" 
                    placeholder="Ek Fiyat (TL)" 
                    value={newDough.price}
                    onChange={(e) => setNewDough({...newDough, price: e.target.value})}
                    style={{ border: '1px solid #EFEAE2', padding: '8px', borderRadius: '4px' }}
                  />
                  <button type="submit" className="add-submit-btn" style={{ gridColumn: 'span 2', height: '36px' }}>
                    Hamur Ekle
                  </button>
                </form>

                <table className="admin-table" style={{ marginTop: '24px', boxShadow: 'none' }}>
                  <thead>
                    <tr>
                      <th>Hamur Adı</th>
                      <th>Fiyat Farkı</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doughs.map(d => {
                      const isEditingDough = editingDoughId === d.id;
                      return (
                        <tr key={d.id}>
                          <td>
                            {isEditingDough ? (
                              <input 
                                aria-label="Düzenlenen Hamur Adı"
                                type="text" 
                                value={editingDough.name} 
                                onChange={(e) => setEditingDough({ ...editingDough, name: e.target.value })}
                                style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', fontSize: '12px' }}
                              />
                            ) : (
                              <span className="bold">{d.name}</span>
                            )}
                          </td>
                          <td className="text-red">
                            {isEditingDough ? (
                              <input 
                                aria-label="Düzenlenen Hamur Fiyatı"
                                type="number" 
                                value={editingDough.price} 
                                onChange={(e) => setEditingDough({ ...editingDough, price: e.target.value })}
                                style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', width: '70px', fontSize: '12px' }}
                              />
                            ) : (
                              <span>+{d.price} TL</span>
                            )}
                          </td>
                          <td>
                            <div className="table-actions" style={{ gap: '6px' }}>
                              {isEditingDough ? (
                                <button className="action-btn save" onClick={handleDoughEditSave}><Check size={14} /></button>
                              ) : (
                                <button className="action-btn edit" onClick={() => handleDoughEditClick(d)}><Edit size={14} /></button>
                              )}
                              <button className="action-btn delete" onClick={() => onDeleteDough(d.id)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Crust Panel */}
              <div className="deals-card" style={{ padding: '24px' }}>
                <h3>Kayıtlı Kenar Seçenekleri</h3>
                <form className="add-product-form" onSubmit={handleAddCrustSubmit} style={{ gridTemplateColumns: '1fr 1fr', marginTop: '16px' }}>
                  <input 
                    aria-label="Kenar Adı"
                    type="text" 
                    placeholder="Örn: Sarımsaklı Kenar" 
                    value={newCrust.name}
                    onChange={(e) => setNewCrust({...newCrust, name: e.target.value})}
                    required
                    style={{ border: '1px solid #EFEAE2', padding: '8px', borderRadius: '4px' }}
                  />
                  <input 
                    aria-label="Kenar Ek Fiyatı"
                    type="number" 
                    placeholder="Ek Fiyat (TL)" 
                    value={newCrust.price}
                    onChange={(e) => setNewCrust({...newCrust, price: e.target.value})}
                    style={{ border: '1px solid #EFEAE2', padding: '8px', borderRadius: '4px' }}
                  />
                  <button type="submit" className="add-submit-btn" style={{ gridColumn: 'span 2', height: '36px' }}>
                    Kenar Ekle
                  </button>
                </form>

                <table className="admin-table" style={{ marginTop: '24px', boxShadow: 'none' }}>
                  <thead>
                    <tr>
                      <th>Kenar Adı</th>
                      <th>Fiyat Farkı</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crusts.map(c => {
                      const isEditingCrust = editingCrustId === c.id;
                      return (
                        <tr key={c.id}>
                          <td>
                            {isEditingCrust ? (
                              <input 
                                aria-label="Düzenlenen Kenar Adı"
                                type="text" 
                                value={editingCrust.name} 
                                onChange={(e) => setEditingCrust({ ...editingCrust, name: e.target.value })}
                                style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', fontSize: '12px' }}
                              />
                            ) : (
                              <span className="bold">{c.name}</span>
                            )}
                          </td>
                          <td className="text-red">
                            {isEditingCrust ? (
                              <input 
                                aria-label="Düzenlenen Kenar Fiyatı"
                                type="number" 
                                value={editingCrust.price} 
                                onChange={(e) => setEditingCrust({ ...editingCrust, price: e.target.value })}
                                style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', width: '70px', fontSize: '12px' }}
                              />
                            ) : (
                              <span>+{c.price} TL</span>
                            )}
                          </td>
                          <td>
                            <div className="table-actions" style={{ gap: '6px' }}>
                              {isEditingCrust ? (
                                <button className="action-btn save" onClick={handleCrustEditSave}><Check size={14} /></button>
                              ) : (
                                <button className="action-btn edit" onClick={() => handleCrustEditClick(c)}><Edit size={14} /></button>
                              )}
                              <button className="action-btn delete" onClick={() => onDeleteCrust(c.id)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Extra Ingredients Management */}
        {activeTab === 'ingredients' && (
          <div className="admin-tab-content">
            <h2 className="admin-tab-title">Ekstra Malzeme Yönetimi</h2>
            
            <div className="deals-card" style={{ padding: '24px', maxWidth: '600px' }}>
              <h3>Yeni Ekstra Malzeme Ekle</h3>
              <form className="add-product-form" onSubmit={handleAddIngredientSubmit} style={{ gridTemplateColumns: '1.2fr 1fr', marginTop: '16px', gap: '12px' }}>
                <input 
                  aria-label="Malzeme Adı"
                  type="text" 
                  placeholder="Örn: Dilim Ananas" 
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                  required
                  style={{ border: '1px solid #EFEAE2', padding: '10px', borderRadius: '4px' }}
                />
                <input 
                  aria-label="Malzeme Fiyatı"
                  type="number" 
                  placeholder="Fiyat (TL)" 
                  value={newIngredient.price}
                  onChange={(e) => setNewIngredient({...newIngredient, price: e.target.value})}
                  style={{ border: '1px solid #EFEAE2', padding: '10px', borderRadius: '4px' }}
                />
                <button type="submit" className="add-submit-btn" style={{ gridColumn: 'span 2', height: '40px' }}>
                  Malzeme Ekle
                </button>
              </form>

              <table className="admin-table" style={{ marginTop: '24px', boxShadow: 'none' }}>
                <thead>
                  <tr>
                    <th>Malzeme Adı</th>
                    <th>Fiyatı</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map(ing => {
                    const isEditingIng = editingIngredientId === ing.id;
                    return (
                      <tr key={ing.id}>
                        <td>
                          {isEditingIng ? (
                            <input 
                              aria-label="Düzenlenen Malzeme Adı"
                              type="text" 
                              value={editingIngredient.name} 
                              onChange={(e) => setEditingIngredient({ ...editingIngredient, name: e.target.value })}
                              style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', fontSize: '12px' }}
                            />
                          ) : (
                            <span className="bold">{ing.name}</span>
                          )}
                        </td>
                        <td className="text-red">
                          {isEditingIng ? (
                            <input 
                              aria-label="Düzenlenen Malzeme Fiyatı"
                              type="number" 
                              value={editingIngredient.price} 
                              onChange={(e) => setEditingIngredient({ ...editingIngredient, price: e.target.value })}
                              style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px', width: '70px', fontSize: '12px' }}
                            />
                          ) : (
                            <span>+{ing.price} TL</span>
                          )}
                        </td>
                        <td>
                          <div className="table-actions" style={{ gap: '6px' }}>
                            {isEditingIng ? (
                              <button className="action-btn save" onClick={handleIngredientEditSave}><Check size={14} /></button>
                            ) : (
                              <button className="action-btn edit" onClick={() => handleIngredientEditClick(ing)}><Edit size={14} /></button>
                            )}
                            <button className="action-btn delete" onClick={() => onDeleteIngredient(ing.id)}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Dashboard Statistics */}
        {activeTab === 'dashboard' && (
          <div className="admin-tab-content">
            <h2 className="admin-tab-title">Genel İstatistikler</h2>
            <div className="dashboard-stats-grid">
              <div className="stat-card">
                <div className="stat-card-icon red"><DollarSign size={24} /></div>
                <div className="stat-card-info">
                  <span>Toplam Ciro</span>
                  <h3>{totalRevenue} TL</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon blue"><ClipboardList size={24} /></div>
                <div className="stat-card-info">
                  <span>Toplam Sipariş</span>
                  <h3>{totalOrdersCount} Sipariş</h3>
                </div>
              </div>
            </div>
            <div className="dashboard-activity-panel" style={{ marginTop: '24px' }}>
              <h3>Sipariş İlerleme Raporu</h3>
              <div className="activity-status-summary">
                <p>Aktif Bekleyen Siparişler: <strong>{orders.filter(o => o.status !== 'completed').length} adet</strong></p>
                <p>Teslim Edilen Siparişler: <strong>{orders.filter(o => o.status === 'completed').length} adet</strong></p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Users & Notifications Management */}
        {activeTab === 'users' && (
          <div className="admin-tab-content">
            <h2 className="admin-tab-title">Kullanıcılar & Cüzdan Yönetimi</h2>
            
            <div className="deals-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3>Kayıtlı Kullanıcı Listesi</h3>
              <table className="admin-table" style={{ marginTop: '16px', boxShadow: 'none' }}>
                <thead>
                  <tr>
                    <th>Müşteri Adı</th>
                    <th>E-Posta</th>
                    <th>Telefon</th>
                    <th>Cüzdan Bakiyesi</th>
                    <th>Kayıt Tarihi</th>
                    <th>Bakiye Güncelle</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map(u => (
                    <tr key={u.id}>
                      <td className="bold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td className="bold text-green">{u.walletBalance} TL</td>
                      <td>{u.joinDate}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <input 
                            aria-label={`${u.name} Cüzdan Bakiyesi Güncelle`}
                            type="number" 
                            defaultValue={u.walletBalance}
                            onBlur={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val)) {
                                onUpdateUserWallet(u.id, val);
                              }
                            }}
                            style={{ width: '70px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                            placeholder="Miktar"
                          />
                          <span style={{ fontSize: '10px', color: '#64748b' }}>TL</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="deals-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3>Kayıtlı Davet & Kod Kullanım Geçmişi</h3>
              <table className="admin-table" style={{ marginTop: '16px', boxShadow: 'none' }}>
                <thead>
                  <tr>
                    <th>Davet Eden</th>
                    <th>Davet Kodu</th>
                    <th>Davet Edilen Arkadaş</th>
                    <th>Telefon</th>
                    <th>Durum</th>
                    <th>Kazanılan Tutar</th>
                    <th>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {referralTransactions.map(t => (
                    <tr key={t.id}>
                      <td className="bold">{t.referrerName}</td>
                      <td className="text-red bold">{t.code}</td>
                      <td className="bold">{t.refereeName}</td>
                      <td>{t.refereePhone}</td>
                      <td>
                        <span style={{ 
                          padding: '2px 8px', 
                          borderRadius: '9999px', 
                          fontSize: '10px', 
                          fontWeight: 'bold', 
                          backgroundColor: t.status === 'completed' ? '#ecfdf5' : '#fffbeb', 
                          color: t.status === 'completed' ? '#065f46' : '#b45309' 
                        }}>
                          {t.status === 'completed' ? 'Satış Alındı (Tamamlandı)' : 'Üye Oldu (Sipariş Bekleniyor)'}
                        </span>
                      </td>
                      <td className="bold text-green">+{t.rewardAmount} TL</td>
                      <td>{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="deals-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3>Üst Kayan Yazı Kampanya Duyurusu</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 16px 0' }}>
                Web sitesinin en üstünde tüm sayfalarda dönen duyuru bandının içeriğini buradan değiştirebilirsiniz.
              </p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                onUpdateAnnouncement(announcementInput);
                setShowAnnouncementSaved(true);
                setTimeout(() => setShowAnnouncementSaved(false), 3000);
              }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="announcement-text-input" style={{ fontSize: '13px', fontWeight: 'bold' }}>Duyuru Metni</label>
                  <input 
                    id="announcement-text-input"
                    aria-label="Kayan Yazı Duyuru Metni"
                    type="text" 
                    value={announcementInput}
                    onChange={(e) => setAnnouncementInput(e.target.value)}
                    required
                    placeholder="Örn: 🍕 Salı - Perşembe Günlerine Özel 2 Orta Boy Pizza Sadece 299 TL!"
                    style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button type="submit" className="add-submit-btn" style={{ height: '40px', width: '160px' }}>
                    Duyuruyu Güncelle
                  </button>
                  {showAnnouncementSaved && (
                    <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ✓ Başarıyla Kaydedildi!
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className="deals-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>💬</span> WhatsApp Sipariş & Cloud API Ayarları
                </h3>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: '12px', 
                  fontSize: '11px', 
                  fontWeight: 'bold', 
                  backgroundColor: whatsAppApiModeInput === 'cloud_api' ? '#e0f2fe' : '#f1f5f9',
                  color: whatsAppApiModeInput === 'cloud_api' ? '#0369a1' : '#475569' 
                }}>
                  {whatsAppApiModeInput === 'cloud_api' ? '⚡ WhatsApp Cloud API Aktif' : '📱 Standart WhatsApp Aktif'}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 16px 0' }}>
                Müşterilerin sepette "WhatsApp ile Sipariş Ver" butonunu tıkladıklarında çalışacak mod (Standart Web veya Meta WhatsApp Cloud API) ve mesaj ayarlarını buradan yapabilirsiniz.
              </p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                onUpdateWhatsAppConfig({
                  number: whatsAppNumberInput,
                  template: whatsAppTemplateInput,
                  apiMode: whatsAppApiModeInput,
                  phoneId: whatsAppPhoneIdInput,
                  token: whatsAppTokenInput,
                  cloudEndpoint: whatsAppCloudEndpointInput,
                  includePhotos: whatsAppIncludePhotosInput
                });
                setShowWhatsAppSaved(true);
                setTimeout(() => setShowWhatsAppSaved(false), 3000);
              }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '650px' }}>
                
                {/* Entegrasyon Modu Seçimi */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Entegrasyon Modu Seçimi</label>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="waMode" 
                        value="standard" 
                        checked={whatsAppApiModeInput === 'standard'} 
                        onChange={(e) => setWhatsAppApiModeInput(e.target.value)}
                      />
                      <span>Standart WhatsApp Yönlendirme (wa.me)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="waMode" 
                        value="cloud_api" 
                        checked={whatsAppApiModeInput === 'cloud_api'} 
                        onChange={(e) => setWhatsAppApiModeInput(e.target.value)}
                      />
                      <span style={{ fontWeight: 'bold', color: '#0284c7' }}>WhatsApp Cloud API & Webhook (AWS / Meta)</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="whatsapp-number-input" style={{ fontSize: '13px', fontWeight: 'bold' }}>WhatsApp Sipariş Hattı Telefon Numarası (Ülke kodlu, boşluksuz)</label>
                  <input 
                    id="whatsapp-number-input"
                    aria-label="WhatsApp Sipariş Telefon Numarası"
                    type="text" 
                    value={whatsAppNumberInput}
                    onChange={(e) => setWhatsAppNumberInput(e.target.value)}
                    required
                    placeholder="Örn: 905057261717"
                    style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' }}
                  />
                </div>

                {/* Fotoğraf Bağlantılarını Ekleme Seçeneği */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', backgroundColor: '#fdf4ff', borderRadius: '6px', border: '1px solid #f5d0fe' }}>
                  <input 
                    id="whatsapp-include-photos-input"
                    type="checkbox" 
                    checked={whatsAppIncludePhotosInput}
                    onChange={(e) => setWhatsAppIncludePhotosInput(e.target.checked)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="whatsapp-include-photos-input" style={{ fontSize: '13px', fontWeight: 'bold', color: '#86198f', cursor: 'pointer' }}>
                    📸 Sipariş Mesajına Ürün Görsel Bağlantılarını (Fotoğrafları) Ekle
                  </label>
                </div>

                {/* Cloud API Özel Ayarları (Eğer Cloud API modundaysa) */}
                {whatsAppApiModeInput === 'cloud_api' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                    <h4 style={{ margin: 0, fontSize: '13px', color: '#0369a1', fontWeight: 'bold' }}>⚡ Meta WhatsApp Cloud API & AWS Webhook Yapılandırması</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="wa-phone-id-input" style={{ fontSize: '12px', fontWeight: 'bold' }}>Phone Number ID (Meta Developer Dashboard)</label>
                      <input 
                        id="wa-phone-id-input"
                        type="text" 
                        value={whatsAppPhoneIdInput}
                        onChange={(e) => setWhatsAppPhoneIdInput(e.target.value)}
                        placeholder="Örn: 105674892019..."
                        style={{ padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="wa-token-input" style={{ fontSize: '12px', fontWeight: 'bold' }}>System User Access Token (API Key)</label>
                      <input 
                        id="wa-token-input"
                        type="password" 
                        value={whatsAppTokenInput}
                        onChange={(e) => setWhatsAppTokenInput(e.target.value)}
                        placeholder="Örn: EAAG..."
                        style={{ padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label htmlFor="wa-endpoint-input" style={{ fontSize: '12px', fontWeight: 'bold' }}>AWS Sunucu Webhook URL / Custom API Endpoint</label>
                      <input 
                        id="wa-endpoint-input"
                        type="text" 
                        value={whatsAppCloudEndpointInput}
                        onChange={(e) => setWhatsAppCloudEndpointInput(e.target.value)}
                        placeholder="Örn: https://api.dinapolipizza.com.tr/v1/whatsapp-webhook veya AWS API Gateway"
                        style={{ padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                      />
                      <span style={{ fontSize: '11px', color: '#0369a1' }}>
                        * AWS Webhook sunucunuz ayarlandığında gelen siparişler doğrudan veritabanınıza kaydolur ve müşteriye onay mesajı gönderilir.
                      </span>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="whatsapp-template-input" style={{ fontSize: '13px', fontWeight: 'bold' }}>Otomatik Mesaj Şablonu</label>
                  <textarea 
                    id="whatsapp-template-input"
                    aria-label="WhatsApp Sipariş Mesaj Şablonu"
                    value={whatsAppTemplateInput}
                    onChange={(e) => setWhatsAppTemplateInput(e.target.value)}
                    required
                    rows="6"
                    style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical' }}
                    placeholder="Sipariş metin şablonu..."
                  />
                  <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    Kullanabileceğiniz etiketler: <strong>{`{sepet_detayi}`}</strong>, <strong>{`{teslimat_tipi}`}</strong>, <strong>{`{adres_detayi}`}</strong>, <strong>{`{toplam_tutar}`}</strong>, <strong>{`{urun_gorselleri}`}</strong>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button type="submit" className="add-submit-btn" style={{ height: '40px', width: '240px' }}>
                    WhatsApp & Cloud API Güncelle
                  </button>
                  {showWhatsAppSaved && (
                    <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ✓ WhatsApp Ayarları Kaydedildi!
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className="deals-card" style={{ padding: '24px' }}>
              <h3>Duyuru & Kampanya E-Postası Gönder</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const allEmails = usersList.map(u => u.email);
                onSendMailNotification(allEmails, emailSubject, emailMessage);
              }} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
                
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="email-recipients-input" style={{ fontSize: '13px', fontWeight: 'bold' }}>Alıcılar</label>
                  <input 
                    id="email-recipients-input"
                    aria-label="Kampanya Alıcıları Listesi"
                    type="text" 
                    value={`Tüm Kayıtlı Kullanıcılar (${usersList.length} E-Posta adresi)`}
                    disabled
                    style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#f1f5f9', fontSize: '13px', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="email-subject-input" style={{ fontSize: '13px', fontWeight: 'bold' }}>E-Posta Konusu</label>
                  <input 
                    id="email-subject-input"
                    aria-label="Kampanya E-Posta Konusu"
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                    style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' }}
                    placeholder="E-Posta Başlığı"
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="email-message-textarea" style={{ fontSize: '13px', fontWeight: 'bold' }}>Mesaj İçeriği</label>
                  <textarea 
                    id="email-message-textarea"
                    aria-label="Kampanya E-Posta Mesajı İçeriği"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    required
                    rows="5"
                    style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical' }}
                    placeholder="Duyuru mesajı içeriği..."
                  />
                </div>

                <button type="submit" className="add-submit-btn" style={{ height: '40px', width: '200px', alignSelf: 'flex-start' }}>
                  E-Posta Duyurusu Gönder
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'social-shares' && (
          <div className="admin-tab-content">
            <h2 className="admin-tab-title">Sosyal Medya Tavsiye Paylaşımları</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              Müşterilerin siparişlerini tamamladıktan sonra sosyal medyada yaptıkları tavsiye paylaşımları ve kazandıkları Ye-Kazan dilimleri.
            </p>

            <div className="orders-list-panel">
              {socialShares.length === 0 ? (
                <div className="admin-empty-state">
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📢</span>
                  <h3>Henüz Sosyal Paylaşım Yapılmadı</h3>
                  <p>Müşteriler siparişlerini paylaştıkça anlık loglar burada listelenecektir.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Paylaşım Kodu</th>
                      <th>Sipariş No</th>
                      <th>Müşteri Adı</th>
                      <th>E-Posta</th>
                      <th>Platform</th>
                      <th>Saat</th>
                      <th>Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socialShares.map((share) => (
                      <tr key={share.id}>
                        <td><strong>{share.id}</strong></td>
                        <td>#{share.orderId}</td>
                        <td>{share.userName}</td>
                        <td>{share.userEmail}</td>
                        <td>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            backgroundColor: share.platform === 'Twitter/X' ? '#e2e8f0' : '#e6fffa',
                            color: share.platform === 'Twitter/X' ? '#1a202c' : '#234e52'
                          }}>
                            {share.platform}
                          </span>
                        </td>
                        <td>{share.timestamp}</td>
                        <td>
                          <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '12px' }}>
                            {share.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
