import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';


const OptionPortal = ( {id, isOpen, onClose} ) => {
  const ref = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(id)
    setMounted(true)
  }, [id])
  
  if(isOpen) {
    return  mounted ? createPortal(
      <div className="modal-wrapper">
        <div className="main-modal-backdrop box-sizing position-rel display-flex flex-justify-center" style={{backgroundColor: 'initial'}}>
          <div className="backskip position-abs display-flex flex-justify-center box-sizing"  onClick={() => onClose()}></div>
        </div>
      </div>,
      ref.current!
    ) : null
  }else {
    return null
  }
};

export default OptionPortal;