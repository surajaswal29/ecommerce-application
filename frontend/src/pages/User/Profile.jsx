import { Calendar, Edit, Mail, Phone, UserRound } from "lucide-react"
import React from "react"
import { useSelector } from "react-redux"
import UserAddress from "../../components/User/UserAddress"

const Profile = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <div className='w-full px-24'>
      {!user ? (
        <div>...Loading</div>
      ) : (
        <div className='w-full flex grow-0 my-6 gap-6'>
          <div className='w-4/12 bg-white rounded-lg shadow-md p-4 h-fit'>
            <div className='w-full flex justify-center'>
              {/* Profile image */}
              <div className='w-40 h-40 rounded-full border-4 border-slate-300 shadow-md overflow-hidden'>
                <img
                  src={user?.avatar || "https://placehold.co/400"}
                  alt='User Image'
                  className='w-full h-full object-contain'
                />
              </div>
            </div>
            <div className='w-full text-center text-sm text-gray-700'>
              {/* Profile name */}
              <h1 className='text-2xl font-medium mt-4 text-black'>
                {user?.name}
              </h1>
              <p>{user?.bio || "Shopio user"}</p>
              <div className='w-full text-left mt-3'>
                <h1 className='border p-2 rounded-lg text-black font-semibold border-blue-400 bg-blue-200 flex items-center justify-between'>
                  My Info{" "}
                  <span className='cursor-pointer font-bold text-blue-900'>
                    <Edit size={16} />
                  </span>
                </h1>
                <p className='p-2 flex gap-2 items-center'>
                  <Mail size={16} /> {user?.email}
                </p>
                <p className='p-2 flex gap-2 items-center'>
                  <Phone size={16} /> {user?.phone ? user?.phone : "N/A"}
                </p>
                <p className='p-2 flex gap-2 items-center'>
                  <Calendar size={16} /> DOB: {user?.dob ? user?.dob : "N/A"}
                </p>
                <p className='p-2 flex gap-2 items-center'>
                  <UserRound size={16} />
                  Gender: {user?.gender ? user?.gender : "N/A"}
                </p>
              </div>
            </div>

            <div className='w-full mt-6 border-t py-3'>
              <h1>My Interests</h1>
              <div className='w-full mt-3 flex'>
                {user?.interest && user?.interest?.length > 0 ? (
                  user.interest.map((item, index) => (
                    <span
                      key={index}
                      className='bg-blue-400 rounded-full p-2 text-white px-3'
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <p className='p-3 border border-dashed border-slate-400 text-sm w-full rounded-lg'>
                    No interests found
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='w-8/12 bg-white rounded-lg shadow-md p-4'>
            <UserAddress />
            <div className='w-full border rounded-md p-3 mt-6'>
              <h1 className='font-semibold'>My Orders</h1>

              <div className='w-full'>
                <div className='w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow'>
                  <p>Address Line 1</p>
                  <p>Address Line 2</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Zip Code</p>
                </div>
                <div className='w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow'>
                  <p>Address Line 1</p>
                  <p>Address Line 2</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Zip Code</p>
                </div>
                <div className='w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow'>
                  <p>Address Line 1</p>
                  <p>Address Line 2</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Zip Code</p>
                </div>
                <div className='w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow'>
                  <p>Address Line 1</p>
                  <p>Address Line 2</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Zip Code</p>
                </div>
                <div className='w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow'>
                  <p>Address Line 1</p>
                  <p>Address Line 2</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Zip Code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
