/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addUser } from 'src/sections/user/CRUD/UserReducer';

function UserCreate() {
    // eslint-disable-next-line no-unused-vars
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passowrd, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassword] = useState('');
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addUser({ id: users[users.length-1].id + 1 , name, email ,passowrd ,confirmPassowrd }));
        // this is the Path mahmoud that you will need to return  after Create Function
        navigate('/userHome')
    }
 
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <h3>Add New User</h3>
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
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email"
                            id="email" 
                            name='email' 
                            className='form-control'
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            id="password" 
                            name='email' 
                            className='form-control'
                            value={passowrd} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input 
                            type="password"
                            id="confirmPassword" 
                            name='Confirm Password' 
                            className='form-control' 
                            value={confirmPassowrd}
                            onChange={e => setConfirmPassword(e.target.value)} 
                        />
                    </div>                                                
                    <br />
                    <button type='submit' className='btn btn-info'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UserCreate;
