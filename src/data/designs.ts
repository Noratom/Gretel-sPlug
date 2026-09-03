import { BespokeDesign } from '../types/bespoke';

export const BESPOKE_DESIGNS: BespokeDesign[] = [
  {
    id: 'air-luxe-01',
    title: 'The Aurelia Silk Evening Gown',
    category: 'Gowns',
    tagline: 'Fitted top bodice with a long flowing silk skirt.',
    description: 'A beautiful handmade evening gown made for weddings, galas, and special dinners. Made with high quality smooth silk, tailored to fit your body shape comfortably.',
    basePriceUSD: 850,
    priceRange: '₦80,000 - ₦150,000',
    craftingTime: '5 - 7 Days',
    mainImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f1', name: 'Gold Pure Silk', texture: 'Soft & shiny', colorHex: '#D4AF37' },
      { id: 'f2', name: 'Black Stretch Satin', texture: 'Smooth & comfortable fit', colorHex: '#1A1A1A' },
      { id: 'f3', name: 'Cream Organza Crepe', texture: 'Lightweight & elegant', colorHex: '#E8E2D5' }
    ],
    isFeatured: true,
    isNewArrival: true,
    details: [
      'Custom waist fitting for a comfortable fit',
      'Hidden back zipper with neat stitching',
      'Option for custom skirt length or slit height',
      'Tailored to your exact measurements'
    ]
  },
  {
    id: 'air-luxe-02',
    title: 'Bespoke Monarch Double-Breasted Suit Set',
    category: 'Two piece wear',
    tagline: 'Neatly tailored two-piece suit with stylish gold buttons.',
    description: 'A modern, clean suit set made for work events, celebrations, or formal outings. Includes a fitted jacket and matching high-waisted trousers.',
    basePriceUSD: 720,
    priceRange: '₦75,000 - ₦120,000',
    craftingTime: '5 - 7 Days',
    mainImage: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f4', name: 'Fine Italian Wool Blend', texture: 'Smooth & durable', colorHex: '#2B2B2B' },
      { id: 'f5', name: 'Ivory Raw Silk Linen', texture: 'Crisp & classy matte', colorHex: '#FDFBF7' },
      { id: 'f6', name: 'Emerald Green Velvet', texture: 'Rich & soft feel', colorHex: '#1B3B2B' }
    ],
    isFeatured: true,
    isNewArrival: false,
    details: [
      'Fully lined inside for comfortable wear',
      'High-waisted pants with waist adjustment tabs',
      'Hand-stitched pocket details',
      'Customized to your exact chest and waist sizes'
    ]
  },
  {
    id: 'air-luxe-03',
    title: 'Celeste Silk Two-Piece Wrap Set',
    category: 'Two piece wear',
    tagline: 'Soft, easy-going silk set with wrap top and wide pants.',
    description: 'An easy-to-wear luxury silk outfit featuring a wrap-tie top and relaxed wide-leg pants. Perfect for parties, dinners, and vacation wear.',
    basePriceUSD: 520,
    priceRange: '₦50,000 - ₦85,000',
    craftingTime: '4 - 6 Days',
    mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f7', name: 'Pure Gold Silk Charmeuse', texture: 'Super soft & shiny', colorHex: '#C5A059' },
      { id: 'f8', name: 'Sand Beige Washed Silk', texture: 'Soft matte touch', colorHex: '#E8E2D5' },
      { id: 'f9', name: 'Black Silk Satin', texture: 'Classic dark luster', colorHex: '#121212' }
    ],
    isFeatured: true,
    isNewArrival: true,
    details: [
      'Clean interior stitching for extra comfort',
      'Comfortable waist band that moves with you',
      'Includes matching silk belt wrap',
      'Hand-tailored hem length'
    ]
  },
  {
    id: 'air-luxe-04',
    title: 'Embroidered Velvet Bubu Kaftan',
    category: 'Free wear',
    tagline: 'Elegant long kaftan with detailed gold thread work on collar.',
    description: 'A traditional and modern mix kaftan made with rich velvet fabric and detailed gold embroidery along the neck and sleeves.',
    basePriceUSD: 950,
    priceRange: '₦90,000 - ₦160,000',
    craftingTime: '6 - 9 Days',
    mainImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f10', name: 'Deep Burgundy Velvet with Gold Work', texture: 'Rich & soft with metallic detail', colorHex: '#8C1D24' },
      { id: 'f11', name: 'Royal Navy Brocade', texture: 'Patterned luxury fabric', colorHex: '#13294B' }
    ],
    isFeatured: false,
    isNewArrival: true,
    details: [
      'Detailed gold embroidery around collar and sleeve cuffs',
      'Easy snap buttons in front',
      'Includes inner slip dress',
      'Length tailored to your exact height'
    ]
  },
  {
    id: 'air-luxe-05',
    title: 'Tailored Luxury Trench Jacket',
    category: 'Free wear',
    tagline: 'Smart lightweight jacket with waist belt and clean collar.',
    description: 'A stylish layered jacket crafted to wear over dresses or pants. Features double front buttons and a cinched waist belt.',
    basePriceUSD: 780,
    priceRange: '₦70,000 - ₦110,000',
    craftingTime: '5 - 7 Days',
    mainImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f12', name: 'Camel Warm Cotton Blend', texture: 'Structured & comfy', colorHex: '#CBB297' },
      { id: 'f13', name: 'Black Heavy Wool', texture: 'Warm & neat drape', colorHex: '#1F1F1F' }
    ],
    isFeatured: false,
    isNewArrival: false,
    details: [
      'Double front button closure',
      'Comes with waist belt & buckle',
      'Deep side pockets',
      'Made to your shoulder and arm length'
    ]
  },
  {
    id: 'air-luxe-06',
    title: 'Aphrodite Corseted Mermaid Fit Gown',
    category: 'Corset',
    tagline: 'Figure-hugging dress with corset top and flared bottom.',
    description: 'A stunning figure-shaping dress designed to give a lovely hourglass look. Features structured waist boning and a dramatic flared bottom hem.',
    basePriceUSD: 1100,
    priceRange: '₦100,000 - ₦180,000',
    craftingTime: '7 - 10 Days',
    mainImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f14', name: 'Ivory Satin & Sheer Mesh', texture: 'Shiny satin with soft mesh', colorHex: '#FDFBF7' },
      { id: 'f15', name: 'Gold Beaded Silk Tulle', texture: 'Pretty glitter embroidery', colorHex: '#D4AF37' }
    ],
    isFeatured: true,
    isNewArrival: true,
    details: [
      'Internal waist corset support',
      'Hand-applied sparkling crystal work',
      'Flared bottom hemline for easy walking',
      'Free measurement check on WhatsApp'
    ]
  }
];

export const ATELIER_INFO = {
  name: "Air_Luxe",
  subBrand: "Gretel's Plug EST 2020",
  tagline: "Custom Made Outfits Tailored to Fit You Perfectly.",
  whatsappNumber: "08088517919",
  whatsappDisplay: "08088517919",
  instagram: "@air_luxe_gretelsplug",
  email: "orders@airluxeatelier.com",
  location: "Custom Fashion Studio & Fitting Atelier",
};
