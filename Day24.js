// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://yash1409:Qb9i_HA_.tzdx8k@cluster0.n8wj9y6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define the schema for the product
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

// Express route to create a new product
app.post('/products', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product({ name, description, price });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Express route to retrieve all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Express route to update a product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Express route to delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Set up the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
