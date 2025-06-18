import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductDetail from './pages/ProductDetail';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import LowStockAlert from './pages/LowStockAlert.jsx';
import './App.css';
import { useState } from 'react';
import { Container  } from 'react-bootstrap';

const HomePage = ({ refreshList, handleProductAdded}) => (
  <Container>
    <ProductForm onProductAdded={handleProductAdded} />
    <hr className="my-5" />
    <ProductList key={refreshList} />
  </Container>
);

function App() {

  const [refreshList, setRefreshList] = useState(0);

  const handleProductAdded = () => {
    setRefreshList(prev => prev + 1);
  };

  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("VITE_TEST_URL:", import.meta.env.VITE_TEST_URL);

  return (
      <div className="App">
        <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={<HomePage refreshList={refreshList} handleProductAdded={handleProductAdded} />}
              />
              <Route path="/low-stock" element={<LowStockAlert />} />
              {/* { ProductDetail ()} */}
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </main>
      </div>
  );
}

export default App;