/* eslint-disable react/button-has-type */
import axios from 'axios';
import { reject } from 'lodash';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Iconify from 'src/components/iconify/iconify';

import { getOrders, rejectOrder } from './OrderReducer';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

// const rejectOrder = async (id) => {
//   // eslint-disable-next-line no-debugger
//

//   const token = localStorage.getItem('userToken');

//   const headers = {
//     'Content-Type': 'multipart/form-data',
//     Authorization: token,
//   };

//   const config = {
//     method: 'patch',
//     url: `${baseUrl}/order/${id}/rejected`,
//     headers,
//   };

//   console.log(config);

//   try {
//     const response = await axios(config);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// };

function OrderHome() {
  const ordersState = useSelector((state) => state.orders);

  console.log(`order state`);
  console.log(ordersState);

  const dispatch = useDispatch();

  function convertUtcToLocal(utcTimeString) {
    const utcDate = new Date(utcTimeString);
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    return localDate.toLocaleString(); // Adjust options as needed
  }

  useEffect(() => {
    if (ordersState.status === 'idle') {
      dispatch(getOrders());
    }
  }, [ordersState.status, dispatch]);

  const handleRejection = (id) => {
    dispatch(rejectOrder(id))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          alert('order has been rejected successfully');
        } else {
          alert(res.payload.response.data.globalMessage);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  let content;
  if (ordersState.loading) {
    // eslint-disable-next-line react/jsx-no-undef
    content = <Spinner text="loading" />;
  } else if (ordersState.status === 'rejected') {
    content = <h2> error in fetching data {ordersState.error}</h2>;
  } else {
    const { orders } = ordersState;
    console.log(orders);
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Id</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Payment Type</th>
            <th>Final Price</th>
            <th>Sub Price</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.paymentTypes}</td>
                <td>{order.finalPrice}</td>
                <td>{order.subPrice}</td>
                <td>{order.status}</td>
                <td>{convertUtcToLocal(order.createdAt)}</td>
                <td>{convertUtcToLocal(order.updatedAt)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link to={`/OrderUpdate/${order._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link> */}
                    
                    <button
                      onClick={() => handleRejection(order._id)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      Reject Order
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
      <h2>Order Page</h2>
      {content}
    </div>
  );
}

export default OrderHome;
