/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { Building, Delete, Home, Map, PlusCircle, Trash } from "lucide-react"
import Modal from "../../components/Modal"
import { useDispatch, useSelector } from "react-redux"
import {
    addUserAddress,
    deleteUserAddress,
    getUserInfo,
} from "../../redux/actions/userActions"
import { clearUserError } from "../../redux/reducers/userReducer"

const UserAddress = () => {
    const dispatch = useDispatch()
    const { user, isUserAddressAdded, isUserAddressDelete } = useSelector((state) => state.user)
    const [openAddressModal, setOpenAddressModal] = React.useState(false)
    const [formData, setFormData] = React.useState({
        label: "home",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India", // Default country
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // Here, you can use formData to handle form submission
        console.log("Form submitted with data:", formData)
        dispatch(addUserAddress(formData))
        // Reset form data after submission
        setFormData({
            label: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "India",
        })
        setOpenAddressModal(false) // Close the modal
    }

    const handleAddAddressModal = () => {
        setOpenAddressModal(!openAddressModal)
    }

    const handleDeleteAddress = (id) => {
        dispatch(deleteUserAddress(id))
    }

    useEffect(() => {
        if (isUserAddressAdded || isUserAddressDelete) {
            dispatch(getUserInfo())
            dispatch(clearUserError())
        }
    }, [isUserAddressAdded, isUserAddressDelete])
    return (
        <>
            <div className='w-full border rounded-md p-3'>
                <h1 className='font-semibold'>My Address</h1>
                {user?.address && user?.address?.length <= 0 && (
                    <p className='text-sm w-full text-gray-700 my-2'>
                        You don&apos;t have any address saved yet
                    </p>
                )}
                <div className='w-full grid grid-cols-4 gap-4'>
                    {user?.address &&
                        user?.address?.length > 0 &&
                        user.address.map((item) => (
                            <div
                                key={item._id}
                                className='w-[200px] bg-slate-100 border rounded-lg mt-2 text-sm shadow overflow-hidden relative'
                            >
                                <div className='w-full bg-blue-500 text-white p-2 font-medium text-sm'>
                                    {item?.label === "home" ? (
                                        <span className='flex items-center gap-2'>
                                            <Home size={16} /> Home
                                        </span>
                                    ) : (
                                        <span className='flex items-center gap-2'>
                                            <Building size={16} /> Office
                                        </span>
                                    )}
                                </div>
                                <div className='w-full p-2'>
                                    <p>{item?.address}</p>
                                    <p>{item?.city}</p>
                                    <p>{item?.state}</p>
                                    <p>{item?.country}</p>
                                    <p>{item?.zipCode}</p>
                                </div>
                                <span
                                    className='absolute bottom-2 right-2 text-red-600 cursor-pointer'
                                    onClick={() => handleDeleteAddress(item?._id)}
                                >
                                    <Trash size={18} />
                                </span>
                            </div>
                        ))}
                    <div
                        className='w-[200px] bg-slate-100 border cursor-pointer hover:bg-slate-200 p-2 rounded-md mt-2 text-sm shadow flex flex-col justify-center items-center gap-2 py-6'
                        onClick={handleAddAddressModal}
                    >
                        <span>Add Address</span>
                        <PlusCircle size={24} />
                    </div>
                </div>
            </div>

            {/* Modals */}
            {openAddressModal && (
                <Modal onClickHandler={() => setOpenAddressModal(false)}>
                    <div
                        className='w-[450px] bg-white rounded-lg shadow-md p-4'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form onSubmit={handleFormSubmit}>
                            <div className='w-full bg-slate-200 rounded-lg'>
                                <h1 className='font-semibold p-2 w-full flex items-center gap-2'>
                                    <Map size={20} /> Add Address
                                </h1>
                            </div>
                            <div className='w-full mt-4'>
                                <label htmlFor='label'>Label</label>
                                <select
                                    name='label'
                                    id='label'
                                    value={formData.label}
                                    onChange={handleInputChange}
                                    className='w-full border rounded-md p-2 mt-2 text-sm bg-white cursor-pointer'
                                >
                                    <option value='home'>Home</option>
                                    <option value='office'>Office</option>
                                </select>
                            </div>
                            <div className='w-full mt-3'>
                                <label htmlFor='address'>Address</label>
                                <input
                                    type='text'
                                    id='address'
                                    name='address'
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className='w-full border rounded-md p-2 mt-2 text-sm'
                                    placeholder='123 Main St'
                                />
                            </div>
                            <div className='w-full mt-3'>
                                <label htmlFor='zipCode'>Zip Code</label>
                                <input
                                    type='text'
                                    id='zipCode'
                                    name='zipCode'
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className='w-full border rounded-md p-2 mt-2 text-sm'
                                    placeholder='248001'
                                />
                            </div>
                            <div className='w-full mt-3'>
                                <label htmlFor='city'>City</label>
                                <input
                                    type='text'
                                    id='city'
                                    name='city'
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className='w-full border rounded-md p-2 mt-2 text-sm'
                                    placeholder='City'
                                />
                            </div>
                            <div className='w-full mt-3'>
                                <label htmlFor='state'>State</label>
                                <input
                                    type='text'
                                    id='state'
                                    name='state'
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className='w-full border rounded-md p-2 mt-2 text-sm'
                                    placeholder='State'
                                />
                            </div>
                            <div className='w-full mt-3'>
                                <label htmlFor='country'>Country</label>
                                <select
                                    name='country'
                                    id='country'
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className='w-full border rounded-md p-2 mt-2 text-sm bg-white cursor-pointer'
                                >
                                    <option value='India'>India</option>
                                    <option value='USA'>USA</option>
                                    <option value='UK'>UK</option>
                                </select>
                            </div>
                            <div className='w-full mt-3'>
                                <button
                                    type='submit'
                                    className='w-full p-2 bg-blue-500 text-white rounded-lg'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default UserAddress
