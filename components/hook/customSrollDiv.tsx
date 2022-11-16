import { useState, useCallback, useEffect } from "react";


const SCROLL_BOX_MIN_HIEGHT = 20;


const CustomScrollDiv = (scrollHostRef) => {
    
    const [hovering, setHovering] = useState(false);
    const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HIEGHT);
    const [scrollBoxTop, setScrollBoxTop] = useState(0);
    const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
    const [isDragging, setDragging] = useState(false);

    const handlerMouseOver = useCallback(() => {
      
      const scrollHostElement = scrollHostRef?.current;
      const { scrollHeight, offsetHeight } = scrollHostElement!;
      let toggleButton = scrollHeight! > offsetHeight!;
      
      !hovering && setHovering(toggleButton);
    }, [hovering]);

    const handlerMouseOut = useCallback(() => {
        !!hovering && setHovering(false);
    }, [hovering]);

    const handleDocumentMouseUp = useCallback(
        e => {
        if (isDragging) {
            e.preventDefault();
            setDragging(false);
        }
        },
        [isDragging]
    );

  const handleDocumentMouseMove = useCallback(
    e => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        const scrollHostElement = scrollHostRef?.current;
        const { scrollHeight, offsetHeight } = scrollHostElement;

        let deltaY = e.clientY - lastScrollThumbPosition;
        let percentage = deltaY * (scrollHeight / offsetHeight);

        setScrollThumbPosition(e.clientY);
        setScrollBoxTop(
          Math.min(
            Math.max(0, scrollBoxTop + deltaY),
            offsetHeight - scrollBoxHeight
          )
        );
        scrollHostElement.scrollTop = Math.min(
          scrollHostElement.scrollTop + percentage,
          scrollHeight - offsetHeight
        );
      }
    },
    [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
  );

  const handlerDocumentMouseDown = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setScrollThumbPosition(e.clientY);
    setDragging(true);
    console.log("handleScrollThumbMouseDown");
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollHostRef) {
      return;
    }
    const scrollHostElement = scrollHostRef?.current;
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;

    let newTop = (parseInt(scrollTop, 10) / parseInt(scrollHeight, 10)) * offsetHeight;
    // newTop = newTop + parseInt(scrollTop, 10);
    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
    setScrollBoxTop(newTop);
  }, [scrollBoxHeight]);


  useEffect(() => {
    const scrollHostElement = scrollHostRef?.current;
    const { clientHeight, scrollHeight } = scrollHostElement;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const scrollThumbHeight = Math.max(
      scrollThumbPercentage * clientHeight,
      SCROLL_BOX_MIN_HIEGHT
    );
    setScrollBoxHeight(scrollThumbHeight);
    
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    
    return function cleanup() {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    //this is handle the dragging on scroll-thumb
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
  
    return function cleanup() {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

    
    return{
        handlerMouseOver,
        handlerMouseOut,
        handlerDocumentMouseDown,
        hovering,
        scrollBoxHeight,
        scrollBoxTop
    }
}

export default CustomScrollDiv;