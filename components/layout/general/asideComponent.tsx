import React, {ReactNode} from 'react';

interface AsideComponent {
    pagelet?: string;
    children: ReactNode
}

const AsideComponent: React.FC<AsideComponent> = ({pagelet="leftRail", children}) => {

    return (    
        <div className="box-sizing font-inherit position-rel">
            <div className="font-inherit position-rel pespective-origin-rt pespective-1 will-change">
                <div className="font-inherit position-rel">
                    <div className="pagelet font-inherit position-rel" data-pagelet={pagelet}>
                        <div className="box-sizing font-inherit position-rel">
                            {children}             
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default AsideComponent;