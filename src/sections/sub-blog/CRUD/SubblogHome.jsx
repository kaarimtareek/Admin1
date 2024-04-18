/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { deleteSubBlog, getsubBlogs } from './SubblogReducer';

function SubblogHome() {
  // eslint-disable-next-line no-debugger

  const subBlogsState = useSelector((state) => state.subBlogs);

  console.log(`sub-blog state`);
  console.log(subBlogsState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (subBlogsState.status === 'idle') {
      dispatch(getsubBlogs());
    }
  }, [subBlogsState.status, dispatch]);

  const navigate = useNavigate();

  const handleDelete = (parentId, id) => {
    // if (parentId === undefined) {
    //   alert('you cannot delete this subcategory');
    //   return;
    // }
    console.log('Deleting blog with ID:', id);
    dispatch(deleteSubBlog({ parentId, id })).then((res) => {
      // eslint-disable-next-line no-debugger
      debugger;
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('subcategory has been deleted successfully!');
      } else {
        toast.error('an error has occured');
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    navigate('/SubBlogHome');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  let content;
  if (subBlogsState.loading) {
    // eslint-disable-next-line react/jsx-no-undef
    content = <Spinner text="loading" />;
  } else if (subBlogsState.status === 'rejected') {
    content = <h2> error in fetching data {subBlogsState.error}</h2>;
  } else {
    const { subBlogs } = subBlogsState;
    console.log(subBlogs);
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Parent Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subBlogs &&
            subBlogs.map((subblog) => (
              <tr key={subblog._id}>
                <td>{subblog._id}</td>
                <td>{subblog.name}</td>
                <td>
                  {/* Display uploaded image or placeholder */}
                  {subblog.image ? (
                    <img
                      src={subblog.image.secure_url}
                      alt="Uploaded"
                      style={{ maxWidth: '100px' }}
                    />
                  ) : (
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  )}
                </td>
                <td>{subblog?.categoryId?.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
                    <Link to={`/SubblogUpdate/${subblog._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => handleDelete(subblog?.categoryId?._id, subblog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        <Toaster />
      </table>
    );
  }

  return (
    <div className="container">
      <h2>Sub-Category Page</h2>
      {content}
    </div>
  );
}

export default SubblogHome;
