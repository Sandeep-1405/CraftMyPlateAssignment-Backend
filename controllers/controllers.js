const Register = require("../models/registermodel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/restaurantmodel');
const MenuItem = require('../models/menumodel');
const Order = require('../models/ordersModel');

// Signup
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Register({ name, email, password: hashedPassword });
        await newUser.save();
        
        //console.log(newUser);

        res.status(200).json({ message: "User registered successfully!" });
    } catch (error) {
        console.log("error :", error.message);
        res.status(500).json({ message: error.message });
    }
};

//login
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDetails = await Register.findOne({ email });
        if (!userDetails) {
            return res.status(404).json({ message: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, userDetails.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        console.log(userDetails._id.toString())
        console.log("User logged in successfully");

        const jwtToken = jwt.sign({userId: userDetails._id.toString(), email }, process.env.JWT_SECRET || "JWT_SECRET", { expiresIn: '1h' });
        
        return res.status(200).json({ message: "Login successful" , jwtToken});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error :" + error.message });
    }
};

//authentication
const authentication = async (req, res, next) => {
    let jwtToken;
    const authHeader = req.headers["authorization"];
    if(authHeader !== undefined){
        jwtToken = authHeader.split(' ')[1];
    }

    if (jwtToken === undefined){
        return res.status(401).json({message: "Invalid Jwt Token"})
    }

    try{
        const payload = jwt.verify(jwtToken, "JWT_SECRET");
        console.log(payload.userId);
        req.userId = payload.userId;
        next();

    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: error.message})
    }

}

//updateProfile
const updateProfile = async (req, res) => {
    const { id, name, email } = req.body;

    //console.log(req.body);
    
    if (!id || !name || !email) {
        return res.status(400).json({ message: "ID, Name, and Email are required" });
    }

    try {
        const userDetails = await Register.findByIdAndUpdate(
            id, 
            { name, email }, 
            { new: true } // To return the updated document
        );

        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile updated successfully", userDetails });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Server error", error });
    }
};

//user details
const getUserDetails = async (req, res) => {
    const userId = req.userId; 

    try {
        const userDetails = await Register.findById({ _id: userId });

        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(userDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error "+ error.message });
    }
};

// Create a new restaurant
const createRestaurant = async (req, res) => {
    const { name, location } = req.body;
    try{
        const restaurant = new Restaurant({ name, location });
        await restaurant.save();
        return res.status(201).json(restaurant);
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
};

// Update restaurant details
const updateRestaurant = async (req, res) => {
    const { restaurantId } = req.params;
    const { name, location } = req.body;
    try{
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, { name, location });
        return res.json("Restaurant Updated");
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
    
};

// Add items to restaurant menu
const addItemstoMenu = async (req, res) => {
    const { restaurantId } = req.params;
    const items = req.body.items;

    try{
        const menuItems = await MenuItem.insertMany(items);
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, { $push: { menu: menuItems.map(item => item._id) } });
        return res.json(restaurant);
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
  
};

// Update a specific menu item
const updateMenu = async (req, res) => {
    const { itemId } = req.params;
    const { name, description, price, available, category } = req.body;

    try{
        const menuItem = await MenuItem.findByIdAndUpdate(itemId, { name, description, price, available, category });
        return res.json(menuItem);
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
    
};

// Place a new order
const placeOrder =  async (req, res) => {

    const { userId, restaurantId, items, deliveryAddress, totalCost } = req.body;
  
    // Taking estimatedDeliveryTime as 45mins
    const estimatedDeliveryTime = "45 minutes";

    try{
        const order = new Order({
            userId,
            restaurantId,
            items,
            deliveryAddress,
            totalCost,
            estimatedDeliveryTime
        });
        
        await order.save();
        return res.status(201).json(order);
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
  
};

// Get order details
const orderDetails = async (req, res) => {
    const { orderId } = req.params;

    try{
        const order = await Order.findById(orderId).populate('items.itemId');
    
        if (!order) return res.status(404).json({ message: 'Order not found' });
        return res.json(order);

    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
};

// Update order status
const updateOrderStatus =  async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try{

    if (!['Pending', 'Confirmed', 'In Progress', 'Out for Delivery', 'Delivered'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    return res.json(order);
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
};

// Get all orders for the logged-in user
const getAllOrdersDetails = async (req, res) => {
    const userId = req.userId;

    try{
        const orders = await Order.find({ userId }).populate('restaurantId').populate('items.itemId'); 
        //populate('restaurantId') eans it shows complete restraunr details otherwise it shows only restaurant id
        res.json(orders);
    }catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
    
};

//track order
const trackOrder = async (req, res) => {
    const { orderId } = req.params;
    console.log(orderId);
  
    try {
      const order = await Order.findById(orderId).select('status'); //select is used for inclusion or for exclusion in the output
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json({ status: order.status });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error ' + error.message });
    }
};


module.exports = {
    createUser,
    userLogin,
    authentication,
    updateProfile,
    getUserDetails,
    createRestaurant,
    updateRestaurant,
    addItemstoMenu,
    updateMenu,
    placeOrder,
    orderDetails,
    updateOrderStatus,
    getAllOrdersDetails,
    trackOrder
};
