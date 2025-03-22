import React, { useState, useEffect } from 'react';
import ProductForm from './Components/ProductForm';
import ProductList from './Components/ProductList';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setSelected(product);
  };

  const clearSelected = () => {
    setSelected(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h2>Product CRUD App</h2>
      <ProductForm
        fetchProducts={fetchProducts}
        selected={selected}
        clearSelected={clearSelected}
      />
      <ProductList
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
