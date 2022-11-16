import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';



const ConfirmationModal = ( {id, isOpen, onClose, children} ) => {
  const ref = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {

    isOpen ? document.body.classList.add("modal-open") : document.body.classList.remove("modal-open");
    ref.current = document.getElementById(id)!
    
    setMounted(true)

    return () => {
      document.body.classList.remove("modal-open")
    }

  }, [isOpen])

  if(isOpen) {
    return  mounted ? createPortal(
      <div className="modal-wrapper">
        <div className="main-modal-backdrop box-sizing position-rel display-flex flex-justify-center flex-algn-center">
          <div className="backskip position-abs display-flex flex-justify-center box-sizing" onClick={() => onClose()}></div>
          <div className="main-modal-box">
            {children}
          </div>
        </div>
      </div>,
      ref.current!
    ) : null
  }else {
    return null
  }
};

export default ConfirmationModal;