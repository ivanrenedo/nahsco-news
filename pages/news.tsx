import React from "react";

import BaseShape from "@components/layout/general/baseShape"
import LayoutMain from "@components/layout/LayoutAuth"
import MostWatches from "@components/pages/news/most-watches";
import AdsLeaderBoard from "@components/ads/leaderBoard";
import AllPosts from "@components/pages/news/allPosts";
import AdsApi from "@components/api/Ads";
import useApi from "@utils/strapi/useApi";
import { baseURL } from "@utils/strapi/client";





const NewsPage = () => {

    function goto(url) {
        window.open(url);
    }

    const {fetchTopBannerNews} = AdsApi();

    //popular services
    const getTopBannerApi = useApi(fetchTopBannerNews);
    

    React.useEffect(() => {
        getTopBannerApi.request();

        return () => {
            getTopBannerApi.request();
        }
    }, []);

    return(
        <LayoutMain title='News'>
            <div className="landing-page">
                <MostWatches />
                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto(getTopBannerApi.data && getTopBannerApi.data[0].attributes.url)}>
                    <div className="position-rel">
                        {getTopBannerApi && getTopBannerApi?.data?.length > 0 ? (
                        <>
                            <img src={`${baseURL}${getTopBannerApi.data && getTopBannerApi.data[0].attributes.file.data.attributes.url}`} alt={getTopBannerApi.data && getTopBannerApi.data[0].attributes.metadata} srcSet={`${baseURL}${getTopBannerApi.data && getTopBannerApi.data[0].attributes.file.data.attributes.url}`} className="image" />
                        </>
                        ) : <img src="/img/publicidad.jpeg" alt="publícate en NAHSCO" srcSet="/img/publicidad.jpeg" className="image" />}
                    </div>
                </div> 
                <BaseShape>
                    <div className="content-wrap mobile-event-wrap z-index-1 font-inherit min-height-inherit position-rel box-sizing display-flex">
                        <div className="position-rel min-width-0 width-100">
                            <div className="z-index-0 box-sizing display-block">
                                <div className="display-block padding-top-slider width-100">
                                    <div className="display-block">
                                        <div className="content-wrap--width max-width-100 width-100 display-block position-rel">
                                            <AllPosts />
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


export default NewsPage;