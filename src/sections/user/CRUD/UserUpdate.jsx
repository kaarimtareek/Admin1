import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams , useNavigate } from 'react-router-dom';

import { updateUser } from './UserReducer';

function UserUpdate() {
    const{id} = useParams();
    const users = useSelector((state)=> state.users);
    // eslint-disable-next-line eqeqeq
    const existingUser = users.filter(f => f.id == id);
    const{name,email,password,confirmPassword} = existingUser;
    const [uname, setName] = useState(name);
    const [uemail, setEmail] = useState(email);
    const [upassword, setPassword] = useState(password);
    const [uconfirmPassword, setConfirmPassword] = useState(confirmPassword);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        dispatch(updateUser({
            id,
            name : uname,
            email : uemail,
            password : upassword,
            confirmPassword : uconfirmPassword

        }))
        navigate('/UserHome')
    }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
    <div className='w-50 border bg-secondary text-white p-5'>
        <h3>Update User</h3>
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
                            placeholder={users[id-1].name}                    
                            onChange={e => setName(e.target.value)} 
                        />            
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="email">Email:</label>
                <input 
                    type="email"
                    id="email" 
                    name='email' 
                    className='form-control' 
                    placeholder={users[id-1].email} 
                    value ={uemail}
                    onChange={e=> setEmail(e.target.value)}
                />
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password">Password:</label>               
                <input 
                    type="password"
                    id="password" 
                    name='password' 
                    className='form-control' 
                    placeholder={users[id-1].password} 
                    value ={upassword}
                    onChange={e=> setPassword(e.target.value)}
                   />       
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password">Password:</label>               
                <input 
                    type="passowrd"
                    id="confirmPassword" 
                    name='confirmPassword' 
                    className='form-control' 
                    placeholder={users[id-1].confirmPassword} 
                    value ={uconfirmPassword}
                    onChange={e=> setConfirmPassword(e.target.value)}
                   />       
            </div>
            <br />
            <button type='submit' className='btn btn-info'>Update</button>
        </form>
    </div>
</div>
  )
}

export default UserUpdate