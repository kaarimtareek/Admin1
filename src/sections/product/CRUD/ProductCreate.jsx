/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addProduct } from './ProductReducer';

function ProductCreate() {
    const [name, setName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [primImg, setPrimImg] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [subImg1, setSubImg1] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [subImg2, setSubImg2] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [subImg3, setSubImg3] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [subImg4, setSubImg4] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [subImg5, setSubImg5] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [subImg6, setSubImg6] = useState(null);


    // State to store the selected image file
    const [imgPreview, setImgPreview] = useState(null); // State to store the base64 image preview
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [discount, setDiscount] = useState(0);
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [finalPrice, setFinalPrice] = useState(0);
    const [description, setDescription] = useState('');


    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if name and imgPreview are provided
        if (!name || !imgPreview) {
            alert('Please provide a name and select an image.');
            return;
        }

        const newProduct = {
            id: products && products.length > 0 ? products[products.length - 1].id + 1 : 1,
            name,
            primImg: imgPreview,
            subImg1: imgPreview,
            subImg2: imgPreview,
            subImg3: imgPreview,
            subImg4: imgPreview,
            subImg5: imgPreview,
            subImg6: imgPreview,

            price,
            stock,
            categoryId,
            subCategoryId,
            discount,
            size,
            color,
            finalPrice,
            description,
            
        };

        dispatch(addProduct(newProduct));

        // Reset the form fields
        setName('');
        setPrimImg(null);

        setSubImg1(null);
        setSubImg2(null);
        setSubImg3(null);
        setSubImg4(null);
        setSubImg5(null);
        setSubImg6(null);

        setImgPreview(null);
        setPrice(0);
        setStock(0);
        setCategoryId('');
        setSubCategoryId('');
        setDiscount(0);
        setSize('');
        setColor('');
        setFinalPrice(0);
        setDescription('');

        navigate('/ProductHome');
    }

    const handleFileChange = (event) => {
        // Set the selected image file to the state
        const file = event.target.files[0];
        setPrimImg(file);

        // Convert the file to base64 string for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
        const handleFileChangeSubImg2 = (event) => {
        // Set the selected image file to the state
        const file = event.target.files[0];
        setSubImg2(file);

        // Convert the file to base64 string for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const handleFileChangeSubImg3 = (event) => {
        // Set the selected image file to the state
        const file = event.target.files[0];
        setSubImg3(file);

        // Convert the file to base64 string for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const handleFileChangeSubImg4 = (event) => {
        // Set the selected image file to the state
        const file = event.target.files[0];
        setSubImg5(file);

        // Convert the file to base64 string for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const handleFileChangeSubImg5 = (event) => {
        // Set the selected image file to the state
        const file = event.target.files[0];
        setSubImg5(file);

        // Convert the file to base64 string for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const handleFileChangeSubImg6 = (event) => {
        // Set the selected image file to the state
        const file = event.target.files[0];
        setSubImg6(file);

        // Convert the file to base64 string for preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <Container style={{ marginTop: "200px" }}>
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <h3>Add Product</h3>
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
                        <label htmlFor="primImg">Primary Image:</label>
                        <input 
                            type="file"
                            id="primImg" 
                            name='primImg' 
                            className='form-control'
                            onChange={handleFileChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="subImg1">Sub-Image 1:</label>
                        <input 
                            type="file"
                            id="subImg1" 
                            name='subImg1' 
                            className='form-control'
                            onChange={(event) => {
                                // Set the selected image file to the state
                                const file = event.target.files[0];
                                setSubImg1(file);

                                // Convert the file to base64 string for preview
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImgPreview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }} 
                        />
                    </div>

                    <div>
                        <label htmlFor="subImg2">Sub-Image 2:</label>
                        <input 
                            type="file"
                            id="subImg2" 
                            name='subImg2' 
                            className='form-control'
                            onChange={handleFileChangeSubImg2} 
                        />
                    </div>

                    <div>
                        <label htmlFor="subImg3">Sub-Image 3:</label>
                        <input 
                            type="file"
                            id="subImg3" 
                            name='subImg3' 
                            className='form-control'
                            onChange={handleFileChangeSubImg3} 
                        />
                    </div>
                    <div>
                        <label htmlFor="subImg1">Sub-Image 4:</label>
                        <input 
                            type="file"
                            id="subImg4" 
                            name='subImg4' 
                            className='form-control'
                            onChange={handleFileChangeSubImg4} 
                        />
                    </div>
                    <div>
                        <label htmlFor="subImg5">Sub-Image 5:</label>
                        <input 
                            type="file"
                            id="subImg5" 
                            name='subImg5' 
                            className='form-control'
                            onChange={handleFileChangeSubImg5} 
                        />
                    </div>
                    <div>
                        <label htmlFor="subImg1">Sub-Image 6:</label>
                        <input 
                            type="file"
                            id="subImg6" 
                            name='subImg6' 
                            className='form-control'
                            onChange={handleFileChangeSubImg6} 
                        />
                    </div>

                    <div>  
                        <label htmlFor="price">Price:</label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            className="form-control" 
                            value={price} 
                            onChange={e => setPrice(e.target.value)} 
                        />       
                    </div>
                    <div>  
                        <label htmlFor="stock">Stock:</label>
                        <input 
                            type="number" 
                            id="stock" 
                            name="stock" 
                            className="form-control" 
                            value={stock} 
                            onChange={e => setStock(e.target.value)} 
                        />       
                    </div>
                    
                    <div>
                        <label htmlFor="categoryId">Category Id:</label>
                        <input 
                            type="text"
                            id="categoryId" 
                            name='categoryId' 
                            className='form-control'
                            value={categoryId} 
                            onChange={e => setCategoryId(e.target.value)}                         />
                    </div>     
                    <div>  
                        <label htmlFor="subCategoryId">Sub-Category ID:</label>
                        <input 
                            type="text" 
                            id="subCategoryId" 
                            name="subCategoryId" 
                            className="form-control" 
                            value={subCategoryId} 
                            onChange={e => setSubCategoryId(e.target.value)} 
                        />       
                    </div>  
                    <div>  
                        <label htmlFor="discount">Discount :</label>
                        <input 
                            type="number" 
                            id="discount" 
                            name="discount" 
                            className="form-control" 
                            value={discount} 
                            onChange={e => setDiscount(e.target.value)} 
                        />       
                    </div> 
                    <div>  
                        <label htmlFor="size">Size :</label>
                        <input 
                            type="text" 
                            id="size" 
                            name="size" 
                            className="form-control" 
                            value={size} 
                            onChange={e => setSize(e.target.value)} 
                        />       
                    </div> 
                    <div>  
                        <label htmlFor="color">Color:</label>
                        <input 
                            type="text" 
                            id="color" 
                            name="color" 
                            className="form-control" 
                            value={color} 
                            onChange={e => setColor(e.target.value)} 
                        />       
                    </div> 
                    <div>  
                        <label htmlFor="finalPrice">Final Price:</label>
                        <input 
                            type="number" 
                            id="finalPrice" 
                            name="finalPrice" 
                            className="form-control" 
                            value={finalPrice} 
                            onChange={e => setFinalPrice(e.target.value)} 
                        />       
                    </div> 
                    <div>  
                        <label htmlFor="description">Description:</label>
                        <input 
                            type="text" 
                            id="description" 
                            name="description" 
                            className="form-control" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                        />       
                    </div>                                                               
                    <br />
                    <button type='submit' className='btn btn-info'>Submit</button>
                </form>
            </div>
        </div>
        </Container>
    );
}

export default ProductCreate;
