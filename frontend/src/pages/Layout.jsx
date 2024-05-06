/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import React, { useEffect } from "react"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import Modal from "../components/Modal"
import Loader from "../components/Loader"
import MobileNav from "../components/MobileNav"
import { getUserInfo } from '../redux/actions/userActions'

const Layout = ({ children }) => {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  if (loading) {
    return (
      <Modal>
        <Loader />
      </Modal>
    )
  }

  return (
    <div className='bg-slate-100 relative h-screen md:h-auto'>
      <Navbar />

      {children}
      <footer className='w-full h-[300px] bg-slate-700'></footer>

      <MobileNav />
    </div>
  )
}

export default Layout
