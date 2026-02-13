import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

// Sample products data
const products = [
  // Hot Coffee
  {
    name: 'Classic Espresso',
    description: 'Rich, bold espresso shot with a golden crema. Perfect for a quick caffeine boost.',
    price: 3.50,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.8,
    numReviews: 124
  },
  {
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and milk foam. A timeless Italian classic.',
    price: 4.50,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.9,
    numReviews: 256
  },
  {
    name: 'Vanilla Latte',
    description: 'Smooth espresso with steamed milk and a touch of vanilla syrup.',
    price: 5.00,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.7,
    numReviews: 189
  },
  {
    name: 'Caramel Macchiato',
    description: 'Espresso marked with steamed milk and vanilla, topped with caramel drizzle.',
    price: 5.50,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.8,
    numReviews: 312
  },
  {
    name: 'Americano',
    description: 'Espresso shots topped with hot water for a rich, full-bodied coffee.',
    price: 3.50,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.6,
    numReviews: 98
  },
  {
    name: 'Mocha',
    description: 'Espresso with steamed milk and rich chocolate, topped with whipped cream.',
    price: 5.50,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.9,
    numReviews: 234
  },
  // Cold Coffee
  {
    name: 'Iced Latte',
    description: 'Espresso poured over ice with cold milk. Refreshing and smooth.',
    price: 5.00,
    category: 'cold-coffee',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.7,
    numReviews: 178
  },
  {
    name: 'Cold Brew',
    description: 'Coffee steeped in cold water for 20 hours. Smooth, rich, and less acidic.',
    price: 4.50,
    category: 'cold-coffee',
    image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.8,
    numReviews: 145
  },
  {
    name: 'Frappuccino',
    description: 'Blended coffee with ice and milk, topped with whipped cream.',
    price: 5.50,
    category: 'cold-coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.6,
    numReviews: 203
  },
  {
    name: 'Iced Americano',
    description: 'Espresso shots poured over ice and cold water.',
    price: 4.00,
    category: 'cold-coffee',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.5,
    numReviews: 87
  },
  // Pastries
  {
    name: 'Butter Croissant',
    description: 'Flaky, buttery croissant baked fresh daily.',
    price: 3.50,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.8,
    numReviews: 156
  },
  {
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with fresh blueberries.',
    price: 3.00,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.7,
    numReviews: 134
  },
  {
    name: 'Cinnamon Danish',
    description: 'Sweet danish pastry with cinnamon swirl and vanilla glaze.',
    price: 3.50,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.6,
    numReviews: 98
  },
  {
    name: 'Coffee Cake',
    description: 'Moist cake with cinnamon streusel topping.',
    price: 4.00,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.8,
    numReviews: 112
  },
  {
    name: 'Chocolate Chip Cookie',
    description: 'Soft-baked cookie with premium chocolate chips.',
    price: 2.50,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.9,
    numReviews: 267
  },
  // Snacks
  {
    name: 'Avocado Toast',
    description: 'Sourdough bread topped with smashed avocado and sea salt.',
    price: 8.00,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.7,
    numReviews: 89
  },
  {
    name: 'Bagel with Cream Cheese',
    description: 'Fresh bagel with premium cream cheese spread.',
    price: 5.00,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1585445490387-f47934b73b54?w=400&h=400&fit=crop',
    isFeatured: false,
    rating: 4.5,
    numReviews: 76
  },
  // Specials
  {
    name: 'Pumpkin Spice Latte',
    description: 'Seasonal favorite with espresso, pumpkin spice, and steamed milk.',
    price: 6.00,
    category: 'specials',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.8,
    numReviews: 423
  },
  {
    name: 'Honey Lavender Latte',
    description: 'Unique blend of espresso, honey, and lavender.',
    price: 6.50,
    category: 'specials',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    isFeatured: true,
    rating: 4.6,
    numReviews: 67
  }
];

// Seed database
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('✅ Seeded products successfully!');

    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              🌱 Database Seeding Complete 🌱               ║
║                                                            ║
║   Total products added: ${products.length}                              ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
