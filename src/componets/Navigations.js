import React,{ useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetNotifications } from '../features/userSlice';
import './navigation.css'
import axios from '../axios';
import log from './log.png'
import Topbar from './Topbar';

function Navigation() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({})


  function handleLogout() {
    dispatch(logout())
  }

  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status == "unread") return acc + 1;
    return acc;
  }, 0);

  function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0) axios.post(`/users/${user._id}/updateNotifications`);
}
  return (
    <>
    <Topbar/>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      {/* <!-- Container wrapper --> */}
      <div class="container-fluid">
        {/* <!-- Toggle button --> */}
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        {/* <!-- Collapsible wrapper --> */}
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <!-- Navbar brand --> */}

          <Link class="navbar-brand mt-2 mt-lg-0" to="/">
            <img src={log} alt='log' style={{ height: 50, width: 60}}/>
              
          </Link>
          {/* <!-- Left links --> */}
          <div>
      
            </div>
          <div class="input-group">
            <div class="form-outline">
              <input type="search" id="form1" class="form-control" />
            </div>
            <button type="button" class="btn btn-primary">
              <i class="fas fa-search"></i>
            </button>
          </div>
          {/* <!-- Left links --> */}
        </div>
        {/* <!-- Collapsible wrapper --> */}



        {/* <!-- Right elements --> */}
        <div class="d-flex align-items-center">

          {/* if there is no user */}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
            </div>

          )}


            { 
              user && !user.isAdmin && (
                <Link class="text-reset me-3" to="/cart">
                <i class="fas fa-shopping-cart"></i>
                {user?.cart.count > 0 && (
                  <span className='badge badge-warning' id="cartcount">
                    {user.cart.count}
                  </span>
                )}
              </Link>
              )
            }

          {user && (
            <>
              <div style={{ position: "relative" }} onClick={handleToggleNotifications}>
              <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i></div>

              <div class="dropdown">
                <a
                  class="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  {`${user.email}`}
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  {/* if user admin */}
                  {user.isAdmin && (
                    <>
                      <li>
                       <Link to="/admin" class="dropdown-item">Dashboard</Link>
                      </li>
                      <li>
                       <Link to="/product" class="dropdown-item">Create Product</Link>
                      </li>
                    </>
                  )}

                  {!user.isAdmin &&(
                    <>
                    <li>
                       <Link to="/cart" class="dropdown-item">Cart</Link>
                      </li>
                      <li>
                       <Link to="/orders" class="dropdown-item">Orders</Link>
                      </li>
                    </>

                  )}
    
                  <li>
                    <button className="btn btn-danger logout-btn" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>

              </div>

            </>
          )}

        </div>


      </div>

      {/* notification */}
      <div className="notifications-container" ref={notificationRef} style={{ position: "absolute", top: bellPos.top + 30, left: bellPos.left, display: "none" }}>
                {user?.notifications.length > 0 ? (
                    user?.notifications.map((notification) => (
                        <p className={`notification-${notification.status}`}>
                            {notification.message}
                            <br />
                            <span>{notification.time.split("T")[0] + " " + notification.time.split("T")[1]}</span>
                        </p>
                    ))
                ) : (
                    <p>No notifcations yet</p>
                )}
            </div>
    </nav>
    </>
  );
}

export default Navigation;