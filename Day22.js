const mongoose = require('mongoose');

// Define the schema for the Product entity
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// Create a Mongoose model for the Product entity
const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://yash1409:Qb9i_HA_.tzdx8k@cluster0.n8wj9y6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Function to create a new product in MongoDB
async function createProduct(product) {
  const newProduct = new Product(product);
  await newProduct.save();
  return newProduct;
}

// Function to retrieve all products from MongoDB
async function getAllProducts() {
  const products = await Product.find();
  return products;
}

// Function to update a product in MongoDB
async function updateProduct(productId, updatedProduct) {
  const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
  return product;
}

// Function to delete a product from MongoDB
async function deleteProduct(productId) {
  await Product.findByIdAndDelete(productId);
}

// Test Cases
(async () => {
  // Create a product
  const createdProduct = await createProduct({
    name: 'Laptop',
    price: 999.99,
    quantity: 10
  });
  console.log('Created Product:', createdProduct);

  // Retrieve all products
  const allProducts = await getAllProducts();
  console.log('All Products:', allProducts);

  // Update a product
  const updatedProduct = await updateProduct(createdProduct._id, { price: 1099.99 });
  console.log('Updated Product:', updatedProduct);

  // Delete a product
  await deleteProduct(createdProduct._id);
  console.log('Product deleted successfully');

  // Verify all products after deletion
  const remainingProducts = await getAllProducts();
  console.log('Remaining Products:', remainingProducts);
})();
