import { Icon } from "@iconify/react";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

export default function AdminSidebar({
    openSidebar,
    setOpenSidebar,
    collapsed,
    setCollapsed,
}) {
    const [openTab, setOpenTab] = useState("-1");
    const appName = usePage().props.settings.app_name;

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
                <img src="/assets/image/logo.png" alt="" className="w-10" />
                <span className="text-primary font-extrabold">{appName}</span>
                <span
                    className="mr-auto cursor-pointer md:hidden"
                    onClick={(e) => setOpenSidebar(false)}
                >
                    <Icon
                        icon="system-uicons:side-menu"
                        className="w-8 h-8 text-primary"
                    />
                </span>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
                <MyMenuItem
                    label="داشبورد"
                    href={route("admin.dashboard")}
                    icon="ic:round-dashboard"
                    setOpenTab={setOpenTab}
                    subId="-1"
                />
                <MySubMenu
                    label="محصولات"
                    icon="fluent-mdl2:product-variant"
                    pathname="/admin/product"
                >
                    <MyMenuItem
                        label="همه محصولات"
                        href={route("admin.product.all")}
                        icon="fluent:text-bullet-list-rtl-24-filled"
                        setOpenTab={setOpenTab}
                        subId="1"
                    />
                    <MyMenuItem
                        label="افزودن محصول"
                        href={route("admin.product.add", 0)}
                        icon="ion:duplicate-outline"
                        setOpenTab={setOpenTab}
                        subId="1"
                    />
                    <MySubMenu
                        label="دسته بندی"
                        icon="fa6-solid:sitemap"
                        pathname="/admin/product"
                    >
                        <MyMenuItem
                            label="دسته بندی محصولات"
                            href={route("admin.product.category.all")}
                            icon="fluent:text-bullet-list-rtl-24-filled"
                            setOpenTab={setOpenTab}
                            subId="1"
                        />
                        <MyMenuItem
                            label="افزودن دسته بندی"
                            href={route("admin.product.category.add", 0)}
                            icon="ion:duplicate-outline"
                            setOpenTab={setOpenTab}
                            subId="1"
                        />
                    </MySubMenu>
                    <MyMenuItem
                        label="متغیرها"
                        href={route("admin.product.variable.all")}
                        icon="gis:map-legend-o"
                        setOpenTab={setOpenTab}
                        subId="1"
                    />
                </MySubMenu>
                <MySubMenu
                    label="مطالب"
                    icon="game-icons:papers"
                    pathname="/admin/post"
                >
                    <MyMenuItem
                        label="همه مطالب"
                        href={route("admin.post.all")}
                        icon="oui:documents"
                        setOpenTab={setOpenTab}
                        subId="2"
                    />
                    <MyMenuItem
                        label="مطلب جدید"
                        href={route("admin.post.add", 0)}
                        icon="fluent:document-add-20-regular"
                        setOpenTab={setOpenTab}
                        subId="2"
                    />
                    <MyMenuItem
                        label="دسته بندی مطالب"
                        href={route("admin.post.category.all")}
                        icon="material-symbols:category"
                        setOpenTab={setOpenTab}
                        subId="2"
                    />
                    <MyMenuItem
                        label="افزودن دسته بندی"
                        href={route("admin.post.category.add", 0)}
                        icon="mdi:category-plus"
                        setOpenTab={setOpenTab}
                        subId="2"
                    />
                </MySubMenu>
                {/* <MySubMenu label='سفارشات' icon='icon-park-solid:transaction-order' pathname='/admin/orders'>
                    <MyMenuItem label='همه سفارشات' href={route('admin.orders.all', 'all')} icon='material-symbols:list-alt-outline' setOpenTab={setOpenTab} subId='3'  />
                    <MyMenuItem label='پرداخت شده' href={route('admin.orders.all', 'pay')} icon='fluent-mdl2:time-entry' setOpenTab={setOpenTab} subId='3'  />
                    <MyMenuItem label='ارسال شده' href={route('admin.orders.all', 'send')} icon='ci:list-checklist' setOpenTab={setOpenTab} subId='3'  />
                </MySubMenu>
                <MyMenuItem label='تنظیمات' href={route('admin.setting')} icon='ic:round-dashboard' setOpenTab={setOpenTab} subId='-1'  /> */}
            </Menu>
        </Sidebar>
    );
}

export function MyMenuItem({
    href = "#",
    icon = "",
    label = "",
    setOpenTab,
    subId,
}) {
    const [active, setActive] = useState(window.location.href == href);
    useEffect(() => {
        window.location.href == href ? setOpenTab(subId) : null;
    }, []);

    return (
        <MenuItem
            className={`text-[15px] ${
                active ? "bg-primary text-white" : "text-gray-600"
            }`}
            component={<Link href={href}></Link>}
            icon={
                <Icon
                    icon={icon}
                    className={`${
                        !active ? "text-primary" : "text-white"
                    } w-6 h-6 `}
                />
            }
        >
            {label}
        </MenuItem>
    );
}

export function MySubMenu({ children, label = "", icon = "", pathname }) {
    return (
        <SubMenu
            label={label}
            className="text-sm"
            icon={<Icon icon={icon} className="text-primary w-6 h-6" />}
            defaultOpen={window.location.pathname.startsWith(pathname)}
        >
            {children}
        </SubMenu>
    );
}

export function MyMenuTitle({ title }) {
    return (
        <div className="pr-2">
            <span className="text-gray-400 text-sm">{title}</span>
        </div>
    );
}
