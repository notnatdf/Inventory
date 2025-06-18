import express from 'express'
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { keyword } = req.query;
        let products;
        
        if (keyword) {
            
            products = await Product.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]
            });
        } else {
            products = await Product.find({});
        }
    
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/low-stock', async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold) || 10;
        const lowStockProducts = await Product.find({ quantity: { $lt: threshold } });
        res.status(200).json(lowStockProducts);
    } catch (error) {
        console.error('Error fetching low stock products:', error);
        res.status(500).json({ message: error.message });
    }
});


router.post ('/', async (req, res) => {
    const { name, description, price, quantity, category, supplier } = req.body;

    if (!name || !description || !price || !quantity || !category || !supplier) {
        return res.status(400).json({ message: '모든 필드를 입력해야 합니다.' });
    }

    const newProduct = new Product({
        name,
        description,
        price,
        quantity,
        category,
        supplier
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: '이미 존재하는 상품 이름입니다.' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { name, description, price, quantity, category, supplier } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, quantity, category, supplier },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: '이미 존재하는 상품 이름입니다.' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: '상품이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

export default router;

