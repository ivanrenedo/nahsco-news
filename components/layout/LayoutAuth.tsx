import React, { ReactNode } from 'react';
import HeadComponent from '@components/header';
import FooterComponent from '@components/footer';
import HeaderMainComponent from '@components/header/frontend';


interface LayoutMain {
    title: string;
    children: ReactNode;
}

const LayoutMain: React.FC<LayoutMain> = ({ children, title }) => {

    return ( 
        <>
            <HeadComponent titulo={title}/>
            <HeaderMainComponent />
            <div className=" width-100 min-width-0 max-width-100 overflow-h-x">
                <main className="position-rel main-page z-index-0 font-inherit" role="main">
                    <div className='position-rel box-sizing'>
                        <div className="position-rel box-sizing font-inherit text-black-var-1">
                            {children}
                        </div>
                    </div>
                </main>
                <FooterComponent />
            </div>
        </>
    )
}

export default LayoutMain;                     