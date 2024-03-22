/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from 'react-bootstrap';
import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { deleteBrand, getBrands } from './BrandReducer';

function BrandHome() {
  const brandState = useSelector((state) => state.brands);
  console.log(`brand state`);
  console.log(brandState);

  const dispatch = useDispatch();
  useEffect(() => {
    if (brandState.status === 'idle') {
      dispatch(getBrands());
    }
  }, [brandState.status, dispatch]);

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [img, setImage] = useState(null);
  const handleDelete = (id) => {
    dispatch(deleteBrand({ id }));
    navigate('/BrandHome');
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  let content;

  if (brandState.loading) {
    content = <Spinner text="loading" />;
  } else if (brandState.status === 'rejected') {
    content = <h2> error in fetching data {brandState.error}</h2>;
  } else {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {brandState.brands &&
            brandState.brands.map((brand) => (
              <tr key={brand._id}>
                <td>{brand._id}</td>
                <td>{brand.name}</td>
                <td>
                  {/* Display uploaded image or placeholder */}
                  {brand.image ? (
                    <img
                      src={brand.image.secure_url}
                      alt="brand logo"
                      style={{ maxWidth: '100px' }}
                    />
                  ) : (
                    // <img src={brand.img} alt="Uploaded" style={{ maxWidth: '100px' }} />
                    <div>No Image</div>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
                    <Link to={`/BrandUpdate/${brand._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
  console.log(brandState.brands);
  return (
    <div className="container">
      <h2>Brands</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/BrandCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {/* Display the wide screen screenshot using brands.img */}
      {/* {brands && brands.length > 0 && (
        <img src={brands[0].img} alt="Wide Screen Screenshot" style={{ width: '100%' }} />
      )} */}
      {content}
    </div>
  );
}

export default BrandHome;
