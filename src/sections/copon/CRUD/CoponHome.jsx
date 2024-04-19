/* eslint-disable react/button-has-type */
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { deleteCoupon, getCoupons } from './CoponReducer';

function CouponHome() {
  const couponState = useSelector((state) => state.coupons);

  console.log(`coupon state`);
  console.log(couponState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (couponState.status === 'idle') {
      dispatch(getCoupons());
    }
  }, [couponState.status, dispatch]);

  const handleDelete = (id) => {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log('Deleting blog with ID:', id);
    dispatch(deleteCoupon(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('coupon has been deleted successfully!');
      } else {
        toast.error('an error has occured');
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    navigate('/CoponHome');
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
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => handleDelete(coupon._id)}
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
