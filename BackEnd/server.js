const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// MongoDB Connection
const dbURI = 'mongodb+srv://admin:admin@financedata.uucpc.mongodb.net/';

// Connect to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Expense Schema and Model
const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the expense
  amount: { type: Number, required: true }, // Expense amount
  category: { type: String, required: true }, // Category (e.g., Food, Rent)
  date: { type: Date, default: Date.now }, // Date of the expense
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes

app.get('/api/exchange-rates', async (req, res) => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});


// 1. Add a New Expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const expense = new Expense({ name, amount, category });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Get All Expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update an Expense by ID
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete an Expense by ID
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//UPDATE EXPENSE
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedExpense);
  } catch (err) {
    console.error('Error updating expense:', err.message);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

//DELETE EXPENSE 
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense:', err.message);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Start the Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
