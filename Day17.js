const mongoose = require('mongoose');

// Define the Mongoose schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});

// Create the Mongoose model
const User = mongoose.model('User', userSchema);

// Connect Mongoose to your MongoDB database
mongoose.connect('mongodb+srv://yash1409:Qb9i_HA_.tzdx8k@cluster0.n8wj9y6.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Implement the addUserToDatabase function
async function addUserToDatabase(user) {
  try {
    // Create a new User object
    const newUser = new User(user);
    
    // Save the new user to the database
    await newUser.save();
    
    console.log('User added successfully:', newUser);
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

// Test the function
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
