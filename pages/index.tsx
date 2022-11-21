import React, {  } from 'react';
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


function LandingPage() {
    

    function goto(url) {
        window.open(url);
    }
  

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
                                            <NewsSection />
                                            <PeopleSection />
                                            <AdsLeaderBoard>
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                    <div className="position-rel">
                                                        <img src="img/publicidad.jpg" alt="publícate en NAHSCO" srcSet="img/publicidad.jpeg" className="image" />
                                                    </div>
                                                </div>
                                            </AdsLeaderBoard>
                                            <ServiceCompanies />
                                            <EventSection />
                                            <AdsLeaderBoard>
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                    <div className="position-rel">
                                                        <img src="img/publicidad.jpg" alt="publícate en NAHSCO" srcSet="img/publicidad.jpeg" className="image" />
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

export default LandingPage;