
import { Category } from '../types';

const CACHE_KEY = 'chai-club-menu-data';
const CACHE_TIMESTAMP_KEY = 'chai-club-menu-timestamp';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// This function simulates the actual data fetching.
const fetchMenuFromSource = async (): Promise<Category[]> => {
  console.log("Fetching fresh menu data from source...");
  
  const menuData: Category[] = [
    {
      name: "Tea",
      items: [
        { id: "t1", name: "Bellam Tea", price: 25, imageUrl: "https://i.postimg.cc/PrS8rZgf/bellam-tea.webp", description: "A traditional tea sweetened with jaggery for a unique, earthy flavor." },
        { id: "t2", name: "Ginger Lemon Tea", price: 25, imageUrl: "https://i.postimg.cc/qvg6tqrq/Ginger-lemon-tea.webp", description: "A zesty and warming blend of ginger and lemon, perfect for a soothing sip." },
        { id: "t3", name: "Ginger Tea", price: 25, imageUrl: "https://i.postimg.cc/Vk50SvwJ/ginger-tea.webp", description: "A classic, invigorating tea with the spicy kick of fresh ginger." },
        { id: "t4", name: "Green Tea", price: 25, imageUrl: "https://i.postimg.cc/t47n1Jb1/green-tea.webp", description: "A light and healthy option, packed with antioxidants." },
        { id: "t5", name: "Kadak Tea", price: 25, imageUrl: "https://i.postimg.cc/mgh1ck4F/kadak-tea.webp", description: "A strong, robust tea brewed to perfection for a powerful flavor." },
        { id: "t6", name: "Kulhad Tea", price: 25, imageUrl: "https://i.postimg.cc/7ZbJCh47/kulhad-tea.webp", description: "An earthy and aromatic tea served in a traditional clay cup." },
        { id: "t7", name: "Lemon Tea", price: 25, imageUrl: "https://i.postimg.cc/K843KjbP/lemon-tea.webp", description: "A refreshing tea with a tangy twist of lemon." },
        { id: "t9", name: "Pepper Tea", price: 20, imageUrl: "https://i.postimg.cc/GmN8vR3P/pepper-tea.webp", description: "A bold tea with a spicy note of black pepper for a unique taste." },
        { id: "t10", name: "Special Tea", price: 25, imageUrl: "https://i.postimg.cc/y85g0K6y/special-tea.webp", description: "Our house special blend, a secret recipe that's both comforting and invigorating." },
        { id: "t11", name: "Classic Tea", price: 15, imageUrl: "https://i.ibb.co/T9C4Ys1/image.png", description: "A simple, timeless, and perfectly brewed cup of classic tea." },
        { id: "t12", name: "Masala Tea", price: 25, imageUrl: "https://i.ibb.co/vWpF7yX/image.png", description: "A fragrant blend of black tea and aromatic Indian spices and herbs." },
        { id: "t13", name: "Elaichi Tea", price: 25, imageUrl: "https://i.ibb.co/MxcK1NVT/unnamed.jpg", description: "A soothing tea flavored with the sweet, aromatic essence of cardamom." },
        { id: "t14", name: "Badam Tea", price: 25, imageUrl: "https://i.ibb.co/FbfvD415/unnamed.jpg", description: "A rich and nutty tea infused with the goodness of almonds." },
        { id: "t15", name: "Black Tea", price: 25, imageUrl: "https://i.ibb.co/d0qMsskm/unnamed.jpg", description: "A pure and simple black tea, served without milk for a bold flavor." }
      ],
    },
    {
      name: "Coffee",
      items: [
        { id: "c1", name: "Bellam Coffee", price: 25, imageUrl: "https://i.postimg.cc/TYtWYmzR/bellam-coffee.webp", description: "A rich coffee sweetened with jaggery for a deep, caramel-like flavor." },
        { id: "c2", name: "Black Coffee", price: 25, imageUrl: "https://i.postimg.cc/bNm2Nb7y/black-coffee.webp", description: "A strong, bold, and energizing classic black coffee." },
        { id: "c3", name: "Butter Coffee", price: 30, imageUrl: "https://i.postimg.cc/CLcfLD3R/butter-coffee.webp", description: "A creamy and rich coffee blended with butter for a smooth finish." },
        { id: "c4", name: "Dark Chocolate Coffee", price: 25, imageUrl: "https://i.postimg.cc/NjL2yFts/dark-chocolate-coffee.webp", description: "A decadent blend of rich coffee and indulgent dark chocolate." },
        { id: "c5", name: "Classic Coffee", price: 20, imageUrl: "https://i.ibb.co/fVxv2d9L/unnamed.jpg", description: "A smooth and balanced cup of classic hot coffee." },
        { id: "c6", name: "Cold Coffee", price: 59, imageUrl: "https://i.ibb.co/kVYFkLw7/image.png", description: "A creamy and refreshing cold coffee, perfect for a hot day." },
      ],
    },
    {
      name: "Milkshakes",
      items: [
        { id: "ms1", name: "Black Current Milkshake", price: 69, imageUrl: "https://i.postimg.cc/9FLqFT6F/black-current-milkshake.webp", description: "A sweet and tangy milkshake with the delightful flavor of black currants." },
        { id: "ms2", name: "Mango Milkshake", price: 69, imageUrl: "https://i.postimg.cc/L8hgq5ST/Mango-milkshake.webp", description: "A creamy and luscious milkshake made with sweet, ripe mangoes." },
        { id: "ms3", name: "Pista Milkshake", price: 99, imageUrl: "https://i.postimg.cc/RZ86wmCc/Pistachio-Milkshake.webp", description: "A rich and nutty milkshake blended with the finest pistachios." },
        { id: "ms4", name: "Vanilla Milkshake", price: 69, imageUrl: "https://i.postimg.cc/rwb05Tyg/vanilla-milkshake.webp", description: "A classic, creamy, and smooth vanilla milkshake for a timeless treat." },
        { id: "ms5", name: "Oreo Milkshake", price: 69, imageUrl: "https://i.ibb.co/tPT4h07K/unnamed.jpg", description: "A delightful blend of milk and Oreo cookies, a classic favorite." },
        { id: "ms6", name: "Chocolate Milkshake", price: 69, imageUrl: "https://i.ibb.co/sdnMd6sT/unnamed.jpg", description: "A rich and creamy milkshake made with decadent chocolate." },
        { id: "ms7", name: "Strawberry Milkshake", price: 69, imageUrl: "https://i.ibb.co/VcRMpZsg/unnamed.jpg", description: "A sweet and fruity milkshake made with fresh strawberries." },
        { id: "ms8", name: "Butterscotch Milkshake", price: 69, imageUrl: "https://i.ibb.co/KgKGckJ/unnamed.jpg", description: "A creamy milkshake with the rich, caramel flavor of butterscotch." }
      ],
    },
    {
        name: "Thick Shakes",
        items: [
          { id: "ts1", name: "Black Current Thick Shake", price: 99, imageUrl: "https://i.postimg.cc/9FLqFT6F/black-current-milkshake.webp", description: "An extra thick and creamy shake with the delightful flavor of black currants." },
          { id: "ts2", name: "Mango Thick Shake", price: 99, imageUrl: "https://i.postimg.cc/L8hgq5ST/Mango-milkshake.webp", description: "An extra thick and luscious shake made with sweet, ripe mangoes." },
          { id: "ts4", name: "Vanilla Thick Shake", price: 99, imageUrl: "https://i.postimg.cc/rwb05Tyg/vanilla-milkshake.webp", description: "A classic, extra creamy, and smooth vanilla thick shake for a timeless treat." },
          { id: "ts5", name: "Oreo Thick Shake", price: 99, imageUrl: "https://i.ibb.co/tPT4h07K/unnamed.jpg", description: "A delightful thick blend of milk and Oreo cookies, a classic favorite made richer." },
          { id: "ts6", name: "Chocolate Thick Shake", price: 99, imageUrl: "https://i.ibb.co/sdnMd6sT/unnamed.jpg", description: "An extra rich and creamy thick shake made with decadent chocolate." },
          { id: "ts7", name: "Strawberry Thick Shake", price: 99, imageUrl: "https://i.ibb.co/VcRMpZsg/unnamed.jpg", description: "A sweet and fruity thick shake made with fresh strawberries." },
          { id: "ts8", name: "Butterscotch Thick Shake", price: 99, imageUrl: "https://i.ibb.co/KgKGckJ/unnamed.jpg", description: "An extra creamy thick shake with the rich, caramel flavor of butterscotch." }
        ],
    },
    {
      name: "Lassi",
      items: [
        { id: "l1", name: "Sweet Lassi", price: 59, imageUrl: "https://i.ibb.co/4ZsQypKN/unnamed.jpg", description: "A traditional sweet and creamy yogurt-based drink, perfectly refreshing." },
        { id: "l2", name: "Mango Lassi", price: 59, imageUrl: "https://i.ibb.co/LzktjNVM/image.png", description: "A delicious blend of sweet mangoes and creamy yogurt." },
        { id: "l3", name: "Rose Milk", price: 59, imageUrl: "https://i.ibb.co/nNxzWHZ2/image.png", description: "A refreshing milk drink flavored with fragrant rose syrup." },
        { id: "l4", name: "Chilled badam", price: 59, imageUrl: "https://i.postimg.cc/FHqd0vFg/rabad-mojitho.webp", description: "A unique and flavorful lassi with our special Rabad blend." },
        { id: "l5", name: "Cold Boost", price: 59, imageUrl: "https://i.postimg.cc/XYXBZqWN/cold-boost.webp", description: "A chilled and refreshing chocolate malt beverage to cool you down." },
        { id: "l6", name: "Cold Lassi", price: 59, imageUrl: "https://i.ibb.co/4ZsQypKN/unnamed.jpg", description: "A chilled and refreshing yogurt-based drink, perfect for a hot day." }
      ],
    },
    {
      name: "Bubble Tea",
      items: [
        { id: "bt1", name: "Butterscotch Bubble Milkshake", price: 99, imageUrl: "https://i.postimg.cc/sDTZDSkQ/butterscotch-bubble-milkshake.webp", description: "A creamy butterscotch milkshake with fun, chewy tapioca pearls." },
        { id: "bt2", name: "Chocolate Bubble Milkshake", price: 99, imageUrl: "https://i.postimg.cc/L8hgq5Sm/chocolate-bubble-milkshake.webp", description: "Indulgent chocolate milkshake paired with delightful tapioca pearls." },
        { id: "bt3", name: "Mango Bubble Milkshake", price: 99, imageUrl: "https://i.postimg.cc/Dwm4W0hP/mango-bubble-milkshake.webp", description: "A tropical mango milkshake with the fun addition of chewy bubbles." },
        { id: "bt4", name: "Oreo Bubble Milkshake", price: 99, imageUrl: "https://i.postimg.cc/JztHy08P/Oreo-bubble-milkshake.webp", description: "A classic cookies-and-cream milkshake with chewy tapioca pearls." },
        { id: "bt5", name: "Strawberry Bubble Milkshake", price: 99, imageUrl: "https://i.postimg.cc/52GY8J93/strawberry-bubble-milkshake.webp", description: "A sweet and fruity strawberry milkshake with delightful chewy bubbles." },
        { id: "bt6", name: "Vanilla Bubble Milkshake", price: 99, imageUrl: "https://i.postimg.cc/CxtBb0M7/Vanilla-bubble-milkshake.webp", description: "A smooth vanilla milkshake made exciting with chewy tapioca pearls." }
      ],
    },
    {
      name: "Mojitos",
      items: [
        { id: "m1", name: "Lime mint Cooler", price: 59, imageUrl: "https://i.postimg.cc/9Qzw402W/coconut-mojitho.webp", description: "A refreshing tropical twist on the classic mojito with a hint of coconut." },
        { id: "m2", name: "Fizi Mojitho", price: 70, imageUrl: "https://i.postimg.cc/FH1kfzvj/kiwi-mojitho.webp", description: "A vibrant and tangy mojito with the exotic taste of fresh kiwi." },
        { id: "m4", name: "Green Mint Mojito", price: 59, imageUrl: "https://i.ibb.co/prBFh2Px/image.png", description: "A classic and refreshing mojito with a cool blast of green mint." },
        { id: "m5", name: "Rose Mojito", price: 59, imageUrl: "https://i.ibb.co/Jjx9rk7f/image.png", description: "An elegant mojito with a fragrant and delicate rose flavor." },
        { id: "m6", name: "Orange Mojito", price: 79, imageUrl: "https://i.ibb.co/ns7hNQt2/unnamed.jpg", description: "A zesty and citrusy mojito made with fresh orange." },
        { id: "m7", name: "Blue Mint Cooler", price: 59, imageUrl: "https://i.ibb.co/fYr1j4yC/unnamed.jpg", description: "A visually stunning and cool mint-flavored beverage." }
      ],
    },
    {
      name: "Other Beverages",
      items: [
        { id: "ob1", name: "Boost", price: 20, imageUrl: "https://i.postimg.cc/9FLqFT64/boost.webp", description: "A classic malted chocolate drink, served hot and comforting." },
        { id: "ob3", name: "Horlicks", price: 25, imageUrl: "https://i.postimg.cc/hthQJvnQ/Horlicks.webp", description: "A comforting and nutritious classic malted milk drink, served hot." },
        { id: "ob4", name: "Pepper Milk", price: 25, imageUrl: "https://i.postimg.cc/W1tqDzV9/pepper-milk.webp", description: "A soothing and warm milk drink with a hint of spicy black pepper." },
        { id: "ob5", name: "Milk", price: 25, imageUrl: "https://i.postimg.cc/Z50v9nmj/milk-tea.webp", description: "The classic comfort beverage, creamy, sweet, and satisfying." }
      ],
    },
    {
      name: "Snacks",
      items: [
        { id: "s1", name: "Dubai Viral Karak Chai Toast", price: 59, imageUrl: "https://i.postimg.cc/g2rLwjpk/Dubai-Viral-Karak-Chai-Toast.webp", description: "The famous crispy toast paired perfectly with our strong, aromatic Karak chai." }
      ]
    }
  ];

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(menuData);
    }, 300); // Reduced delay for faster perceived loading
  });
};

// Main function to get menu data, now with caching
export const getMenuData = async (): Promise<Category[]> => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedData && cachedTimestamp) {
      const isCacheStale = Date.now() - parseInt(cachedTimestamp, 10) > CACHE_DURATION_MS;
      
      if (!isCacheStale) {
        console.log("Loading menu data from cache.");
        // Return cached data immediately, then update in background
        const parsedData = JSON.parse(cachedData);
        // Stale-while-revalidate: fetch new data in the background for next visit
        fetchMenuFromSource().then(freshData => {
            localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
            console.log("Cache updated in the background.");
        });
        return parsedData;
      }
    }

    // If cache is stale or doesn't exist, fetch fresh data
    console.log("Cache is stale or missing. Fetching fresh data.");
    const freshData = await fetchMenuFromSource();
    localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    return freshData;

  } catch (error) {
    console.error("Could not access localStorage or fetch data. Falling back to direct fetch.", error);
    // Fallback if localStorage fails (e.g., private browsing)
    return fetchMenuFromSource();
  }
};
