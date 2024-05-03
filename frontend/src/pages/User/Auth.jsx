/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal"
import Loader from "../../components/Loader"

const Auth = ({ title, children }) => {
    const { theme } = useSelector(state => state.utility)
    const { loading } = useSelector(state => state.user)
    return (
        <>
            {loading && (
                <Modal>
                    <Loader />
                </Modal>
            )}
            <div
                className={`container mx-auto ${theme === "light"
                    ? "bg-slate-100 text-slate-700"
                    : "bg-[#1f232b] text-slate-200"
                    }  h-screen`}
            >
                <div className='flex flex-col items-center'>
                    <div className='my-8'>
                        <Link to={"/"}>
                            <img
                                src={"/shopio_logo.png"}
                                alt='The shopio logo'
                                className='w-[200px]'
                            />
                        </Link>
                    </div>
                    <h1 className='text-3xl font-medium mb-4'>{title}</h1>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Auth
