const mongoose = require('mongoose');

/**
 * Establishes a connection to MongoDB using Mongoose
 */
function connectToMongoDB() {
  // MongoDB connection string
  const mongoURI = 'mongodb+srv://yash1409:Qb9i_HA_.tzdx8k@cluster0.n8wj9y6.mongodb.net/?retryWrites=true&w=majority';

  // Connect to MongoDB
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Get the default connection
  const db = mongoose.connection;

  // Event handling for successful connection
  db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
  });

  // Event handling for connection errors
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
}

// Call the function to establish the MongoDB connection
connectToMongoDB();
