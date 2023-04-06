import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import './DashboardProduct.css';

function DashboardProduct() {

    const products = useSelector(state => state.products)
    const user = useSelector(state => state.user);

    // Removing Products
    const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation()

    function handleDeleteProduct(id){
        // logic here
        if(window.confirm("Are you sure?")) deleteProduct({product_id: id, user_id: user._id});

    }
    // console.log("admin",products)

    return (
        <>
            <div>Dashboard Product</div> 
            <table className="table cart-table">

                <thead> 
                    <tr>
                        <th>&nbsp;</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr>
                            <td>
                                <img src={product.pictures[0].url} className="dashboard-product-preview" />
                            </td>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button className="btb btn-primary" onClick={() => handleDeleteProduct(product._id, user._id)} disabled={isLoading}>Delete</button>
                            </td>
                            <td>
                                <Link to={`product/${product._id}/edit`} className="btn btn-warning">Edit</Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
                </table>
            </>
            )
}

            export default DashboardProduct;



