import React, {ReactNode} from 'react';

import LeftIcon from '@components/icons/leftArrow';



interface Props {
   children: ReactNode;
   title: string;
   onClose: () => void;
}


const LayoutModal: React.FC<Props> = ({title, onClose, children}) => {


  
    return (
        <>
           <div className="main-modal-box-container box-sizing">
                <div className="nav-menu-header-wrap-container display-flex flex-col">
                    <div className="modal-header position-rel display-flex flex-col flex-shrink box-sizing p-t-16 p-b-16 z-index-0">
                        <div className="display-flex flex-grow flex-row flex-algn-center box-sizing min-height-0 p-r-16 p-l-16">
                            <button 
                            className="close-icon icon-button display-flex flex-algn-center flex-justify-center flex-shrink box-sizing z-index-0"
                            onClick={() => onClose()}
                            >
                                <span className="display-flex flex-algn-center"><LeftIcon /></span>
                            </button>
                            <span className="display-flex flex-algn-center flex-justify-center label-menu m-l-12 font-weight-1 font-size-3 display-block">{title}</span>
                        </div>
                    </div>
                    <div className="p-b-16 p-t-16">
                        <div className="font-inherit display-flex flex-col flex-grow">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) 
};

export default LayoutModal;