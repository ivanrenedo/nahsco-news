import React, { ReactNode } from 'react';


interface BaseShape {
    children: ReactNode;
}

const BaseShape: React.FC<BaseShape> = ({ children }) => {

    return (
        <>
            <div className="window-full diplay-block z-index-0 font-inherit">
                <div className="diplay-block z-index-0 font-inherit min-height-inherit">
                    <div className="diplay-block z-index-0 font-inherit min-height-inherit">
                        <div className="main-container m-in-auto box-sizing z-index-0 font-inherit min-height-inherit overflow-h-x overflow-h-y">
                            <div className="main-content box-sizing z-index-0 min-width-0 min-height-inherit font-inherit header-p-l header-p-r">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BaseShape;                     