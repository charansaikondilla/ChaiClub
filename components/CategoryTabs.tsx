import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="bg-creamy-beige px-4 pt-4">
      <div className="flex space-x-2 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 
              ${activeCategory === category 
                ? 'bg-deep-tea-brown text-white shadow-md' 
                : 'bg-transparent text-charcoal-gray hover:bg-button-cream'
              }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;