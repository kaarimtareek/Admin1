/* eslint-disable react/button-has-type */
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getBlogs, deleteBlog } from './BlogReducer';

function BlogHome() {
  const blogsState = useSelector((state) => state.blogs);

  console.log(`blog state`);
  console.log(blogsState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogsState.status === 'idle') {
      dispatch(getBlogs());
    }
  }, [blogsState.status, dispatch]);

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

  let content;
  if (blogsState.loading) {
    // eslint-disable-next-line react/jsx-no-undef
    content = <Spinner text="loading" />;
  } else if (blogsState.status === 'rejected') {
    content = <h2> error in fetching data {blogsState.error}</h2>;
  } else {
    const { blogs } = blogsState;
    console.log(blogs);
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
          {blogs &&
            blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog._id}</td>
                <td>{blog.name}</td>
                <td>
                  {/* Display uploaded image or placeholder */}
                  {blog.image ? (
                    <img src={blog.image.secure_url} alt="Uploaded" style={{ maxWidth: '100px' }} />
                  ) : (
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
                    {/* <Link
                      to={`/BlogShowSubCategories/${blog._id}`}
                      className="btn btn-sm btn-primary mx-1"
                    >
                      Show SubCategories
                    </Link> */}
                    <Link
                      to={`/BlogCreateSubCategory/${blog._id}`}
                      className="btn btn-sm btn-primary mx-1"
                    >
                      Add SubCategory
                    </Link>
                    <Link to={`/BlogUpdate/${blog._id}`} className="btn btn-sm btn-primary">
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

  return (
    <div className="container">
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

      {content}
    </div>
  );
}

export default BlogHome;
