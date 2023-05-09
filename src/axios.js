import axios from "axios";

const instance = axios.create({
    baseURL: "https://shop-lc32.onrender.com/",
})

export default instance;