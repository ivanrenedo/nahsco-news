import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { t } from '@lingui/macro';
import Image from 'next/image';

import Pagination from '@components/pagination';
import PostListComponent from './postList';
import AsideComponent from '@components/layout/general/asideComponent';
import PubSpace from '@components/espacioPub';
import newsApi from '@components/api/news';
import jobsApi from '@components/api/jobs';
import LoadingPostList from '@components/loaders/postList';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';
import AdsApi from '@components/api/Ads';






const AllJobsComponent = () => {
    const router = useRouter()

    const PageSize = 9

    const [currentPostList, setCurrentPostList] = useState(router.query.offset ? +router.query.offset :  1);

    /* Api */
    const {fetchRecentJobs} = jobsApi();
    const {fetchRecentIocs} = newsApi();
    const {fetchLateralService} = AdsApi();

    //recent news
    const getRecentJobsApi = useApi(fetchRecentJobs);

    //popular jobs
    const getIocApi = useApi(fetchRecentIocs);

    //lateral service
    const getLateralBottomApi = useApi(fetchLateralService);


    function goto(url) {
        window.open(url); 
    }

    useEffect(() => {
        getRecentJobsApi.request()
        getIocApi.request()
        getLateralBottomApi.request()

        return () => {
            getRecentJobsApi.request()
            getIocApi.request()
            getLateralBottomApi.request()
        }
    }, [router.query])

    useEffect(() => {
        
    }, [getRecentJobsApi.data])
    

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPostList as number - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return getRecentJobsApi.data?.slice(firstPageIndex, lastPageIndex);
    }, [currentPostList, getRecentJobsApi.data]);


  
    return(
        <section className="section-list-post  z-index-0 font-inherit min-height-inherit box-sizing display-flex">
            <div className="font-inherit display-block width-100">
                <div className="display-block position-rel font-inherit">
                    <h2 className="font-size-1 font-weight-2 let-Spac-sub landing-page-center m-r-8">{t`Jobs`}</h2>
                    <div className="hr"></div>
                </div>
                <div className="position-rel display-block m-t-16 m-b-32">
                    {getRecentJobsApi.loading ? <LoadingPostList /> : <PostListComponent data={currentTableData!} />}
                </div>
                <Pagination
                    className="pagination-bar"
                    disableArrow={true}
                    currentPage={currentPostList}
                    totalCount={getRecentJobsApi.data?.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPostList(page)} 
                />
            </div>
            <aside className="top-0 content-posts-aside z-index-0 font-inherit min-height-inherit box-sizing p-t-24 p-l-16">
                <AsideComponent pagelet="rightRail">
                    <div className="font-inherit scroll-aside scrollhost pespective-origin-rt transf-style overscroll-bihavior-y display-block" >
                        <div className="position-rel box-sizing">
                            <PubSpace>
                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto(getLateralBottomApi.data[0].attributes.url)}>
                                    <div className="position-rel">
                                        {getLateralBottomApi && getLateralBottomApi?.data?.length > 0 ? (
                                            <>
                                                <Image layout='fill' objectFit='cover' src={`${baseURL}${getLateralBottomApi.data && getLateralBottomApi.data[0].attributes.file.data.attributes.url}`} alt={`${baseURL}${getLateralBottomApi.data && getLateralBottomApi.data[0].attributes.metadata}`}  className="image" />
                                            </>
                                        ) : <img  src="/img/pubnashco.jpeg" alt="publícate en NAHSCO" className="image" />}
                                    </div>
                                </div>
                            </PubSpace>
                        </div>
                        <div className="position-rel m-t-32">
                            <div className="display-flex flex-algn-center">
                                <div className="display-flex m-r-8 flex-grow">
                                    <p className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Latest IOCs`}</p>
                                </div>
                            </div>
                            <ul className="display-flex flex-col p-t-16 popular-wrap-post-view display-grid">
                                {getIocApi.data?.slice(0,4).map((post, i) => (
                                    <li className={`cursor-initial popular-wrap-post-item popular-wrap-post-${i}`} key={i}>
                                        <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100 popular-post-container">
                                            <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                <Link href="/ioc/[slug]" as={`/ioc/${post.attributes.Slug}`}>
                                                    <a className="overflow-h-x overflow-h-y position-rel lastest-image">
                                                        <Image layout='fill' objectFit='cover' src={`${baseURL}${post.attributes.image.data.attributes.url}`} alt={post.attributes.title} className="image" />
                                                    </a>
                                                </Link> 
                                            </div>
                                            <div className="display-flex flex-col flex-grow post-body-wrap">
                                                <div className="post-body-container position-rel display-block box-sizing">
                                                    <div className="position-rel display-block box-sizing line-height-2">
                                                        <Link href="/ioc/[slug]" as={`/ioc/${post.attributes.Slug}`}>
                                                            <a className="text-black-var-1 post-title">
                                                                <h3 className="m-b-4 overflow-wrap font-weight-3 font-size-4">{post.attributes.title.toUpperCase()}</h3>
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
                                    style={{display: "block"}}
                                    data-ad-client="ca-pub-3145765907918273"
                                    data-ad-slot="5421631927"
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

export default AllJobsComponent;