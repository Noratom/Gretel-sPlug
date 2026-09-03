import React, { useState, useMemo } from 'react';
import { BespokeDesign, Category } from '../types/bespoke';
import { DesignCard } from './DesignCard';
import { Search, SlidersHorizontal, Scissors, Sparkles, Upload } from 'lucide-react';

interface CatalogProps {
  designs: BespokeDesign[];
  onSelectDesign: (design: BespokeDesign) => void;
  onQuickView: (design: BespokeDesign) => void;
  onOpenCustomDesignModal: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Gowns',
  'Two piece wear',
  'Corset',
  'Free wear'
];

export const Catalog: React.FC<CatalogProps> = ({
  designs,
  onSelectDesign,
  onQuickView,
  onOpenCustomDesignModal,
  selectedCategory,
  onCategoryChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredDesigns = useMemo(() => {
    return designs.filter(design => {
      const matchesCategory = selectedCategory === 'All' || design.category === selectedCategory;
      const matchesSearch = 
        design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.fabrics.some(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.basePriceUSD - b.basePriceUSD;
      if (sortOption === 'price-desc') return b.basePriceUSD - a.basePriceUSD;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [designs, selectedCategory, searchQuery, sortOption]);

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-[0.25em]">
          <Scissors className="w-3.5 h-3.5" />
          <span>OUR CUSTOM CATALOG</span>
          <Scissors className="w-3.5 h-3.5" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          Explore Outfits Made For You
        </h2>
        <p className="text-charcoal/75 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          Select any outfit below to pick your favorite fabric color, enter your body measurements, and order directly on WhatsApp.
        </p>

        {/* Banner for Custom Photo Request */}
        <div className="pt-2">
          <button
            onClick={onOpenCustomDesignModal}
            className="inline-flex items-center gap-2 bg-gold/20 hover:bg-gold text-charcoal px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition border border-gold/40 shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-gold-dark" />
            <span>Don't see what you want? Upload your own design photo here!</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="space-y-6 mb-12">
        {/* Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition duration-300 ${
                selectedCategory === cat
                  ? 'bg-charcoal text-cream-100 shadow-md border border-gold/40'
                  : 'bg-cream-200 hover:bg-silk-taupe text-charcoal border border-silk-taupe'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cream-200/50 p-4 rounded-2xl border border-silk-taupe">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/50" />
            <input
              type="text"
              placeholder="Search gown, corset, two piece wear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream-100 border border-silk-taupe pl-10 pr-4 py-2 rounded-xl text-xs font-medium text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold"
            />
          </div>

          {/* Sort & Count */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-xs text-charcoal/60 font-medium">
              Showing <strong className="text-charcoal font-bold">{filteredDesigns.length}</strong> outfits
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-dark" />
              <select
                value={sortOption}
                onChange={(e: any) => setSortOption(e.target.value)}
                className="bg-cream-100 border border-silk-taupe text-charcoal text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="featured">Featured Outfits</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredDesigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((design) => (
            <DesignCard
              key={design.id}
              design={design}
              onSelectDesign={onSelectDesign}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-cream-200/50 rounded-2xl border border-dashed border-silk-taupe p-8 space-y-4">
          <Sparkles className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-serif text-xl font-bold text-charcoal">No outfits match your search</h3>
          <p className="text-xs text-charcoal/60 max-w-md mx-auto">
            You can clear your search or send us a picture of the exact design you want!
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => { onCategoryChange('All'); setSearchQuery(''); }}
              className="bg-charcoal text-cream-100 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-gold hover:text-charcoal transition"
            >
              Reset Search Filters
            </button>
            <button
              onClick={onOpenCustomDesignModal}
              className="bg-gold text-charcoal text-xs font-extrabold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-gold-dark transition shadow-sm"
            >
              Send Your Own Design Photo
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
