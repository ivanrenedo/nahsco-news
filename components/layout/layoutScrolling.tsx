import React, {ReactNode} from 'react';

import CustomScrollShape from '@components/layout/general/customScroll';



interface Props {
   children: ReactNode;
   customRef: React.RefObject<HTMLDivElement>;
}


const LayoutScrolling: React.FC<Props> = ({children, customRef}) => {


  
    return (
        <>
           <CustomScrollShape scrollHostRef={customRef}>
                <div className="width-100 max-width-100 display-block box-sizing">
                    <div className="font-inherit display-flex flex-algn-stretch flex-justify-center">
                        <div className="width-100 max-width-100 display-block flex-basis-0 flex-shrink flex-grow z-index-0 font-inherit">
                            <div className="display-flex width-100">
                                <div className="box-sizing width-100 z-index-0 display-block">
                                    <div className="z-index-0 box-sizing width-100 display-flex flex-col flex-shrink">
                                        <div className="display-flex flex-col flex-grow z-index-0 box-sizing">
                                            <div className="display-flex flex-col box-sizing">
                                                <div className="display-flex flex-col flex-grow box-sizing">
                                                    <div ref={customRef} className="card-body--surface min-height-0 max-height-inherit scrollhost overflow-h-x overflow-auto-y pespective-origin-rt transf-style overscroll-bihavior-y z-index-0 display-flex flex-col">
                                                        <div className="display-flex flex-col flex-grow box-sizing position-rel p-r-16 p-l-16">
                                                            {children} 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomScrollShape>
        </>
    ) 
};

export default LayoutScrolling;