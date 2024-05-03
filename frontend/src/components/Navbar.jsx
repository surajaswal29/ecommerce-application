import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
    MapPin,
    ListMinus,
    Search,
    ShoppingCart,
    Heart,
    ChevronDown,
    Home,
    User,
} from "lucide-react"
import { logoutUser } from "../redux/actions/userActions"
import { plantCategoryData } from "../utils/constants"

const clothingCategories = [
    { id: 1, name: "Women's Clothing", slug: "womens-clothing" },
    { id: 2, name: "Men's Clothing", slug: "mens-clothing" },
    { id: 3, name: "Kids' Clothing", slug: "kids-clothing" },
    { id: 4, name: "Shoes & Accessories", slug: "shoes-accessories" },
    {
        id: 5,
        name: "Activewear & Athletic Clothing",
        slug: "activewear-athletic-clothing",
    },
    { id: 6, name: "Dresses & Jumpsuits", slug: "dresses-jumpsuits" },
    { id: 7, name: "Outerwear & Jackets", slug: "outerwear-jackets" },
    { id: 8, name: "Lingerie & Undergarments", slug: "lingerie-undergarments" },
    { id: 9, name: "Swimwear & Beachwear", slug: "swimwear-beachwear" },
    { id: 10, name: "Sleepwear & Robes", slug: "sleepwear-robes" },
]

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user)
    const [catDrop, setCatDrop] = useState(false)
    const [profileDrop, setProfileDrop] = useState(false)
    const [categoryValue, setCategoryValue] = useState("All")
    const dispatch = useDispatch()

    const handleCategory = () => {
        setCatDrop(!catDrop)
    }


    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target.id !== "cat_drop") {
                setCatDrop(false)
            }
        })
    }, [])
    return (
        <>
        <div className='w-full sticky top-0 z-50 flex items-center bg-white shadow p-3 px-2 lg:px-6'>
            <div className='hidden lg:flex w-1/12'>
                <Link to={"/"} className='w-fit block h-[45px]'>
                    <img
                        src='/shopio_logo.png'
                        alt='Main Logo'
                        className='w-full h-full object-contain'
                    />
                </Link>
            </div>
            <div className='hidden lg:flex w-3/12 justify-end gap-8 px-6'>
                <div className='flex-1 whitespace-nowrap'>
                    <h1 className='flex items-center gap-1 font-medium'>
                        <MapPin size={16} color='#597cff' /> Address
                    </h1>
                    <p className='text-gray-700 text-xs'>Abc, xyz, 248001</p>
                </div>
                <div className='flex-1 whitespace-nowrap relative'>
                    <h1 className='flex items-center gap-1 font-medium'>
                        <ListMinus size={16} color='#597cff' />
                        Category
                    </h1>
                    <p
                        className='text-gray-700 text-xs flex items-center justify-between cursor-pointer hover:text-gray-500'
                        onClick={handleCategory}
                        id="cat_drop"
                    >
                        {categoryValue.length > 12 ? categoryValue.slice(0, 12) + "..." : categoryValue} <ChevronDown size={16} id="cat_drop"/>
                    </p>

                    {catDrop && (
                        <div className='w-fit rounded-md bg-slate-100 flex flex-col shadow-md absolute top-full right-0 mt-2 z-50 animate-fade'>
                            {plantCategoryData.map((data) => (
                                <Link
                                    key={data.title}
                                    className='p-3 hover:bg-slate-200 text-sm flex items-center gap-2'
                                    onClick={() => setCategoryValue(data.title)}
                                >
                                    <img src={data.image} alt={data.title} className="w-6 h-6"/>
                                    {data.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full lg:w-5/12 px-3'>
                <div className='w-full flex rounded-md overflow-hidden'>
                    <input
                        type='text'
                        className='w-full border border-slate-300 focus:border-slate-400 rounded-l-md focus:outline-none p-2'
                    />
                    <button className='bg-slate-800 text-white p-2 px-3'>
                        <Search size={16} />
                    </button>
                </div>
            </div>
            <div className='hidden lg:flex w-3/12 items-center justify-end gap-6 px-3'>
                <nav className='flex gap-6'>
                    <Link>
                        <div className='relative'>
                            <ShoppingCart color='#597cff' />
                            <span className='absolute top-[-9px] right-[-9px] text-sm font-semibold text-slate-800'>
                                0
                            </span>
                        </div>
                    </Link>
                    <Link>
                        <Heart color='#597cff' />
                    </Link>
                </nav>
                {isAuthenticated ? (
                    <div className="flex relative">
                        <div className='flex items-center cursor-pointer' onClick={() => setProfileDrop(!profileDrop)}>
                            <div className='w-10 h-10 rounded-full overflow-hidden bg-slate-200'>
                                <img src={user.avatar} alt='user image' />
                            </div>
                            <div className='mx-2'>
                                <h1>Hello,</h1>
                                <p className='text-xs'>{user.name || "Shop"}</p>
                            </div>
                            <div>
                                <ChevronDown size={16} />
                            </div>
                        </div>
                        {
                            profileDrop && (
                                <div className='absolute bg-slate-200 top-full right-0 flex flex-col'>
                                    <Link className='p-3 hover:bg-slate-100'>My Account</Link>
                                    <Link className='p-3 hover:bg-red-500 hover:text-white' onClick={() => dispatch(logoutUser())}>Logout</Link>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div className='flex gap-3'>
                        <Link
                            to={"/user/login"}
                            className='border border-[#597cff] p-2 rounded-md text-[#597cff]'
                        >
                            Login
                        </Link>
                        <Link
                            to={"/user/register"}
                            className='border border-[#597cff] p-2 rounded-md text-[#597cff]'
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
            </div>
        </>
    )
}

export default Navbar
