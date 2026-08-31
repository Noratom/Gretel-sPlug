import React, { useState, useMemo } from 'react';
import { BespokeDesign, Category } from '../types/bespoke';
import { DesignCard } from './DesignCard';
import { Search, SlidersHorizontal, Scissors, Sparkles } from 'lucide-react';

interface CatalogProps {
  designs: BespokeDesign[];
  onSelectDesign: (design: BespokeDesign) => void;
  onQuickView: (design: BespokeDesign) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Gowns & Evening Wear',
  'Bespoke Suits & Sets',
  'Silk Luxury',
  'Red Carpet & Couture',
  'Custom Outerwear'
];

export const Catalog: React.FC<CatalogProps> = ({
  designs,
  onSelectDesign,
  onQuickView,
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
        <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-[0.3em]">
          <Scissors className="w-3.5 h-3.5" />
          <span>MADE-TO-MEASURE CATALOG</span>
          <Scissors className="w-3.5 h-3.5" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          Bespoke Outfits & Signature Silhouettes
        </h2>
        <p className="text-charcoal/70 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          Select any design below to customize fabric, submit your precise body measurements, and order directly via WhatsApp.
        </p>
      </div>

      {/* Controls Bar: Category Pills, Search, Sort */}
      <div className="space-y-6 mb-12">
        {/* Category Pills Scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition duration-300 ${
                selectedCategory === cat
                  ? 'bg-charcoal text-cream-100 shadow-md border border-gold/40'
                  : 'bg-cream-200 hover:bg-silk-taupe text-charcoal border border-silk-taupe'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cream-200/50 p-4 rounded-2xl border border-silk-taupe">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/50" />
            <input
              type="text"
              placeholder="Search design, silk, gown..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream-100 border border-silk-taupe pl-10 pr-4 py-2 rounded-xl text-xs font-medium text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold"
            />
          </div>

          {/* Sort & Count */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-xs text-charcoal/60 font-medium">
              Showing <strong className="text-charcoal font-bold">{filteredDesigns.length}</strong> creations
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-dark" />
              <select
                value={sortOption}
                onChange={(e: any) => setSortOption(e.target.value)}
                className="bg-cream-100 border border-silk-taupe text-charcoal text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="featured">Featured First</option>
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
        <div className="text-center py-16 bg-cream-200/50 rounded-2xl border border-dashed border-silk-taupe p-8">
          <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-charcoal">No outfits match your search filter</h3>
          <p className="text-xs text-charcoal/60 mt-1 max-w-md mx-auto">
            Try adjusting your search criteria or explore our complete custom bespoke catalog.
          </p>
          <button
            onClick={() => { onCategoryChange('All'); setSearchQuery(''); }}
            className="mt-4 bg-charcoal text-cream-100 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-gold hover:text-charcoal transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
