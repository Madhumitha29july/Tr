import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css';

const initialForm = {
  product_name: '',
  price: '',
  old_price: '',
  category_type: 'Vegetables',
  is_active: false,
  description: ''
};

const ProductForm = ({ fetchProducts, selected, clearSelected }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`http://localhost:5000/products/${form.id}`, form);
    } else {
      await axios.post('http://localhost:5000/products', form);
    }
    setForm(initialForm);
    fetchProducts();
    clearSelected();
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{form.id ? 'Update Product' : 'Add New Product'}</h2>
      <input
        className="product-input"
        name="product_name"
        placeholder="Product Name"
        value={form.product_name}
        onChange={handleChange}
        required
      />
      <input
        className="product-input"
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        className="product-input"
        type="number"
        name="old_price"
        placeholder="Old Price"
        value={form.old_price}
        onChange={handleChange}
      />
      <select
        name="category_type"
        className="product-select"
        value={form.category_type}
        onChange={handleChange}
      >
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits & Nuts">Fruits & Nuts</option>
        <option value="Dairy & creams">Dairy & creams</option>
        <option value="Packages Food">Packages Food</option>
        <option value="Staples">Staples</option>
      </select>
      <label className="checkbox-label">
        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active}
          onChange={handleChange}
        />
        Is Active
      </label>
      <textarea
        name="description"
        className="product-textarea"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit" className="submit-btn">
        {form.id ? 'Update' : 'Add'} Product
      </button>
    </form>
  );
};

export default ProductForm;
