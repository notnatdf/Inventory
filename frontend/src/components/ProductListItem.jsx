import React, { useState } from "react";
import { productAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { Button, Form, Col, Alert } from 'react-bootstrap';

const ProductListItem = ({ product, onProductUpdated, onProductDeleted }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...product });
    const [updateError, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await productAPI.updateProduct(product._id, formData);
            setIsEditing(false);
            if (onProductUpdated) {
                onProductUpdated(response.data);
            }
        } catch (err) {
            setError(`상품 수정 실패: ${err.response?.data?.message || err.message}`);
            console.error('Error updating product:', err.response?.data || err);
        }
    };
    const handleDelete = async () => {
        if (window.confirm(`${product.name} 상품을 정말 삭제하시겠습니까?`)) {
            try {
                await productAPI.deleteProduct(product._id);
                if (onProductDeleted) {
                    onProductDeleted(product._id);
                }
            } catch (err) {
                setError(`상품 삭제 실패: ${err.response?.data?.message || err.message}`);
                console.error('Error deleting product:', err.response?.data || err);
            }
        }
    };

    return (
        <tr>
            {isEditing ? (
                <>
                    <td><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} /></td>
                    <td><Form.Control type="text" name="description" value={formData.description} onChange={handleChange} /></td>
                    <td><Form.Control type="number" name="price" value={formData.price} onChange={handleChange} /></td>
                    <td><Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} /></td>
                    <td><Form.Control type="text" name="category" value={formData.category} onChange={handleChange} /></td>
                    <td><Form.Control type="text" name="supplier" value={formData.supplier} onChange={handleChange} /></td>
                    <td>
                        <Button variant="success" size="sm" onClick={handleUpdate} className="me-1">저장</Button>
                        <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>취소</Button>
                        {updateError && <Alert variant="danger" className="mt-1 p-1 text-center" style={{fontSize: '0.7em'}}>{updateError}</Alert>}
                    </td>
                </>
            ) : (
                <>
                    <td><Link to={`/products/${product._id}`}>{product.name}</Link></td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category}</td>
                    <td>{product.supplier}</td>
                    <td>
                        <Button variant="warning" size="sm" onClick={() => setIsEditing(true)} className="me-1">수정</Button>
                        <Button variant="danger" size="sm" onClick={handleDelete}>삭제</Button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default ProductListItem;