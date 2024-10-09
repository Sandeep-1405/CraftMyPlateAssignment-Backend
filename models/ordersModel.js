const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
  },
  restaurantId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Restaurant', 
      required: true 
  },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  deliveryAddress: { type: String, required: true },
  totalCost: { type: Number, required: true },
  status: { 
      type: String, 
      enum: ['Pending', 'Confirmed', 'In Progress', 'Out for Delivery', 'Delivered'], 
      default: 'Pending' 
  },
  estimatedDeliveryTime: { type: String, required: true }
});
  
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
