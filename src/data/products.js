export const CATEGORIES = [
  { id: 'kampanya', name: 'Kampanyalar', icon: 'sparkles' },
  { id: 'ozel-kampanya', name: 'Özel Kampanyalar', icon: 'gift' },
  { id: 'pizzalar', name: 'Pizzalar', icon: 'pizza' },
  { id: 'doyuran-menuler', name: 'Doyuran Menüler', icon: 'package' },
  { id: 'fastfood', name: 'Fastfood & Çıtır', icon: 'utensils-crossed' },
  { id: 'citir-lezzetler', name: 'Çıtır Lezzetler', icon: 'french-fries' },
  { id: 'salatalar', name: 'Salatalar', icon: 'salad' },
  { id: 'tatlilar', name: 'Tatlılar', icon: 'ice-cream' },
  { id: 'icecekler', name: 'İçecekler', icon: 'cup-soda' },
  { id: 'soslar', name: 'Soslar & Ekstra', icon: 'dip-sauce' }
];

export const INITIAL_PRODUCTS = [
  // ==========================================
  // --- ÖZEL KAMPANYALAR (BROŞÜR ETİKETLİ) ---
  // ==========================================
  {
    id: 'firsat-super',
    category: 'ozel-kampanya',
    name: 'Süper Kampanya (10 Kişilik)',
    description: '1 Adet XXL Pizza + 1 Adet XL Pizza + 10 Parça Tavuk + Duble Patates + Rus Salatası + 1 + 1.5 Lt Cola',
    basePrice: 2249,
    image: '/super_kampanya.png',
    yeKazanSlice: 5,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 2
  },
  {
    id: 'firsat-2al1ode',
    category: 'ozel-kampanya',
    name: '2 Al 1 Öde Kampanyası',
    description: '1 Medium Boy Pizza Alana 1 Small Boy Pizza BEDAVA!',
    basePrice: 589,
    image: '/firsat_2al1ode.png',
    yeKazanSlice: 2,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 2
  },
  {
    id: 'firsat-3al2ode',
    category: 'ozel-kampanya',
    name: '3 Al 2 Öde Kampanyası',
    description: '2 Medium Boy Pizza Alana 1 Small Boy Pizza BEDAVA!',
    basePrice: 849,
    image: '/firsat_3al2ode.png',
    yeKazanSlice: 3,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 3
  },
  {
    id: 'firsat-sefin',
    category: 'ozel-kampanya',
    name: 'Şefin Kampanyası',
    description: '2 Adet L Boy Pizza + Porsiyon Patates + 1 Coca-Cola BEDAVA!',
    basePrice: 1050,
    image: '/firsat_sefin.png',
    yeKazanSlice: 3,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 2
  },
  {
    id: 'firsat-arkadas',
    category: 'ozel-kampanya',
    name: 'Arkadaş Menü',
    description: '2 Medium Pizza Alana Porsiyon Patates + 1 Coca-Cola BEDAVA!',
    basePrice: 889,
    image: '/firsat_arkadas.png',
    yeKazanSlice: 2,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 2
  },
  {
    id: 'firsat-2kisilik',
    category: 'ozel-kampanya',
    name: '2 Kişilik Kampanya',
    description: 'Large Boy Pizza + Tavuk Parçacığı + Patates Cipsi + 1 LT Coca-Cola',
    basePrice: 749,
    image: '/firsat_2kisilik.png',
    yeKazanSlice: 2,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 1
  },
  {
    id: 'firsat-4kisilik',
    category: 'ozel-kampanya',
    name: '4 Kişilik Kampanya',
    description: 'XLarge Boy Pizza + 4 Adet Tavuk Parçacığı + Patates Cipsi + 1 LT Coca-Cola',
    basePrice: 1049,
    image: '/firsat_4kisilik.png',
    yeKazanSlice: 3,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 1
  },
  {
    id: 'firsat-6kisilik',
    category: 'ozel-kampanya',
    name: '6 Kişilik Kampanya',
    description: 'XXLarge Boy Pizza + 6 Adet Tavuk Parçacığı + Patates Cipsi + 1.5 LT Coca-Cola',
    basePrice: 1299,
    image: '/firsat_6kisilik.png',
    yeKazanSlice: 4,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 1
  },
  {
    id: 'firsat-8kisilik',
    category: 'ozel-kampanya',
    name: '8 Kişilik Kampanya',
    description: '2 Adet XL Pizza + 8 Parça Tavuk + Duble Patates + 1 + 1 LT Cola',
    basePrice: 1849,
    image: '/firsat_8kisilik.png',
    yeKazanSlice: 5,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 2
  },

  // ==============================================================
  // --- PİZZALAR (20 ÇEŞİT — KÜÇÜK, 2, 4, 6 KİŞİLİK FİYATLANDIRMA) ---
  // ==============================================================
  {
    id: 'pizza-margarita',
    category: 'pizzalar',
    name: 'Margarite Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Taze Domates',
    basePrice: 245,
    pricesByPeople: { '2': 390, '4': 525, '6': 635 },
    image: '/margarita.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=1-SJGQ2HLp8',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Domates']
  },
  {
    id: 'pizza-fungi',
    category: 'pizzalar',
    name: 'Fungi Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Dilimlenmiş Taze Mantar',
    basePrice: 245,
    pricesByPeople: { '2': 390, '4': 525, '6': 635 },
    image: '/fungi.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Mantar']
  },
  {
    id: 'pizza-romano',
    category: 'pizzalar',
    name: 'Romano Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Sucuk, Domates, Biber',
    basePrice: 265,
    pricesByPeople: { '2': 425, '4': 545, '6': 675 },
    image: '/romano.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=8Q_9hTdsyHY',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Sucuk', 'Domates', 'Biber']
  },
  {
    id: 'pizza-milonez',
    category: 'pizzalar',
    name: 'Milonez Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Sosis, Salam, Domates, Biber',
    basePrice: 275,
    pricesByPeople: { '2': 445, '4': 585, '6': 725 },
    image: '/milonez.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Sosis', 'Salam', 'Domates', 'Biber']
  },
  {
    id: 'pizza-et-obur',
    category: 'pizzalar',
    name: 'Et Obur Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Salam, Sucuk, Sosis ve Dana Jambon',
    basePrice: 330,
    pricesByPeople: { '2': 475, '4': 699, '6': 899 },
    image: '/et_obur.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Salam', 'Sucuk', 'Sosis', 'Dana Jambon']
  },
  {
    id: 'pizza-tonno',
    category: 'pizzalar',
    name: 'Tonno Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Ton Balığı, Mısır, Soğan, Domates, Biber',
    basePrice: 300,
    pricesByPeople: { '2': 425, '4': 575, '6': 725 },
    image: '/tonno.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Ton Balığı', 'Mısır', 'Soğan', 'Domates', 'Biber']
  },
  {
    id: 'pizza-2si-1-arada',
    category: 'pizzalar',
    name: "Pizza 2'si 1 Arada",
    description: "Di Napoli Sosu ve Peyniri (Bu Pizza'nın Yarısı Mista Pizza, Diğer Yarısı Tonno Pizza'dan Oluşmaktadır)",
    basePrice: 330,
    pricesByPeople: { '2': 475, '4': 699, '6': 899 },
    image: '/pizza_2si1arada.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Salam', 'Sucuk', 'Mantar', 'Ton Balığı', 'Mısır', 'Soğan']
  },
  {
    id: 'pizza-mista',
    category: 'pizzalar',
    name: 'Pizza Mista',
    description: 'Di Napoli Sosu ve Peyniri, Salam, Sucuk, Mantar, Domates, Biber, Mısır',
    basePrice: 330,
    pricesByPeople: { '2': 475, '4': 699, '6': 899 },
    image: '/mista.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Salam', 'Sucuk', 'Mantar', 'Domates', 'Biber', 'Mısır']
  },
  {
    id: 'pizza-dinapoli-ozel',
    category: 'pizzalar',
    name: 'Di Napoli Özel Mix Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Salam, Sucuk, Mantar, Sosis, Zeytin, Mısır, Domates, Biber',
    basePrice: 385,
    pricesByPeople: { '2': 575, '4': 845, '6': 1099 },
    image: '/sefin_pizzasi.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Salam', 'Sucuk', 'Mantar', 'Sosis', 'Zeytin', 'Mısır', 'Domates', 'Biber']
  },
  {
    id: 'pizza-karidesli',
    category: 'pizzalar',
    name: 'Karidesli Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Karides ve Mısır',
    basePrice: 385,
    pricesByPeople: { '2': 575, '4': 845, '6': 1099 },
    image: '/karidesli.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Karides', 'Mısır']
  },
  {
    id: 'pizza-citir-tavuklu',
    category: 'pizzalar',
    name: 'Çıtır Tavuklu Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Çıtır Tavuk, Domates, Biber ve Köri Sosu',
    basePrice: 345,
    pricesByPeople: { '2': 545, '4': 675, '6': 899 },
    image: '/citir_tavuklu.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Çıtır Tavuk', 'Domates', 'Biber', 'Köri Sosu']
  },
  {
    id: 'pizza-labneli',
    category: 'pizzalar',
    name: 'Labneli Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Mozzarella, Labne Peyniri, Taze Roka, Domates',
    basePrice: 330,
    pricesByPeople: { '2': 475, '4': 699, '6': 899 },
    image: '/labneli.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Labne Peyniri', 'Taze Roka', 'Domates']
  },
  {
    id: 'pizza-vejetaryen',
    category: 'pizzalar',
    name: 'Vegeretian Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Mısır, Mantar, Domates, Biber, Yeşil ve Siyah Zeytin',
    basePrice: 300,
    pricesByPeople: { '2': 425, '4': 575, '6': 725 },
    image: '/vejetaryen.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Mısır', 'Mantar', 'Domates', 'Biber', 'Yeşil Zeytin', 'Siyah Zeytin']
  },
  {
    id: 'pizza-anatolia',
    category: 'pizzalar',
    name: 'Anatolia Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Pastırma, Sucuk, Mantar, Yeşil Biber, Domates, Soğan',
    basePrice: 450,
    pricesByPeople: { '2': 699, '4': 999, '6': 1199 },
    image: '/anatolia.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Pastırma', 'Sucuk', 'Mantar', 'Yeşil Biber', 'Domates', 'Soğan']
  },
  {
    id: 'pizza-kasap-sucuklu',
    category: 'pizzalar',
    name: 'Kasap Sucuklu Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Kasap Sucuğu, Yeşil Biber, Domates ve Az Mantar',
    basePrice: 450,
    pricesByPeople: { '2': 699, '4': 999, '6': 1199 },
    image: '/kasap_sucuklu.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Kasap Sucuk', 'Yeşil Biber', 'Domates', 'Mantar']
  },
  {
    id: 'pizza-kavurmali',
    category: 'pizzalar',
    name: 'Kavurmalı Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Dana Kavurma, Domates, Köz Biber, Soğan ve Az Mantar',
    basePrice: 450,
    pricesByPeople: { '2': 699, '4': 999, '6': 1199 },
    image: '/kavurmali.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Dana Kavurma', 'Domates', 'Köz Biber', 'Soğan', 'Mantar']
  },
  {
    id: 'pizza-dort-peynirli',
    category: 'pizzalar',
    name: '4 Peynirli Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Mozzarella, Ezine Peyniri, Cheddar Peyniri, Rokfor',
    basePrice: 385,
    pricesByPeople: { '2': 575, '4': 845, '6': 1099 },
    image: '/dort_peynirli.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Ezine Peyniri', 'Cheddar Peyniri', 'Rokfor']
  },
  {
    id: 'pizza-akdeniz',
    category: 'pizzalar',
    name: 'Pizza Mediterra (Akdeniz)',
    description: 'Di Napoli Sosu ve Peyniri, Domates, Taze Roka, Yeşil Zeytin, Ezine Peyniri ve Zeytinyağı',
    basePrice: 330,
    pricesByPeople: { '2': 475, '4': 699, '6': 899 },
    image: '/akdeniz.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Domates', 'Taze Roka', 'Yeşil Zeytin', 'Ezine Peyniri', 'Zeytinyağı']
  },
  {
    id: 'pizza-meksikano',
    category: 'pizzalar',
    name: 'Meksikano (Acılı) Pizza',
    description: 'Di Napoli Sosu ve Peyniri, Jalapeno Biber, Mısır, Mantar, Domates, Zeytin, Soğan, Taze Sarımsak, Az Pul Biber',
    basePrice: 330,
    pricesByPeople: { '2': 475, '4': 699, '6': 899 },
    image: '/meksikano.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Jalapeno Biber', 'Mısır', 'Mantar', 'Domates', 'Zeytin', 'Sarımsak', 'Pul Biber']
  },
  {
    id: 'pizza-dinapoli-delux',
    category: 'pizzalar',
    name: 'Di Napoli Delux',
    description: 'Di Napoli Sosu ve Peyniri, Kasap Sucuk, Dana Kavurma, Pastırma, Domates, Biber',
    basePrice: 499,
    pricesByPeople: { '2': 789, '4': 1159, '6': 1379 },
    image: '/dinapoli_delux.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Kasap Sucuk', 'Dana Kavurma', 'Pastırma', 'Domates', 'Biber']
  },

  // ==========================================
  // --- DOYURAN MENÜLER (BROŞÜR ETİKETLİ) ---
  // ==========================================
  {
    id: 'menu-ekonomik',
    category: 'doyuran-menuler',
    name: 'Ekonomik Menü',
    description: 'Small Mista Pizza + Patates + Ayran',
    basePrice: 309,
    image: '/menu_ekonomik.png',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-ekonomik-duble',
    category: 'doyuran-menuler',
    name: 'Ekonomik Menü Duble',
    description: 'Medium Mista Pizza + Patates + Şişe Cola',
    basePrice: 409,
    image: '/menu_ekonomik.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-ogrenci',
    category: 'doyuran-menuler',
    name: 'Öğrenci Menü',
    description: 'Small Mista Pizza + Patates + Rus Salatası + Şişe Cola',
    basePrice: 319,
    image: '/menu_doyuran_combo.png',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-ogrenci-duble',
    category: 'doyuran-menuler',
    name: 'Öğrenci Menü Duble',
    description: 'Medium Mista Pizza + Patates + 1 Parça Tavuk + Şişe Cola',
    basePrice: 419,
    image: '/menu_doyuran_combo.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-sampiyon',
    category: 'doyuran-menuler',
    name: 'Şampiyon Menü',
    description: 'Small Mista Pizza + 1 Parça Tavuk + Patates + 2 Parça Soğan Halkası + Şişe Cola',
    basePrice: 349,
    image: '/menu_sampiyon.png',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-fix',
    category: 'doyuran-menuler',
    name: 'Fix Menü',
    description: 'Small Mista Pizza + Patates + 2 Parça Sosis + Şişe Cola',
    basePrice: 319,
    image: '/menu_fix.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-fix-ekstra',
    category: 'doyuran-menuler',
    name: 'Fix Menü Ekstra',
    description: 'Medium Mista Pizza + Patates + 4 Parça Sosis',
    basePrice: 429,
    image: '/menu_fix.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-dinapoli-menu',
    category: 'doyuran-menuler',
    name: 'Di Napoli Menü',
    description: 'Small Mista Pizza + Patates + 2 Parça Tavuk + Şişe Cola',
    basePrice: 359,
    image: '/menu_dinapoli_ekstra.png',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-dinapoli-super',
    category: 'doyuran-menuler',
    name: 'Di Napoli Süper Menü',
    description: 'Medium Mista Pizza + Patates + 2 Parça Tavuk + Rus Salatası + Şişe Cola',
    basePrice: 469,
    image: '/menu_doyuran_combo.png',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-genc',
    category: 'doyuran-menuler',
    name: 'Genç Menü',
    description: 'Small Mista Pizza + Patates + 2 Parça Soğan Halkası + Şişe Cola',
    basePrice: 319,
    image: '/menu_genc.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-genc-duble',
    category: 'doyuran-menuler',
    name: 'Genç Menü Duble',
    description: 'Medium Mista Pizza + Patates + 2 Parça Soğan Halkası + Şişe Cola',
    basePrice: 439,
    image: '/menu_genc.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-hamburger',
    category: 'doyuran-menuler',
    name: 'Hamburger Menü',
    description: 'Hamburger + Patates + Şişe Cola',
    basePrice: 339,
    image: '/hamburger.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-sosisli',
    category: 'doyuran-menuler',
    name: 'Sosisli Menü',
    description: 'Sosis Tabağı + Patates + Ayran',
    basePrice: 339,
    image: '/menu_sosisli.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-chicken',
    category: 'doyuran-menuler',
    name: 'Chicken Menü',
    description: 'Çıtır Tavuk Parçaları + Patates + Ayran',
    basePrice: 339,
    image: '/menu_chicken.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-peynir-toplari',
    category: 'doyuran-menuler',
    name: 'Kızarmış Peynir Topları Menüsü',
    description: '1 Jalapeno Peynir Topu, 1 Cheddar Topu, 1 Mozzarella Topu, 2 Mozzarella Stick, 2 Soğan Halkası',
    basePrice: 249,
    image: '/kizarmis_peynir_toplari.png',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },

  // ==========================================
  // --- FASTFOOD & ÇITIR LEZZETLER ---
  // ==========================================
  {
    id: 'fast-hamburger',
    category: 'fastfood',
    name: 'Hamburger',
    description: 'Tek Usta Hamburger Köftesi, Marul, Turşu ve Özel Sos',
    basePrice: 199,
    image: '/hamburger.jpg',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'fast-cheeseburger',
    category: 'fastfood',
    name: 'Çizburger',
    description: 'Tek Hamburger Köftesi, Cheddar Peyniri, Marul, Turşu ve Özel Sos',
    basePrice: 219,
    image: '/cheeseburger.jpg',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'fast-peynir-toplari',
    category: 'fastfood',
    name: 'Kızarmış Peynir Topları',
    description: 'Jalapeno, cheddar ve mozzarella dolgulu çıtır peynir topları',
    basePrice: 249,
    image: '/kizarmis_peynir_toplari.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'citir-mozzarella',
    category: 'citir-lezzetler',
    name: 'Mozzarella Stick',
    description: 'Dışı çıtır çıtır içi uzayan erimiş mozzarella peynir çubukları (5 adet)',
    basePrice: 199,
    image: '/citir_mozzarella.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'citir-sogan-kroket',
    category: 'citir-lezzetler',
    name: 'Soğan Halkaları',
    description: 'Altın sarısı çıtır kaplamalı leziz soğan halkaları',
    basePrice: 139,
    image: '/sogan_halkasi.jpg',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'citir-elma-patates',
    category: 'citir-lezzetler',
    name: 'Elma Dilim Patates',
    description: 'Özel baharatlı elma dilim patates kızartması',
    basePrice: 189,
    image: '/elma_patates.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'citir-patates',
    category: 'citir-lezzetler',
    name: 'Çıtır Patates (Parmak)',
    description: 'Çıtır porsiyon parmak patates kızartması',
    basePrice: 179,
    image: '/patates.jpg',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'fast-sinitzel',
    category: 'fastfood',
    name: 'Şinitzel',
    description: 'Özel panelenmiş tavuk göğsü şinitzel tabağı, patates kızartması ile',
    basePrice: 379,
    image: '/fast_sinitzel.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'fast-kofte',
    category: 'fastfood',
    name: 'Tekirdağ Köfte',
    description: 'Geleneksel Tekirdağ köfte porsiyonu, patates ve garnitür ile',
    basePrice: 499,
    image: '/tekirdag_kofte.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },

  // ==========================================
  // --- SALATALAR ---
  // ==========================================
  {
    id: 'salata-tavuklu',
    category: 'salatalar',
    name: 'Tavuklu Salata',
    description: 'Izgara Tavuk Göğsü, Akdeniz Yeşillikleri, Mısır, Kiraz Domates, Zeytin',
    basePrice: 359,
    image: '/salata_tavuklu.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'salata-ton',
    category: 'salatalar',
    name: 'Tonbalıklı Salata',
    description: 'Nefis Ton Balığı, Marul, Mısır, Zeytin, Salatalık, Limon Sosu',
    basePrice: 359,
    image: '/salata_ton.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'salata-akdeniz',
    category: 'salatalar',
    name: 'Akdeniz Salata',
    description: 'Ezine Beyaz Peynir, Zeytin, Roka, Domates, Salatalık, Zeytinyağı',
    basePrice: 359,
    image: '/salata_akdeniz.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'salata-rus',
    category: 'salatalar',
    name: 'Rus Salatası',
    description: 'Geleneksel garnitürlü ve mayonezli Rus salatası porsiyonu',
    basePrice: 249,
    image: '/rus_salatasi.jpg',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'salata-sebze',
    category: 'salatalar',
    name: 'Sebze Salata',
    description: 'Bol Marul, Domates, Salatalık, Mısır, Zeytin, Havuç ve Zeytinyağlı Sos',
    basePrice: 309,
    image: '/salata_sebze.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },

  // ==========================================
  // --- TATLILAR ---
  // ==========================================
  {
    id: 'tatli-sufle',
    category: 'tatlilar',
    name: 'Sufle',
    description: 'İçi akışkan çikolatalı sıcak sufle',
    basePrice: 249,
    image: '/tatli_sufle.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'tatli-kunefe',
    category: 'tatlilar',
    name: 'Künefe',
    description: 'Sıcak ve şerbetli usta künefesi, üstünde Antep fıstığı parçaları',
    basePrice: 249,
    image: '/tatli_kunefe.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'tatli-kizarmis-dondurma',
    category: 'tatlilar',
    name: 'Kızarmış Dondurma',
    description: 'Çıtır mısır gevreği kaplamalı kızarmış dondurma, çikolata soslu (Sezonsal)',
    basePrice: 199,
    image: '/kizarmis_dondurma.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false,
    comingSoon: true
  },

  // ==========================================
  // --- İÇECEKLER ---
  // ==========================================
  {
    id: 'icecek-cola-1',
    category: 'icecekler',
    name: 'Coca-Cola 1L',
    description: 'Soğuk ve ferahlatıcı orijinal tat',
    basePrice: 180,
    image: '/icecek_cola_1l.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'icecek-cola-kutu',
    category: 'icecekler',
    name: 'Coca-Cola Kutu 330ml',
    description: 'Kutu kutu mutluluk, buz gibi ferahlık',
    basePrice: 90,
    image: '/icecek_cola_can.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'icecek-fanta',
    category: 'icecekler',
    name: 'Fanta Kutu 330ml',
    description: 'Portakallı gazlı içecek',
    basePrice: 90,
    image: '/icecek_fanta_can.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'icecek-sprite',
    category: 'icecekler',
    name: 'Sprite Kutu 330ml',
    description: 'Limon aromalı gazlı içecek',
    basePrice: 90,
    image: '/icecek_sprite_can.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'icecek-ayran',
    category: 'icecekler',
    name: 'Nefis Ayran 300ml',
    description: 'Köpüklü usta ayranı',
    basePrice: 60,
    image: '/icecek_ayran.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },

  // ==========================================
  // --- SOSLAR ---
  // ==========================================
  {
    id: 'sos-ketchup',
    category: 'soslar',
    name: 'Paket Ketçap',
    description: 'Ekstra lezzet katan paket ketçap',
    basePrice: 10,
    image: '/sos_ketchup.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'sos-mayo',
    category: 'soslar',
    name: 'Paket Mayonez',
    description: 'Kremamsı ve leziz paket mayonez',
    basePrice: 10,
    image: '/sos_mayo.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'sos-acı',
    category: 'soslar',
    name: 'Paket Acı Sos',
    description: 'Acı severlere usta acı sos',
    basePrice: 10,
    image: '/sos_aci.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  }
];

export const INITIAL_DOUGHS = [
  { id: 'ince', name: 'İnce Hamur', price: 0 },
  { id: 'klasik', name: 'Klasik Hamur', price: 10 },
  { id: 'dublex', name: 'Dublex Cheddar', price: 10 }
];

export const INITIAL_CRUSTS = [
  { id: 'klasik', name: 'Klasik Kenar', price: 0 },
  { id: 'sarimsak', name: 'Sarımsak Kenar', price: 20 },
  { id: 'peynirli', name: 'Olgunlaşmış Peynir Kenar', price: 20 }
];

export const INITIAL_INGREDIENTS = [
  { id: 'jambon', name: 'Jambon', price: 25 },
  { id: 'sucuk', name: 'Sucuk', price: 25 },
  { id: 'sosis', name: 'Sosis', price: 25 },
  { id: 'tavuk', name: 'Çıtır Tavuk', price: 25 },
  { id: 'salam', name: 'Salam', price: 25 },
  { id: 'mantar', name: 'Mantar', price: 25 },
  { id: 'misir', name: 'Mısır', price: 25 },
  { id: 'kasar', name: 'Kaşar / Peynir', price: 25 },
  { id: 'ton-baligi', name: 'Ton Balığı', price: 50 },
  { id: 'pastirma', name: 'Pastırma', price: 50 },
  { id: 'vejetaryen', name: 'Vejetaryen Malzeme', price: 15 },
  { id: 'koz-biber', name: 'Köz Biber', price: 15 },
  { id: 'zeytin', name: 'Siyah / Yeşil Zeytin', price: 15 },
  { id: 'sos', name: 'Pizza Sos', price: 10 }
];

export const SIZES = [
  { id: 'kucuk', name: 'Küçük (Small)', label: '1 Kişilik', priceModifier: 0 },
  { id: 'orta', name: 'Orta (Medium)', label: '2 Kişilik', priceModifier: 135 },
  { id: 'buyuk', name: 'Büyük (Large)', label: '4 Kişilik', priceModifier: 280 },
  { id: 'xlarge', name: 'Battal (XL)', label: '6 Kişilik', priceModifier: 390 }
];

export const CRUSTS = [
  { id: 'klasik', name: 'Klasik İnce Kenar', price: 0 },
  { id: 'kalin', name: 'Klasik Kalın Kenar', price: 0 },
  { id: 'nefis', name: 'Bol Malzemeli Nefis Kenar', price: 25 }
];
