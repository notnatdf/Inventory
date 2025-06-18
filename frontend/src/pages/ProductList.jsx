import { useState, useEffect } from "react";
import {  productAPI } from '../services/api';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, searchKeyword, selectedCategory]);

    const fetchProducts = async () => {
        try {
            const response = await productAPI.getAllProducts();
            setProducts(response.data);

            const uniqueCategories = [...new Set(response.data.map(product => product.category))];
            setCategories(uniqueCategories);

            setLoading(false);
        } catch (error) {
            console.error('상품 목록 로딩 실패:', error);
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = products;

        if (searchKeyword) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        setFilteredProducts(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await productAPI.deleteProduct(id);
                fetchProducts();
                alert('상품이 삭제되었습니다.');
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('삭제에 실패했습니다.');
            }
        }
    };

    const formatPrice = (price) => {
        return price.toLocaleString() + '원';
    };

    if (loading) {
        return <div className="text-center p-8">로딩 중...</div>;
    }

    return (
        <div>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">상품 관리</h1>
                <Link
                    to="/products/new"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md no-underline font-medium hover:bg-blue-700 transition duration-200"
                >
                    새 상품 등록
                </Link>
            </div>
            <p>상품 목록이 여기에 표시될 예정입니다.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div >
                   <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>상품명 검색</label>
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="상품명을 입력하세요"
                            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div> 
                    <div>
                        <label className="block mb-2 font-medium">카테고리</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">전체 카테고리</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left font-semibold border-b border-gray-200">상품명</th>
                            <th className="p-4 text-left font-semibold border-b border-gray-200">카테고리</th>
                            <th className="p-4 text-right font-semibold border-b border-gray-200">가격</th>
                            <th className="p-4 text-center font-semibold border-b border-gray-200">재고</th>
                            <th className="p-4 text-center font-semibold border-b border-gray-200">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    상품이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map(product => (
                                <tr key={product.id} className="border-b border-gray-100 last:border-b-0">
                                    <td className="p-4">
                                        <div>
                                            <div className="font-medium mb-1">{product.name}</div>
                                            {product.description && (
                                                <div className="text-sm text-gray-500">{product.description}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-medium">
                                        {formatPrice(product.price)}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`${product.stock < 10 ? 'text-red-600 font-bold' : 'text-green-600 font-normal'}`}>
                                            {product.stock}개
                                            {product.stock < 10 && ' ⚠️'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex gap-2 justify-center">
                                        <Link
                                            to={`/products/edit/${product.id}`}
                                            className="bg-green-600 text-white px-4 py-2 rounded-md no-underline text-sm hover:bg-green-700 transition duration-200"
                                            >
                                                수정
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-md border-none cursor-pointer text-sm hover:bg-red-700 transition duration-200"
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>

            <div className="nt-4 text-gray-500 text-sm">
                총 {filteredProducts.length}개 상품
        </div>
    </div>
    );
};

export default ProductList;