/* eslint-disable react/button-has-type */
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getsubBlogs, deleteSubblog } from './SubblogReducer';

function SubblogHome() {
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
  // eslint-disable-next-line no-unused-vars
  const [img, setImage] = useState(null);

  const handleDelete = (id) => {
    console.log('Deleting blog with ID:', id);
    dispatch(deleteSubblog({ id }));
    navigate('/SubblogHome');
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
            <th>Category Id</th>
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
                <td>{subblog.categoryId._id}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
                    <Link to={`/SubblogUpdate/${subblog._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(subblog._id)}
                      className="btn btn-sm btn-danger ms-2"
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
      <h2>Sub-Category Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/SubblogCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>

      {content}
    </div>
  );
}

export default SubblogHome;
