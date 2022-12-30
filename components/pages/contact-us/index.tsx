import React from 'react';
import LinkedIndIcon from '@components/icons/linkedin';
import TwitterIcon from '@components/icons/twitter';
import { t } from '@lingui/macro';




const ContactUsComponent = () => {
    

    function goto(url) {
        window.open(url);
    }

  
    return(
        <section className="section-list-post  z-index-0 font-inherit min-height-inherit box-sizing display-flex">
            <div className="font-inherit display-block width-100  p-l-24 p-r-24 p-t-24 p-b-24 border-r-20">
                <div className="display-block position-rel font-inherit p-b-24">
                    <h2 className="font-size-2 font-weight-2 let-Spac-sub landing-page-center ">{t`Contact us`}</h2>
                <div className="hr"></div>
                </div>
                <div className="display-flex flex-col footer-text-center p-b-12">
                    <span className='font-size-3 font-weight-3'>Email</span>
                    <div className="">contacto@nahsconews.com</div>
                </div>
                <div className="display-block position-rel font-inherit width-100">
                       <div className='font-size-3 font-weight-3 footer-text-center'>Get social</div>
                        <div className="social-media-footer m-t-8">
                            <div className="position-abs height-100 left-0 top-0 bottom-0 header-p-l social-media-container">
                                <ul className='height-100 display-flex flex-col flex-algn-center flex-justify-center social-media-contain'>
                                    <li className='m-b-4'>
                                        <button onClick={() => goto('https://www.linkedin.com/company/nahsco/about/')}>
                                            <div className="">
                                                <LinkedIndIcon />
                                            </div>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => goto('https://twitter.com/nahscoeqguinea?lang=en')}>
                                            <div className="">
                                                <TwitterIcon />
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
           {/*  <aside className="font-inherit min-height-inherit box-sizing p-t-16 p-l-16 width-100">
                <div className="font-inherit scroll-aside scrollhost pespective-origin-rt transf-style overscroll-bihavior-y display-flex flex-grow " >
                    
                </div>
            </aside> */}
        </section>
    )
}

export default ContactUsComponent;