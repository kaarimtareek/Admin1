import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { updateBrand } from './BrandReducer';

function BrandUpdate() {
  const { id } = useParams();

  console.log(`updating brand with id!!! ${id}`);
  const brandState = useSelector((state) => state.brands);

  const brand = brandState.brands.find((b) => b._id === id);
  const name = brand ? brand.name : '';

  console.log(name);

  const [uname, setName] = useState(name);
  const [uimg, setImg] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log(`updating brand with id ${id}`);

    dispatch(
      updateBrand({
        id,
        name: uname,
        img: uimg,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSuccessMessage('brand has been updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        const errors = res.payload.response.data.details;
        let errorMessage = '';
        errors.forEach((error) => {
          errorMessage += error.message;
        });
        alert(`${res.payload.response.data.globalMessage}\n${errorMessage}`);
      }
    });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Edit Brand</h3>
        {successMessage && <p style={{ color: '#66ff99' }}>{successMessage}</p>}
        <form onSubmit={handleUpdate}>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={uname}
              placeholder={uname}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="image">Image :</label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-info">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default BrandUpdate;
