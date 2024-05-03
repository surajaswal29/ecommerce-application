// eslint-disable-next-line no-unused-vars
import React from "react"
import { createPortal } from "react-dom"

const Modal = ({ children }) => {
  return createPortal(
    <div className='absolute top-0 left-0 bg-black bg-opacity-65 w-full h-screen flex items-center justify-center'>
      {children}
    </div>,
    document.body
  )
}

export default Modal