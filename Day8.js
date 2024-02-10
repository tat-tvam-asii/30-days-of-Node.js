// Problem: Express Error Handling

// Problem Statement: Create an Express route that throws an error if the request parameter "number" is not a positive integer. Implement an error handling middleware to catch and handle this specific error, returning a custom error message and a 400 Bad Request status.

const express = require('express');
const app = express();

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (Number.isInteger(number) && number > 0) {
    res.status(200).json({ message: 'Success: Number is a positive integer.' });
  } else {
    const err = new Error('Number must be a positive integer.');
    err.status = 400;
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  if (err.status === 400) {
    res.status(400).json({ error: err.message });
  } else {
    next(err); 
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/positive', positiveIntegerHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
