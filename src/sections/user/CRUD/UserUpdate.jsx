import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { updateUser } from './UserReducer';

function UserUpdate() {
  const { id } = useParams();
  const usersState = useSelector((state) => state.users);
  // eslint-disable-next-line eqeqeq
  const existingUser = usersState.users.find((f) => f._id === id);
  console.log(existingUser);
  const [uname, setName] = useState(existingUser.userName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        uname,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        alert('user has been updated successfully!');
      } else {
        alert(`${res.payload.response.data.globalMessage}`);
      }
    });
    navigate('/UserHome');
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Update User</h3>
        <form onSubmit={handleUpdate}>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={uname}
              onChange={(e) => setName(e.target.value)}
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

export default UserUpdate;
