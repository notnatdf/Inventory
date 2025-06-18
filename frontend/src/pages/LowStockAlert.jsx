import React, { useEffect, useState } from "react";
import { productAPI } from '../services/api';
import { Table, Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';

const LowStockAlert = () => {
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [threshold, setThreshold] = useState(10);

    console.log("LowStockAlert 컴포넌트 렌더링 시작.");
    console.log("현재 threshold:", threshold);

    useEffect(() => {
        const fetchLowStockProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await productAPI.getLowStockProducts(threshold);

                console.log("LowStockAlert API 응답 데이터:", response.data);
                
                setLowStockProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('재고 부족 상품을 불러오는 데 실패했습니다.');
                console.error('Error fetching low stock products:', err);
                setLoading(false);
            }
        };

        fetchLowStockProducts();
    }, [threshold]);

    const handleThresholdChange = (e) => {
        setThreshold(e.target.value);
    };

    if (loading) return <Container className="my-4"><p>재고 부족 상품을 불러오는 중입니다...</p></Container>;
    if (error) return <Container className="my-4"><Alert variant="danger">에러: {error}</Alert></Container>;

    return (
        <Container className="my-4">
            <h2 className="mb-4">재고 부족 알림</h2>
            <Form.Group as={Row} className="mb-3 align-items-center">
                <Form.Label column sm="3">재고 임계값 설정:</Form.Label>
                <Col sm="3">
                <Form.Control
                    type="number"
                    value={threshold}
                    onChange={handleThresholdChange}
                    min="1"
                />
            </Col>
            </Form.Group>
            {lowStockProducts.length === 0 ? (
                <Alert variant="info">재고가 부족한 상품이 없습니다. (임계값: {threshold})</Alert>
            ) : (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>현재 수량</th>
                            <th>설명</th>
                            <th>가격</th>
                            <th>카테고리</th>
                            <th>공급업체</th>
                        </tr>
                </thead>
                <tbody>
                    {lowStockProducts.map((product) => (
                        <tr key={product._id} className="table-danger">
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.supplier}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>   
            )}
        </Container>
    );
};

export default LowStockAlert;