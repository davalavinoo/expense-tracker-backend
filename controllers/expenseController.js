const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const { type, amount, category, date, description } = req.body;
  try {
    const expense = new Expense({
      userId: req.user.id, // From JWT middleware
      type,
      amount,
      category,
      date,
      description,
    });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    console.error('Get Expenses Error:', err); // Add this
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
