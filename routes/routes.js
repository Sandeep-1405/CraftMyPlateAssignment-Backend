const router = require('express').Router()

const {
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
    trackOrder,
    
} = require('../controllers/controllers')

router.post('/register', createUser);

router.post('/login', userLogin);

router.put('/profile', authentication, updateProfile);

router.get('/profile', authentication, getUserDetails);

router.post('/restaurants', createRestaurant);

router.put('/restaurants/:restaurantId', updateRestaurant);

router.post('/restaurants/:restaurantId/menu', addItemstoMenu);

router.put('/restaurants/:restaurantId/menu/:itemId', updateMenu);

router.post('/orders', placeOrder);

router.get('/orders/:orderId',orderDetails)

router.put('/orders/:orderId/status',updateOrderStatus);

router.get('/orders', authentication, getAllOrdersDetails);

router.get('/orders/:orderId/track', trackOrder);

module.exports = router