import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import './DashboardProduct.css';

function DashboardProduct() {

    const products = useSelector(state => state.products)
    console.log("Dash", products)
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
       
            <div class="table-responsive">
                 <table class="table">


                <thead> 
                    <tr>
                        <th>&nbsp;</th>
                     
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
                   
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product._id, user._id)} disabled={isLoading}>Delete</button>
                            </td>
                            <td>
                                <Link to={`product/${product._id}/edit`} className="btn btn-warning">Edit</Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
                </table>
                </div>
            </>
            )
}

            export default DashboardProduct;



