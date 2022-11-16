import {useState, useCallback, useEffect, useRef} from 'react';



const stickyHeader = (scrollTop, scrollBottom) => {

    const [lastScrollTop, setlastScrollTop] = useState<number | undefined>();

    const headerRef = useRef<HTMLDivElement>(null);

    

    const toggleSticky = useCallback((header) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            
            if (scrollTop > lastScrollTop!) {
                header.style.transform = `translateY(-${scrollTop}px)`
            }else {
                header.style.transform = `translateY(${scrollBottom}px)`
            }
        }

        setlastScrollTop(scrollTop)
    }, [lastScrollTop])

    
    useEffect(() => {

        const handleScroll = () => {
            toggleSticky(headerRef.current);
        };

        window.addEventListener('scroll', handleScroll)
    

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [toggleSticky]);

    return {
        headerRef
    }

}

export default stickyHeader