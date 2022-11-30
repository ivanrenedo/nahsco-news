import React, { ReactNode, useEffect, useState } from 'react';
import HeadComponent from '@components/header';
import FooterComponent from '@components/footer';
import HeaderMainComponent from '@components/header/frontend';
import AsideComponent from './general/asideComponent';
import Link from 'next/link';
import SocialMedia from '@components/pages/home/socialMedia';


interface LayoutMain {
    title: string;
    children: ReactNode;
}

const LayoutMain: React.FC<LayoutMain> = ({ children, title }) => {

    const [isOpenSidebar, setOpenSidebar] = useState(false);



    const onCloseSidebar = () => {
        setOpenSidebar(false) 
    }

    const onOpenSidebar = () => {
        setOpenSidebar(prev => !prev) 
    }

    useEffect(() => {

        if (isOpenSidebar) {
            document.getElementById('nahsco')!.style.overflow = "hidden"
        }else {
            document.getElementById('nahsco')!.style.overflow = "initial"
        }

        return() => {
            document.getElementById('nahsco')!.style.overflow = "auto"
        }

    }, [isOpenSidebar])
    


    return ( 
        <>
            <HeadComponent titulo={title}/>
            <div className={`sidebar__overlay${isOpenSidebar ? "" : " is-closed"}`} onClick={onCloseSidebar}></div>
            <HeaderMainComponent openSidebar={onOpenSidebar} />
            <div className=" width-100 min-width-0 max-width-100 overflow-h-x">
                <main className="position-rel main-page z-index-0 font-inherit" role="main">
                    <div className='position-rel box-sizing'>
                        <div className="position-rel box-sizing font-inherit text-black-var-1">
                            {children}
                        </div>
                    </div>
                </main>
                <aside className={`border-r-0 top-header sidebar-content z-index-0 font-inherit min-height-inherit box-sizing background-var1 rad-shadow${isOpenSidebar ? " open-leftSide" : " close-leftSide"}`}>
                    <AsideComponent pagelet="rightRail">
                        <div className="font-inherit scroll-aside scrollhost pespective-origin-rt transf-style overscroll-bihavior-y display-block">
                            <div className="font-inherit flex-grow display-block position-rel">
                                <div className="position-rel header-p-l header-p-r ">
                                    <div className="display-block font-inherit position-rel">
                                        <div className="display-flex flex-col flex-algn-center width-100">
                                            <div className="display-flex flex-algn-center flex-justify-between logo-size width-100 position-rel">
                                                <div className='logo-size logo-size display-flex flex-algn-center' onClick={onCloseSidebar}>
                                                    <Link href="/" as="/">
                                                        <a className="display-flex flex-algn-center">
                                                            <img src="/img/logo.png" alt="NAHSCO" srcSet='/img/logo.png' className='logo-size-img logo-contain float-left' />
                                                            <h1 className="brandname font-size-3 font-weight-1 p-l-4 text-error display-inline float-right">NAHSCO NEWS</h1>
                                                        </a>
                                                    </Link>
                                                </div>
                                                <button className="wrap-close menu-button border-r-50per display-flex flex-justify-center flex-algn-center" onClick={onCloseSidebar}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.758 17.2431L12.001 12.0001M17.244 6.75708L12 12.0001M12 12.0001L6.758 6.75708M12.001 12.0001L17.244 17.2431" stroke="#87878C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="display-block">
                                        <div className="display-block position-rel font-inherit box-sizing m-t-16">
                                            <ul className='position-rel box-sizing font-inherit display-flex flex-col aside-nav'>
                                                <li className='display-flex tab__item' onClick={onCloseSidebar}>
                                                    <Link href="/news" as="/news">
                                                        <a aria-label='news' className="p-b-8 p-t-8 p-l-8 p-r-8">
                                                            <span className='font-size-4 font-weight-3 text-black-var-2'>News</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className='display-flex tab__item' onClick={onCloseSidebar}>
                                                    <Link  href="/people" as="/people">
                                                        <a aria-label='people' className="p-b-8 p-t-8 p-l-8 p-r-8">
                                                            <span className='font-size-4 font-weight-3 text-black-var-2'>People</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className='display-flex tab__item' onClick={onCloseSidebar}>
                                                    <Link  href="/service-companies" as="/service-companies">
                                                        <a aria-label='Service companies' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10">
                                                            <span className='font-size-4 font-weight-3 text-black-var-2'>Service companies</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className='display-flex tab__item' onClick={onCloseSidebar}>
                                                    <Link  href="/iocs" as="/iocs">
                                                        <a aria-label='Service companies' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10">
                                                            <span className='font-size-4 font-weight-3 text-black-var-2'>IOCs</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className='display-flex tab__item' onClick={onCloseSidebar}>
                                                    <Link  href="/events" as="/events">
                                                        <a aria-label='events' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10">
                                                            <span className='font-size-4 font-weight-3 text-black-var-2'>Events</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className='display-flex tab__item' onClick={onCloseSidebar}>
                                                    <Link  href="/jobs" as="/jobs">
                                                        <a aria-label='jobs' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10">
                                                            <span className='font-size-4 font-weight-3 text-black-var-2'>Jobs</span>
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="display-block font-inherit position-rel box-sizing m-t-45">
                                            <div className="text-black-var-2 font-size-7 footer-text-center footer-slogan m-in-auto p-b-8">NAHSCO NEWS is a Equatorial Guinea's leading hydrocarbons sector news hub.</div>
                                            <div className="aside-icon-container">
                                                <SocialMedia />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                  
                        </div>
                    </AsideComponent>
                </aside>
                <FooterComponent />
            </div>
        </>
    )
}

export default LayoutMain;                     