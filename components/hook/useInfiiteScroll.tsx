import {useEffect} from 'react';



const useInfiniteScrollObserver = ({
  rootRef,
  targetRef,
  setItemPerPage,
  onIntersectCallback
}) => {
  
  useEffect(() => {

    if (rootRef.current && targetRef.current) {
      
        const interceptConfig = {
          rootMargin: "0px",
          threshold: 1
        }
     
        const observer = new IntersectionObserver(entries =>  {
          if (entries.every(entry => entry.isIntersecting)) {
            onIntersectCallback()
            setItemPerPage(prev => prev + 16);
          }
        }, interceptConfig)

        observer.observe(targetRef.current);

        return () => {
          observer.disconnect()
        }
    }


  }, [onIntersectCallback, rootRef.current, targetRef.current]);
  
}


export default useInfiniteScrollObserver;
  