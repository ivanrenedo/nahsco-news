import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';



const PortalTwo = ( {id, zIndexValue, isOpen, onClose, children} ) => {
  const ref = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    
    if (typeof window !== "undefined") {
      const rootContainer = document.createElement("div");
      rootContainer.setAttribute("id", id);
      rootContainer.style.zIndex = zIndexValue

      const parentElement = document.querySelector(".main-page");
      parentElement?.insertAdjacentElement("afterend", rootContainer);

      ref.current = rootContainer;

      setMounted(true)
    }

  }, [])

  if(isOpen) {
    return  mounted ? createPortal(
      <div className="modal-wrapper">
        <div className="main-modal-backdrop box-sizing position-rel display-flex flex-justify-center" >
          <div className="backskip position-abs display-flex flex-justify-center box-sizing"  onClick={() => onClose()}></div>
          <div className="main-modal-box m-r-16 m-l-16">
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

export default PortalTwo;