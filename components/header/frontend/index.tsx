import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { t } from '@lingui/macro';

import LocaleSwitcher from './locale-switcher';




const HeaderMainComponent = ({openSidebar}) => {
    let [windowWidth, setWindowWidth] = React.useState<number | undefined>();

    const { asPath, locale } = useRouter();




    React.useEffect(() => {
        /* Tab indicator */
        let navItem = document.querySelectorAll('.tab__item');
    
        navItem.forEach(item => {
            const router = item.children[0].getAttribute('href');
            const activePath = locale !== "en" ? `/${locale}${asPath}` : asPath;
           
            if (activePath === router ) {
               
                item.classList.add('tab__item--active')
            }else{
                item.classList.remove('tab__item--active')
            }
        });

        /* show navbar */
        const handleWindowWidth = () => {
            setWindowWidth(window.innerWidth)
        }

        const timer = setTimeout(() => {
            handleWindowWidth()
        }, 25);

        window.addEventListener('resize', handleWindowWidth)

        return () => {
            window.removeEventListener('resize', handleWindowWidth)
            clearTimeout(timer)
        }

    }, [windowWidth, asPath, locale]);



    return (
        <>
            <header className="display-flex flex-col flex-algn-center width-100 background-var1 position-stic top-0 z-index-10">
                <div className="display-flex flex-algn-center flex-justify-between width-100 position-rel z-index-12">
                    <div className='logo-size header-p-l display-flex flex-algn-center'>
                        <div className="font-inherit box-sizing position-rel display-flex flex-col z-index-0">
                            <div className="font-inherit box-sizing position-rel display-flex flex-algn-center z-index-0">
                                {/* <div className="z-index-10 hamburguer-wrap p-t-8 p-b-8">
                                    <div className="font-inherit box-sizing position-rel display-flex flex-col z-index-0 ">
                                        <div className="font-inherit box-sizing position-rel display-flex flex-col flex-justify-center z-index-0">
                                            <div className='font-inherit box-sizing position-rel display-flex flex-col z-index-0'>
                                                <div className='display-flex flex-algn-center flex-grow flex-justify-center'>
                                                    <button className='border-r-50per menu-button display-flex flex-justify-center flex-algn-center' onClick={openSidebar}>
                                                        <Menu />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className='font-inherit box-sizing position-rel display-flex flex-col z-index-0'>
                                    <div className='display-flex flex-algn-center flex-grow flex-justify-center'>
                                        <Link href="/" as="/">
                                            <a className=" display-flex flex-algn-center" href="/">
                                                <img src="/img/logo.png" alt="NAHSCO" className='logo-size-img logo-contain float-left' />
                                                <h1 className="brandname font-size-3 font-weight-1 p-l-4 text-error display-inline float-right">NAHSCO NEWS</h1>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='display-flex flex-algn-center'>
                    {/* class for local lingui-trans */}
                        <div className="position-abs right-0 header-p-r"><LocaleSwitcher /></div>
                        {/* <SearchComponent searchArr={allPost} /> */}
                    </div>
                </div>
                <nav className="display-block width-100 nav-list-section">
                    <div className="font-inherit box-sizing position-rel display-flex flex-col z-index-0 background-var1 width-100">
                        <div className="font-inherit box-sizing position-rel display-flex flex-col flex-justify-center z-index-0">
                            <div className='font-inherit box-sizing position-rel display-flex flex-col z-index-0'>
                                <div className='display-flex flex-algn-center flex-grow flex-justify-center'>
                                    <ul className='display-flex follow-request navegation-container slider-promotion position-rel overflow-auto-x overflow-h-y width-100'>
                                        <li className='m-l-8 tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link href="/news" as="/news">
                                                <a aria-label={t`News`} className="p-b-8 p-t-8 p-l-8 p-r-8">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>{t`News`}</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='display-flex tab__item'>
                                            <Link  href="/iocs" as="/iocs">
                                                <a aria-label='Service companies' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10">
                                                    <span className='font-size-4 font-weight-3 text-black-var-2'>IOCs</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link href="/service-companies" as="/service-companies">
                                                <a aria-label={t`Service companies`} className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10 font-size-4 font-weight-3">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>{t`Service companies`}</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link href="/people" as="/people">
                                                <a aria-label={t`People`} className="p-b-8 p-t-8 p-l-8 p-r-8 font-size-4 font-weight-3">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>{t`People`}</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link href="/events" as="/events">
                                                <a aria-label={t`Events`} className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10 font-size-4 font-weight-3">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>{t`Events`}</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link href="/jobs" as="/jobs">
                                                <a aria-label={t`Jobs`} className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10 font-size-4 font-weight-3">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>{t`Jobs`}</span>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default HeaderMainComponent;                     