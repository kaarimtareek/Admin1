import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { updateCoupon } from './CoponReducer';

function CoponUpdate() {
  const { id } = useParams();
  // eslint-disable-next-line eqeqeq
  console.log(`updating coupon with id!!! ${id}`);
  const couponState = useSelector((state) => state.coupons);
  console.log(couponState);

  const coupon = couponState.coupons.find((b) => b._id === id);
  console.log(coupon);

  const { name, amount } = coupon;
  const [uname, setName] = useState(name);
  const [uamount, setAmount] = useState(amount);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateCoupon({
        id,
        name: uname,
        amount: uamount,
      })
    ).then(() => {
      setSuccessMessage('copon has been updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Hide the success message after 3 seconds
    });
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Edit Copon</h3>
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
              placeholder={coupon.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-control"
              value={uamount}
              placeholder={coupon.amount}
              onChange={(e) => setAmount(e.target.value)}
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

export default CoponUpdate;
