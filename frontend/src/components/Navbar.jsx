import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as RBNavbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

const Navbar = () => {
    return (
        <RBNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <RBNavbar.Brand as={Link} to="/">재고 관리 시스템</RBNavbar.Brand>
                <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
                <RBNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">상품 관리</Nav.Link>
                        <Nav.Link as={Link} to="/low-stock">재고 부족 알림</Nav.Link>
                    </Nav>
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    );
};

export default Navbar;