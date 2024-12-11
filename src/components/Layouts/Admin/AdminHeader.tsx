import AdvancedDropdown, { AdvancedDropdownItem, AdvancedDropdownMenu, AdvancedDropdownMenuItem } from '@/Components/Elements/AdvancedDropdown'
import { Icon } from '@iconify/react'
import { Link } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react';

export default function AdminHeader({ setOpenSidebar, collapsed, setCollapsed }) {
    const [activeMenu, setActiveMenu] = useState('main');

    return (
        <header className=' w-full bg-primary shadow-main px-4 py-4 min-h-[50px] flex justify-between'>
            <ul className='flex text-white gap-x-4 items-center'>
                <span className='mr-auto cursor-pointer hidden md:block' onClick={e => setCollapsed(!collapsed)}><Icon icon="mdi:arrow-horizontal-collapse" className='w-8 h-8 text-white' /></span>
                <li><Icon hFlip={true} onClick={e => setOpenSidebar(true)} icon="system-uicons:side-menu" className='w-8 h-8 text-white cursor-pointer md:hidden' /></li>
                <li><Link href={route('index')}>صفحه اصلی</Link></li>
            </ul>
            <div className='ml-10'>
                <AdvancedDropdown>
                    <AdvancedDropdownItem class="bg-gray-200 rounded-full" item={<Icon icon="ph:user-bold" className='text-black w-6 h-6' />}>
                        <AdvancedDropdownMenu activeMenu={activeMenu} activeName="main" icon="mingcute:left-fill" className="menu-primary">
                            <AdvancedDropdownMenuItem href={route('auth.logout')} icon="material-symbols:logout">خروج</AdvancedDropdownMenuItem>
                            {/* <AdvancedDropdownMenuItem onClick={() => setActiveMenu('settings')} icon="uil:setting" expand={true}>تنظیمات</AdvancedDropdownMenuItem> */}
                        </AdvancedDropdownMenu>

                        <AdvancedDropdownMenu activeMenu={activeMenu} activeName="settings" className="menu-secondary">
                            <AdvancedDropdownMenuItem onClick={() => setActiveMenu('main')} icon="icon-park-solid:right-c">
                                <span>بازگشت</span>
                            </AdvancedDropdownMenuItem>
                        </AdvancedDropdownMenu>
                    </AdvancedDropdownItem>
                </AdvancedDropdown>
            </div>
        </header>
    )
}
