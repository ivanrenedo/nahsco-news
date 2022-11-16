
import React from 'react';





const LargePubSpace = ({children}) => {


    return (
        <div className="position-rel display-block box-sizing font-inherit overflow-h-x overflow-h-y">
            <div className="neutral-var-4 display-flex flex-justify-center flex-grow m-t-16" style={{maxHeight: 400, minHeight: 200}}>
                {children}
            </div>
        </div>
    )
}


export default LargePubSpace;