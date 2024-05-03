import React from 'react'

const Profile = () => {
  return (
    <div className='w-full px-24'>
      <div className="w-full flex grow-0 my-6 gap-6">
        <div className="w-4/12 bg-white rounded-lg shadow-md p-4 h-fit">
          <div className="w-full flex justify-center">
            {/* Profile image */}
            <div className="w-40 h-40 rounded-full border overflow-hidden">
              <img src="https://placehold.co/400" alt="User Image" className='w-full h-full object-contain'/>
            </div>
          </div>
          <div className="w-full text-center text-sm text-gray-700">
            {/* Profile name */}
            <h1 className='text-2xl font-medium mt-4 text-black'>John Doe</h1>
            <p>srajjsdkj@gmail.com</p>
            <p>+91-9999999999</p>
            <p>DOB: 28-08-2002</p>
            <p>Gender: Male</p>
            <p>dvjdsjdnsjndv dvjdsjj vvdsj dsvj vd j</p>
          </div>

          <div className="w-full mt-6 border-t py-3">
            <h1>My Interests</h1>
            <div className="w-full mt-3 flex">
              <span className='bg-blue-400 rounded-full p-2 text-white px-3'>Cricket</span>
            </div>
          </div>
        </div>
        <div className="w-8/12 bg-white rounded-lg shadow-md p-4">
          <div className="w-full border rounded-md p-3">
            <h1 className='font-semibold'>My Address</h1>
            
            <div className="w-full grid grid-cols-4">
              <div className="w-[200px] bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
              <div className="w-[200px] bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
              <div className="w-[200px] bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
              <div className="w-[200px] bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
              <div className="w-[200px] bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
            </div>
          </div>
          <div className="w-full border rounded-md p-3 mt-6">
            <h1 className='font-semibold'>My Orders</h1>

            <div className="w-full">
              <div className="w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
              <div className="w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
              <div className="w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
              <div className="w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
                <p>Address Line 1</p>
                <p>Address Line 2</p>
                <p>City</p>
                <p>State</p>
                <p>Zip Code</p>
              </div>
              <div className="w-full bg-slate-100 border p-2 rounded-md mt-2 text-sm shadow">
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
    </div>
  )
}

export default Profile
