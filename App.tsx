import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Category, MenuItem, CartItem } from './types';
import { getMenuData } from './services/geminiService';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import MenuGrid from './components/MenuGrid';
import CartBar from './components/CartBar';
import ItemDetailModal from './components/ItemDetailModal';
import CartModal from './components/CartModal';
import ConfirmationModal from './components/ConfirmationModal';
import BottomNavBar from './components/BottomNavBar';

// Lazy load components
const Games = lazy(() => import('./components/Games'));
const InfoPage = lazy(() => import('./components/InfoPage'));

const MenuItemCardSkeleton: React.FC = () => (
    <div className="bg-light-cream rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="p-2">
        <div className="w-full h-32 bg-button-cream rounded-xl"></div>
      </div>
      <div className="p-3 pt-1 text-center">
        <div className="h-5 bg-button-cream rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-button-cream rounded w-1/2 mx-auto mt-2"></div>
      </div>
    </div>
);

const MenuSkeleton: React.FC = () => (
    <div className="p-4 grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => <MenuItemCardSkeleton key={i} />)}
    </div>
);

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-deep-tea-brown"></div>
    </div>
);

export default function App() {
  const [menuData, setMenuData] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [view, setView] = useState<'menu' | 'games' | 'info'>('menu');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Don't set loading to true if we already have data (from cache)
        if (menuData.length === 0) {
            setIsLoading(true);
        }
        const data = await getMenuData();
        setMenuData(data);
        if (data.length > 0 && activeCategory === '') {
          setActiveCategory(data[0].name);
        }
      } catch (error) {
        console.error("Failed to load menu data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (view === 'menu') {
        fetchMenu();
    }
  }, [activeCategory, menuData.length, view]);

  const handleAddToCart = useCallback((item: MenuItem, quantity: number = 1, options?: { [key: string]: string }) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id && JSON.stringify(cartItem.options) === JSON.stringify(options));
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { ...item, quantity, options: options || {} }];
      }
    });
    setSelectedItem(null); // Close detail modal after adding
  }, []);

  const handleUpdateCartQuantity = useCallback((itemId: string, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== itemId);
      }
      return prevCart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);
    });
  }, []);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseDetailModal = () => {
    setSelectedItem(null);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };
  
  const handleStartNewOrder = () => {
    setIsConfirmationOpen(false);
    setCart([]);
  };

  const displayedItems = useMemo(() => {
    const allItems = menuData.flatMap(category => category.items);
    if (searchQuery.trim() !== '') {
      return allItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }
    return menuData.find(category => category.name === activeCategory)?.items || [];
  }, [menuData, activeCategory, searchQuery]);


  const cartTotal = useMemo(() => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
      return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);


  return (
    <div className="bg-creamy-beige min-h-screen text-charcoal-gray font-sans antialiased">
      <div className="max-w-md mx-auto bg-creamy-beige shadow-lg flex flex-col h-screen">
        <Header 
            onCartClick={() => setIsCartOpen(true)} 
            view={view} 
            setView={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
        <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
          {view === 'menu' ? (
            isLoading ? (
             <MenuSkeleton />
            ) : (
              <>
                {searchQuery.trim() === '' ? (
                  <CategoryTabs 
                    categories={menuData.map(c => c.name)} 
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory} 
                  />
                ) : (
                    <div className="p-4 pt-2">
                        <p className="text-charcoal-gray text-sm">Showing results for: <span className="font-semibold">"{searchQuery}"</span></p>
                    </div>
                )}

                {displayedItems.length > 0 ? (
                    <MenuGrid 
                        items={displayedItems} 
                        onSelectItem={handleSelectItem}
                    />
                ) : (
                    <div className="text-center p-10 text-charcoal-gray">
                        <p className="font-semibold text-lg">No items found</p>
                        <p className="text-sm mt-1">Try a different search or check your spelling.</p>
                    </div>
                )}
              </>
            )
          ) : view === 'games' ? (
            <Suspense fallback={<LoadingSpinner />}>
                <Games />
            </Suspense>
          ) : (
            <Suspense fallback={<LoadingSpinner />}>
                <InfoPage />
            </Suspense>
          )}
        </main>
        {view === 'menu' && cart.length > 0 && (
          <CartBar 
            itemCount={cartItemCount} 
            totalPrice={cartTotal} 
            onViewCart={() => setIsCartOpen(true)} 
          />
        )}
        <BottomNavBar view={view} setView={setView} />
      </div>

      {view === 'menu' && selectedItem && (
        <ItemDetailModal 
          item={selectedItem} 
          onClose={handleCloseDetailModal} 
          onAddToCart={handleAddToCart}
        />
      )}

      {view === 'menu' && isCartOpen && (
        <CartModal
          cartItems={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onCheckout={handleCheckout}
          totalPrice={cartTotal}
        />
      )}

      {view === 'menu' && isConfirmationOpen && (
        <ConfirmationModal 
            onClose={handleCloseConfirmation} 
            onStartNewOrder={handleStartNewOrder}
            orderItems={cart} 
            totalPrice={cartTotal}
        />
      )}
    </div>
  );
}