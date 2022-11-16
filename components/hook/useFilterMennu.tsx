import { RefObject, useEffect, useState } from "react";

interface Prop {
    targetId: string;
    contextRef: RefObject<HTMLElement>
}


const useFilterMenu = ({targetId, contextRef}: Prop) => {
    const [showMenu, setShowMenu] = useState({visible: false});

    const handleOnClick = (e) => {
        const targetElement = document.getElementById(targetId);
       
        if (targetElement && targetElement.contains(e.target)) {
            e.preventDefault();
            setShowMenu({visible: true}) 

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
                contextRef.current!.style.left = `${targetElement.getBoundingClientRect().right}px`
            }
            if (left) {
                contextRef.current!.style.left = `${targetElement.getBoundingClientRect().right - contextRef.current?.offsetWidth!}px`
            }
            
        }else if(contextRef.current && !contextRef.current!.contains(e.target)){
            setShowMenu({visible: false})
        }
    }; 

    useEffect(() => {
        

        document.addEventListener("click", handleOnClick);

        return () => {
            
            document.removeEventListener("click", handleOnClick);
        } 

    }, [showMenu, targetId]);


      
    return {showMenu, setShowMenu}
}

export default useFilterMenu;