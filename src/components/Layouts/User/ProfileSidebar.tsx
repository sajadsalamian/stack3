import { Icon } from "@iconify/react";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { MyMenuItem, MyMenuTitle, MySubMenu } from "../Admin/AdminSidebar";
import { useEffect } from "react";

export default function ProfileSidebar({
    openSidebar,
    setOpenSidebar,
    collapsed,
    setCollapsed,
}) {
    const [openTab, setOpenTab] = useState("-1");

    const menuItemStyles = {
        SubMenuExpandIcon: {
            color: "#b6b7b9",
        },
        subMenuContent: ({ level }) => ({
            backgroundColor: level === 0 ? "#f9f9f9" : "transparent",
        }),
        button: {
            "&:hover": {
                color: "#000",
            },
            "&:active": {
                backgroundColor: "#0b6aaf",
                color: "#fff",
            },
        },
    };

    return (
        <Sidebar
            rtl={true}
            className="w-full h-screen"
            breakPoint="md"
            toggled={openSidebar}
            backgroundColor="#ffffff"
            collapsed={collapsed}
        >
            <div className="p-4 flex gap-x-2 items-center">
                <img
                    src="/assets/image/logo.png"
                    alt="شادیلون"
                    className="w-10"
                />
                <span className="text-primary font-extrabold">شادیلون</span>
                <span
                    className="mr-auto cursor-pointer md:hidden"
                    onClick={() => setOpenSidebar(false)}
                >
                    <Icon
                        icon="system-uicons:side-menu"
                        className="w-8 h-8 text-primary"
                    />
                </span>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
                {/* <MyMenuTitle title="اطلاعات کاربری" /> */}
                <MyMenuItem
                    label="داشبورد"
                    icon="ic:round-dashboard"
                    setOpenTab={setOpenTab}
                    subId="1"
                    href={route("user.dashboard")}
                    linkAtt={undefined}
                />
                <MyMenuItem
                    label="سفارشات"
                    icon="lets-icons:order-fill"
                    setOpenTab={setOpenTab}
                    subId="2"
                    href={route("user.orders.all")}
                    linkAtt={undefined}
                />
                <MySubMenu
                    label="پروفایل"
                    icon="fa:user"
                    pathname="/user/profile"
                >
                    <MyMenuItem
                        label="اطلاعات کاربری"
                        icon="material-symbols:info"
                        setOpenTab={setOpenTab}
                        subId="3"
                        href={route("user.profile.main")}
                        linkAtt={undefined}
                    />
                    <MyMenuItem
                        label="آدرس ها"
                        icon="mdi:address-marker"
                        setOpenTab={setOpenTab}
                        subId="3"
                        href={route("user.address.all")}
                        linkAtt={undefined}
                    />
                    <MyMenuItem
                        label="رمز عبور"
                        icon="mdi:password"
                        setOpenTab={setOpenTab}
                        subId="3"
                        href={route("user.profile.password")}
                        linkAtt={undefined}
                    />
                </MySubMenu>
            </Menu>
        </Sidebar>
    );
}
