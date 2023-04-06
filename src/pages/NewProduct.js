import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useCreateProductMutation } from "../services/appApi";
import axios from '../axios'
import './NewProduct.css'

function NewProduct(){
    const [name, setName] =  useState("")
    const [description, setDescription ] = useState("")
    const [price, setPrice ] = useState("")
    const [category, setCategory ] = useState("")
    const [images, setImages] = useState([]);
    const [ imgToRemove, setImgToRemove ] = useState(null);
    const navigate = useNavigate()
    const [ createProduct, {isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget(){
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "xycoders",
                uploadPreset: "ytvtzs3m",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id}])
                }
            }
        );
        widget.open()
    }

    return(
       <>
        <div className="container">
            <div className="row">
                <div className="col-md-6 new_product">
                    <h2>Create Product </h2>
                <form onSubmit={handleSubmit}>
                    { isSuccess && <Alert variant="success">Product created with success</Alert>}
                   {isError && <Alert variant="danger">{error.data}</Alert>}
                <input class="form-control mb-4" type="text" value={name} placeholder="Product Name" 
                    onChange={(e) => setName(e.target.value)}
                />

                <select class="form-select mb-4" aria-label="Default select example" 
                     value={category} onChange={(e) => setCategory(e.target.value)}>
                <option selected>Open this select menu</option>
                <option>Technology</option>
                <option>Tablet</option>
                <option>Iphone</option>
                </select>
                <input class="form-control mb-4" type="number" placeholder="Price"
                    value={price} onChange={(e) => setPrice (e.target.value) }
                />
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                    style={{height: "150px"}} value={description} onChange={(e) => setDescription (e.target.value) }
                    />
                    <label for="floatingTextarea2">Description</label>
                </div>
                <div className="form-control mb-4">
                    <button type="button" onClick={showWidget}>Upload Images</button>
                    <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                </div>
                </div>
                <button type="submit" class="btn btn-primary" disabled={isLoading || isSuccess}>create Product</button>
                </form>                    
                </div>
                <div className="col-md-6 new-product__image--container">
                    
                </div>
            </div>
        </div>
       </>
    )
}


export default NewProduct;