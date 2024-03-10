/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { productList } from './Data';
import { deleteProduct } from './ProductReducer';

function ProductHome() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [primImg, setPrimImage] = useState(null);

  const handleDelete = (id) => {
    console.log('Deleting Product with ID:', id);
    dispatch(deleteProduct({ id }));
    navigate('/ProductHome');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPrimImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='container'>
      <h2>Products</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/ProductCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {/* Display the wide screen screenshot using blogs.img */}
      {products.products && products.products.length > 0 && (
        <img src={products[0].primImg} alt="Wide Screen Screenshot" style={{ width: '100%' }} />
      )}
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>SubCategory</th>
            {/* <th style={{ fontSize: 'smaller' }}>Discount</th> */}
            <th>Size</th>
            <th>Color</th>
            {/* <th style={{ fontSize: 'smaller' }}>Final Price</th> */}
            {/* <th style={{ fontSize: 'smaller' }}>Description</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {productList && productList.map((product) => (
    <tr key={product.id}>
    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>
      {/* Display uploaded image or placeholder */}
      {product.primImg ? (
        <img src={product.primImg} alt="Uploaded" style={{ maxWidth: '100px' }} />
      ) : (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
    </td>
    <td>{product.price}</td>
    <td>{product.stock}</td>
    <td>{product.categoryId}</td>
    <td>{product.subCategoryId}</td>
    {/* <td>{product.discount}</td> */}
    <td>{product.size}</td>
    <td>{product.color}</td>
    {/* <td>{product.finalPrice}</td> */}
    {/* <td>{product.description}</td> */}
    <td>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
        <Link to={`/ProductUpdate/${product.id}`} className='btn btn-sm btn-primary'>Edit</Link>

        <button 
        onClick={()=>handleDelete(product.id)} 
        className='btn btn-sm btn-danger ms-2'
        >Delete
        </button>
    </div>

    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default ProductHome;
