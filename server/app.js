const express = require('express');
const mongoose = require('mongoose');
const bugsRouter = require('./routes/bugs');

const app = express();
app.use(express.json());

// Routes
app.use('/api/bugs', bugsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
