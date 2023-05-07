import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../componets/Loading";
import ProductPreview from '../componets/ProductPreview'
import Pagination from "../componets/Pagination";
import './NewProduct.css'

const CategoryPage = () => {

    const { category } = useParams();
    const [loading, setLoading ] = useState(false);
    const [ products, setProducts] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/products/category/${category}`)
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, [category]);

    if (loading) {
        <Loading />;
    }

    console.log("all" ,products)
    
    const productsSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    function ProductSearch({ _id, category, name, pictures, price }) {
        return <ProductPreview _id={_id} category={category} name={name} pictures={pictures} price={price} />;
    }

    return (
        <div className="category-page-container">
            <div className={`pt-3 ${category}-banner-container category-banner-container`}>
                <h1 className="text-center">{category}</h1>
            </div>
            <div className="filters-container d-flex justify-content-center pt-4 pb-4">
                <input type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {productsSearch.length === 0 ? (
                <h1>No products to show</h1>
            ) : (
                <div className="container-fluid">
                            <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={1} dataLimit={5} tablePagination={false} />
                            
                            {/* <div className="row">
                                {products.map((product) => (
                                    <div className="col-md-3">
                                        <ProductPreview {...product} />
                                    </div>
                                ))}
                        </div> */}

                        <productsSearch />
                   </div>
                
            )}
        </div>
    )
}


export default CategoryPage;

