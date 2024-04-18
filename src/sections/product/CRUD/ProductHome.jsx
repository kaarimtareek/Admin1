/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { deleteProduct, getProducts } from './ProductReducer';

function ProductHome() {
  const productsState = useSelector((state) => state.products);
  console.log(productsState);
  const dispatch = useDispatch();
  const [primImg, setPrimImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (productsState.status === 'idle') {
      dispatch(getProducts());
    }
  }, [productsState.status, dispatch]);

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

  const handleDelete = (id) => {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log('Deleting blog with ID:', id);
    dispatch(deleteProduct(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('product has been deleted successfully!');
      } else {
        toast.error('an error has occured');
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    navigate('/ProductHome');
  };

  let content;
  if (productsState.loading) {
    // eslint-disable-next-line react/jsx-no-undef
    content = <Spinner text="loading" />;
  } else if (productsState.status === 'rejected') {
    content = <h2> error in fetching data {productsState.error}</h2>;
  } else {
    const { products } = productsState;
    console.log(products);
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Brand</th>
            {/* <th>Discount</th>
            <th>Sizes</th>
            <th>Colors</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                  {/* Display uploaded image or placeholder */}
                  {product.mainImage ? (
                    <img
                      src={product.mainImage.secure_url}
                      alt="Uploaded"
                      style={{ maxWidth: '100px' }}
                    />
                  ) : (
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  )}
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.categoryId?.name}</td>
                <td>{product.subCategoryId?.name}</td>
                <td>{product.brandId?.name}</td>
                {/* <td>{product.discount}</td>
                <td>{product.size.join(', ')}</td>
                <td>{product.colors.join(', ')}</td> */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
                    <Link to={`/ProductUpdate/${product._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="container">
      <h2>Products Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/ProductCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {content}
      <Toaster />
    </div>
  );
}

export default ProductHome;
