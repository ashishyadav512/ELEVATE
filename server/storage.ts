import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  categories, type Category, type InsertCategory,
  teamMembers, type TeamMember, type InsertTeamMember
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: number): Promise<TeamMember | undefined>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private teamMembers: Map<number, TeamMember>;
  private currentUserIds: number;
  private currentProductIds: number;
  private currentCategoryIds: number;
  private currentTeamMemberIds: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.teamMembers = new Map();
    this.currentUserIds = 1;
    this.currentProductIds = 1;
    this.currentCategoryIds = 1;
    this.currentTeamMemberIds = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create Categories
    const runningCategory = this.createCategory({
      name: "RUNNING",
      slug: "running",
      description: "Performance running shoes designed for speed and comfort",
      imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329"
    });

    const basketballCategory = this.createCategory({
      name: "BASKETBALL",
      slug: "basketball",
      description: "Premium basketball shoes for optimal court performance",
      imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
    });

    const lifestyleCategory = this.createCategory({
      name: "LIFESTYLE",
      slug: "lifestyle",
      description: "Stylish sneakers for everyday urban living",
      imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa"
    });

    const trainingCategory = this.createCategory({
      name: "TRAINING",
      slug: "training",
      description: "Versatile training shoes for gym and cross-training",
      imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570"
    });

    // Create Products
    this.createProduct({
      name: "Eclipse Limited",
      slug: "eclipse-limited",
      description: "The Eclipse Limited combines cutting-edge technology with luxurious materials for unmatched comfort and performance. Featuring responsive cushioning, breathable mesh upper, and our proprietary traction system.",
      shortDescription: "Luxury performance sneaker",
      price: 299,
      imageUrls: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80"],
      isFeatured: true,
      isNew: true,
      categoryId: lifestyleCategory.id,
      colors: ["black", "white", "red"],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
      tags: ["premium", "limited", "lifestyle"]
    });

    this.createProduct({
      name: "Skyline Pro",
      slug: "skyline-pro",
      description: "Engineered for serious runners, the Skyline Pro features our most responsive foam yet for maximum energy return. The lightweight, breathable upper conforms to your foot for a personalized fit.",
      shortDescription: "Performance running shoe",
      price: 245,
      imageUrls: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80"],
      isFeatured: true,
      isNew: true,
      categoryId: runningCategory.id,
      colors: ["blue", "white", "black"],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
      tags: ["running", "performance", "lightweight"]
    });

    this.createProduct({
      name: "Crimson Elite",
      slug: "crimson-elite",
      description: "Dominate the court with the Crimson Elite. Engineered with multi-directional support and responsive cushioning for explosive movements. The high-top design provides ankle stability for aggressive play.",
      shortDescription: "Professional basketball shoe",
      price: 320,
      imageUrls: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80"],
      isFeatured: true,
      categoryId: basketballCategory.id,
      colors: ["red", "black", "white"],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
      tags: ["basketball", "professional", "high-top"]
    });

    this.createProduct({
      name: "Phantom GT",
      slug: "phantom-gt",
      description: "The Phantom GT provides superior traction on all surfaces with a durable rubber outsole. The lightweight upper conforms to your foot while providing strategic support where you need it most.",
      shortDescription: "Professional soccer cleat",
      price: 210,
      salePrice: 280,
      imageUrls: ["https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80"],
      isFeatured: true,
      categoryId: trainingCategory.id,
      colors: ["gray", "white", "black"],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
      tags: ["soccer", "cleats", "professional"]
    });

    this.createProduct({
      name: "Velocity Runner",
      slug: "velocity-runner",
      description: "The Velocity Runner is designed for daily training runs with a perfect balance of cushioning and responsiveness. The engineered mesh upper provides breathability while maintaining durability.",
      shortDescription: "Lightweight running shoe",
      price: 240,
      imageUrls: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80"],
      categoryId: runningCategory.id,
      colors: ["blue", "black", "gray"],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
      tags: ["running", "training", "lightweight"]
    });

    this.createProduct({
      name: "Shadow Walker",
      slug: "shadow-walker",
      description: "The Shadow Walker combines street style with premium materials for an elevated everyday sneaker. The minimalist design features subtle detailing and a comfortable cushioned midsole.",
      shortDescription: "Lifestyle sneaker",
      price: 180,
      imageUrls: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80"],
      categoryId: lifestyleCategory.id,
      colors: ["black", "white", "gray"],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
      tags: ["lifestyle", "casual", "streetwear"]
    });

    this.createProduct({
      name: "Court Dominator",
      slug: "court-dominator",
      description: "The Court Dominator provides responsive cushioning and superior traction for quick cuts and explosive jumps. The supportive upper locks your foot in place for confident movement in any direction.",
      shortDescription: "Basketball performance",
      price: 230,
      salePrice: 290,
      imageUrls: ["https://images.unsplash.com/photo-1605348532760-6753d2c43329"],
      categoryId: basketballCategory.id,
      colors: ["black", "red", "white"],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
      tags: ["basketball", "performance", "sale"]
    });

    this.createProduct({
      name: "Velocity X3 Premium",
      slug: "velocity-x3-premium",
      description: "The Velocity X3 combines cutting-edge technology with luxurious materials for unmatched comfort and performance. Featuring responsive cushioning, breathable mesh upper, and our proprietary traction system for ultimate performance and style.",
      shortDescription: "Premium performance sneaker",
      price: 350,
      imageUrls: [
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80"
      ],
      isFeatured: true,
      isNew: true,
      categoryId: runningCategory.id,
      colors: ["black", "white", "red", "blue"],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
      tags: ["premium", "performance", "featured"]
    });

    // Create Team Members
    this.createTeamMember({
      name: "Alex Morgan",
      role: "Founder & CEO",
      imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    });

    this.createTeamMember({
      name: "Sarah Chen",
      role: "Lead Designer",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    });

    this.createTeamMember({
      name: "David Rodriguez",
      role: "Head of Product",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    });

    this.createTeamMember({
      name: "Maya Johnson",
      role: "Marketing Director",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    });
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserIds++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product Methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
  }

  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew,
    );
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductIds++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      return undefined;
    }
    
    const updatedProduct = { ...existingProduct, ...product };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Category Methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryIds++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Team Member Methods
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertTeamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentTeamMemberIds++;
    const teamMember: TeamMember = { ...insertTeamMember, id };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }
}

export const storage = new MemStorage();
