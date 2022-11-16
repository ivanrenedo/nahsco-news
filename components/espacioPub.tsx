
import React from 'react';





const PubSpace = ({children}) => {


    return (
        <div className="position-rel display-block box-sizing font-inherit overflow-h-x overflow-h-y">
            <div className="neutral-var-4 display-flex flex-justify-center flex-grow" style={{minHeight: 150, maxHeight: '300px'}}>
                {children}
            </div>
        </div>
    )
}


export default PubSpace;