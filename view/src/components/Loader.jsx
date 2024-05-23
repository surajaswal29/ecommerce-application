import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 50 50">
                <circle className="opacity-25" cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="currentColor"></circle>
                <circle className="opacity-75" cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="currentColor" strokeDasharray="31.4 94.2" strokeLinecap="round"></circle>
            </svg>
        </div>
    );
};

export default Loader;
