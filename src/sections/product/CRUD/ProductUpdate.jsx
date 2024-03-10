import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams , useNavigate } from 'react-router-dom';

import { productList } from './Data';
import { updateProduct } from './ProductReducer';

function ProductUpdate() {
    const{id} = useParams();
    // eslint-disable-next-line eqeqeq
    const existingProduct = productList.filter(f => f.id == id);
    const{name, primImg,subImg1,subImg2,subImg3,subImg4,subImg5,subImg6,price,stock,categoryId,subCategoryId,discount,size,color,finalPrice,description} = existingProduct;
    const [uname, setName] = useState(name);
    const [uprimImg, setPrimImg] = useState(primImg);
    const [usubImg1, setSubImg1] = useState(subImg1);
    const [usubImg2, setSubImg2] = useState(subImg2);
    const [usubImg3, setSubImg3] = useState(subImg3);
    const [usubImg4, setSubImg4] = useState(subImg4);
    const [usubImg5, setSubImg5] = useState(subImg5);
    const [usubImg6, setSubImg6] = useState(subImg6);


    const [uprice, setPrice] = useState(price);
    const [ustock, setStock] = useState(stock);
    const [ucategoryId, setCategoryId] = useState(categoryId);
    const [usubCategoryId, setSubCategoryId] = useState(subCategoryId);
    const [udiscount, setDiscount] = useState(discount);
    const [usize, setSize] = useState(size);
    const [ucolor, setColor] = useState(color);
    const [ufinalPrice, setFinalPrice] = useState(finalPrice);
    const [udescription, setDescription] = useState(description);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        dispatch(updateProduct({
            id,
            name : uname,
            primImg : uprimImg,
            subImg1 : usubImg1,
            subImg2 : usubImg2,
            subImg3 : usubImg3,
            subImg4 : usubImg4,
            subImg5 : usubImg5,
            subImg6 : usubImg6,

            price : uprice,
            stock : ustock,
            categoryId : ucategoryId,
            subCategoryId : usubCategoryId,
            discount : udiscount,
            size : usize,
            color : ucolor,
            finalPrice : ufinalPrice,
            description: udescription,
        }))
        navigate('/ProductHome')
    }

  return (
    <Container style={{ marginTop: "200px" }}>
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
    <div className='w-50 border bg-secondary text-white p-5'>
        <h3>Edit Product</h3>
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
                            placeholder={productList[id-1].name}                    
                            onChange={e => setName(e.target.value)} 
                        />            
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="primImg">Image :</label>
                <input 
                    type="file"
                    id="primImg" 
                    name='primImg' 
                    className='form-control' 
                    placeholder={productList[id-1].primImg} 
                    value ={uprimImg}
                    onChange={e=> setPrimImg(e.target.value)}
                />
            </div>

            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="subImg1">Sub-Image 1:</label>
                <input 
                    type="file"
                    id="subImg1" 
                    name='subImg1' 
                    className='form-control' 
                    placeholder={productList[id-1].subImg1} 
                    value ={usubImg1}
                    onChange={e=> setSubImg1(e.target.value)}
                />
            </div>

            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="subImg2">Sub-Image 2:</label>
                <input 
                    type="file"
                    id="subImg2" 
                    name='subImg2' 
                    className='form-control' 
                    placeholder={productList[id-1].subImg2} 
                    value ={usubImg2}
                    onChange={e=> setSubImg2(e.target.value)}
                />
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="subImg3">Sub-Image 3:</label>
                <input 
                    type="file"
                    id="subImg3" 
                    name='subImg3' 
                    className='form-control' 
                    placeholder={productList[id-1].subImg3} 
                    value ={usubImg3}
                    onChange={e=> setSubImg3(e.target.value)}
                />
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="subImg4">Sub-Image 4:</label>
                <input 
                    type="file"
                    id="subImg4" 
                    name='subImg4' 
                    className='form-control' 
                    placeholder={productList[id-1].subImg4} 
                    value ={usubImg4}
                    onChange={e=> setSubImg4(e.target.value)}
                />
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="subImg5">Sub-Image 5:</label>
                <input 
                    type="file"
                    id="subImg5" 
                    name='subImg5' 
                    className='form-control' 
                    placeholder={productList[id-1].subImg5} 
                    value ={usubImg5}
                    onChange={e=> setSubImg5(e.target.value)}
                />
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="subImg6">Sub-Image 6:</label>
                <input 
                    type="file"
                    id="subImg6" 
                    name='subImg6' 
                    className='form-control' 
                    placeholder={productList[id-1].subImg6} 
                    value ={usubImg6}
                    onChange={e=> setSubImg6(e.target.value)}
                />
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="price">Price :</label>               
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            className="form-control" 
                            value={uprice}
                            placeholder={productList[id-1].price}                    
                            onChange={e => setPrice(e.target.value)} 
                        />            
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="stock">Stock :</label>               
                        <input 
                            type="number" 
                            id="stock" 
                            name="stock" 
                            className="form-control" 
                            value={ustock}
                            placeholder={productList[id-1].stock}                    
                            onChange={e => setStock(e.target.value)} 
                        />            
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="categoryId">Category ID:</label>               
                        <input 
                            type="text" 
                            id="categoryId" 
                            name="categoryId" 
                            className="form-control" 
                            value={ucategoryId}
                            placeholder={productList[id-1].categoryId}                    
                            onChange={e => setCategoryId(e.target.value)} 
                        />            
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="subCategoryId">Sub-Category ID:</label>               
                        <input 
                            type="text" 
                            id="subCategoryId" 
                            name="subCategoryId" 
                            className="form-control" 
                            value={usubCategoryId}
                            placeholder={productList[id-1].subCategoryId}                    
                            onChange={e => setSubCategoryId(e.target.value)} 
                        />            
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="discount">Discount:</label>               
                        <input 
                            type="number" 
                            id="discount" 
                            name="discount" 
                            className="form-control" 
                            value={udiscount}
                            placeholder={productList[id-1].discount}                    
                            onChange={e => setDiscount(e.target.value)} 
                        />            
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="size">Size:</label>               
                        <input 
                            type="text" 
                            id="size" 
                            name="size" 
                            className="form-control" 
                            value={usize}
                            placeholder={productList[id-1].size}                    
                            onChange={e => setSize(e.target.value)} 
                        />            
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="color">Color:</label>               
                        <input 
                            type="text" 
                            id="color" 
                            name="color" 
                            className="form-control" 
                            value={ucolor}
                            placeholder={productList[id-1].color}                    
                            onChange={e => setColor(e.target.value)} 
                        />            
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="finalPrice">Final-Price:</label>               
                        <input 
                            type="number" 
                            id="finalPrice" 
                            name="finalPrice" 
                            className="form-control" 
                            value={ufinalPrice}
                            placeholder={productList[id-1].finalPrice}                    
                            onChange={e => setFinalPrice(e.target.value)} 
                        />            
            </div>
            <div>  
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="description">Description:</label>               
                        <input 
                            type="text" 
                            id="description" 
                            name="description" 
                            className="form-control" 
                            value={udescription}
                            placeholder={productList[id-1].description}                    
                            onChange={e => setDescription(e.target.value)} 
                        />            
            </div>

            <br />
            <button type='submit' className='btn btn-info'>Update</button>
        </form>
    </div>
</div>
</Container>
  )
}

export default ProductUpdate




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