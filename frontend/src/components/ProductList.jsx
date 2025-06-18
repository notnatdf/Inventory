import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import ProductListItem from './ProductListItem.jsx';
import { Table, Form, Button, Container, Alert } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const fetchProducts = useCallback (async () => {
        setLoading(true);
        setError(null);
        try {
            const url = searchKeyword
                ? `http://localhost:5000/api/products?keyword=${searchKeyword}`
                : 'http://localhost:5000/api/products';
            const response = await axios.get(url);
                setProducts(response.data);
                setLoading(false); 
        } catch (err) {
            setError('상품을 불러오는 데 실패했습니다.');
            console.error('Error fetching products:', err);
            setLoading(false);
        }
    }, [searchKeyword]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, searchKeyword]);

    const handleProductUpated = (updatedProduct) => {
        setProducts(products.map(p => (p._id === updatedProduct._id ? updatedProduct : p)));
    };

    const handleProductDeleted = (deletedProductId) => {
        setProducts(products.filter(p => p._id !== deletedProductId));
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    if (loading) return <Container className="my-4"><p>상품 목록을 불러오는 중입니다...</p></Container>;
    if (error) return <Container className="my-4"><Alert variant="danger">에러: {error}</Alert></Container>;
   
    return (
        <Container className="my-4">
            <h2 className="mb-4">상품 목록</h2>
            <Form onSubmit={handleSearchSubmit} className="d-flex mb-3">
                <Form.Control
                    type="text"
                    placeholder="상품 이름 또는 설명으로 검색"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className="me-2"
                />
                <Button variant="secondary" type="submit">검색</Button>
            </Form>

            {products.length === 0 && searchKeyword ? (
                <Alert variant="info">"{searchKeyword}"에 대한 검색 결과가 없습니다.</Alert>
            ) : products.length === 0 ? (
                <Alert variant="info">등록된 상품이 없습니다.</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>설명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>카테고리</th>
                            <th>공급업체</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <ProductListItem
                            key={product._id}
                            product={product}
                            onProductUpdated={handleProductUpated}
                            onProductDeleted={handleProductDeleted}
                        />
                    ))}
                </tbody>
            
            </Table>
        )}
    </Container>      
    );
};

export default ProductList;