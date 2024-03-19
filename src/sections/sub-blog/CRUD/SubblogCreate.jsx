/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addSubBlog } from './SubblogReducer';

function SubblogCreate() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState(null); // State to store the selected image file
  const [imgPreview, setImgPreview] = useState(null); // State to store the base64 image preview
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if name and imgPreview are provided
    if (!name || !imgPreview) {
      alert('Please provide a name and select an image.');
      return;
    }

    const newSubBlog = {
      name,
      img,
    };

    dispatch(addSubBlog(newSubBlog)).then(() => {
      setSuccessMessage('a new category has been created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    });
  };

  const handleFileChange = (event) => {
    // Set the selected image file to the state
    const file = event.target.files[0];
    setImg(file);

    // Convert the file to base64 string for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Add New Sub-Category</h3>
        {successMessage && <p style={{ color: '#66ff99' }}>{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="img">Image:</label>
            <input
              type="file"
              id="img"
              name="img"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label htmlFor="catrgoryId">Category Id:</label>
            <input
              type="text"
              id="categoryId"
              name="categoryId"
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubblogCreate;
