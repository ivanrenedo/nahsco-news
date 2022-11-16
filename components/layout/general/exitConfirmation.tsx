import React from 'react';

interface ExitConfirmation {
    children: React.ReactNode;
    title: string;
    message: string;
}


const ExitConfirmation = ({title, message, children}) => {
    
    

    return(
        <>
            <div className="exit-confirmation-wrap card-item-component position-rel">
                <div className="width-100 p-l-16 p-r-16 p-t-16 p-b-16">
                    <div className="display-flex flex-col z-index-0 box-sizing">
                        <div className="display-flex flex-col flex-shrink-1 confirmation-header--container">
                            <div className="font-size-title font-weight-3">{title}</div>
                            <p className="confirmation-header--container-message">{message}</p>
                        </div>
                        <div className="exit-confirmation-buttons display-flex flex-grow box-sizing m-t-16">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExitConfirmation;