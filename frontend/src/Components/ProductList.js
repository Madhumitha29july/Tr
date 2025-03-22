import React from 'react';
import './ProductList.css';

const ProductList = ({ products, handleDelete, handleEdit }) => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Old Price</th>
              <th>Category</th>
              <th>Active</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.product_name}</td>
                <td>₹{prod.price}</td>
                <td>₹{prod.old_price}</td>
                <td>{prod.category_type}</td>
                <td>{prod.is_active ? '✅' : '❌'}</td>
                <td>{prod.description}</td>
                <td>
                  <button onClick={() => handleEdit(prod)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(prod.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
