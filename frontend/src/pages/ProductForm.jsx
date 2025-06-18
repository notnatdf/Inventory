import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI } from '../services/api';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
       name: '',
       description: '',
       price: '',
       stock: '',
       category: '' 
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const commonCategories = [
        '의류', '전자제품', '식품', '도서', '스포츠', '화장품', '생활용품', '가구', '기타'
    ];

    useEffect(() => {
        if (isEdit) {
            fetchProduct();
        }
    }, [id, isEdit]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await productAPI.getProductById(id);
            const product = response.data;
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price.toString(),
                stock: product.stock.toString(),
                category: product.category || ''
            });
        } catch (error) {
            console.error('상품 정보 로딩 실패:', error);
            alert('상품 정보를 불러오는데 실패했습니다.');
            navigate('/products');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = '상품명은 필수입니다.';
        }

        if (!formData.price || formData.price <= 0) {
            newErrors.price = '가격은 0보다 큰 숫자여야 합니다.';
        }

        if (!formData.stock || formData.stock < 0) {
            newErrors.stock = '재고는 0 이상의 숫자여야 합니다.';
        }

        if (!formData.category.trim()) {
            newErrors.category = '카테고리는 필수입니다.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const productData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseInt(formData.price),
                stock: parseInt(formData.stock),
                category: formData.category.trim()
            };

            if (isEdit) {
                await productAPI.updateProduct(id, productData);
                alert('상품이 수정되었습니다.');
            } else {
                await productAPI.createProduct(productData);
                alert('상품이 등록되었습니다.');
            }

            navigate('/products');
        } catch (error) {
            console.error('상품 저장 실패:', error);
            alert('저장에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return <div className="text-center p-8">로딩 중...</div>;
    }

    return (
        <div>
            <div className="p-8">
                <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    {isEdit ? '상품 수정' : '새 상품 등록'}
                </h1>
                <p className="text-gray-500 mt-2">
                    {isEdit ? '상품 정보를 수정해주세요.' : '새로운 상품을 등록해주세요.'}
                </p>
            </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div>
                            <label className="block mb-2 font-medium">
                                상품명 <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="상품명을 입력하세요"
                                className={`w-full p-3 border rounded-md text-sm ${errors.name ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                상품 설명
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="상품 설명을 입력하세요 (선택사항)"
                                rows="3"
                                className="w-full p-3 border border-gray-300 rounded-sm text-base resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">
                                    가격 (원) <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                    className={`w-full p-3 border rounded-md text-base ${errors.price ? 'border-red-600' : 'border-gray-300'}focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                                />
                                {errors.price && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    재고 (개) <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                    className={`w-full p-3 border rounded-md text-base ${errors.stock ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.stock && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.stock}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                카테고리 <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {commonCategories.map(category => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, category}))}
                                        className={`px-4 py-2 border rounded-full text-sm cursor-pointer transition duration-200
                                           ${formData.category === category ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="직접 입력 또는 위 버튼 선택"
                                    min="0"
                                    className={`w-full p-3 border rounded-md text-base ${errors.category ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.category && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex gap-4 mt-8 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/products')}
                                        className="px-6 py-3 border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer font-medium hover:bg-gray-50 transition duration-200"
                                        >
                                            취소
                                        </button>
                                        <button
                                        type="submit"
                                        disabled={loading}                                        
                                        className={`px-6 py-3 border-none rounded-md text-white font-medium transition duration-200
                                            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 cursor-pointer hover:bg-blue-700'}`}
                                        >
                                            {loading ? '저장 중...' : (isEdit ? '수정하기' : '등록하기')}
                                    </button>     
                    </div>                    
                </form>
            </div>
        </div>
    );
};

export default ProductForm;