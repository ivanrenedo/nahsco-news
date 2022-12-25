import React from 'react';
import Link from 'next/link';
import { t } from '@lingui/macro';
import Image from 'next/image'

import PubSpace from '@components/espacioPub';
import serviceCompanyApi from '@components/api/serviceCompany';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';
import AdsApi from '@components/api/Ads';
import newsApi from '@components/api/news';




const ServiceCompanies = () => {
    
    function goto(url) {
        window.open(url);
    }

    const {updatePost} = newsApi();
    const {fetchPopularService} = serviceCompanyApi();
    const {fetchPopularLateralHome} = AdsApi();

    //popular services
    const getPopulaServiceApi = useApi(fetchPopularService);

    //lateral ads 
    const getLateralHomeApi = useApi(fetchPopularLateralHome);


    React.useEffect(() => {
        getLateralHomeApi.request();
        getPopulaServiceApi.request();

        return () => {
            getLateralHomeApi.request();
            getPopulaServiceApi.request();
        }
    }, []);


    return (
        <>  
            {getPopulaServiceApi.data && (
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
                                        {getPopulaServiceApi.data?.slice(0, 4).map((post, i) => (
                                            <li className={`cursor-initial flex-algn-stretch service-item service-item-${i}`} onClick={() => updatePost({id: post.id, count: +post.attributes.visitas + 1})} key={post.id}>
                                                <div className="display-flex flex-algn-center flex-grow flex-algn-stretch width-100 post-item-container">
                                                    <Link  href="/service-company/[slug]" as={`/service-company/${post.attributes.Slug}`}>
                                                        <a className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container width-100">
                                                            <div className="overflow-h-x overflow-h-y position-rel post-image service-image">
                                                                <Image layout='fill' objectFit='cover' src={`${baseURL}${post.attributes.image?.data?.attributes?.url}`} alt={post.attributes.title} className="image" />
                                                            </div>
                                                            <div className="service-title font-weight-2 position-abs bottom-0 left-0 right-0 text-white-var-1 p-l-8 p-b-8 p-r-8 z-index-10 overflow-wrap">{post.attributes.title.toUpperCase()}</div>
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
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto(getLateralHomeApi.data[0].attributes.url)}>
                                                    <div className="position-rel">
                                                        {getLateralHomeApi && getLateralHomeApi?.data?.length > 0 ? (
                                                            <>
                                                                <Image layout='fill' objectFit='cover' src={`${baseURL}${getLateralHomeApi.data && getLateralHomeApi.data[0].attributes.file.data.attributes.url}`} alt={`${baseURL}${getLateralHomeApi.data && getLateralHomeApi.data[0].attributes.metadata}`} className="image" />
                                                            </>
                                                        ) : <img src="/img/pubnashco.jpeg" alt="publícate en NAHSCO" className="image" />}
                                                    </div>
                                                </div>
                                            </PubSpace>
                                            <PubSpace>
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                    <ins className="adsbygoogle"
                                                        style={{display:"block"}}
                                                        data-ad-client="ca-pub-2621121538375000"
                                                        data-ad-slot="1761305707"
                                                        data-ad-format="auto"
                                                        data-full-width-responsive="true"></ins>
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

export default React.memo(ServiceCompanies);