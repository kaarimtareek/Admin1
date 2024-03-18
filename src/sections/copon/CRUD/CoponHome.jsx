/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getCoupons, deleteCoupon } from './CoponReducer';

function CouponHome() {
  const couponState = useSelector((state) => state.coupons);

  console.log(`coupon state`);
  console.log(couponState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (couponState.status === 'idle') {
      dispatch(getCoupons());
    }
  }, [couponState.status, dispatch]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    console.log('Deleting coupon with ID:', id);
    dispatch(deleteCoupon({ id }));
    navigate('/CouponHome');
  };

  function convertUtcToLocal(utcTimeString) {
    const utcDate = new Date(utcTimeString);
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    return localDate.toLocaleString(); // Adjust options as needed
  }

  let content;
  if (couponState.loading) {
    // eslint-disable-next-line react/jsx-no-undef
    content = <Spinner text="loading" />;
  } else if (couponState.status === 'rejected') {
    content = <h2> error in fetching data {couponState.error}</h2>;
  } else {
    const { coupons } = couponState;
    console.log(coupons);
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Expire In</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons &&
            coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon._id}</td>
                <td>{coupon.name}</td>
                <td>{coupon.amount}</td>
                <td>{convertUtcToLocal(coupon.expireIn)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link to={`/CouponUpdate/${couponList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
                    <Link to={`/CoponUpdate/${coupon._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(coupon._id)}
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
      <h2>Coupons Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/CoponCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>

      {content}
    </div>
  );
}

export default CouponHome;
