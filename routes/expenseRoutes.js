const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');
//
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('DELETE ID:', req.params.id);
    const expense = await Expense.findById(req.params.id);
    console.log('Expense Found:', expense);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    if (expense.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Expense deleted' });
  } catch (err) {
    console.error('DELETE Error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
//
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { type, amount, category, date, description } = req.body;
  try {
    const newExpense = new Expense({ userId: req.user.id, type, amount, category, date, description });
    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { type, amount, category, date, description } = req.body;
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    if (expense.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    expense = await Expense.findByIdAndUpdate(req.params.id, { type, amount, category, date, description }, { new: true });
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
