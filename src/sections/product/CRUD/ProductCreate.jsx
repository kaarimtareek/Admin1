/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MultiSelect } from 'react-multi-select-component';

import { addProduct } from './ProductReducer';

function ProductCreate() {
  // eslint-disable-next-line eqeqeq, no-debugger

  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
    { label: 'Brown', value: 'brown' },
  ];

  const sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'X-Large', value: 'x-large' },
    { label: 'XX-Large', value: 'xx-large' },
    { label: 'XXX-Large', value: 'xxx-large' },
  ];

  const [uname, setName] = useState('');
  const [uprimImg, setPrimImg] = useState(null);
  const [uSubImages, setSubImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [uprice, setPrice] = useState('');
  const [ustock, setStock] = useState('');
  const [ucategoryId, setCategoryId] = useState('');
  const [ubrandId, setBrandId] = useState('');
  const [usubCategoryId, setSubCategoryId] = useState('');
  const [udiscount, setDiscount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();

  const productToCreate = {
    name: uname,
    mainImage: uprimImg,
    subImages: uSubImages,
    price: uprice,
    stock: ustock,
    brandId: ubrandId,
    categoryId: ucategoryId,
    subCategoryId: usubCategoryId,
    discount: udiscount,
    sizes: selectedSizes.map((item) => item.value),
    colors: selectedColors.map((item) => item.value),
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(addProduct(productToCreate)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSuccessMessage('category has been updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        const errors = res.payload.response.data.details;
        let errorMessage = '';
        errors.forEach((error) => {
          errorMessage += `${error.message}\n`;
        });
        alert(`${res.payload.response.data.globalMessage}\n${errorMessage}`);
      }
    });
  };

  const handleSubImageChange = (e) => {
    const { files } = e.target;
    setSubImages(Array.from(files));
    // You can handle these subImages however you need, perhaps uploading to a server or storing locally.
    console.log(uSubImages);
  };

  return (
    <Container style={{ marginTop: '200px' }}>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
          <h3>Create Product</h3>
          {successMessage && <p style={{ color: '#66ff99' }}>{successMessage}</p>}

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
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="primImg">Image :</label>
              <input
                type="file"
                id="primImg"
                name="primImg"
                className="form-control"
                onChange={(e) => setPrimImg(e.target.files[0])}
              />
            </div>

            <div>
              <label htmlFor="subImages">Sub-Images:</label>
              <input
                type="file"
                id="subImages"
                name="subImages"
                className="form-control"
                multiple // Allows multiple file selection
                onChange={handleSubImageChange} // Handles file selection
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="categoryId">Category ID:</label>
              <input
                type="text"
                id="categoryId"
                name="categoryId"
                className="form-control"
                value={ucategoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="subCategoryId">Sub-Category ID:</label>
              <input
                type="text"
                id="subCategoryId"
                name="subCategoryId"
                className="form-control"
                value={usubCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="brandId">Brand ID:</label>
              <input
                type="text"
                id="brandId"
                name="brandId"
                className="form-control"
                value={ubrandId}
                onChange={(e) => setBrandId(e.target.value)}
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
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="size">Sizes:</label>
              <MultiSelect
                options={sizeOptions}
                value={selectedSizes}
                onChange={setSelectedSizes}
                labelledBy="Select"
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="color">Colors:</label>
              <MultiSelect
                options={colorOptions}
                value={selectedColors}
                onChange={setSelectedColors}
                labelledBy="Select"
              />
            </div>

            <br />

            <button type="submit" className="btn btn-info">
              Update
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default ProductCreate;
