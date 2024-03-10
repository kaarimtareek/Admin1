/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { blogList } from './Data';
import { deleteBlog } from './BlogReducer';

function BlogHome() {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [img, setImage] = useState(null);

  const handleDelete = (id) => {
    console.log('Deleting blog with ID:', id);
    dispatch(deleteBlog({ id }));
    navigate('/BlogHome');
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

  return (
    <div className='container'>
      <h2>Category Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/BlogCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {/* Display the wide screen screenshot using blogs.img */}
      {blogs && blogs.length > 0 && (
        <img src={blogs[0].img} alt="Wide Screen Screenshot" style={{ width: '100%' }} />
      )}
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {blogList && blogList.map((blog) => (
    <tr key={blog.id}>
    <td>{blog.id}</td>
    <td>{blog.name}</td>
    <td>
      {/* Display uploaded image or placeholder */}
      {blog.img ? (
        <img src={blog.img} alt="Uploaded" style={{ maxWidth: '100px' }} />
      ) : (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
    </td>
    <td>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
        <Link to={`/BlogUpdate/${blog.id}`} className='btn btn-sm btn-primary'>Edit</Link>

        <button 
        onClick={()=>handleDelete(blog.id)} 
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

export default BlogHome;
