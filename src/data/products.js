export const CATEGORIES = [
  { id: 'kampanya', name: 'Kampanyalar', icon: 'sparkles' },
  { id: 'ozel-kampanya', name: 'Özel Kampanyalar', icon: 'gift' },
  { id: 'pizzalar', name: 'Pizzalar', icon: 'pizza' },
  { id: 'doyuran-menuler', name: 'Doyuran Menüler', icon: 'package' },
  { id: 'fastfood', name: 'Fastfood', icon: 'utensils-crossed' },
  { id: 'citir-lezzetler', name: 'Çıtır Lezzetler', icon: 'french-fries' },
  { id: 'salatalar', name: 'Salatalar', icon: 'salad' },
  { id: 'tatlilar', name: 'Tatlılar', icon: 'ice-cream' },
  { id: 'icecekler', name: 'İçecekler', icon: 'cup-soda' },
  { id: 'soslar', name: 'Soslar & Ekstra', icon: 'dip-sauce' }
];

export const INITIAL_PRODUCTS = [
  // --- KAMPANYALAR ---
  {
    id: 'firsat-super',
    category: 'ozel-kampanya',
    name: 'Süper Kampanya',
    description: '1 Medium Pizza + Cips + Soğan Halkası + 1 LT Coca-Cola',
    basePrice: 729,
    image: '/super_kampanya.png',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 1
  },
  {
    id: 'firsat-2al1ode',
    category: 'ozel-kampanya',
    name: '2 Al 1 Öde Kampanyası',
    description: '1 Medium Pizza Alana 1 Small Pizza BEDAVA!',
    basePrice: 579,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 2
  },
  {
    id: 'firsat-3al2ode',
    category: 'ozel-kampanya',
    name: '3 Al 2 Öde Kampanyası',
    description: '2 Medium Pizza Alana 1 Small Pizza BEDAVA!',
    basePrice: 835,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 2,
    popular: false,
    customizable: true,
    requiredPizzaSelections: 3
  },
  {
    id: 'firsat-sefin',
    category: 'ozel-kampanya',
    name: 'Şefin Kampanyası',
    description: '2 Medium Pizza + 1 Coca-Cola BEDAVA!',
    basePrice: 756,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 2,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 2
  },
  {
    id: 'firsat-2kisilik',
    category: 'ozel-kampanya',
    name: '2 Kişilik Kampanya',
    description: 'Large Pizza + Tavuk Parçacığı + Patates Cipsi + 1 LT Coca-Cola',
    basePrice: 729,
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
    description: 'XLarge Pizza + 4 Adet Tavuk Parçacığı + Patates Cipsi + 1 LT Coca-Cola',
    basePrice: 999,
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
    description: 'XXLarge Pizza + 6 Adet Tavuk Parçacığı + Patates Cipsi + 1.5 LT Coca-Cola',
    basePrice: 1249,
    image: '/firsat_6kisilik.png',
    yeKazanSlice: 4,
    popular: true,
    customizable: true,
    requiredPizzaSelections: 1
  },
  {
    id: 'firsat-arkadas',
    category: 'ozel-kampanya',
    name: 'Arkadaş Menü',
    description: '2 Small Pizza Alana 1 Coca-Cola BEDAVA!',
    basePrice: 875,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 2,
    popular: false,
    customizable: true,
    requiredPizzaSelections: 2
  },

  // --- PIZZALAR ---
  {
    id: 'pizza-margarita',
    category: 'pizzalar',
    name: 'Margarita Pizza',
    description: 'Özel Di Napoli Sosu, Mozzarella Peyniri, Taze Fesleğen, Taze Karabiber',
    basePrice: 245,
    pricesByPeople: { '2': 390, '4': 525, '6': 635 },
    image: '/margarita.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=1-SJGQ2HLp8',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Özel Di Napoli Sosu', 'Mozzarella Peyniri', 'Taze Fesleğen', 'Taze Karabiber']
  },
  {
    id: 'pizza-fungi',
    category: 'pizzalar',
    name: 'Fungi Pizza',
    description: 'Mantar, Mozzarella Peyniri, Özel Di Napoli Sosu, Taze Kekik',
    basePrice: 265,
    pricesByPeople: { '2': 400, '4': 530, '6': 640 },
    image: '/fungi.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Mantar', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu', 'Taze Kekik']
  },
  {
    id: 'pizza-tonno',
    category: 'pizzalar',
    name: 'Tonno Pizza',
    description: 'Ton Balığı, Kırmızı Soğan, Siyah Zeytin, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 360,
    pricesByPeople: { '2': 460, '4': 590, '6': 720 },
    image: '/tonno.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Ton Balığı', 'Kırmızı Soğan', 'Siyah Zeytin', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-romano',
    category: 'pizzalar',
    name: 'Romano Pizza',
    description: 'Dana Salam, Sucuk, Mantar, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 285,
    pricesByPeople: { '2': 410, '4': 540, '6': 675 },
    image: '/romano.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=8Q_9hTdsyHY',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Dana Salam', 'Sucuk', 'Mantar', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-kucuk-mista',
    category: 'pizzalar',
    name: 'Küçük Mista Pizza',
    description: 'Dana Salam, Sucuk, Mantar, Mısır, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 275,
    image: '/mista.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Dana Salam', 'Sucuk', 'Mantar', 'Mısır', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-mista',
    category: 'pizzalar',
    name: 'Mista Pizza',
    description: 'Dana Salam, Sucuk, Mantar, Mısır, Zeytin, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 290,
    pricesByPeople: { '2': 475, '4': 660, '6': 810 },
    image: '/mista.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Dana Salam', 'Sucuk', 'Mantar', 'Mısır', 'Zeytin', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-sefin-ozel',
    category: 'pizzalar',
    name: 'Şefin Pizzası',
    description: 'Dana Salam, Sucuk, Mantar, Biber, Zeytin, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 385,
    pricesByPeople: { '2': 540, '4': 790, '6': 975 },
    image: '/sefin_pizzasi.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Dana Salam', 'Sucuk', 'Mantar', 'Biber', 'Zeytin', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-milonez',
    category: 'pizzalar',
    name: 'Milonez Pizza',
    description: 'Dana Salam, Yumurta, Mantar, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 285,
    pricesByPeople: { '2': 410, '4': 540, '6': 675 },
    image: '/milonez.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Dana Salam', 'Yumurta', 'Mantar', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-citir-tavuklu',
    category: 'pizzalar',
    name: 'Çıtır Tavuklu Pizza',
    description: 'Çıtır Tavuk, Mantar, Mısır, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 340,
    pricesByPeople: { '2': 510, '4': 680, '6': 850 },
    image: '/citir_tavuklu.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Çıtır Tavuk', 'Mantar', 'Mısır', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-kasap-sucuklu',
    category: 'pizzalar',
    name: 'Kasap Sucuklu Pizza',
    description: 'Kasap Sucuk, Yeşil Biber, Mantar, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 450,
    pricesByPeople: { '2': 675, '4': 900, '6': 1150 },
    image: '/kasap_sucuklu.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Kasap Sucuk', 'Yeşil Biber', 'Mantar', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-kavurmali',
    category: 'pizzalar',
    name: 'Kavurmalı Pizza',
    description: 'Dana Kavurma, Kırmızı Biber, Yeşil Biber, Soğan, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 450,
    pricesByPeople: { '2': 675, '4': 900, '6': 1150 },
    image: '/kavurmali.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Dana Kavurma', 'Kırmızı Biber', 'Yeşil Biber', 'Soğan', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-dinapoli-ozel',
    category: 'pizzalar',
    name: 'Di Napoli Özel Pizza',
    description: 'Dana Salam, Sucuk, Mantar, Biber, Zeytin, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 450,
    pricesByPeople: { '2': 675, '4': 900, '6': 1150 },
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Dana Salam', 'Sucuk', 'Mantar', 'Biber', 'Zeytin', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-akdeniz',
    category: 'pizzalar',
    name: 'Akdeniz Pizza',
    description: 'Siyah Zeytin, Yeşil Zeytin, Mısır, Kırmızı Biber, Domates, Beyaz Peynir, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 390,
    pricesByPeople: { '2': 550, '4': 720, '6': 890 },
    image: '/akdeniz.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Siyah Zeytin', 'Yeşil Zeytin', 'Mısır', 'Kırmızı Biber', 'Domates', 'Beyaz Peynir', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-meksikano',
    category: 'pizzalar',
    name: 'Meksikano Pizza',
    description: 'Jalapeno Biber, Mısır, Kırmızı Biber, Domates, Dana Kıyma, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 390,
    pricesByPeople: { '2': 550, '4': 720, '6': 890 },
    image: '/meksikano.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Jalapeno Biber', 'Mısır', 'Kırmızı Biber', 'Domates', 'Dana Kıyma', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-pastirmali',
    category: 'pizzalar',
    name: 'Pastırmalı Pizza',
    description: 'Çemeni Sıyrılmış Pastırma, Mantar, Biber, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 450,
    pricesByPeople: { '2': 675, '4': 900, '6': 1150 },
    image: '/pastirmali.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Çemeni Sıyrılmış Pastırma', 'Mantar', 'Biber', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-kalzone',
    category: 'pizzalar',
    name: 'Kalzone (Kapalı Pizza)',
    description: 'Dana Salam, Sucuk, Mantar, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 285,
    pricesByPeople: { '2': 410, '4': 540, '6': 675 },
    image: '/kalzone.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Dana Salam', 'Sucuk', 'Mantar', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-apollo',
    category: 'pizzalar',
    name: 'Apollo Pizza',
    description: 'Sucuk, Mısır, Yeşil Biber, Mantar, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 285,
    pricesByPeople: { '2': 410, '4': 540, '6': 675 },
    image: '/apollo.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Sucuk', 'Mısır', 'Yeşil Biber', 'Mantar', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-vejetaryen',
    category: 'pizzalar',
    name: 'Vejetaryen Pizza',
    description: 'Mantar, Siyah Zeytin, Yeşil Biber, Kırmızı Biber, Domates, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 300,
    pricesByPeople: { '2': 425, '4': 575, '6': 710 },
    image: '/vejetaryen.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: true,
    ingredients: ['Mantar', 'Siyah Zeytin', 'Yeşil Biber', 'Kırmızı Biber', 'Domates', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },
  {
    id: 'pizza-primavera',
    category: 'pizzalar',
    name: 'Primavera Pizza',
    description: 'Roka, Cherry Domates, Zeytin, Parmesan, Mozzarella Peyniri, Özel Di Napoli Sosu',
    basePrice: 285,
    pricesByPeople: { '2': 410, '4': 540, '6': 675 },
    image: '/primavera.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: true,
    ingredients: ['Roka', 'Cherry Domates', 'Zeytin', 'Parmesan', 'Mozzarella Peyniri', 'Özel Di Napoli Sosu']
  },

  // --- DOYURAN MENÜLER ---
  {
    id: 'menu-ogrenci',
    category: 'doyuran-menuler',
    name: 'Öğrenci Menü',
    description: 'Yarım Pizza + Çıtır Patates + Şişe Coca-Cola',
    basePrice: 289,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-ekonomik',
    category: 'doyuran-menuler',
    name: 'Ekonomik Menü',
    description: 'Small Pizza + Patates + Şişe Coca-Cola',
    basePrice: 299,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-dinapoli-menu',
    category: 'doyuran-menuler',
    name: 'Di Napoli Menü',
    description: 'Yarım Pizza + Patates + Nuggets (3 Adet) + Şişe Coca-Cola',
    basePrice: 359,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-genc',
    category: 'doyuran-menuler',
    name: 'Genç Menü',
    description: 'Medium Pizza + Patates + Şişe Coca-Cola',
    basePrice: 399,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-super-menu',
    category: 'doyuran-menuler',
    name: 'Süper Menü',
    description: 'Medium Pizza + Patates + Çıtır Tavuk + Şişe Coca-Cola',
    basePrice: 459,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-hamburger',
    category: 'doyuran-menuler',
    name: 'Hamburger Menü',
    description: 'Usta Hamburger + Çıtır Patates + Nuggets + Kutu İçecek',
    basePrice: 329,
    image: '/hamburger.jpg',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-junyir',
    category: 'doyuran-menuler',
    name: 'Junyir Menü',
    description: 'Çeyrek Pizza + Patates + Nuggets + Kutu İçecek',
    basePrice: 429,
    image: '/menu_junyir.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-sampiyon',
    category: 'doyuran-menuler',
    name: 'Şampiyon Menü',
    description: 'Small Pizza + Patates + Soğan Halkası + Nuggets + Kutu İçecek',
    basePrice: 349,
    image: '/menu_sampiyon.png',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-chicken',
    category: 'doyuran-menuler',
    name: 'Chicken Menü',
    description: 'Çıtır Tavuk Parçaları + Patates + Ayran',
    basePrice: 389,
    image: '/citir_tavuklu.jpg',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-mix',
    category: 'doyuran-menuler',
    name: 'Mix Menü',
    description: 'Tavuk Dilimleri + Patates + Soğan Kroket + Ayran',
    basePrice: 369,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    yeKazanSlice: 1,
    popular: true,
    customizable: false
  },
  {
    id: 'menu-dinapoli-ekstra',
    category: 'doyuran-menuler',
    name: 'Di Napoli Ekstra',
    description: 'Yarım Pizza + Patates + Rus Salatası + Kutu İçecek',
    basePrice: 369,
    image: '/menu_dinapoli_ekstra.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-sosisli',
    category: 'doyuran-menuler',
    name: 'Sosisli Menü',
    description: 'Usta Sosisli Tabağı + Patates + Ayran',
    basePrice: 279,
    image: '/menu_sosisli.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  {
    id: 'menu-borek',
    category: 'doyuran-menuler',
    name: 'Börek Menü',
    description: 'Usta Börek + Patates + Ayran',
    basePrice: 269,
    image: '/menu_borek.png',
    yeKazanSlice: 1,
    popular: false,
    customizable: false
  },
  // --- FASTFOOD & PİDE ---

  {
    id: 'fast-sinitzel',
    category: 'fastfood',
    name: 'Şinitzel',
    description: 'Özel panelenmiş tavuk göğsü şinitzel tabağı, patates kızartması ile',
    basePrice: 375,
    image: '/fast_sinitzel.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'fast-kofte',
    category: 'fastfood',
    name: 'Tekirdağ Köfte',
    description: 'Geleneksel Tekirdağ köfte porsiyonu, patates ve salata ile',
    basePrice: 499,
    image: '/tekirdag_kofte.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'fast-hamburger',
    category: 'fastfood',
    name: 'Hamburger',
    description: 'Tek Usta Hamburger Köftesi, Marul, Turşu ve Özel Sos',
    basePrice: 159,
    image: '/hamburger.jpg',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'fast-cheeseburger',
    category: 'fastfood',
    name: 'Cheeseburger',
    description: 'Tek Hamburger Köftesi, Cheddar Peyniri, Marul, Turşu ve Özel Sos',
    basePrice: 169,
    image: '/cheeseburger.jpg',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'citir-patates',
    category: 'citir-lezzetler',
    name: 'Çıtır Patates',
    description: 'Çıtır porsiyon patates kızartması',
    basePrice: 179,
    image: '/patates.jpg',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },

  // --- ÇITIR LEZZETLER ---
  {
    id: 'citir-sogan-kroket',
    category: 'citir-lezzetler',
    name: 'Soğan Kroket',
    description: 'Çıtır Çıtır Kaplamalı Leziz Soğan Kroketleri',
    basePrice: 129,
    image: '/sogan_halkasi.jpg',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'citir-elma-patates',
    category: 'citir-lezzetler',
    name: 'Elma Dilim Patates',
    description: 'Özel Baharatlı Elma Dilim Patates Kızartması',
    basePrice: 179,
    image: '/elma_patates.png',
    yeKazanSlice: 0,
    popular: false,
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


  // --- SALATALAR ---
  {
    id: 'salata-rus',
    category: 'salatalar',
    name: 'Rus Salatası',
    description: 'Geleneksel Garnitürlü ve Mayonezli Rus Salatası',
    basePrice: 229,
    image: '/rus_salatasi.jpg',
    yeKazanSlice: 0,
    popular: false,
    customizable: false
  },
  {
    id: 'salata-tavuklu',
    category: 'salatalar',
    name: 'Tavuklu Salata',
    description: 'Tavuk Göğsü, Marul, Domates, Salatalık, Mısır, Zeytin, Havuç',
    basePrice: 359,
    image: '/salata_tavuklu.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'salata-ton',
    category: 'salatalar',
    name: 'Ton Balıklı Salata',
    description: 'Ton Balığı, Marul, Domates, Salatalık, Mısır, Zeytin, Havuç',
    basePrice: 359,
    image: '/salata_ton.png',
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
  {
    id: 'salata-akdeniz',
    category: 'salatalar',
    name: 'Akdeniz Salatası',
    description: 'Beyaz Peynir, Marul, Domates, Salatalık, Zeytin, Roka ve Kırmızı Soğan',
    basePrice: 359,
    image: '/salata_akdeniz.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },

  // --- TATLILAR ---
  {
    id: 'tatli-kunefe',
    category: 'tatlilar',
    name: 'Künefe',
    description: 'Sıcak ve şerbetli usta künefesi, üstünde Antep fıstığı parçaları',
    basePrice: 250,
    image: '/tatli_kunefe.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'tatli-sufle',
    category: 'tatlilar',
    name: 'Sufle',
    description: 'İçi akışkan çikolatalı sıcak sufle',
    basePrice: 275,
    image: '/tatli_sufle.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },
  {
    id: 'tatli-kizarmis-dondurma',
    category: 'tatlilar',
    name: 'Kızarmış Dondurma',
    description: 'Çıtır mısır gevreği kaplamalı kızarmış dondurma, çikolata soslu',
    basePrice: 199,
    image: '/kizarmis_dondurma.png',
    yeKazanSlice: 0,
    popular: false,
    customizable: false,
    comingSoon: true
  },

  // --- İÇECEKLER ---
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
    description: 'Köprülü usta ayranı',
    basePrice: 60,
    image: '/icecek_ayran.png',
    yeKazanSlice: 0,
    popular: true,
    customizable: false
  },

  // --- SOSLAR ---
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
  { id: 'jambon', name: 'Jambon', price: 15 },
  { id: 'pepperoni', name: 'Pepperoni', price: 15 },
  { id: 'sucuk', name: 'Sucuk', price: 15 },
  { id: 'sosis', name: 'Sosis', price: 15 },
  { id: 'koz-biber', name: 'Köz Biber', price: 15 },
  { id: 'misir', name: 'Mısır', price: 10 },
  { id: 'peynir', name: 'Mozzarella Peyniri', price: 25 },
  { id: 'sos', name: 'Pizza Sos', price: 8 },
  { id: 'zeytin', name: 'Siyah Zeytin', price: 10 }
];

export const SIZES = [
  { id: 'kucuk', name: 'Küçük', label: '1 Kişilik', priceModifier: 0 },
  { id: 'orta', name: 'Orta', label: '2-3 Kişilik', priceModifier: 135 },
  { id: 'buyuk', name: 'Büyük', label: '3-4 Kişilik', priceModifier: 280 },
  { id: 'xlarge', name: 'Battal (XL)', label: '4-5 Kişilik', priceModifier: 390 }
];

export const CRUSTS = [
  { id: 'klasik', name: 'Klasik İnce Kenar', price: 0 },
  { id: 'kalin', name: 'Klasik Kalın Kenar', price: 0 },
  { id: 'nefis', name: 'Bol Malzemeli Nefis Kenar', price: 25 }
];
