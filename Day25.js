// Problem: Mongoose Indexing

// Problem Statement: Implement indexing on the "name" field of the "Product" collection to optimize query performance. Write a function to create the index.

/**
 * Creates an index on the "name" field of the "Product" collection in MongoDB
 */
function createProductNameIndex() {
    Product.collection.createIndex({ name: 1 }, (err, result) => {
        if (err) {
            console.error('Error creating index:', err);
        } else {
            console.log('Index created successfully:', result);
        }
    });
}

const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});
const Product = mongoose.model('Product', productSchema);
mongoose.connect('mongodb+srv://yash1409:<password>@cluster0.n8wj9y6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB ✅');
        createProductNameIndex();
    })
    .catch(err => console.error('Error connecting to MongoDB 🚫:', err));
