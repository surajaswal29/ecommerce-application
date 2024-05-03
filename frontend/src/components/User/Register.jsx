import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../redux/actions/userActions"
import { clearUserError } from "../../redux/reducers/userReducer"

const Register = () => {
    const { theme } = useSelector(state => state.utility)
    const dispatch = useDispatch()
    const { isOTPSent, error } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const [user, setUser] = useState({
        uname: "",
        c_password: "",
        email: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] = useState("")

    const { c_password, email, password, uname } = user

    const registerSubmit = (e) => {
        e.preventDefault()
        // Perform registration logic here
        dispatch(registerUser(user))
    }

    const registerDataChange = (e) => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })

        if (name === "password") {
            if (value.length < 8 || !value.match(/^(?=.*[a-zA-Z])(?=.*\d)/)) {
                setErrorMessage("Password must be at least 8 characters long and contain at least one letter and one number.");
            } else {
                setErrorMessage("");
            }
        }

        if (name === "c_password") {
            if (value !== password) {
                setErrorMessage("Passwords do not match");
            } else {
                setErrorMessage("");
            }
        }
    }

    React.useEffect(() => {
        if (isOTPSent) {
            navigate("/user/verify-otp", {
                state: { email: email }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOTPSent, navigate])
    return (
        <>
            <div
                className={`w-full max-w-md mt-3 text-sm ${theme === "light" ? "bg-white" : "bg-[#101419] text-white"
                    }  rounded-lg p-6 shadow-md`}
            >
                <form onSubmit={registerSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='uname' className='block'>
                            Full Name
                        </label>
                        <input
                            required
                            type='text'
                            name='uname'
                            id='uname'
                            value={uname}
                            placeholder='Enter Full Name'
                            onChange={registerDataChange}
                            className='w-full focus:outline-none bg-transparent border border-slate-300 p-2 mt-2 rounded'
                            autoComplete='uname'
                        />
                    </div>

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
                            onChange={registerDataChange}
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
                            onChange={registerDataChange}
                            className='w-full focus:outline-none bg-transparent border border-slate-300 p-2 mt-2 rounded'
                            autoComplete='new-password'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='c_password' className='block'>
                            Confirm Password
                        </label>
                        <input
                            required
                            type='text'
                            name='c_password'
                            id='c_password'
                            value={c_password}
                            placeholder='Enter confirm password'
                            onChange={registerDataChange}
                            className='w-full focus:outline-none bg-transparent border border-slate-300 p-2 mt-2 rounded'
                            autoComplete='new-password'
                        />
                    </div>
                    <div className='w-full mb-4'>
                        {/* Placeholder for displaying errors */}
                        <p className='text-xs text-red-400'>{errorMessage || error}</p>
                    </div>
                    <div className='mb-4'>
                        <button
                            type='submit'
                            name='submit'
                            id='submit'
                            disabled={errorMessage || error ? true : false}
                            className='btn btn-primary w-full bg-blue-500 text-white text-sm font-medium rounded-md p-2'
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-full mt-6 text-center mb-3'>
                <span>
                    Already have an account? {""}
                    <Link to={"/user/login"} onClick={() => dispatch(clearUserError())} className='text-blue-500'>
                        Sign in
                    </Link>
                </span>
            </div>
        </>
    )
}

export default Register
