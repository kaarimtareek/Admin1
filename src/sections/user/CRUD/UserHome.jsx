/* eslint-disable react/button-has-type */
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getUsers, deleteUser } from './UserReducer';

function UserHome() {
  const usersState = useSelector((state) => state.users);

  console.log(`user state`);
  console.log(usersState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (usersState.status === 'idle') {
      dispatch(getUsers());
    }
  }, [usersState.status, dispatch]);

  const navigate = useNavigate();

  let content;
  if (usersState.loading) {
    // eslint-disable-next-line react/jsx-no-undef
    content = <Spinner text="loading" />;
  } else if (usersState.status === 'rejected') {
    content = <h2> error in fetching data {usersState.error}</h2>;
  } else {
    const { users } = usersState;
    console.log(users);
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td>
                  <Link to={`/UserUpdate/${user._id}`} className="btn btn-sm btn-primary">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="container">
      <h2>Users Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/UserCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>

      {content}
    </div>
  );
}

export default UserHome;
