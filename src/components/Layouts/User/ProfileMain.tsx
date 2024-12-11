import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import ProfileSidebar from "./ProfileSidebar";
import ProfileHeader from "./ProfileHeader";
import ProfileFooter from "./ProfileFooter";

export default function ProfileMain({
    children,
    routes = [],
    label,
    introImage,
    sectionClass,
    isContainer = true,
    isIntro = true,
    profile = false,
}) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div>
            <ToastContainer rtl={true} />
            <main>
                <div className="flex">
                    <div>
                        <ProfileSidebar
                            openSidebar={openSidebar}
                            setOpenSidebar={setOpenSidebar}
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                        />
                    </div>
                    <div className="flex-1 flex flex-col overflow-x-auto min-h-screen md:overflow-x-hidden">
                        <ProfileHeader
                            setOpenSidebar={setOpenSidebar}
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                        />
                        <div className="flex-1 p-5">{children}</div>
                        <ProfileFooter />
                    </div>
                </div>
            </main>
        </div>
    );
}
