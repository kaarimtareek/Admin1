import { createSlice } from "@reduxjs/toolkit";

import { productList } from "./Data";

const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        products : [],
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload); 
        },
        // uu stands for user update and we use it as nonstorageable var
        updateProduct: (state, action) => {
            const {id,name,primImg,subImg1,subImg2,subImg3,subImg4,
                subImg5,subImg6,price,stock,categoryId,subCategoryId,
                discount,size,color,finalPrice,description} = action.payload;
            // eslint-disable-next-line eqeqeq
            const uu = state.products.find(product => product.id == id);
            if(uu){
                uu.name = name ;
                uu.primImg = primImg;
                uu.subImg1 = subImg1;
                uu.subImg2 = subImg2;
                uu.subImg3 = subImg3;
                uu.subImg4 = subImg4;
                uu.subImg5 = subImg5;
                uu.subImg6 = subImg6;

                uu.price = price;
                uu.stock = stock;
                uu.categoryId = categoryId;
                uu.subCategoryId = subCategoryId;
                uu.discount = discount;
                uu.size = size;
                uu.color = color;
                uu.finalPrice = finalPrice;
                uu.description = description;
            }
        },
        // eslint-disable-next-line consistent-return
        deleteProduct: (state, action) => {
            const { id } = action.payload;
            console.log('Deleting Product with ID:', id); 
            const index = state.findIndex(product => product.id === id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
        
    }
});
export const {addProduct, updateProduct, deleteProduct} = productSlice.actions;
export default productSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// import { blogList } from "./Data";

// const blogSlice = createSlice({
//     name: "blogs",
//     initialState: blogList,
//     reducers: {
//         addBlog: (state, action) => {
//             state.push(action.payload); 
//         },
//         updateBlog: (state, action) => {
//             const { id, name, img } = action.payload;
//             const blogToUpdate = state.find(blog => blog.id === id);
//             if (blogToUpdate) {
//                 blogToUpdate.name = name;
//                 blogToUpdate.img = img;
//             }
//         },
//         deleteBlog: (state, action) => {
//             const { id } = action.payload;
//             // Modify the state directly
//             const index = state.findIndex(blog => blog.id === id);
//             if (index !== -1) {
//                 state.splice(index, 1);
//             }
//         }
//     }
// });

// export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
// export default blogSlice.reducer;
