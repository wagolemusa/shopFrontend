import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// CREATE THE API
export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://shop-lc32.onrender.com" }),
    endpoints: (builder) => ({
        
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),

        // login
        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        // creatimng product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            })
        }),

        // add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            })
        }),

        // delete products
        deleteProduct: builder.mutation({
            query: ({product_id, user_id}) =>({
                url: `products/${product_id}`,
                body:{
                    user_id,
                },
                method: "DELETE",
            }),
        }),


        // Edit product
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),

        // removing from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            })
        }),

        // Increase from cart
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            })
        }),
        
        // Deincrease Cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            })
        }),

        // create Order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),

         
    })
});


export const { 
    useSignupMutation,
    useLoginMutation, 
    useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
    

} = appApi;

export default appApi;