import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import {useRouter} from 'next/router';
import { t } from '@lingui/macro';

import Pagination from '@components/pagination';
import PostListComponent from './postList';
import AsideComponent from '@components/layout/general/asideComponent';
import PubSpace from '@components/espacioPub';
import serviceCompanyApi from '@components/api/serviceCompany';
import eventsApi from '@components/api/events';
import LoadingPostList from '@components/loaders/postList';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';
import AdsApi from '@components/api/Ads';





const AllEventComponent = () => {
    const router = useRouter()

    const PageSize = 9

    const [currentPostList, setCurrentPostList] = useState(router.query.offset ? +router.query.offset :  1);

    /* Api */
    const {fetchRecentEvents} = eventsApi();
    const {fetchRecentService} = serviceCompanyApi();
    const {fetchPopularLateralHome} = AdsApi();

    //recent news
    const getRecentEventApi = useApi(fetchRecentEvents);
 
    //popular jobs
    const getServiceApi = useApi(fetchRecentService);


    //lateral ads 
    const getLateralHomeApi = useApi(fetchPopularLateralHome);


    function goto(url) {
        window.open(url);
    }

    useEffect(() => {
        getRecentEventApi.request()
        getServiceApi.request()
        getLateralHomeApi.request()

        return () => {
            getRecentEventApi.request()
            getServiceApi.request()
            getLateralHomeApi.request()
        }
    }, [router.query])

    useEffect(() => {
        
    }, [getRecentEventApi.data])
    

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPostList as number - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return getRecentEventApi.data?.slice(firstPageIndex, lastPageIndex);
    }, [currentPostList, getRecentEventApi.data]);


  
    return(
        <section className="section-list-post  z-index-0 font-inherit min-height-inherit box-sizing display-flex">
            <div className="font-inherit display-block width-100">
                <div className="display-block position-rel font-inherit">
                    <h1 className="font-size-1 font-weight-2 let-Spac-sub landing-page-center m-r-8">{t`Events`}</h1>
                    <div className="hr"></div>
                </div>
                <div className="position-rel display-block m-t-16 m-b-32">
                    {getRecentEventApi.loading ? <LoadingPostList /> : <PostListComponent data={currentTableData!} />}
                </div>
                <Pagination
                    className="pagination-bar"
                    disableArrow={true}
                    currentPage={currentPostList}
                    totalCount={getRecentEventApi.data?.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPostList(page)} 
                />
            </div>
            <aside className="top-0 content-posts-aside z-index-0 font-inherit min-height-inherit box-sizing p-t-24 aside-wrap-padd">
                <AsideComponent pagelet="rightRail">
                    <div className="font-inherit scroll-aside scrollhost pespective-origin-rt transf-style overscroll-bihavior-y display-block" >
                        <div className="position-rel box-sizing">
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
                        </div>
                        <div className="position-rel m-t-32">
                            <div className="display-flex flex-algn-center">
                                <div className="display-flex m-r-8 flex-grow">
                                    <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Latest companies`}</h3>
                                </div>
                            </div>
                            <ul className="display-flex flex-col p-t-16 popular-wrap-post-view display-grid">
                                {getServiceApi.data?.slice(0, 4).map((post, i) => (
                                    <li className={`cursor-initial popular-wrap-post-item popular-wrap-post-${i}`} key={i}>
                                        <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100 popular-post-container">
                                            <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                <Link href="/service-company/[slug]" as={`/service-company/${post.attributes.Slug}`}>
                                                    <a className="overflow-h-x overflow-h-y position-rel lastest-image">
                                                        <Image layout='fill' objectFit='cover' src={`${baseURL}${post.attributes.image.data.attributes.url}`} alt={post.attributes.title} className="image" />
                                                    </a>
                                                </Link> 
                                            </div>
                                            <div className="display-flex flex-col flex-grow post-body-wrap">
                                                <div className="post-body-container position-rel display-block box-sizing">
                                                    <div className="position-rel display-block box-sizing line-height-2">
                                                        <Link href="/service-company/[slug]" as={`/service-company/${post.attributes.Slug}`}>
                                                            <a className="font-weight-3 font-size-4 post-title text-black-var-1">
                                                                <h4 className="m-b-4 overflow-wrap overflow-wrap">{post.attributes.title.toUpperCase()}</h4>
                                                            </a>
                                                        </Link>
                                                    </div>
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
                                        data-ad-client="ca-pub-2621121538375000"
                                        data-ad-slot="5304432065"
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

export default AllEventComponent;