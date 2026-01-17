import mongoose from "mongoose";
import dotenv from "dotenv";
import Menu from "./models/menu.model";
import User from "./models/user.model";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/hoqqa_cafe";

const menuItems = [
  {
    category: "Hookah",
    items: [
      {
        name: "Two Apples",
        description: "Classic double apple flavor.",
        price: 25,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Lemon Mint",
        description: "Refreshing lemon with a hint of mint.",
        price: 25,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Blueberry",
        description: "Sweet and tangy blueberry.",
        price: 25,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Grape Mint",
        description: "Smooth grape mixed with fresh mint.",
        price: 25,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Love 66",
        description: "Tropical mix of watermelon, melon, and passion fruit.",
        price: 30,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
    ],
  },
  {
    category: "Hot Drinks",
    items: [
      {
        name: "Turkish Coffee",
        description: "Traditional strong coffee.",
        price: 10,
        image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Espresso",
        description: "Rich and bold espresso shot.",
        price: 8,
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        price: 12,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Tea (Black/Green)",
        description: "Selection of premium teas.",
        price: 6,
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Moroccan Tea",
        description: "Green tea with fresh mint and sugar.",
        price: 15,
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
    ],
  },
  {
    category: "Cold Drinks",
    items: [
      {
        name: "Lemonade",
        description: "Freshly squeezed lemons with ice.",
        price: 12,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Mojito",
        description: "Classic lime and mint refresher (non-alcoholic).",
        price: 15,
        image: "https://images.unsplash.com/photo-1551024709-8f237c20454d?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Iced Coffee",
        description: "Chilled coffee with milk.",
        price: 14,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b5c7dd9b?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Soft Drinks",
        description: "Coke, Sprite, Fanta.",
        price: 5,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
    ],
  },
  {
    category: "Food",
    items: [
      {
        name: "Club Sandwich",
        description: "Chicken, lettuce, tomato, and cheese.",
        price: 20,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Cheese Burger",
        description: "Juicy beef patty with cheddar cheese.",
        price: 25,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Caesar Salad",
        description: "Romaine lettuce, croutons, and parmesan.",
        price: 18,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "French Fries",
        description: "Crispy golden fries.",
        price: 10,
        image: "https://images.unsplash.com/photo-1630384060421-a4323ceca041?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Cheesecake",
        description: "Creamy cheesecake with strawberry topping.",
        price: 18,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Chocolate Brownie",
        description: "Warm chocolate brownie with vanilla ice cream.",
        price: 16,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
      {
        name: "Fruit Salad",
        description: "Seasonal fresh fruits.",
        price: 15,
        image: "https://images.unsplash.com/photo-1519996541103-cd29965f71e3?auto=format&fit=crop&q=80&w=1000",
        isAvailable: true,
      },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Menu.deleteMany({});
    console.log("Cleared existing menu...");

    for (const category of menuItems) {
      for (const item of category.items) {
        await Menu.create({
          ...item,
          category: category.category,
        });
      }
    }
    console.log("Menu items seeded successfully!");

    await User.deleteMany({});
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      username: "admin",
      passwordHash: hashedPassword,
    });
    console.log("Admin user seeded successfully!");

    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
};

seedDB();