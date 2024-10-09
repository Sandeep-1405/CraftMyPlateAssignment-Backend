const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: String,
    location: String,
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
