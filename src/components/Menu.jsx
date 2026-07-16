import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES, INITIAL_PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { 
  Search, Pizza, Sparkles, Flame, Drumstick, Utensils, 
  Dessert, Sandwich, Croissant, CupSoda, Droplet,
  ChevronLeft, ChevronRight 
} from 'lucide-react';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'sparkles':
      return <Sparkles size={16} />;
    case 'pizza':
      return <Pizza size={16} />;
    case 'flame':
      return <Flame size={16} />;
    case 'drumstick':
      return <Drumstick size={16} />;
    case 'french-fries':
      return <Utensils size={16} />;
    case 'ice-cream':
      return <Dessert size={16} />;
    case 'wrap':
      return <Sandwich size={16} />;
    case 'pizza-slice':
      return <Pizza size={16} />;
    case 'bread':
      return <Croissant size={16} />;
    case 'cup-soda':
      return <CupSoda size={16} />;
    case 'dip-sauce':
      return <Droplet size={16} />;
    default:
      return <Pizza size={16} />;
  }
};

export default function Menu({ onAddToCart, products = INITIAL_PRODUCTS }) {
  const [activeCategory, setActiveCategory] = useState('pizzalar');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef(null);

  // Group active products list dynamically
  const groupedProducts = CATEGORIES.reduce((acc, category) => {
    acc[category.id] = products.filter(p => p.category === category.id);
    return acc;
  }, {});

  // Scrollspy logic: update active category pill based on scroll position
  useEffect(() => {
    if (searchQuery) return;

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 160;
      let currentActive = CATEGORIES[0].id;

      for (const category of CATEGORIES) {
        const element = document.getElementById(`sec-${category.id}`);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentActive = category.id;
          }
        }
      }
      
      setActiveCategory(currentActive);
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [searchQuery, products]);

  // Scroll category bar horizontally
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Smooth scroll to a category section
  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`sec-${categoryId}`);
    if (element) {
      const headerOffset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Filtered list when searching
  const filteredSearchProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           product.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section className="menu-section-tr" id="menu">
      <div className="container">
        {/* Navigation & Search Area */}
        <div className="menu-header-bar-tr">
          <h2 className="section-title-main-tr">Lezzet Menümüz</h2>
          
          <div className="search-wrapper-tr">
            <Search size={18} className="search-icon-tr" />
            <input 
              type="text" 
              placeholder="Canın hangi lezzeti çekiyor?.." 
              className="search-input-tr"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Sticky Categories Bar */}
        <div className="categories-scroller-container sticky-category-bar">
          <button className="scroll-arrow left" onClick={() => handleScroll('left')} aria-label="Sola Kaydır">
            <ChevronLeft size={16} />
          </button>
          
          <div className="categories-list-scrollable" ref={scrollContainerRef}>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`category-pill-tr ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => scrollToCategory(category.id)}
              >
                {getCategoryIcon(category.icon)}
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <button className="scroll-arrow right" onClick={() => handleScroll('right')} aria-label="Sağa Kaydır">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Products Render Flow */}
        {searchQuery ? (
          /* Search Results View */
          <div>
            <h3 className="category-section-title">Arama Sonuçları ({filteredSearchProducts.length})</h3>
            {filteredSearchProducts.length > 0 ? (
              <div className="products-grid-tr">
                {filteredSearchProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={onAddToCart} 
                  />
                ))}
              </div>
            ) : (
              <div className="empty-results-state">
                <h3>Aradığınız lezzet bulunamadı</h3>
                <p>Kelimeyi değiştirerek tekrar deneyebilirsiniz.</p>
              </div>
            )}
          </div>
        ) : (
          /* Default Vertical Scrollspy Sections */
          <div className="sections-vertical-stack">
            {CATEGORIES.map((category) => {
              const categoryProducts = groupedProducts[category.id] || [];
              if (categoryProducts.length === 0) return null;

              return (
                <div 
                  key={category.id} 
                  id={`sec-${category.id}`} 
                  className="category-section-block"
                >
                  <h3 className="category-section-title">
                    {category.name}
                  </h3>
                  <div className="products-grid-tr">
                    {categoryProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={onAddToCart} 
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
