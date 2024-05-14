import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductListPage from "./pages/ProductListPage"
import AddProductPage from "./pages/AddProductPage"

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<ProductListPage />} />
      <Route exact path='/add-product' element={<AddProductPage />} />
    </Routes>
  );
}

export default App;
