/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { DatePicker } from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { coponList } from './Data';
import { deleteCopon } from './CoponReducer';

function CoponHome() {
  const copons = useSelector((state) => state.copons);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [img, setImage] = useState(null);

  const handleDelete = (id) => {
    console.log('Deleting Coupon with ID:', id);
    dispatch(deleteCopon({ id }));
    navigate('/CoponHome');
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

  return (
    <div className='container'>
      <h2>Coupons</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/CoponCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {/* Display the wide screen screenshot using blogs.img */}
      {copons && copons.length > 0 && (
        <img src={copons[0].img} alt="Wide Screen Screenshot" style={{ width: '100%' }} />
      )}
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Expire Date</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
        {coponList && coponList.map((copon) => (
    <tr key={copon.id}>
    <td>{copon.id}</td>
    <td>{copon.name}</td>
    <td>{copon.amount}</td>
    <td>{copon.expireDate}</td>
    <td>
      {/* Display uploaded image or placeholder */}
      {copon.img ? (
        <img src={copon.img} alt="Uploaded" style={{ maxWidth: '100px' }} />
      ) : (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
    </td>

    <td>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
        <Link to={`/CoponUpdate/${copon.id}`} className='btn btn-sm btn-primary'>Edit</Link>

        <button 
        onClick={()=>handleDelete(copon.id)} 
        className='btn btn-sm btn-danger ms-2'
        >Delete
        </button>
    </div>

    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default CoponHome;
