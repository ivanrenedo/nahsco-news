import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { t } from '@lingui/macro';

import Pagination from '@components/pagination';
import PostListComponent from './postList';
import AsideComponent from '@components/layout/general/asideComponent';
import PubSpace from '@components/espacioPub';
import eventsApi from '@components/api/events';
import serviceCompanyApi from '@components/api/serviceCompany';
import LoadingPostList from '@components/loaders/postList';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';
import AdsApi from '@components/api/Ads';





const AllServiceCompanies = () => {
    const router = useRouter()

    const PageSize = 9

    const [currentPostList, setCurrentPostList] = useState(router.query.offset ? +router.query.offset :  1);

    /* Api */
    const {fetchPopularEvents} = eventsApi();
    const {fetchRecentService} = serviceCompanyApi();
    const {fetchLateralService} = AdsApi();

    //recent news
    const getRecentServiceApi = useApi(fetchRecentService);

    //popular jobs
    const getEventsApi = useApi(fetchPopularEvents);

    //lateral service
    const getLateralBottomApi = useApi(fetchLateralService);


    function goto(url) {
        window.open(url);
    }

    useEffect(() => {
        getRecentServiceApi.request()
        getEventsApi.request();
        getLateralBottomApi.request()
    }, [router.query])

    useEffect(() => {
        
    }, [getRecentServiceApi.data])
    

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPostList as number - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return getRecentServiceApi.data?.slice(firstPageIndex, lastPageIndex);
    }, [currentPostList, getRecentServiceApi.data]);


  
    return(
        <section className="section-list-post  z-index-0 font-inherit min-height-inherit box-sizing display-flex">
            <div className="font-inherit display-block width-100">
                <div className="display-block position-rel font-inherit">
                    <h2 className="font-size-1 font-weight-2 let-Spac-sub landing-page-center m-r-8">{t`Service companies`}</h2>
                    <div className="hr"></div>
                </div>
                <div className="position-rel display-block m-t-16 m-b-32">
                {getRecentServiceApi.loading ? <LoadingPostList /> : <PostListComponent data={currentTableData!} />}
                </div>
                <Pagination
                    className="pagination-bar"
                    disableArrow={true}
                    currentPage={currentPostList}
                    totalCount={getRecentServiceApi.data?.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPostList(page)} 
                />
            </div>
            <aside className="top-0 content-posts-aside z-index-0 font-inherit min-height-inherit box-sizing p-t-24 aside-wrap-padd">
                <AsideComponent pagelet="rightRail">
                    <div className="font-inherit scroll-aside scrollhost pespective-origin-rt transf-style overscroll-bihavior-y display-block" >
                        <div className="position-rel box-sizing">
                            <PubSpace>
                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto(getLateralBottomApi.data[0].attributes.url)}>
                                    <div className="position-rel">
                                        {getLateralBottomApi && getLateralBottomApi?.data?.length > 0 ? (
                                            <>
                                                <img src={`${baseURL}${getLateralBottomApi.data && getLateralBottomApi.data[0].attributes.file.data.attributes.url}`} alt={`${baseURL}${getLateralBottomApi.data && getLateralBottomApi.data[0].attributes.metadata}`} srcSet={`${baseURL}${getLateralBottomApi.data && getLateralBottomApi.data[0].attributes.file.data.attributes.url}`} className="image" />
                                            </>
                                        ) : <img src="img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="img/pubnashco.jpeg" className="image" />}
                                    </div>
                                </div>
                            </PubSpace>
                        </div>
                        <div className="position-rel m-t-16">
                            <div className="display-flex flex-algn-center">
                                <div className="display-flex m-r-8 flex-grow">
                                    <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Latest events`}</h3>
                                </div>
                            </div>
                            <ul className="display-flex flex-col p-t-16 latest-wrap">
                                {getEventsApi.data?.map((event, i) => (
                                    <li className=" cursor-initial" key={i}>
                                        <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100">
                                            <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                <Link href="/event/[slug]" as={`/event/${event.attributes.Slug}`}>
                                                    <a className="overflow-h-x overflow-h-y position-rel lastest-image">
                                                    <img src={`${baseURL}${event.attributes.image.data.attributes.url}`} alt={event.attributes.title} srcSet={`${baseURL}${event.attributes.image.data.attributes.url}`} className="image" />
                                                    </a>
                                                </Link> 
                                            </div>
                                            <div className="display-flex flex-col flex-grow post-body-wrap">
                                                <div className="post-body-container position-rel display-block box-sizing">
                                                    <div className="position-rel display-block box-sizing line-height-2">
                                                        <Link href="/event/[slug]" as={`/event/${event.attributes.Slug}`}>
                                                            <a className="font-weight-3 font-size-4 small-post text-black-var-1">
                                                                <div className="m-b-4 overflow-wrap">{event.attributes.title}</div>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="font-size-5 overflow-wrap">{event.attributes.location}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="position-rel box-sizing m-t-24">
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
                </AsideComponent>
            </aside>
        </section>
    )
}

export default AllServiceCompanies;