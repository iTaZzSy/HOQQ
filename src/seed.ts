import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/menu.model';
import User from './models/user.model';
import bcrypt from 'bcryptjs';

dotenv.config();
dotenv.config({ path: '.env.local' });

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/hoqqa_cafe";

const seedData = [
    // --- Hookah (Nargile) ---
    {
        name: "Double Apple",
        description: "Classic blend of two apples with a sweet and tart profile.",
        category: "Nargile",
        price: 250
    },
    {
        name: "Grape Mint",
        description: "Refreshing mix of sweet green grapes and cool mint.",
        category: "Nargile",
        price: 250
    },
    {
        name: "Love 66",
        description: "Exotic combination of watermelon, melon, passion fruit, and mint.",
        category: "Nargile",
        price: 280
    },
    {
        name: "Blueberry Mist",
        description: "Sweet blueberry flavor with a hint of cooling mist.",
        category: "Nargile",
        price: 260
    },
    {
        name: "Lady Killer",
        description: "A smooth blend of melon, mango, berries, and mint.",
        category: "Nargile",
        price: 300
    },

    // --- Hot Drinks ---
    {
        name: "Türk Kahvesi",
        description: "Traditional Turkish coffee served with delight.",
        category: "Sıcak İçecekler",
        price: 60
    },
    {
        name: "Çay",
        description: "Freshly brewed Turkish black tea.",
        category: "Sıcak İçecekler",
        price: 25
    },
    {
        name: "Latte",
        description: "Espresso with steamed milk and a thin layer of foam.",
        category: "Sıcak İçecekler",
        variants: [
            { size: "Small", price: 80 },
            { size: "Large", price: 95 }
        ]
    },
    {
        name: "Cappuccino",
        description: "Espresso with equal parts steamed milk and milk foam.",
        category: "Sıcak İçecekler",
        price: 85
    },

    // --- Cold Drinks ---
    {
        name: "Ev Yapımı Limonata",
        description: "Fresh homemade lemonade with mint leaves.",
        category: "Soğuk İçecekler",
        price: 70
    },
    {
        name: "Ice Latte",
        description: "Chilled espresso with cold milk and ice.",
        category: "Soğuk İçecekler",
        price: 90
    },
    {
        name: "Coca Cola",
        description: "Classic soft drink.",
        category: "Soğuk İçecekler",
        price: 50
    },

    // --- Food / Snacks ---
    {
        name: "Karışık Tost",
        description: "Toasted sandwich with sucuk (spicy sausage) and kasar cheese.",
        category: "Atıştırmalıklar",
        price: 120
    },
    {
        name: "Patates Kızartması",
        description: "Golden crispy french fries served with ketchup and mayonnaise.",
        category: "Atıştırmalıklar",
        price: 90
    },
    {
        name: "Hamburger Menü",
        description: "Classic beef burger served with fries and coleslaw.",
        category: "Ana Yemekler",
        price: 280
    },

    // --- Desserts ---
    {
        name: "Cheesecake (Limonlu)",
        description: "Creamy cheesecake with a zesty lemon topping.",
        category: "Tatlılar",
        price: 140
    },
    {
        name: "San Sebastian",
        description: "Burnt basque cheesecake served with chocolate sauce.",
        category: "Tatlılar",
        price: 160
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Seed Menu Items
        await MenuItem.deleteMany({});
        console.log('Cleared existing menu items.');
        await MenuItem.insertMany(seedData);
        console.log(`Successfully seeded ${seedData.length} menu items.`);

        // 2. Seed Admin User
        await User.deleteMany({});
        console.log('Cleared existing users.');
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('admin123', salt);
        
        const adminUser = new User({
            username: 'admin',
            passwordHash: passwordHash
        });
        
        await adminUser.save();
        console.log('Successfully seeded admin user (username: admin, password: admin123).');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
};

seedDB();