import React from 'react';
import LinkedIndIcon from '@components/icons/linkedin';
import TwitterIcon from '@components/icons/twitter';





const ContactUsComponent = () => {
    

    function goto(url) {
        window.open(url);
    }

  
    return(
        <section className="section-list-post  z-index-0 font-inherit min-height-inherit box-sizing display-flex">
            <div className="font-inherit display-block width-100  p-l-24 p-r-24 p-t-24 p-b-24 border-r-20">
                <div className="display-block position-rel font-inherit p-b-24">
                    <h2 className="font-size-2 font-weight-2 let-Spac-sub landing-page-center ">Contact us here</h2>
                <div className="hr"></div>
                </div>
                <div className="">
                    <form action="mailto:someone@example.com" method="post" encType="text/plain" className='display-grid people-gap'>
                        <label form="name" className='display-block'>
                            <div className="font-weight-3 m-b-8">Fullname:</div>
                            <input type="text" name="name" className='input-form width-100 border-r-20 p-t-12 p-b-12 p-l-12 p-r-12 neutral-var-4 text-black-var-2'/>
                        </label>
                        <label form="mail" className='display-block'>
                            <div className="font-weight-3 m-b-8">Email:</div>
                            <input type="text" name="mail" className='input-form width-100 border-r-20 p-t-12 p-b-12 p-l-12 p-r-12 neutral-var-4 text-black-var-2'/>
                        </label>
                        <label form="body" className='display-block'>
                            <div className="font-weight-3 m-b-8">Body:</div>
                            <textarea name="body" rows={10} className='input-form width-100 border-r-10 p-t-12 p-b-12 p-l-12 p-r-12 neutral-var-4 text-black-var-2 border-0'/>
                        </label>
                        <div className="display-flex width-100">
                            <button type="submit" className=' primary-var-1 text-white-var-1 p-t-16 p-l-32 p-r-32 p-b-16 border-r-5 width-100'>
                                <div className="font-size-4 font-weight-3">Enviar</div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <aside className="font-inherit min-height-inherit box-sizing p-t-16 p-l-16 width-100">
                <div className="font-inherit scroll-aside scrollhost pespective-origin-rt transf-style overscroll-bihavior-y display-flex flex-grow " >
                    <div className="display-block position-rel font-inherit width-100">
                       <div className='font-size-3 font-weight-3 footer-text-center'>Get social</div>
                        <div className="social-media-footer m-t-16">
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
            </aside>
        </section>
    )
}

export default ContactUsComponent;