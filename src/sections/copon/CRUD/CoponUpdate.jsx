import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams , useNavigate } from 'react-router-dom';

import { coponList } from './Data';
import { updateCopon } from './CoponReducer';

function CoponUpdate() {
    const{id} = useParams();
    // eslint-disable-next-line eqeqeq
    const existingCopon = coponList.filter(f => f.id == id);
    const{name,amount,img,expireDate} = existingCopon;
    const [uname, setName] = useState(name);
    const [uamount, setAmount] = useState(amount);
    const [uexpireDate, setExpireDate] = useState(expireDate);
    const [uimg, setImg] = useState(img);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        dispatch(updateCopon({
            id,
            name : uname,
            amount : uamount,
            img : uimg,
            expireDate : uexpireDate,
        }))
        navigate('/CoponHome')
    }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
    <div className='w-50 border bg-secondary text-white p-5'>
        <h3>Edit Copon</h3>
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
                            placeholder={coponList[id-1].name}                    
                            onChange={e => setName(e.target.value)} 
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
                            placeholder={coponList[id-1].amount}                    
                            onChange={e => setAmount(e.target.value)} 
                        />            
            </div>
    
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="copon">Expiration Date:</label>               
                        <input 
                            type="text" 
                            pattern="\d{4}/\d{2}/\d{2}"
                            title="Please use the format yyyy/mm/dd"
                            id="expireDate" 
                            name="expireDate" 
                            className="form-control" 
                            value={uexpireDate}
                            placeholder={coponList[id-1].expireDate}                    
                            onChange={e => setExpireDate(e.target.value)} 
                        />            
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="img">Image :</label>
                <input 
                    type="file"
                    id="img" 
                    name='img' 
                    className='form-control' 
                    placeholder={coponList[id-1].img} 
                    value ={uimg}
                    onChange={e=> setImg(e.target.value)}
                />
            </div>
            <br />
            <button type='submit' className='btn btn-info'>Update</button>
        </form>
    </div>
</div>
  )
}

export default CoponUpdate




// /* eslint-disable jsx-a11y/alt-text */
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams , useNavigate } from 'react-router-dom';

// import { updateBlog } from './BlogReducer';

// function BlogUpdate() {
//     const{id} = useParams();
//     const blogs = useSelector((state)=> state.blogs);
//     // eslint-disable-next-line eqeqeq
//     const existingBlog = blogs.filter(f => f.id == id);
//     const{name,img} = existingBlog;
//     const [uname, setName] = useState(name);
//     const [uimg, setImg] = useState(img);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleUpdate = (event) => {
//         event.preventDefault();
//         dispatch(updateBlog({
//             id,
//             name : uname,
//             img : uimg
//         }))
//         navigate('/BlogHome')
//     }

//   return (
//     <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
//     <div className='w-50 border bg-secondary text-white p-5'>
//         <h3>Update Category</h3>
//         <form onSubmit={handleUpdate}>
//             <div>  
//             {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//             <label htmlFor="name">Name:</label>               
//                         <input 
//                             type="text" 
//                             id="name" 
//                             name="name" 
//                             className="form-control" 
//                             value={uname}
//                             placeholder={blogs[id-1].name}                    
//                             onChange={e => setName(e.target.value)} 
//                         />            
//             </div>
//             <div>
//                 {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//                 <label htmlFor="email">Email:</label>
//                 <input 
//                     type="file"
//                     id="img" 
//                     name='img' 
//                     className='form-control' 
//                     placeholder={blogs[id-1].img} 
//                     value ={uimg}
//                     onChange={e=> setImg(e.target.value)}
//                 />
//             </div>
//             <br />
//             <button type='submit' className='btn btn-info'>Update</button>
//         </form>
//     </div>
// </div>
//   )
// }

// export default BlogUpdate