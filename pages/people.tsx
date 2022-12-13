import React from "react";

import BaseShape from "@components/layout/general/baseShape"
import LayoutMain from "@components/layout/LayoutAuth"
import AdsLeaderBoard from "@components/ads/leaderBoard";
import MostPeopleWatches from "@components/pages/people/most-watches";
import AllPeople from "@components/pages/people/allPosts";
import useApi from "@utils/strapi/useApi";
import AdsApi from "@components/api/Ads";
import { baseURL } from "@utils/strapi/client";





const PeoplePage = () => {

    function goto(url) {
        window.open(url);
    }
    

    return(
        <LayoutMain title='People'>
            <div className="landing-page">
                <MostPeopleWatches />
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
                <BaseShape>
                    <div className="content-wrap mobile-event-wrap z-index-1 font-inherit min-height-inherit position-rel box-sizing display-flex">
                        <div className="position-rel min-width-0 width-100">
                            <div className="z-index-0 box-sizing display-block">
                                <div className="display-block padding-top-slider width-100">
                                    <div className="display-block">
                                        <div className="content-wrap--width max-width-100 width-100 display-block position-rel">
                                            <AllPeople />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseShape>
            </div>
        </LayoutMain>  
    )
}


export async function getServerSideProps(context) {
    
    return {
        props: {}, // will be passed to the page component as props
    }
}


export default PeoplePage;