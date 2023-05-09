import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./componets/Navigations";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from 'react-redux';
import NewProduct from './pages/NewProduct';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './componets/ScrollToTop';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import AdminDashoard from './pages/AdminDashoard';
import EditProduct from './pages/EditProduct';
import { useEffect } from 'react';
import { io } from 'socket.io-client'
import { addNotification } from "./features/userSlice";


function App() {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io("ws://https://shop-lc32.onrender.com/");
    socket.off("notification").on("notification", (msgObj, user_id) => {

      // logic for notication 
      if(user_id === user._id){
        dispatch(addNotification(msgObj));
      }
    })
    socket.off('new-order').on('new-order', (msgObj) => {
      if(user.isAdmin){
        dispatch(addNotification(msgObj));
      }
    })

  },[]);

  return (
    <div className="App">
     <Router>
      <ScrollToTop />
        <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            {!user && (
              <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
              </>
            )}

            {/* this routes accessed when your login */}
            { user && (
              <>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrderPage />} />

              </>
            )}

            {user && user.isAdmin && (

              <>
                 <Route path="/admin" element={<AdminDashoard />} />
                 <Route path="/admin/product/:id/edit" element={<EditProduct />} />
              </>
            )}

              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/category/:category' element={<CategoryPage />} />
              <Route path='/product' element={<NewProduct />} />
            <Route path="*" element={<Home />} />


          </Routes>
        </Router>

    </div>
  );
}

export default App;
