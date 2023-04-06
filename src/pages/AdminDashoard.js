import React from "react";
import "./AdminDashoard.css"
import axios from "../axios"
import DashboardProduct from "./DashboardProduct";
import OrdersAdminPage from "../componets/OrdersAdminPage";
import ClientAdminPage from "../componets/ClientAdminPage";

function AdminDashoard() {

    return (
        <>
            <div className="container">
                <div className="row">
                   
                   
                            <div class="col-3">
                                <div
                                    class="nav flex-column nav-tabs text-center"
                                    id="v-tabs-tab"
                                    role="tablist"
                                    aria-orientation="vertical"
                                >
                                    <a
                                        class="nav-link active"
                                        id="v-tabs-home-tab"
                                        data-mdb-toggle="tab"
                                        href="#v-tabs-home"
                                        role="tab"
                                        aria-controls="v-tabs-home"
                                        aria-selected="true"
                                    >Products</a>
                                    
                                    <a
                                        class="nav-link"
                                        id="v-tabs-profile-tab"
                                        data-mdb-toggle="tab"
                                        href="#v-tabs-profile"
                                        role="tab"
                                        aria-controls="v-tabs-profile"
                                        aria-selected="false"
                                    >Orders</a>
                                    
                                    <a
                                        class="nav-link"
                                        id="v-tabs-messages-tab"
                                        data-mdb-toggle="tab"
                                        href="#v-tabs-messages"
                                        role="tab"
                                        aria-controls="v-tabs-messages"
                                        aria-selected="false"
                                    >Client</a>
                                    
                                </div>

                            </div>

                            <div class="col-9">
                                <div class="tab-content" id="v-tabs-tabContent">
                                    <div
                                        class="tab-pane fade show active"
                                        id="v-tabs-home"
                                        role="tabpanel"
                                        aria-labelledby="v-tabs-home-tab"
                                    >
                                        <DashboardProduct />
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="v-tabs-profile"
                                        role="tabpanel"
                                        aria-labelledby="v-tabs-profile-tab"
                                    >
                                        <OrdersAdminPage />
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="v-tabs-messages"
                                        role="tabpanel"
                                        aria-labelledby="v-tabs-messages-tab"
                                    >
                                       <ClientAdminPage />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default AdminDashoard;