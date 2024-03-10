/* eslint-disable react/button-has-type */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { deleteUser } from './UserReducer'; // Correct import statement

function UserHome() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const users = useSelector((state) => state.users);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch =useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const handleDelete = (id) => {
        dispatch(deleteUser({id}));
        // Change Link here routes************
        navigate('/UserHome');
  };

  return (
    <div className='container'>
      <h2>Users</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/UserCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Confirm Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.confirmPassword}</td>
              <td>
                <div style={{ display: 'inline-block', marginRight: '5px' }}>
                <Link to={`/UserUpdate/${user.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                </div>
                <div style={{ display: 'inline-block' }}>
                {/* <Link 
                  to={`/delete/${user.id}`} 
                  className='btn btn-sm btn-danger'
                  onClick={(e) => {
                   // Prevent the default behavior of the link (navigation)
                  e.preventDefault();
                  // Perform the delete action
                  handleDelete(user.id);
                  // Navigate to the delete route programmatically
                  window.location.href = `/delete/${user.id}`;
                  } }
                  >
                  Delete
                </Link> */}
                <button onClick={()=>handleDelete(user.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserHome;
