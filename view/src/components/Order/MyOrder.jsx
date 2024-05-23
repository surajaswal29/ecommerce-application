import React from "react"

const MyOrder = () => {
    return (
        <div className='w-full border rounded-md p-3 mt-6'>
            <h1 className='font-semibold'>My Orders</h1>

            <div className='w-full'>
                <div className='w-full h-[100px] flex bg-slate-50 border p-2 rounded-md mt-2 text-sm shadow'>
                    <div className='w-2/12 rounded-md overflow-hidden'>
                        <img
                            src='https://placehold.co/300'
                            alt='Order Image'
                            className='w-full h-full'
                        />
                    </div>

                    <div className='w-7/12 border'>
                        <h1>Product Name</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
                            soluta dolorum aperiam repellendus rem, sit exercitationem
                            adipisci corporis qui sed quo tenetur possimus nam laudantium
                            voluptatum veniam, perspiciatis aliquid nesciunt?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrder
