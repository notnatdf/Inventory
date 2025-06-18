import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { productAPI } from '../services/api';

const ProductForm = ({ onProductAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        supplier: ''
    });
    const [message, setMessge] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessge('');
        setError('');

        try {
            const response = await productAPI.createProduct(formData);
            
            setMessge(`상품 '${response.data.name}'이(가) 성공적으로 추가되었습니다.`);
            setFormData({
                name: '',
                description: '',
                price: '',
                quantity: '',
                category: '',
                supplier: ''
            });
            if (onProductAdded) {
                onProductAdded(response.data);
            }
        } catch (err) {
            setError(`상품 추가 실패: ${err.response?.data?.message || err.message}`);
            console.error('Error adding product:', err.response?.data || err);
        }
    };

    return (
        <Container className="my-4 p-4 border rounded shadow-sm">
            <h2 className="mb-4">새 상품 추가</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formName"></Form.Group>
                    <Form.Label>이름:</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Row>

                <Form.Group as={Col} controlId="formCategory">
                    <Form.Label>카테고리:</Form.Label>
                    <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formDescription">
                    <Form.Label>설명:</Form.Label>
                    <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required rows={3} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formPrice">
                        <Form.Label>가격:</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required min="0" />
                    </Form.Group>
                
                <Form.Group as={Col} controlId="formQuantity">
                    <Form.Label>수량:</Form.Label>
                    <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" />
                </Form.Group>
                
                <Form.Group>
                    <Form.Group as={Col} controlId="formSupplier"></Form.Group>
                        <Form.Label>공급업체:</Form.Label>
                        <Form.Control type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">상품 추가</Button>
        </Form>

        </Container>
    );
};

export default ProductForm;