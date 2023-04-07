import React from "react";

function Topbar(){
    return(
        <>
            <nav className="top-nav" id="home">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-auto">
                            <p>
                            <i class="fas fa-square-phone"> &nbsp;+256754188938</i>
                            </p>
                            <p><i class="fas fa-envelope"></i>
                            <span> &nbsp; homiemusa@gmail.com</span>
                            </p>
                        </div>
                        <div className="col-auto">
                          <div className="social-links">
                          <i class="fab fa-facebook"></i> &nbsp;
                          <i class="fab fa-twitter"></i> &nbsp;
                            <i class="fas fa-at"></i>
                        </div>  
                 
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Topbar;





