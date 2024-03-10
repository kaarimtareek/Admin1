/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { DatePicker } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addCopon } from './CoponReducer';// Importing addBlog action creator from the reducer file

function CoponCreate() {
    const [name, setName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [amount, setAmount] = useState(0);
    const [expireDate, setExpireDate] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [img, setImg] = useState(null);
    // State to store the selected image file
    const [imgPreview, setImgPreview] = useState(null); // State to store the base64 image preview

    const copons = useSelector((state) => state.copons);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if name and imgPreview are provided
        if (!name || !imgPreview) {
            alert('Please provide a name and select an image.');
            return;
        }

        const newCopon = {
            id: copons && copons.length > 0 ? copons[copons.length - 1].id + 1 : 1,
            name,
            amount,
            expireDate,
            img: imgPreview,

        };

        dispatch(addCopon(newCopon));

        // Reset the form fields
        setName('');
        setImg(null);
        setImgPreview(null);
        // if there is error check here
        setAmount(0);
        navigate('/CoponHome');
    }

    const handleFileChange = (event) => {
        // Set the selected image file to the state
        const file = event.target.files[0];
        setImg(file);

        // Convert the file to base64 string for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <h3>Add New Coupon</h3>
                <form onSubmit={handleSubmit}>
                    <div>  
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="form-control" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />       
                    </div> 

                    <div>
                        <label htmlFor="amount">Amount :</label>
                        <input 
                            type="number"
                            id="amount" 
                            name='amount' 
                            className='form-control'
                            value={amount} 
                            onChange={e => setAmount(e.target.value)}                         />
                    </div> 

                    <div>
                    <label htmlFor="expireDate">Expiration Date:</label>
                        <input 
                            type="text"
                            pattern="\d{4}/\d{2}/\d{2}"
                            title="Please use the format yyyy/mm/dd"
                            id="expireDate" 
                            name="expireDate" 
                            className="form-control"
                            value={expireDate} 
                            onChange={e => setExpireDate(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="img">Image:</label>
                        <input 
                            type="file"
                            id="img" 
                            name='img' 
                            className='form-control'
                            onChange={handleFileChange} 
                        />
                    </div>
                                                                
                    <br />
                    <button type='submit' className='btn btn-info'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CoponCreate;
