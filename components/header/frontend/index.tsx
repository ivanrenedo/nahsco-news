import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Menu from '@components/icons/menu';



const HeaderMainComponent = () => {
    let [windowWidth, setWindowWidth] = React.useState<number | undefined>();

    const { asPath } = useRouter();


    React.useEffect(() => {
        /* Tab indicator */
        let navItem = document.querySelectorAll('.tab__item');

        navItem.forEach(item => {
            const router = item.children[0].getAttribute('href')

            if (asPath === router) {
               
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

    }, [windowWidth, asPath]);



    return (
        <>
            <header className="display-flex flex-algn-center logo-size width-100 background-var1 position-stic top-0 z-index-10">
                <button className='logo-size z-index-10 logo-size left-0 position-fix top-0 header-p-l'>
                    <div className="font-inherit box-sizing position-rel display-flex flex-col z-index-0 logo-size background-var1">
                        <div className="font-inherit box-sizing position-rel display-flex flex-col flex-justify-center z-index-0">
                            <div className='font-inherit box-sizing position-rel display-flex flex-col z-index-0 logo-size'>
                                <div className='display-flex flex-algn-center flex-grow flex-justify-center'>
                                    <Link href="/" as="/">
                                        <a className=" display-flex flex-algn-center" href="/">
                                            <img src="img/logo.png" alt="NAHSCO" srcSet='img/logo.png' className='logo-size-img logo-contain float-left' />
                                            <h1 className="brandname font-size-3 font-weight-1 p-l-4 text-error display-inline float-right">NAHSCO NEWS</h1>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
                <nav className="logo-size right-0 left-0 position-fix top-0 navegation-wrap">
                    <div className="font-inherit box-sizing position-rel display-flex flex-col z-index-0 logo-size background-var1">
                        <div className="font-inherit box-sizing position-rel display-flex flex-col flex-justify-center z-index-0">
                            <div className='font-inherit box-sizing position-rel display-flex flex-col z-index-0 logo-size'>
                                <div className='display-flex flex-algn-center flex-grow flex-justify-center p-inl-header'>
                                    <ul className='position-rel box-sizing font-inherit display-flex'>
                                        <li className='m-l-8 tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link  href="/[...index]" as="/news">
                                                <a aria-label='news' className="p-b-8 p-t-8 p-l-8 p-r-8">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>News</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='m-l-8 tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link  href="/[...index]" as="/people">
                                                <a aria-label='people' className="p-b-8 p-t-8 p-l-8 p-r-8 font-size-4 font-weight-3">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>People</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='m-l-8 tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link  href="/[...index]" as="/service-companies">
                                                <a aria-label='Service companies' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10 font-size-4 font-weight-3">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>Service companies</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='m-l-8 tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link  href="/[...index]" as="/service-companies">
                                                <a aria-label='Service companies' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10 font-size-4 font-weight-3">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>Events</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='m-l-8 tab__item display-flex flex-justify-center flex-algn-center border-r-20'>
                                            <Link  href="/[...index]" as="/Jobs">
                                                <a aria-label='Jobs' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10 font-size-4 font-weight-3">
                                                    <span className='font-size-4 font-weight-3 text-black-var-1'>Jobs</span>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="z-index-10 logo-size position-fix top-0 right-0 border-0 header-p-r contact-wrap">
                    <div className="font-inherit box-sizing position-rel display-flex flex-col z-index-0 logo-size background-var1 ">
                        <div className="font-inherit box-sizing position-rel display-flex flex-col flex-justify-center z-index-0">
                            <div className='font-inherit box-sizing position-rel display-flex flex-col z-index-0 logo-size'>
                                <div className='display-flex flex-algn-center flex-grow flex-justify-center'>
                                   <button className='p-l-24 p-r-24 p-b-12 p-t-12 border-r-20 border-primary text-primary-var-1 contact-us'>
                                        <span className='font-weight-3'>Contact us</span>
                                   </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="z-index-10 logo-size position-fix top-0 right-0 border-0 header-p-r hamburguer-wrap">
                    <div className="font-inherit box-sizing position-rel display-flex flex-col z-index-0 logo-size background-var1 ">
                        <div className="font-inherit box-sizing position-rel display-flex flex-col flex-justify-center z-index-0">
                            <div className='font-inherit box-sizing position-rel display-flex flex-col z-index-0 logo-size'>
                                <div className='display-flex flex-algn-center flex-grow flex-justify-center'>
                                    <button className='border-r-50per menu-button display-flex flex-justify-center flex-algn-center'>
                                        <Menu />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderMainComponent;                     