/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addSubBlog } from './SubblogReducer';

function SubblogCreate() {
  const [name, setName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [imgPreview, setImgPreview] = useState(null); // State to store the base64 image preview

  const subblogs = useSelector((state) => state.subblogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if name and imgPreview are provided
    if (!name || !imgPreview) {
      alert('Please provide a name and select an image.');
      return;
    }

    const newSubblog = {
      name,
      image: img,
    };

    console.log(img);

    dispatch(addSubBlog(newSubblog));

    setName('');
    setImg(null);
    setImgPreview(null);

    navigate('/SubblogHome');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file); // Add this line for debugging
    setImg(file);

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
