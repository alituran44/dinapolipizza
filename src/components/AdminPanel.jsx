import React, { useState } from 'react';
import { 
  Trash2, Edit, Plus, DollarSign, ClipboardList, 
  Settings, LogOut, LayoutDashboard, PlusCircle, Check,
  Flame, Layers, Database
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function AdminPanel({ 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  onUpdateProduct,
  orders,
  onUpdateOrderStatus,
  onShowSlip,
  
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
  
  onClose 
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', 'dough-crust', 'ingredients', 'dashboard'
  
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

  // Email notification states
  const [emailSubject, setEmailSubject] = useState('Di Napoli Fırsatları Başladı! 🍕');
  const [emailMessage, setEmailMessage] = useState('Merhaba, Di Napoli lezzetlerinde bu haftaya özel 75 TL cüzdan indirimi fırsatını kaçırmayın!');

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
    onUpdateProduct(editingId, {
      ...editingProduct,
      basePrice: parseFloat(editingProduct.basePrice),
      requiredPizzaSelections: parseInt(editingProduct.requiredPizzaSelections || 0)
    });
    setEditingId(null);
    setEditingProduct(null);
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
        </nav>
        
        <div className="admin-sidebar-footer">
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
                  <label>Ürün Görsel URL / Dosya Yükle</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Resim linki veya public path..." 
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      style={{ flex: 1 }}
                    />
                    <input 
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
                  <label>Tanıtım Videosu URL / Dosya Yükle</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Örn: https://www.youtube.com/watch?v=... veya yerel MP4" 
                      value={newProduct.videoUrl}
                      onChange={(e) => setNewProduct({...newProduct, videoUrl: e.target.value})}
                      style={{ flex: 1 }}
                    />
                    <input 
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
                  <label>
                    <input 
                      type="checkbox" 
                      checked={newProduct.popular}
                      onChange={(e) => setNewProduct({...newProduct, popular: e.target.checked})}
                    />
                    <span>Çok Satan / Popüler</span>
                  </label>
                  <label>
                    <input 
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
                                type="text" 
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                className="table-inline-input"
                                placeholder="Ürün Adı"
                                style={{ fontWeight: 'bold' }}
                              />
                              <input 
                                type="text" 
                                value={editingProduct.description || ''}
                                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                                className="table-inline-input"
                                placeholder="Açıklama"
                                style={{ fontSize: '11px' }}
                              />
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <input 
                                  type="text" 
                                  value={editingProduct.image || ''}
                                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                                  className="table-inline-input"
                                  placeholder="Görsel URL"
                                  style={{ fontSize: '11px', flex: 1 }}
                                />
                                <input 
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
                                  type="text" 
                                  value={editingProduct.videoUrl || ''}
                                  onChange={(e) => setEditingProduct({...editingProduct, videoUrl: e.target.value})}
                                  className="table-inline-input"
                                  placeholder="Video URL"
                                  style={{ fontSize: '11px', flex: 1 }}
                                />
                                <input 
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
                    type="text" 
                    placeholder="Örn: Klasik Kalın Hamur" 
                    value={newDough.name}
                    onChange={(e) => setNewDough({...newDough, name: e.target.value})}
                    required 
                    style={{ border: '1px solid #EFEAE2', padding: '8px', borderRadius: '4px' }}
                  />
                  <input 
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
                    type="text" 
                    placeholder="Örn: Sarımsaklı Kenar" 
                    value={newCrust.name}
                    onChange={(e) => setNewCrust({...newCrust, name: e.target.value})}
                    required
                    style={{ border: '1px solid #EFEAE2', padding: '8px', borderRadius: '4px' }}
                  />
                  <input 
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
                  type="text" 
                  placeholder="Örn: Dilim Ananas" 
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                  required
                  style={{ border: '1px solid #EFEAE2', padding: '10px', borderRadius: '4px' }}
                />
                <input 
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

            <div className="deals-card" style={{ padding: '24px' }}>
              <h3>Duyuru & Kampanya E-Postası Gönder</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const allEmails = usersList.map(u => u.email);
                onSendMailNotification(allEmails, emailSubject, emailMessage);
              }} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
                
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Alıcılar</label>
                  <input 
                    type="text" 
                    value={`Tüm Kayıtlı Kullanıcılar (${usersList.length} E-Posta adresi)`}
                    disabled
                    style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#f1f5f9', fontSize: '13px', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold' }}>E-Posta Konusu</label>
                  <input 
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                    style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px' }}
                    placeholder="E-Posta Başlığı"
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Mesaj İçeriği</label>
                  <textarea 
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

      </main>
    </div>
  );
}
