import Link from 'next/link';
import React from 'react';
import { t } from '@lingui/macro';
import SocialMedia from '@components/pages/home/socialMedia';


const FooterComponent = () => {
    
    let date = new Date();
    
    return (    

        <footer className="display-block position-rel footer footer-container font-inherit neutral-var-1 p-t-64 font-size-6 width-100">
            <div className="display-flex header-p-l header-p-r p-b-64 wrap-footer-sec-1 flex-gap-footer">
                <div className="display-flex wrap-footer-sec-1 flex-gap-footer">
                    <div className="display-block font-inherit position-rel box-sizing">
                        <div className="text-error font-size-3 font-weight-2 p-b-16 footer-text-center">NAHSCO NEWS</div>
                        <div className="text-white-var-1 footer-text-center footer-slogan m-in-auto p-b-16">{t`NAHSCO NEWS is a Equatorial Guine's leading hydrocarbons sector news hub.`}</div>
                        <div className="social-media-footer">
                            <SocialMedia />
                        </div>
                    </div>
                    <div className="display-block position-rel font-inherit box-sizing">
                        <ul className='position-rel box-sizing font-inherit display-flex flex-col footer-center-nav'>
                            <li className='display-flex footer-center'>
                                <Link  href="/[...index]" as="/news">
                                    <a aria-label='news' className="p-b-8 p-t-8 p-l-8 p-r-8">
                                        <span className='font-size-5 font-weight-3 text-white-var-1'>{t`News`}</span>
                                    </a>
                                </Link>
                            </li>
                            <li className='display-flex footer-center'>
                                <Link  href="/[...index]" as="/people">
                                    <a aria-label='people' className="p-b-8 p-t-8 p-l-8 p-r-8">
                                        <span className='font-size-5 font-weight-3 text-white-var-1'>{t`People`}</span>
                                    </a>
                                </Link>
                            </li>
                            <li className='display-flex footer-center'>
                                <Link  href="/[...index]" as="/service-companies">
                                    <a aria-label='Service companies' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10">
                                        <span className='font-size-5 font-weight-3 text-white-var-1'>{t`Service companies`}</span>
                                    </a>
                                </Link>
                            </li>
                            <li className='display-flex footer-center'>
                                <Link  href="/[...index]" as="/events">
                                    <a aria-label='events' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10">
                                        <span className='font-size-5 font-weight-3 text-white-var-1'>{t`Events`}</span>
                                    </a>
                                </Link>
                            </li>
                            <li className='display-flex footer-center'>
                                <Link  href="/[...index]" as="/jobs">
                                    <a aria-label='jobs' className="p-b-8 p-t-8 p-l-8 p-r-8 border-r-10">
                                        <span className='font-size-5 font-weight-3 text-white-var-1'>{t`Jobs`}</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="display-flex flex-col box-sizing font-inherit text-white-var-1">
                    <div className="footer-slogan line-height-3 footer-text-center m-in-auto p-b-12">{t`Contact us`}</div>
                    <div className="font-weight-4 display-flex footer-center font-size-4 m-t-4 text-dec">
                        contacto@nahsconews.com
                    </div>
                </div>
                <div className="display-flex flex-col text-white-var-1">
                    <div className="display-flex flex-algn-center footer-center m-b-12">
                        {t`Website created by`}
                        <div className="font-size-4 font-weight-2 m-l-4">SOLTEC SL</div>
                    </div>
                    <div className="display-flex flex-col">
                        <span className='display-flex footer-center'>{t`Contact us`}</span>
                        <div className='display-flex footer-center font-size-4 m-t-4'>tel: +240 222 626418</div>
                    </div>
                </div>
            </div> 
            <div className="display-flex flex-algn-center flex-justify-center flex-wrap primary-bg-1 width-100 p-b-16 p-t-16 header-p-l position-rel">
                <div className="footer-logo cursor-initial display-flex wrap-footer-sec-1">
                    <div className="display-flex flex-algn-center footer-center">
                        <Link  href="/" as="/">
                            <a aria-label='nahsco news'>
                                <span className='font-weight-1 text-error m-r-2'>NAHSCO NEWS</span>
                            </a>
                        </Link>
                    </div>
                    <span className="footer-copy-text neutral-color-2 font-size-7 text-align-c">{`© ${date.getFullYear()}`} - {t`EG's leading hydrocarbons sector news hub`}</span>   
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent;