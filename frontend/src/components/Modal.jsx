import React, { useEffect } from "react"
import { createPortal } from "react-dom"

const Modal = ({ children, onClickHandler }) => {
  useEffect(() => {
    // Store the original overflow style
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Cleanup function to restore the original overflow style
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return createPortal(
    <div
      className='absolute top-0 left-0 bg-black bg-opacity-65 z-50 w-full h-screen flex items-center justify-center overflow-hidden'
      onClick={onClickHandler}
    >
      {children}
    </div>,
    document.body
  );
}

export default Modal;
