import { Home, Menu, ShoppingCart, User } from 'lucide-react'
import React from 'react'

const MobileNav = () => {
    return (
        <div className='w-full sticky bottom-0 z-50 lflex lg:hidden items-center justify-between bg-white shadow-md border p-3 px-4 lg:px-6'>
            <Home />
            <Menu/>
            <User />
            <ShoppingCart />
        </div>
    )
}

export default MobileNav
