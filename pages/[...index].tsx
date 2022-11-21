import React, {  } from 'react';
import {useRouter} from 'next/router';
import cookie from "cookie";
import _ from 'lodash';
import LayoutMain from '@components/layout/LayoutAuth';
import MostWatches from '@components/pages/news/most-watches';
import AdsLeaderBoard from '@components/ads/leaderBoard';
import BaseShape from '@components/layout/general/baseShape';
import AllPosts from '@components/pages/people/allPosts';
import MostPeopleWatches from '@components/pages/people/most-watches';


function IndexPage() {
    const router = useRouter();

    const url = router.query.index as string[];

    function goto(url) {
        window.open(url);
    }

    const renderMainPage = () => {

        switch (url.join("/")) {

            case "news":

                return(
                    <LayoutMain title='News'>
                        <div className="landing-page">
                            <MostWatches />
                            <AdsLeaderBoard>
                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                    <div className="position-rel">
                                        <img src="img/publicidad.jpg" alt="publícate en NAHSCO" srcSet="img/publicidad.jpeg" className="image" />
                                    </div>
                                </div> 
                            </AdsLeaderBoard>
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

            case "people":

                return(
                    <LayoutMain title='People'>
                        <div className="landing-page">
                            <MostPeopleWatches />
                            <AdsLeaderBoard>
                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                    <div className="position-rel">
                                        <img src="img/publicidad.jpg" alt="publícate en NAHSCO" srcSet="img/publicidad.jpeg" className="image" />
                                    </div>
                                </div> 
                            </AdsLeaderBoard>
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

            default:
                return (
                    <> La Pagina no existe</>
                )
        }
    }


  

    return(
        <>
            {renderMainPage()}
        </>
    );
}

export async function getServerSideProps(context) {
    
    const cookies = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie);
     
    /* if (!isBrowser && !cookies.rsht) {
        redirect(context.res, '/signin')
    } */
    
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default IndexPage;