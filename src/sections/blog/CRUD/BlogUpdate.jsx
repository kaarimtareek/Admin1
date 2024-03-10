import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams , useNavigate } from 'react-router-dom';

import { blogList } from './Data';
import { updateBlog } from './BlogReducer';

function BlogUpdate() {
    const{id} = useParams();
    // eslint-disable-next-line eqeqeq
    const existingBlog = blogList.filter(f => f.id == id);
    const{name, img } = existingBlog;
    const [uname, setName] = useState(name);
    const [uimg, setImg] = useState(img);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        dispatch(updateBlog({
            id,
            name : uname,
            img : uimg,
        }))
        navigate('/BlogHome')
    }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
    <div className='w-50 border bg-secondary text-white p-5'>
        <h3>Edit Category</h3>
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
                            placeholder={blogList[id-1].name}                    
                            onChange={e => setName(e.target.value)} 
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
                    placeholder={blogList[id-1].img} 
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

export default BlogUpdate




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