const express = require('express');
const router = express.Router();
const { addExpense, getExpenses } = require('../controllers/expenseController');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to protect routes
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

router.post('/', auth, addExpense);
router.get('/', auth, getExpenses);

module.exports = router;
