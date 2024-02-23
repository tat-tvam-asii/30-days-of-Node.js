const mongoose = require('mongoose');

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://yash1409:Qb9i_HA_.tzdx8k@cluster0.n8wj9y6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Define Category schema
const categorySchema = new mongoose.Schema({
  name: String,
  description: String
});

// Define Product schema with reference to Category
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Reference to the Category model
  }
});

// Define Category model
const Category = mongoose.model('Category', categorySchema);

// Define Product model
const Product = mongoose.model('Product', productSchema);

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Promise<Array>} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    // Populate products with category details
    const products = await Product.find().populate('category').exec();
    return products;
  } catch (error) {
    console.error('Error fetching products with populated category:', error);
    throw error;
  }
}

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    // Create some categories
    const electronicsCategory = await Category.create({ name: 'Electronics', description: 'Electronic products' });
    const clothingCategory = await Category.create({ name: 'Clothing', description: 'Clothing items' });

    // Create some products with associated categories
    await Product.create({ name: 'Laptop', description: 'Dell Laptop', price: 1000, category: electronicsCategory._id });
    await Product.create({ name: 'T-shirt', description: 'Cotton T-shirt', price: 20, category: clothingCategory._id });

    // Call the function to retrieve products with populated category details
    const productsWithCategory = await getProductsPopulatedWithCategory();
    console.log(productsWithCategory);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
