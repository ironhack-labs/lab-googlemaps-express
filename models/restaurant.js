const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const RestaurantSchema = new Schema({
  _id: {type: Number, default: Math.floor((Math.random() * 1000) + 1)},
  name: String,
  description: String,
  location: { type: { type: String }, coordinates: [Number] }
});

RestaurantSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Restaurant', RestaurantSchema);
