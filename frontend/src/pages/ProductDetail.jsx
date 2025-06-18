import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { productAPI } from '../services/api';
import { Form, Button, Alert, Container, Row, Col, Card } from "react-bootstrap";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateError, setUpdateError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productAPI.getProductById(id);
                setProduct(response.data);
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                setError('상품 정보를 불러오는 데 실패했습니다.');
                console.error('Error fetching product details:', err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdateError(null);
        try {
            const response = await productAPI.updateProduct(id, formData);
            setProduct(response.data);
            setIsEditing(false);
        } catch (err) {
            setUpdateError(`상품 수정 실패: ${err.response?.data?.message || err.message}`);
            console.error('상품 상세 정보 로딩 실패:', err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`${product.name}상품을 정말 삭제하시겠습니까?`)) {
            try {
                await productAPI.deleteProduct(id);
                alert('상품이 성공적으로 삭제되었습니다!');
                navigate('/')
            } catch (err) {
                setError(`상품 삭제 실패: ${err.response?.data?.message || err.message}`)
                console.error('Error deleting product:', err.response?.data || err);
            }
        }
    };

    if (loading) return <Container className="my-4"><p>상품 상세 정보 로딩 중...</p></Container>;

    if (error) return <Container className="my-4"><Alert variant="danger">에러: {error}</Alert></Container>;

    if (!product) return <Container className="my-4"><p>상품 정보를 찾을 수 없습니다.</p></Container>;

    return (
        <Container className="my-4">
            <h2 className="mb-4">상품 상세 정보</h2>
            {isEditing ? (
                <Card className="p-4 shadow-sm">
                    <Form onSubmit={handleUpdate} className="product-detail-form">
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formDetailName">
                                <Form.Label>이름:</Form.Label>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formDetailCategory">
                                <Form.Label>카테고리:</Form.Label>
                                <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
                            </Form.Group>
                        </Row>
                            
                            <Form.Group className="mb-3" controlId="formDetailDescription">
                                <Form.Label>설명:</Form.Label>
                                <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required rows={3} />
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formDetailPrice">
                                    <Form.Label>가격:</Form.Label>
                                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required min="0" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDetailQuantity">
                                    <Form.Label>수량:</Form.Label>
                                    <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDetailSupplier">
                                    <Form.Label>공급업체:</Form.Label>
                                    <Form.Control type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />
                                </Form.Group>
                            </Row>

                    <Button variant="primary" type="submit" className="me-2">변경 사항 저장</Button>
                    <Button variant="secondary" type="button" onClick={() => setIsEditing(false)}>취소</Button>
                    {updateError && <Alert variant="danger" className="mt-3">{updateError}</Alert>}
                    </Form>
                </Card>
            ) : (
                <Card className="p-4 shadow-sm">
                    <Card.Body>
                    <Card.Text><strong>이름:</strong> {product.name}</Card.Text>
                    <Card.Text><strong>설명:</strong> {product.description}</Card.Text>
                    <Card.Text><strong>가격:</strong> {product.price}</Card.Text>
                    <Card.Text><strong>수량:</strong> {product.quantity}</Card.Text>
                    <Card.Text><strong>카테고리:</strong> {product.category}</Card.Text>
                    <Card.Text><strong>공급업체:</strong> {product.supplier}</Card.Text>
                    <Card.Text><strong>생성일:</strong> {new Date(product.createdAt).toLocaleDateString()}</Card.Text>
                    <Card.Text><strong>수정일:</strong> {new Date(product.updatedAt).toLocaleDateString()}</Card.Text>
                    <div className="mt-4">
                        <Button variant="warning" onClick={() => setIsEditing(true)} className="me-2">수정</Button>
                        <Button variant="danger" onClick={handleDelete} className="me-2">삭제</Button>
                        <Button variant="secondary" onClick={() => navigate('/')}>목록으로 돌아가기</Button>
                    </div>
                </Card.Body>
            </Card>
            )}
        </Container>
    );
};

export default ProductDetail;