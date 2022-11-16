import React from 'react';
import CustomScrollDiv from '@components/hook/customSrollDiv';



const CustomScrollShape = ({scrollHostRef, children}) => {


    const {
        handlerMouseOver,
        handlerMouseOut,
        handlerDocumentMouseDown,
        hovering,
        scrollBoxHeight,
        scrollBoxTop
    } = CustomScrollDiv(scrollHostRef);

    let height = scrollBoxHeight ? scrollBoxHeight : 0;
    let width = scrollBoxTop ? scrollBoxTop : 0
   
    return (
        <>
            <div 
            className="scrollhost-container position-rel font-inherit min-height-0 pespective-origin-rt pespective-1 will-change display-flex flex-col flex-shrink flex-grow flex-basis-100 overflow-h-y p-b-16 p-r-16 p-l-16 p-t-8 "
            onMouseOver={handlerMouseOver}
            onMouseOut={handlerMouseOut}
            onTouchMove={handlerMouseOver}
            onTouchEnd={handlerMouseOut}
            >
                <div className="font-inherit display-flex flex-col flex-grow">
                    {children}
                </div>
                <div className={`scroll-bar m-r-4 ${hovering ? " active" : ""}`} style={{opacity: hovering ? 1 : 0}}>
                    <div 
                    className="scroll-thumb" 
                    style={{height: height, top: width}}
                    onMouseDown={handlerDocumentMouseDown}
                    ></div>
                </div>
            </div>
        </>
    ) 
};

export default CustomScrollShape;