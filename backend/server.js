import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/ProductRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors({
    origin: 'https://inventory-smart-system.vercel.app',
    methods: ['GET', "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    })

app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management API!');
});

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access it at: http://localhost:${PORT}`);
    console.log(`Product API endpoints are available at: http://localhost:${PORT}/api/products`);
});