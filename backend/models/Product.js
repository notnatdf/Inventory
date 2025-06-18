import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '상품 이름은 필수입니다.'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, '상품 설명은 필수입니다.'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, '가격은 필수입니다.'],
        min: [0, '가격은 음수일 수 없습니다.']
    },
    quantity: {
        type: Number,
        required: [true, '수량은 필수입니다.'],
        min: [0, '수량은 음수일 수 없습니다.']
    },
    category: {
        type: String,
        required: [true, '카테고리는 필수입니다.'],
        trim: true
    },
    supplier: {
        type: String,
        required: [true, '공급업체는 필수입니다.'],
        trim: true
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;