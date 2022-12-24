import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';


const PortalOne = ( {id, children} ) => {
  const ref = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    ref.current = document.getElementById(id)!
    setMounted(true)
  }, [id])
  
  return  mounted ? createPortal(
    <div className={"modal-wrapper"}>
      <div className={"modal-backdrop"} > 
        <div className={"modal-box upload-page"}>
            {children}
        </div>
      </div>
    </div>, 
    ref.current!
  ) : null
};

export default PortalOne;