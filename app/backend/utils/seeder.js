/**
 * Database Seeder
 * Seeds the database with sample data
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import connectDB from '../config/database.js';

dotenv.config();

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@brewhaven.com',
    password: 'admin123',
    role: 'admin',
    phone: '(555) 123-4567',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    phone: '(555) 234-5678',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'user123',
    role: 'user',
    phone: '(555) 345-6789',
  },
];

const products = [
  // Hot Coffee
  {
    name: 'Classic Espresso',
    description: 'Rich, bold espresso shot with a golden crema. Perfect for a quick caffeine boost.',
    price: 3.50,
    category: 'hot-coffee',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Espresso beans', 'Water'],
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbs: 1,
      fat: 0,
      caffeine: 63,
    },
    sizes: [
      { name: 'Single', price: 3.50, volume: '1oz' },
      { name: 'Double', price: 4.50, volume: '2oz' },
    ],
    countInStock: 100,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 3,
    tags: ['classic', 'strong', 'quick'],
  },
  {
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and milk foam. A timeless Italian classic.',
    price: 4.50,
    category: 'hot-coffee',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    nutritionalInfo: {
      calories: 120,
      protein: 6,
      carbs: 10,
      fat: 6,
      caffeine: 63,
    },
    sizes: [
      { name: 'Small', price: 4.50, volume: '8oz' },
      { name: 'Medium', price: 5.50, volume: '12oz' },
      { name: 'Large', price: 6.50, volume: '16oz' },
    ],
    countInStock: 80,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 5,
    tags: ['classic', 'creamy', 'popular'],
  },
  {
    name: 'Vanilla Latte',
    description: 'Smooth espresso with steamed milk and a touch of vanilla syrup.',
    price: 5.00,
    category: 'hot-coffee',
    image: 'https://cdn.pixabay.com/photo/2019/03/07/06/57/coffee-4034477_640.jpg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Steamed milk', 'Vanilla syrup'],
    nutritionalInfo: {
      calories: 190,
      protein: 8,
      carbs: 24,
      fat: 7,
      caffeine: 63,
    },
    sizes: [
      { name: 'Small', price: 5.00, volume: '12oz' },
      { name: 'Medium', price: 6.00, volume: '16oz' },
      { name: 'Large', price: 7.00, volume: '20oz' },
    ],
    options: [
      {
        name: 'Milk Type',
        choices: [
          { name: 'Whole Milk', price: 0 },
          { name: 'Almond Milk', price: 0.50 },
          { name: 'Oat Milk', price: 0.50 },
          { name: 'Soy Milk', price: 0.50 },
        ],
      },
    ],
    countInStock: 70,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 5,
    tags: ['sweet', 'creamy', 'popular'],
  },
  {
    name: 'Caramel Macchiato',
    description: 'Espresso marked with steamed milk and vanilla, topped with caramel drizzle.',
    price: 5.50,
    category: 'hot-coffee',
    image: 'https://images.pexels.com/photos/1772334/pexels-photo-1772334.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Steamed milk', 'Vanilla syrup', 'Caramel drizzle'],
    nutritionalInfo: {
      calories: 240,
      protein: 8,
      carbs: 32,
      fat: 9,
      caffeine: 75,
    },
    sizes: [
      { name: 'Small', price: 5.50, volume: '12oz' },
      { name: 'Medium', price: 6.50, volume: '16oz' },
      { name: 'Large', price: 7.50, volume: '20oz' },
    ],
    countInStock: 60,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 6,
    tags: ['sweet', 'caramel', 'popular'],
  },
  {
    name: 'Americano',
    description: 'Espresso shots topped with hot water for a rich, full-bodied coffee.',
    price: 3.50,
    category: 'hot-coffee',
    image: 'https://cdn.pixabay.com/photo/2021/07/27/11/09/coffee-6492917_640.jpg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Hot water'],
    nutritionalInfo: {
      calories: 10,
      protein: 0,
      carbs: 2,
      fat: 0,
      caffeine: 125,
    },
    sizes: [
      { name: 'Small', price: 3.50, volume: '12oz' },
      { name: 'Medium', price: 4.50, volume: '16oz' },
      { name: 'Large', price: 5.50, volume: '20oz' },
    ],
    countInStock: 90,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 3,
    tags: ['classic', 'strong', 'simple'],
  },
  {
    name: 'Mocha',
    description: 'Espresso with steamed milk and rich chocolate, topped with whipped cream.',
    price: 5.50,
    category: 'hot-coffee',
    image: 'https://images.pexels.com/photos/3992017/pexels-photo-3992017.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Steamed milk', 'Chocolate syrup', 'Whipped cream'],
    nutritionalInfo: {
      calories: 290,
      protein: 10,
      carbs: 38,
      fat: 12,
      caffeine: 95,
    },
    sizes: [
      { name: 'Small', price: 5.50, volume: '12oz' },
      { name: 'Medium', price: 6.50, volume: '16oz' },
      { name: 'Large', price: 7.50, volume: '20oz' },
    ],
    countInStock: 65,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 6,
    tags: ['chocolate', 'sweet', 'creamy'],
  },

  // Cold Coffee
  {
    name: 'Iced Latte',
    description: 'Espresso poured over ice with cold milk. Refreshing and smooth.',
    price: 5.00,
    category: 'cold-coffee',
    image: 'https://images.pexels.com/photos/3865822/pexels-photo-3865822.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Cold milk', 'Ice'],
    nutritionalInfo: {
      calories: 110,
      protein: 6,
      carbs: 9,
      fat: 5,
      caffeine: 63,
    },
    sizes: [
      { name: 'Small', price: 5.00, volume: '12oz' },
      { name: 'Medium', price: 6.00, volume: '16oz' },
      { name: 'Large', price: 7.00, volume: '24oz' },
    ],
    options: [
      {
        name: 'Milk Type',
        choices: [
          { name: 'Whole Milk', price: 0 },
          { name: 'Almond Milk', price: 0.50 },
          { name: 'Oat Milk', price: 0.50 },
        ],
      },
    ],
    countInStock: 75,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 4,
    tags: ['cold', 'refreshing', 'popular'],
  },
  {
    name: 'Cold Brew',
    description: 'Coffee steeped in cold water for 20 hours. Smooth, rich, and less acidic.',
    price: 4.50,
    category: 'cold-coffee',
    image: 'https://cdn.pixabay.com/photo/2021/07/23/11/54/cold-coffee-6485063_640.jpg?w=400&h=400&fit=crop',
    ingredients: ['Cold brew coffee', 'Ice'],
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbs: 1,
      fat: 0,
      caffeine: 155,
    },
    sizes: [
      { name: 'Small', price: 4.50, volume: '12oz' },
      { name: 'Medium', price: 5.50, volume: '16oz' },
      { name: 'Large', price: 6.50, volume: '24oz' },
    ],
    options: [
      {
        name: 'Add Milk',
        choices: [
          { name: 'None', price: 0 },
          { name: 'Splash of Milk', price: 0.50 },
          { name: 'Cream', price: 0.50 },
        ],
      },
    ],
    countInStock: 50,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 2,
    tags: ['cold', 'strong', 'smooth'],
  },
  {
    name: 'Frappuccino',
    description: 'Blended coffee with ice and milk, topped with whipped cream.',
    price: 5.50,
    category: 'cold-coffee',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Coffee', 'Milk', 'Ice', 'Sugar', 'Whipped cream'],
    nutritionalInfo: {
      calories: 240,
      protein: 4,
      carbs: 45,
      fat: 6,
      caffeine: 75,
    },
    sizes: [
      { name: 'Small', price: 5.50, volume: '12oz' },
      { name: 'Medium', price: 6.50, volume: '16oz' },
      { name: 'Large', price: 7.50, volume: '24oz' },
    ],
    options: [
      {
        name: 'Flavor',
        choices: [
          { name: 'Coffee', price: 0 },
          { name: 'Mocha', price: 0.50 },
          { name: 'Caramel', price: 0.50 },
          { name: 'Vanilla', price: 0.50 },
        ],
      },
    ],
    countInStock: 60,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 5,
    tags: ['cold', 'blended', 'sweet'],
  },
  {
    name: 'Iced Americano',
    description: 'Espresso shots poured over ice and cold water.',
    price: 4.00,
    category: 'cold-coffee',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Cold water', 'Ice'],
    nutritionalInfo: {
      calories: 10,
      protein: 0,
      carbs: 2,
      fat: 0,
      caffeine: 125,
    },
    sizes: [
      { name: 'Small', price: 4.00, volume: '12oz' },
      { name: 'Medium', price: 5.00, volume: '16oz' },
      { name: 'Large', price: 6.00, volume: '24oz' },
    ],
    countInStock: 85,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 3,
    tags: ['cold', 'strong', 'simple'],
  },

  // Pastries
  {
    name: 'Butter Croissant',
    description: 'Flaky, buttery croissant baked fresh daily.',
    price: 3.50,
    category: 'pastries',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Flour', 'Butter', 'Yeast', 'Sugar', 'Salt'],
    nutritionalInfo: {
      calories: 280,
      protein: 5,
      carbs: 32,
      fat: 15,
      caffeine: 0,
    },
    countInStock: 40,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 1,
    tags: ['fresh', 'buttery', 'classic'],
  },
  {
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with fresh blueberries.',
    price: 3.00,
    category: 'pastries',
    image: 'https://cdn.pixabay.com/photo/2021/03/26/17/28/muffin-6124897_640.jpg?w=400&h=400&fit=crop',
    ingredients: ['Flour', 'Blueberries', 'Sugar', 'Eggs', 'Butter'],
    nutritionalInfo: {
      calories: 320,
      protein: 5,
      carbs: 48,
      fat: 12,
      caffeine: 0,
    },
    countInStock: 35,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 1,
    tags: ['sweet', 'fruity', 'fresh'],
  },
  {
    name: 'Cinnamon Danish',
    description: 'Sweet danish pastry with cinnamon swirl and vanilla glaze.',
    price: 3.50,
    category: 'pastries',
    image: 'https://images.pexels.com/photos/2551084/pexels-photo-2551084.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Flour', 'Butter', 'Cinnamon', 'Sugar', 'Vanilla glaze'],
    nutritionalInfo: {
      calories: 340,
      protein: 5,
      carbs: 45,
      fat: 16,
      caffeine: 0,
    },
    countInStock: 30,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 1,
    tags: ['sweet', 'cinnamon', 'fresh'],
  },
  {
    name: 'Coffee Cake',
    description: 'Moist cake with cinnamon streusel topping.',
    price: 4.00,
    category: 'pastries',
    image: 'https://cdn.pixabay.com/photo/2019/09/27/11/55/cake-4506973_640.jpg?w=400&h=400&fit=crop',
    ingredients: ['Flour', 'Sugar', 'Butter', 'Cinnamon', 'Eggs'],
    nutritionalInfo: {
      calories: 380,
      protein: 5,
      carbs: 52,
      fat: 18,
      caffeine: 0,
    },
    countInStock: 25,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 1,
    tags: ['sweet', 'cinnamon', 'classic'],
  },
  {
    name: 'Chocolate Chip Cookie',
    description: 'Soft-baked cookie with premium chocolate chips.',
    price: 2.50,
    category: 'pastries',
    image: 'https://images.pexels.com/photos/2693521/pexels-photo-2693521.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Flour', 'Chocolate chips', 'Butter', 'Sugar', 'Eggs'],
    nutritionalInfo: {
      calories: 220,
      protein: 3,
      carbs: 28,
      fat: 11,
      caffeine: 0,
    },
    countInStock: 50,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 1,
    tags: ['sweet', 'chocolate', 'classic'],
  },

  // Snacks
  {
    name: 'Avocado Toast',
    description: 'Sourdough bread topped with smashed avocado and sea salt.',
    price: 8.00,
    category: 'snacks',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Sourdough bread', 'Avocado', 'Sea salt', 'Lemon', 'Olive oil'],
    nutritionalInfo: {
      calories: 320,
      protein: 8,
      carbs: 28,
      fat: 22,
      caffeine: 0,
    },
    options: [
      {
        name: 'Toppings',
        choices: [
          { name: 'Plain', price: 0 },
          { name: 'Add Egg', price: 1.50 },
          { name: 'Add Chili Flakes', price: 0.50 },
        ],
      },
    ],
    countInStock: 20,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 8,
    tags: ['healthy', 'fresh', 'savory'],
  },
  {
    name: 'Bagel with Cream Cheese',
    description: 'Fresh bagel with premium cream cheese spread.',
    price: 5.00,
    category: 'snacks',
    image: 'https://images.pexels.com/photos/3535382/pexels-photo-3535382.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Bagel', 'Cream cheese'],
    nutritionalInfo: {
      calories: 380,
      protein: 12,
      carbs: 52,
      fat: 14,
      caffeine: 0,
    },
    options: [
      {
        name: 'Bagel Type',
        choices: [
          { name: 'Plain', price: 0 },
          { name: 'Everything', price: 0 },
          { name: 'Sesame', price: 0 },
          { name: 'Cinnamon Raisin', price: 0 },
        ],
      },
    ],
    countInStock: 30,
    isAvailable: true,
    isFeatured: false,
    preparationTime: 3,
    tags: ['classic', 'savory', 'fresh'],
  },

  // Specials
  {
    name: 'Pumpkin Spice Latte',
    description: 'Seasonal favorite with espresso, pumpkin spice, and steamed milk.',
    price: 6.00,
    category: 'specials',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Steamed milk', 'Pumpkin spice syrup', 'Whipped cream'],
    nutritionalInfo: {
      calories: 260,
      protein: 8,
      carbs: 38,
      fat: 10,
      caffeine: 75,
    },
    sizes: [
      { name: 'Small', price: 6.00, volume: '12oz' },
      { name: 'Medium', price: 7.00, volume: '16oz' },
      { name: 'Large', price: 8.00, volume: '20oz' },
    ],
    countInStock: 40,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 6,
    tags: ['seasonal', 'spiced', 'popular'],
  },
  {
    name: 'Honey Lavender Latte',
    description: 'Unique blend of espresso, honey, and lavender.',
    price: 6.50,
    category: 'specials',
    image: 'https://cdn.pixabay.com/photo/2018/07/12/15/40/coffee-3533885_640.jpg?w=400&h=400&fit=crop',
    ingredients: ['Espresso', 'Steamed milk', 'Honey', 'Lavender syrup'],
    nutritionalInfo: {
      calories: 220,
      protein: 8,
      carbs: 32,
      fat: 7,
      caffeine: 63,
    },
    sizes: [
      { name: 'Small', price: 6.50, volume: '12oz' },
      { name: 'Medium', price: 7.50, volume: '16oz' },
      { name: 'Large', price: 8.50, volume: '20oz' },
    ],
    countInStock: 25,
    isAvailable: true,
    isFeatured: true,
    preparationTime: 6,
    tags: ['specialty', 'floral', 'unique'],
  },
];

// Seed function
const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    console.log('🗑️  Data cleared...');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} users created`);

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} products created`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n👤 Admin Login:');
    console.log('   Email: admin@brewhaven.com');
    console.log('   Password: admin123');
    console.log('\n👤 User Login:');
    console.log('   Email: john@example.com');
    console.log('   Password: user123');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

// Destroy function
const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Product.deleteMany();

    console.log('🗑️  Data destroyed!');
    process.exit();
  } catch (error) {
    console.error('❌ Error destroying data:', error.message);
    process.exit(1);
  }
};

// Run based on command
if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}

export default seedData;
