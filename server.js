const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
//
app.use(cors({
  origin: [
    'https://expense-tracker-frontend-harshika.vercel.app',
    'https://expense-tracker-frontend-clean-davala-vinod-abrahams-projects.vercel.app',
    'https://expense-tracker-front-git-e337b0-davala-vinod-abrahams-projects.vercel.app', // Add this
    'http://localhost:3000'
  ]
}));
//
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
