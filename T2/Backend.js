const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number
});

const Cart = mongoose.model('Cart', cartSchema);

// Route to handle checkout process
app.post('/checkout', async (req, res) => {
    const cartData = req.body;
    try {
        // Save cart items to the database
        await Cart.insertMany(cartData);
        // Here you can implement additional logic like sending confirmation emails
        res.status(200).json({ message: 'Order processed successfully.' });
    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch products from the database
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
