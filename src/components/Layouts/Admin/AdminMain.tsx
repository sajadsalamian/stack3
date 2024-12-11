import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import AdminSidebar from "./AdminSidebar";

export default function AdminMain({ children, routes = [], label = "", introImage = "", sectionClass = "", isContainer = true, isIntro = true, profile = false }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [collapsed, setCollapsed] = useState(false);


    return (
        <div>
            <ToastContainer rtl={true} />
            <main>
                <div className="flex">
                    <div>
                        <AdminSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} collapsed={collapsed} setCollapsed={setCollapsed} />
                    </div>
                    <div className="flex-1 flex flex-col overflow-x-auto md:overflow-x-hidden">
                        <AdminHeader setOpenSidebar={setOpenSidebar} collapsed={collapsed} setCollapsed={setCollapsed} />
                        <div className="flex-1 p-5">
                            {children}
                        </div>
                        <AdminFooter />
                    </div>
                </div>
            </main>
        </div>
    );
}

