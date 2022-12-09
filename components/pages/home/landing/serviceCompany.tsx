import React from 'react';
import Link from 'next/link';
import { t } from '@lingui/macro';

import PubSpace from '@components/espacioPub';
import { urlFor } from '@utils/sanity';
import serviceCompanyApi from '@components/api/serviceCompany';




const ServiceCompanies = () => {
    
    function goto(url) {
        window.open(url);
    }

    const {serviceCompany, loading} = serviceCompanyApi();


    return (
        <>  
            {serviceCompany.length > 0 && (
                <section className="section section-news flex-algn-center display-flex flex-col position-rel">
                    <div className="display-block width-100 box-sizing font-inherit">
                        <div className="format-div-2">
                            <div className="display-block position-rel font-inherit">
                                <div className="font-size-2 font-weight-2 let-Spac-sub landing-page-center m-r-8 display-flex flex-grow text-error">{t`Service companies`}</div>
                                <div className="hr flex-shrink-1"></div>
                            </div>
                            <div className="content-wrap-post width-100">
                                <div className=" width-100">
                                    <ul className="display-grid grid-news-item grid-news-item grid-service-item p-t-24 people-gap">
                                        {serviceCompany.map((post, i) => (
                                            <li className={`cursor-initial flex-algn-stretch service-item service-item-${i}`} key={post._id}>
                                                <div className="display-flex flex-algn-center flex-grow flex-algn-stretch width-100 post-item-container">
                                                    <Link  href="/service-company/[slug]" as={`/service-company/${post.slug}`}>
                                                        <a className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container width-100">
                                                            <div className="overflow-h-x overflow-h-y position-rel post-image service-image">
                                                                <img src={urlFor(post.image)} alt={post.title} srcSet={urlFor(post.image)} className="image" />
                                                            </div>
                                                            <div className="service-title font-weight-2 position-abs bottom-0 left-0 right-0 text-white-var-1 p-l-8 p-b-8 p-r-8 z-index-10 overflow-wrap">{post.title}</div>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="content-posts-aside">
                                    <div className="space-pub-container">
                                        <div className="position-rel box-sizing display-flex flex-col people-gap">
                                            <PubSpace>
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                    <div className="position-rel">
                                                        <img src="img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="img/pubnashco.jpeg" className="image" />
                                                    </div>
                                                </div>
                                            </PubSpace>
                                            <PubSpace>
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                    <div className="position-rel">
                                                        <img src="img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="img/pubnashco.jpeg" className="image" />
                                                    </div>
                                                </div>
                                            </PubSpace>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default ServiceCompanies;