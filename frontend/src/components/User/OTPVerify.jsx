import { useLocation, useNavigate } from "react-router-dom"
import React from "react"
import { MuiOtpInput } from "mui-one-time-password-input"
import { useDispatch, useSelector } from "react-redux"
import { resendOtp, verifyOtp } from "../../redux/actions/userActions"

const OTPVerify = () => {
    const { theme } = useSelector((state) => state.utility)
    const [otp, setOtp] = React.useState("")
    const [otpError, setOtpError] = React.useState(false)
    const [timer, setTimer] = React.useState(30)

    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const { isOTPResent, isOTPVerified, message, error } = useSelector(
        (state) => state.user
    )

    const handleSubmit = () => {
        if (otp.length !== 6) {
            setOtpError("Invalid OTP!")
            return
        }
        dispatch(
            verifyOtp({
                email: state.email,
                otp: parseInt(otp)
            })
        )
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleResendOTP = () => {
        dispatch(
            resendOtp({
                email: state.email,
            })
        )

        setTimer(30)
    }

    const handleChange = (newValue) => {
        setOtp(newValue)
    }

    const calculateTime = (t) => {
        let seconds = t % 60
        let minutes = Math.floor(t / 60)

        if (t > 60) {
            return (
                (minutes < 10 ? "0" : "") +
                minutes +
                ":" +
                (seconds < 10 ? "0" : "") +
                seconds
            )
        } else {
            return "00:" + (t < 10 ? "0" : "") + t
        }
    }

    React.useEffect(() => {
        const timerId = setTimeout(() => {
            setTimer((prevTimer) => prevTimer - 1)
        }, 1000)

        return () => {
            clearTimeout(timerId)
        }
    }, [timer])


    React.useEffect(() => {
        if (isOTPVerified) {
            navigate("/user/login")
        }
    }, [isOTPVerified, navigate])
    return (
        <>
            <div
                className={`w-full max-w-md mt-3 text-sm ${theme === "light" ? "bg-white" : "bg-[#101419] text-white"
                    }  rounded-lg p-6 shadow-md`}
            >
                <span onClick={handleBack} className="my-2 text-blue-700 text-xs">back</span>
                <h1 className='text-xl font-semibold my-3'>Enter OTP</h1>
                <p className='text-gray-600 mb-4'>
                    An OTP has been sent to your email. Please enter the code below:
                </p>
                <MuiOtpInput
                    value={otp}
                    onChange={handleChange}
                    length={6}
                    variant='filled'
                    TextFieldsProps={{
                        className: "text-center",
                        inputProps: {
                            className: "text-center otp-input",
                            style: {
                                padding: "10px",
                                fontSize: "20px",
                            },
                        },
                    }}
                />
                <div className='w-full flex items-center justify-between mt-3'>
                    <div className='flex-1'>{timer > 0 ? calculateTime(timer) : "00:00"}</div>
                    <div className='flex-1'>
                        <p className='text-gray-600 text-xs whitespace-nowrap'>
                            Didn&apos;t receive the OTP?{" "}
                            <button
                                onClick={handleResendOTP}
                                disabled={timer > 0}
                                className={`${timer <= 0
                                    ? "bg-blue-500 cursor-pointer"
                                    : "bg-blue-200 cursor-not-allowed"
                                    } ml-1 p-2 rounded-md text-white`}
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                </div>
                <p className='text-red-400 mt-3 text-xs font-medium' id='error-box'>
                    {otpError || error}
                </p>
                {isOTPResent && <p className='text-green-500 text-sm mt-3'>{message}</p>}
                <button
                    type='button'
                    onClick={handleSubmit}
                    className='btn btn-primary w-full bg-blue-500 text-white text-sm font-medium rounded-md p-2 mt-3'
                >
                    Verify
                </button>
            </div>
        </>
    )
}

export default OTPVerify
