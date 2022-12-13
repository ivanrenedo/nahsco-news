import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import LayoutMain from '@components/layout/LayoutAuth';
import VideoBackgroundSection from '@components/pages/home/videoSection';
import PeopleSection from '@components/pages/home/landing';
import NewsSection from '@components/pages/home/landing/news';
import BaseShape from '@components/layout/general/baseShape';
import AdsLeaderBoard from '@components/ads/leaderBoard';
import ServiceCompanies from '@components/pages/home/landing/serviceCompany';
import EventSection from '@components/pages/home/landing/events';
import JobSection from '@components/pages/home/landing/jobs';
import AdsApi from '@components/api/Ads';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';


function LandingPage() {

    function goto(url) {
        window.open(url);
    }
    
    const {fetchPopularTopBanner, fetchBottomBannerHome} = AdsApi();

    //banner top
    const getBannerTopApi = useApi(fetchPopularTopBanner);

    //banner bottom
    const getBannerBottomApi = useApi(fetchBottomBannerHome);
    
    
    
    useEffect(() => {
        getBannerTopApi.request();
        getBannerBottomApi.request()
    }, [])

    

    return(
        <LayoutMain title='Inicio'> 
            <div className="landing-page">
                <VideoBackgroundSection />
                <BaseShape>
                    <div className="content-wrap mobile-event-wrap z-index-1 font-inherit min-height-inherit position-rel box-sizing">
                        <div className="position-rel min-width-0 width-100">
                            <div className="z-index-0 box-sizing display-block">
                                <div className="display-block padding-top-slider width-100">
                                    <div className="display-block">
                                        <div className="content-wrap--width max-width-100 width-100 display-block position-rel">
                                            <AdsLeaderBoard>
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto(getBannerTopApi.data && getBannerTopApi.data[0].attributes.url)}>
                                                    <div className="position-rel">
                                                        {getBannerTopApi && getBannerTopApi?.data?.length > 0 ? (
                                                        <>
                                                           <img src={`${baseURL}${getBannerTopApi.data && getBannerTopApi.data[0].attributes.file.data.attributes.url}`} alt={getBannerTopApi.data && getBannerTopApi.data[0].attributes.metadata} srcSet={`${baseURL}${getBannerTopApi.data && getBannerTopApi.data[0].attributes.file.data.attributes.url}`} className="image" />
                                                        </>
                                                        ) : <img src="/img/publicidad.jpeg" alt="publícate en NAHSCO" srcSet="/img/publicidad.jpeg" className="image" />}
                                                    </div>
                                                </div> 
                                            </AdsLeaderBoard>
                                            <NewsSection />
                                            <PeopleSection />
                                            <AdsLeaderBoard>
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                    <ins className="adsbygoogle"
                                                    style={{display: "block"}}
                                                    data-ad-client="ca-pub-2621121538375000"
                                                    data-ad-slot="5460592153"
                                                    data-ad-format="auto"
                                                    data-full-width-responsive="true"></ins>
                                                </div>
                                            </AdsLeaderBoard>
                                            <ServiceCompanies />
                                            <EventSection  />
                                            <AdsLeaderBoard>
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto(getBannerBottomApi.data && getBannerBottomApi.data[0].attributes.url)}>
                                                    <div className="position-rel">
                                                        {getBannerBottomApi && getBannerBottomApi?.data?.length > 0 ? (
                                                        <>
                                                           <img src={`${baseURL}${getBannerBottomApi.data && getBannerBottomApi.data[0].attributes.file.data.attributes.url}`} alt={getBannerBottomApi.data && getBannerBottomApi.data[0].attributes.metadata} srcSet={`${baseURL}${getBannerBottomApi.data && getBannerBottomApi.data[0].attributes.file.data.attributes.url}`} className="image" />
                                                        </>
                                                        ) : <img src="/img/publicidad.jpeg" alt="publícate en NAHSCO" srcSet="/img/publicidad.jpeg" className="image" />}
                                                    </div>
                                                </div> 
                                            </AdsLeaderBoard>
                                            <JobSection />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseShape>
            </div>
        </LayoutMain>
    );
}

export async function getStaticProps(context) {
    
    
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default LandingPage;