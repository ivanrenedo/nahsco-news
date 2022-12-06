import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import {useRouter} from 'next/router';
import { t } from '@lingui/macro';


import Pagination from '@components/pagination';
import PostListComponent from './postList';
import AsideComponent from '@components/layout/general/asideComponent';
import PubSpace from '@components/espacioPub';
import newsApi from '@components/api/news';
import { urlFor } from '@utils/sanity';
import jobsApi from '@components/api/jobs';
import LoadingPostList from '@components/loaders/postList';





const AllJobsComponent = () => {
    const router = useRouter()

    const PageSize = 9

    const [currentPostList, setCurrentPostList] = useState(1);


    const {recentIocs, lodingRecentIocs} = newsApi();
    const {allJobs, loading:jobLoading} = jobsApi();

    /* Api */
    
    const [postCount, setPostCount] = useState(1);

    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }

    function goto(url) {
        window.open(url);
    }

    useEffect(() => {
       
    }, [router.query, allJobs])
    


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPostList - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return allJobs?.slice(firstPageIndex, lastPageIndex);
    }, [currentPostList, allJobs]);


  
    return(
        <section className="section-list-post  z-index-0 font-inherit min-height-inherit box-sizing display-flex">
            <div className="font-inherit display-block width-100">
                <div className="display-block position-rel font-inherit">
                    <h2 className="font-size-1 font-weight-2 let-Spac-sub landing-page-center m-r-8">{t`Jobs`}</h2>
                    <div className="hr"></div>
                </div>
                <div className="position-rel display-block m-t-16 m-b-32">
                    {jobLoading ? <LoadingPostList /> : <PostListComponent data={currentTableData!} />}
                </div>
                {/* <Pagination
                    className="pagination-bar"
                    disableArrow={true}
                    currentPage={currentPostList}
                    totalCount={allPosts?.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPostList(page)} 
                /> */}
            </div>
            <aside className="top-0 content-posts-aside z-index-0 font-inherit min-height-inherit box-sizing p-t-24 p-l-16">
                <AsideComponent pagelet="rightRail">
                    <div className="font-inherit scroll-aside scrollhost pespective-origin-rt transf-style overscroll-bihavior-y display-block" >
                        <div className="position-rel box-sizing">
                            <PubSpace>
                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                    <div className="position-rel">
                                        <img src="/img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="/img/pubnashco.jpeg" className="image" />
                                    </div>
                                </div>
                            </PubSpace>
                        </div>
                        <div className="position-rel m-t-32">
                            <div className="display-flex flex-algn-center">
                                <div className="display-flex m-r-8 flex-grow">
                                    <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Latest IOCs`}</h3>
                                </div>
                            </div>
                            <ul className="display-flex flex-col p-t-16 popular-wrap-post-view display-grid">
                                {recentIocs.slice(0,4).map((post, i) => (
                                    <li className={`cursor-initial popular-wrap-post-item popular-wrap-post-${i}`} key={i}>
                                        <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100 popular-post-container">
                                            <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                <Link href="/ioc/[slug]" as={`/ioc/${post.slug}`}>
                                                    <a className="overflow-h-x overflow-h-y position-rel lastest-image">
                                                        <img src={urlFor(post.image)} alt={post.title} srcSet={urlFor(post.image)} className="image" />
                                                    </a>
                                                </Link> 
                                            </div>
                                            <div className="display-flex flex-col flex-grow post-body-wrap">
                                                <div className="post-body-container position-rel display-block box-sizing">
                                                    <div className="position-rel display-block box-sizing line-height-2">
                                                        <Link href="/ioc/[slug]" as={`/ioc/${post.slug}`}>
                                                            <a className="font-weight-3 font-size-4 post-title text-black-var-1">
                                                                <div className="m-b-4 overflow-wrap">{post.title}</div>
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
                                    <div className="position-rel">
                                        <img src="/img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="/img/pubnashco.jpeg" className="image" />
                                    </div>
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