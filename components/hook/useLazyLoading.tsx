import {useCallback, useEffect, useRef} from 'react';


interface Props {
    imgSelector: string;
    items?: any[]
}



const useLazyLoading = ({imgSelector, items}: Props) => {
  
    const imgObserver = useCallback(node => {   
      const intObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            const currentImg = en.target as HTMLLIElement;
            /* console.log(currentImg) */
            /* currentImg.style.opacity = '1'
            currentImg.style.transition = 'opacity 100ms linear' */
            intObs.unobserve(node);
          }
        });
      })
      intObs.observe(node);
    }, []);
  
    const imagesRef = useRef<any>();
  
    useEffect(() => {
      imagesRef.current = document.querySelectorAll(imgSelector);
      
      if (imagesRef.current) {
        imagesRef.current.forEach(img => imgObserver(img));
      }
    }, [imgObserver, imagesRef, imgSelector, items])
}

export default useLazyLoading;