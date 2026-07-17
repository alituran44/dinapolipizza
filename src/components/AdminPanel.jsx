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
  
  crusts,
  onAddCrust,
  onDeleteCrust,
  
  ingredients,
  onAddIngredient,
  onDeleteIngredient,
  
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
    popular: false,
    customizable: false,
    requiredPizzaSelections: 0
  });

  const [editingId, setEditingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

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
                            <input 
                              type="text" 
                              value={editingProduct.name}
                              onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                              className="table-inline-input"
                            />
                          ) : (
                            <span className="bold">{product.name}</span>
                          )}
                        </td>
                        <td className="bold text-red">
                          {isEditing ? (
                            <input 
                              type="number" 
                              value={editingProduct.basePrice}
                              onChange={(e) => setEditingProduct({...editingProduct, basePrice: e.target.value})}
                              className="table-inline-input inline-price"
                            />
                          ) : (
                            <span>{product.basePrice} TL</span>
                          )}
                        </td>
                        <td>
                          <span>{CATEGORIES.find(c => c.id === product.category)?.name || product.category}</span>
                        </td>
                        <td>
                          {isEditing ? (
                            <input 
                              type="number" 
                              value={editingProduct.requiredPizzaSelections}
                              onChange={(e) => setEditingProduct({...editingProduct, requiredPizzaSelections: e.target.value})}
                              className="table-inline-input inline-price"
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
                      <th>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doughs.map(d => (
                      <tr key={d.id}>
                        <td className="bold">{d.name}</td>
                        <td className="text-red">+{d.price} TL</td>
                        <td>
                          <button className="action-btn delete" onClick={() => onDeleteDough(d.id)}><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
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
                      <th>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crusts.map(c => (
                      <tr key={c.id}>
                        <td className="bold">{c.name}</td>
                        <td className="text-red">+{c.price} TL</td>
                        <td>
                          <button className="action-btn delete" onClick={() => onDeleteCrust(c.id)}><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
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
                    <th>Sil</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map(ing => (
                    <tr key={ing.id}>
                      <td className="bold">{ing.name}</td>
                      <td className="text-red">+{ing.price} TL</td>
                      <td>
                        <button className="action-btn delete" onClick={() => onDeleteIngredient(ing.id)}><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
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

      </main>
    </div>
  );
}
