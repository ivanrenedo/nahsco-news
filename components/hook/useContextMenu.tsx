import { RefObject, useEffect, useState } from "react";

interface Prop {
    targetId: string;
    contextRef: RefObject<HTMLElement>
}


const useContextMenu = ({targetId, contextRef}: Prop) => {
    const [contextData, setContextData] = useState({visible: false});

    useEffect(() => {
        const handleOnClick = (e) => {
            const targetElement = document.getElementById(targetId);
           
            if (targetElement && targetElement.contains(e.target)) {
                e.preventDefault();
                setContextData({visible: true})

                const right = (window.innerWidth - targetElement.getBoundingClientRect().right) > contextRef.current?.offsetWidth!;
                const left = !right;
                const top = (window.innerHeight - targetElement.getBoundingClientRect().top) > contextRef.current?.offsetHeight!;
                const bottom = !top
            
                if (top) {
                    contextRef.current!.style.top = `${targetElement.getBoundingClientRect().top + 20}px`
                } 
                if (bottom) {
                    contextRef.current!.style.top = `${targetElement.getBoundingClientRect().bottom - contextRef.current?.offsetHeight! - 20}px`
                }

                if (right) {
                    contextRef.current!.style.left = `${targetElement.getBoundingClientRect().left + 20}px`
                }
                if (left) {
                    contextRef.current!.style.left = `${targetElement.getBoundingClientRect().left - contextRef.current?.offsetWidth! - 20}px`
                }
                
            }else if(contextRef.current && !contextRef.current!.contains(e.target)){
                setContextData({visible: false})
            }
        }; 

        document.addEventListener("click", handleOnClick);
        
        return () => {
            document.removeEventListener("click", handleOnClick);
        } 

    }, [contextData, targetId]);
      
    return {contextData, setContextData}
}

export default useContextMenu;