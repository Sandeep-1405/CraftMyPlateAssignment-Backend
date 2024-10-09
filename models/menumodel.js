const mongoose = require('mongoose');

const menuItemsSchema =  new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    available: Boolean,
    category: String
});

const MenuItem = mongoose.model('MenuItem',menuItemsSchema);

module.exports = MenuItem;