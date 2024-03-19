import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

import { productList } from './Data';
import { updateProduct } from './ProductReducer';

function ProductUpdate() {
  const { id } = useParams();
  // eslint-disable-next-line eqeqeq, no-debugger
  const productsState = useSelector((state) => state.products);
  console.log(productsState);

  const product = productsState.products.find((b) => b._id === id);
  console.log(product);

  const availableColors = ['red', 'green', 'blue', 'white', 'black', 'brown'];
  const availableSizes = ['S', 'M', 'X', 'XL', 'XXL', 'XXL'];

  const { name, price, stock, categoryId, subCategoryId, brandId, discount, size, colors } =
    product;

  const [uname, setName] = useState(name);
  const [uprimImg, setPrimImg] = useState(null);
  const [usubImg1, setSubImg1] = useState(null);
  const [usubImg2, setSubImg2] = useState(null);
  const [usubImg3, setSubImg3] = useState(null);
  const [usubImg4, setSubImg4] = useState(null);
  const [usubImg5, setSubImg5] = useState(null);
  const [usubImg6, setSubImg6] = useState(null);

  const [uprice, setPrice] = useState(price);
  const [ustock, setStock] = useState(stock);
  const [ucategoryId, setCategoryId] = useState(categoryId);
  const [ubrandId, setBrandId] = useState(brandId);
  const [usubCategoryId, setSubCategoryId] = useState(subCategoryId);
  const [udiscount, setDiscount] = useState(discount);
  const [usize, setSize] = useState(size.join(', '));
  const [ucolor, setColor] = useState(colors.join(', '));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct({
        id,
        name: uname,
        primImg: uprimImg,
        subImg1: usubImg1,
        subImg2: usubImg2,
        subImg3: usubImg3,
        subImg4: usubImg4,
        subImg5: usubImg5,
        subImg6: usubImg6,

        price: uprice,
        stock: ustock,
        categoryId: ucategoryId,
        subCategoryId: usubCategoryId,
        discount: udiscount,
        size: usize,
        color: ucolor,
      })
    );
  };

  return (
    <Container style={{ marginTop: '200px' }}>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
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
                value={uprimImg}
                onChange={(e) => setPrimImg(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="subImg1">Sub-Image 1:</label>
              <input
                type="file"
                id="subImg1"
                name="subImg1"
                className="form-control"
                value={usubImg1}
                onChange={(e) => setSubImg1(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="subImg2">Sub-Image 2:</label>
              <input
                type="file"
                id="subImg2"
                name="subImg2"
                className="form-control"
                value={usubImg2}
                onChange={(e) => setSubImg2(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="subImg3">Sub-Image 3:</label>
              <input
                type="file"
                id="subImg3"
                name="subImg3"
                className="form-control"
                value={usubImg3}
                onChange={(e) => setSubImg3(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="subImg4">Sub-Image 4:</label>
              <input
                type="file"
                id="subImg4"
                name="subImg4"
                className="form-control"
                value={usubImg4}
                onChange={(e) => setSubImg4(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="subImg5">Sub-Image 5:</label>
              <input
                type="file"
                id="subImg5"
                name="subImg5"
                className="form-control"
                value={usubImg5}
                onChange={(e) => setSubImg5(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="subImg6">Sub-Image 6:</label>
              <input
                type="file"
                id="subImg6"
                name="subImg6"
                className="form-control"
                value={usubImg6}
                onChange={(e) => setSubImg6(e.target.value)}
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
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
              <label htmlFor="size">Size:</label>
              <input
                type="text"
                id="size"
                name="size"
                className="form-control"
                value={usize}
                onChange={(e) => setSize(e.target.value)}
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
                onChange={(e) => setColor(e.target.value)}
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

export default ProductUpdate;
