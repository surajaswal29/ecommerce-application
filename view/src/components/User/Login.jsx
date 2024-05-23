import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import Modal from "../../components/Modal"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo, loginUser } from "../../redux/actions/userActions"
// import Loader from "../../components/Loader"
import { clearUserError } from "../../redux/reducers/userReducer"

// eslint-disable-next-line react/prop-types
const Login = () => {
    const { theme } = useSelector(state => state.utility)
    const dispatch = useDispatch()
    const { isAuthenticated, error } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const { email, password } = user

    const handleSubmit = (e) => {
        e.preventDefault()
        // Perform registration logic here
        dispatch(loginUser(user))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }


    React.useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserInfo())
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    return (
        <>
            <div
                className={`w-full max-w-md mt-3 text-sm ${theme === "light" ? "bg-white" : "bg-[#101419] text-white"
                    }  rounded-lg p-6 shadow-md`}
            >
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block'>
                            Email
                        </label>
                        <input
                            required
                            type='email'
                            name='email'
                            id='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={handleInputChange}
                            className='w-full focus:outline-none bg-transparent border border-slate-300 p-2 mt-2 rounded'
                            autoComplete='email'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block'>
                            Password
                        </label>
                        <input
                            required
                            type='password'
                            name='password'
                            id='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={handleInputChange}
                            className='w-full focus:outline-none bg-transparent border border-slate-300 p-2 mt-2 rounded'
                            autoComplete='password'
                        />
                    </div>
                    <div className='w-full mb-4'>
                        {/* Placeholder for displaying errors */}
                        <p className='text-xs text-red-400'>{error}</p>
                    </div>
                    <div className='mb-4'>
                        <button
                            type='submit'
                            name='submit'
                            id='submit'
                            className='btn btn-primary w-full bg-blue-500 text-white text-sm font-medium rounded-md p-2'
                        >
                            login
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-full mt-6 text-center mb-3'>
                <span>
                    Don&apos;t have an account?
                    &nbsp;
                    <Link to={"/user/register"} onClick={() => dispatch(clearUserError())} className='text-blue-500'>
                        register
                    </Link>
                </span>
            </div>
        </>
    )
}

export default Login
