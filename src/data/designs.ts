import { BespokeDesign } from '../types/bespoke';

export const BESPOKE_DESIGNS: BespokeDesign[] = [
  {
    id: 'air-luxe-01',
    title: 'The Aurelia Sculpted Evening Gown',
    category: 'Gowns & Evening Wear',
    tagline: 'Precision hand-draped corset bodice with flowing liquid silk train.',
    description: 'An architectural masterpiece created for high-profile galas and red-carpet occasions. Features hand-boned corset framing, structural shoulder draping, and a dramatic floor-sweeping silk slit skirt.',
    basePriceUSD: 850,
    priceRange: '$850 - $1,200',
    craftingTime: '7 - 10 Business Days',
    mainImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f1', name: 'Heavyweight Mulberry Silk Dupioni', texture: 'Crisp, structured shine', colorHex: '#D4AF37' },
      { id: 'f2', name: 'Italian Silk Stretch Satin', texture: 'Fluid, high luster draping', colorHex: '#1A1A1A' },
      { id: 'f3', name: 'Champagne Organza & Silk Crepe', texture: 'Semi-sheer ethereal sheen', colorHex: '#E8E2D5' }
    ],
    isFeatured: true,
    isNewArrival: true,
    details: [
      'Custom waist boning & internal bra support',
      'Hand-stitched hidden back zipper with covered silk buttons',
      'Option for detachable train or custom slit height',
      'Requires exact bust, waist, hip, and shoulder-to-floor measurements'
    ]
  },
  {
    id: 'air-luxe-02',
    title: 'Bespoke Monarch Double-Breasted Suit',
    category: 'Bespoke Suits & Sets',
    tagline: 'Sharply tailored power silhouette with peak lapels and gold-rimmed buttons.',
    description: 'Designed for the modern connoisseur of fine tailoring. Hand-cut wool-cashmere blend with structured canvas chest lining, tapered high-waisted trousers, and silk lining.',
    basePriceUSD: 720,
    priceRange: '$720 - $980',
    craftingTime: '6 - 8 Business Days',
    mainImage: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f4', name: 'Super 150s Italian Wool', texture: 'Ultra-refined smooth weave', colorHex: '#2B2B2B' },
      { id: 'f5', name: 'Ivory Raw Silk Linen Blend', texture: 'Tactile luxury matte finish', colorHex: '#FDFBF7' },
      { id: 'f6', name: 'Midnight Emerald Velvet', texture: 'Plush plush deep luster', colorHex: '#1B3B2B' }
    ],
    isFeatured: true,
    isNewArrival: false,
    details: [
      'Fully lined in breathable cupro silk',
      'Working sleeve buttonholes (surgeons cuffs)',
      'Adjustable side tabs on high-rise trousers',
      'Custom monogramming available inside jacket pocket'
    ]
  },
  {
    id: 'air-luxe-03',
    title: 'Celeste Silk Draped Lounge Set',
    category: 'Silk Luxury',
    tagline: 'Effortless understated grandeur crafted in pure 22 momme Charmeuse silk.',
    description: 'A liquid-feeling ensemble featuring a fluid asymmetrical tie wrap top paired with wide-leg flowing silk trousers. Designed for private galas, resort soirées, and elite gatherings.',
    basePriceUSD: 520,
    priceRange: '$520 - $680',
    craftingTime: '4 - 6 Business Days',
    mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f7', name: '22 Momme Pure Silk Charmeuse', texture: 'Ultra-soft glossy feel', colorHex: '#C5A059' },
      { id: 'f8', name: 'Pearl Sand Washed Silk', texture: 'Matte buttery touch', colorHex: '#E8E2D5' },
      { id: 'f9', name: 'Obsidian Black Silk Satin', texture: 'Reflective deep contrast', colorHex: '#121212' }
    ],
    isFeatured: true,
    isNewArrival: true,
    details: [
      'French seams throughout for zero skin friction',
      'Elasticated rear waistband with flat tailored front panel',
      'Includes matching silk waist sash',
      'Machine hand-finish tailored hems'
    ]
  },
  {
    id: 'air-luxe-04',
    title: 'The Sovereign Velvet & Brocade Caftan',
    category: 'Red Carpet & Couture',
    tagline: 'Regal regal silhouette embellished with hand-applied metallic thread work.',
    description: 'An iconic Air_Luxe silhouette featuring heavy metallic thread embroidery along the neck collar, lapels, and cuffs over rich French silk velvet.',
    basePriceUSD: 950,
    priceRange: '$950 - $1,400',
    craftingTime: '8 - 12 Business Days',
    mainImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f10', name: 'French Silk Velvet with Gold Zari Thread', texture: 'Heavy plush with metallic shine', colorHex: '#8C1D24' },
      { id: 'f11', name: 'Royal Navy Jacquard Brocade', texture: 'Structured raised pattern', colorHex: '#13294B' }
    ],
    isFeatured: false,
    isNewArrival: true,
    details: [
      'Intricate bullion wire embroidery on lapels and sleeves',
      'Concealed snap button closure along front line',
      'Hand-tailored inner slip gown included',
      'Custom length tailored specifically to height & footwear preference'
    ]
  },
  {
    id: 'air-luxe-05',
    title: 'Elysian Sculpted Trench Coat',
    category: 'Custom Outerwear',
    tagline: 'Structural elegance meets everyday luxury in water-repellent cashmere-cotton.',
    description: 'A bespoke tailored outerwear piece with dramatic oversized storm flaps, horn buttons, a cinched belt corset ring, and custom silk printed interior lining.',
    basePriceUSD: 780,
    priceRange: '$780 - $1,100',
    craftingTime: '6 - 9 Business Days',
    mainImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f12', name: 'English Gabardine Cashmere Blend', texture: 'Structure & warmth', colorHex: '#CBB297' },
      { id: 'f13', name: 'Onyx Double-Weave Wool', texture: 'Dense high fashion drape', colorHex: '#1F1F1F' }
    ],
    isFeatured: false,
    isNewArrival: false,
    details: [
      'Double-breasted storm flap front',
      'Genuine buffalo horn hardware & gold buckle',
      'Deep welted fleece-lined side pockets',
      'Made to exact shoulder and sleeve length'
    ]
  },
  {
    id: 'air-luxe-06',
    title: 'Aphrodite Corseted Mermaid Gown',
    category: 'Gowns & Evening Wear',
    tagline: 'Hourglass contouring with sheer illusion mesh and hand-placed crystal accents.',
    description: 'Sculpted to perfection. This custom gown features an internal steel-boned corset, delicate sheer mesh waist panels, and hand-beaded crystal vines cascading down a flared trumpet hem.',
    basePriceUSD: 1100,
    priceRange: '$1,100 - $1,650',
    craftingTime: '10 - 14 Business Days',
    mainImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop'
    ],
    fabrics: [
      { id: 'f14', name: 'Italian Heavy Satin & Illusion Net', texture: 'Luxe sheen with invisible mesh', colorHex: '#FDFBF7' },
      { id: 'f15', name: 'Nude Silk Tulle & Gold Embroidery', texture: 'Delicate embellished weave', colorHex: '#D4AF37' }
    ],
    isFeatured: true,
    isNewArrival: true,
    details: [
      'Built-in waist reducer corset with lace-up back option',
      'Hand-applied Swarowski crystal detailing',
      'Horsehair braid hemline for dramatic flare retention',
      'Complementary fitting consultation via WhatsApp video call'
    ]
  }
];

export const ATELIER_INFO = {
  name: "Air_Luxe",
  subBrand: "Gretel's Plug 2020",
  tagline: "DRIVEN BY QUALIFYING AND CHOSEN BY THOSE WHO KNOW THE DIFFERENCE.",
  est: "EST 2020",
  whatsappNumber: "+2348000000000",
  whatsappDisplay: "+234 800 000 0000",
  instagram: "@air_luxe_gretelsplug",
  email: "bespoke@airluxeatelier.com",
  location: "Custom Atelier & Bespoke Studio",
};
