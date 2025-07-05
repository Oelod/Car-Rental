const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true,min: 1989, max: 2025 },
  price: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

carSchema.pre('save', function(next) {
  if (this.year < 1989 || this.year > 2025) {
    return next(new Error('Year must be between 1989 and 2025'));
  }
  if (this.price < 0) {
    return next(new Error('Price must be a positive number'));
  }
  next();
});

module.exports = mongoose.model('Car', carSchema);  
