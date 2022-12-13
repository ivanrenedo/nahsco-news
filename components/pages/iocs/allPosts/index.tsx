import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { t } from '@lingui/macro';


import Pagination from '@components/pagination';
import PostListComponent from './postList';
import AsideComponent from '@components/layout/general/asideComponent';
import PubSpace from '@components/espacioPub';
import peopleApi from '@components/api/people';
import newsApi from '@components/api/news';
import LoadingPostList from '@components/loaders/postList';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';
import AdsApi from '@components/api/Ads';





const AllIocsCompanies = () => {
    const router = useRouter()

    const PageSize = 9

    const [currentPostList, setCurrentPostList] = useState(router.query.offset ? +router.query.offset :  1);

    /* Api */
    const {fetchRecentIocs} = newsApi();
    const {fetchRecentPeople} = peopleApi();
    const {fetchLateralIoc, fetchPopularVideoIoc} = AdsApi();
    

    //recent news
    const getRecentPeoplesApi = useApi(fetchRecentPeople);

    //popular jobs
    const getAllIocsApi = useApi(fetchRecentIocs);

    //lateral ads
    const getadsLateralIocsApi = useApi(fetchLateralIoc);

    //video ads 
    const getVideoIocApi = useApi(fetchPopularVideoIoc);


    function goto(url) {
        window.open(url);
    }

    useEffect(() => {
        getRecentPeoplesApi.request()
        getAllIocsApi.request()
        getadsLateralIocsApi.request()
        getVideoIocApi.request()
    }, [router.query])

    useEffect(() => {
        
    }, [getAllIocsApi.data])
    


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPostList as number - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return getAllIocsApi.data?.slice(firstPageIndex, lastPageIndex);
    }, [currentPostList, getAllIocsApi.data]);


  
    return(
        <section className="section-list-post  z-index-0 font-inherit min-height-inherit box-sizing display-flex">
            <div className="font-inherit display-block width-100">
                <div className="display-block position-rel font-inherit">
                    <h2 className="font-size-1 font-weight-2 let-Spac-sub landing-page-center m-r-8">IOCs</h2>
                    <div className="hr"></div>
                </div>
                <div className="position-rel display-block m-t-16 m-b-32">
                    {getAllIocsApi.loading ? <LoadingPostList /> : <PostListComponent data={currentTableData!} />}
                </div>
                <Pagination
                    className="pagination-bar"
                    disableArrow={true}
                    currentPage={currentPostList}
                    totalCount={getAllIocsApi.data?.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPostList(page)} 
                />
            </div>
            <aside className="top-0 content-posts-aside z-index-0 font-inherit min-height-inherit box-sizing p-t-24 aside-wrap-padd">
                <AsideComponent pagelet="rightRail">
                    <div className="font-inherit scroll-aside scrollhost pespective-origin-rt transf-style overscroll-bihavior-y display-block" >
                        <div className="position-rel box-sizing">
                            <PubSpace>
                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container">
                                    <div className="position-rel">
                                        {getVideoIocApi && getVideoIocApi?.data?.length > 0 ? (
                                            <>
                                                <video autoPlay={true} loop={true} muted={true} src={`${baseURL}${getVideoIocApi.data && getVideoIocApi.data[0].attributes.file.data.attributes.url}`} className="image" />
                                            </>
                                        ) : <img src="img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="img/pubnashco.jpeg" className="image" />}
                                    </div>
                                </div>
                            </PubSpace>
                        </div>
                        <div className="position-rel m-t-32">
                            <div className="display-flex flex-algn-center">
                                <div className="display-flex m-r-8 flex-grow">
                                    <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Latest people`}</h3>
                                </div>
                            </div>
                            <ul className="display-flex flex-col p-t-16 popular-wrap-post-view display-grid">
                                {getRecentPeoplesApi.data?.slice(0,4).map((people, i) => (
                                    <li className={`cursor-initial popular-wrap-post-item popular-wrap-post-${i}`} key={i}>
                                        <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100 popular-post-container">
                                            <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                <Link href="/people/[slug]" as={`/people/${people.attributes.Slug}`}>
                                                    <a className="overflow-h-x overflow-h-y position-rel lastest-image">
                                                        <img src={`${baseURL}${people.attributes.image.data.attributes.url}`} alt={people.attributes.title} srcSet={`${baseURL}${people.attributes.image.data.attributes.url}`} className="image" />
                                                    </a>
                                                </Link> 
                                            </div>
                                            <div className="display-flex flex-col flex-grow post-body-wrap">
                                                <div className="post-body-container position-rel display-block box-sizing">
                                                    <div className="position-rel display-block box-sizing line-height-2">
                                                        <Link href="/people/[slug]" as={`/people/${people.attributes.Slug}`}>
                                                            <a className="font-weight-3 font-size-4 post-title text-black-var-1">
                                                                <div className="m-b-4 overflow-wrap">{people.attributes.fullname}</div>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="font-size-5 overflow-wrap">{people.attributes.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="position-rel box-sizing m-t-24">
                            <PubSpace>
                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto(getadsLateralIocsApi.data[0].attributes.url)}>
                                    <div className="position-rel">
                                        {getadsLateralIocsApi && getadsLateralIocsApi?.data?.length > 0 ? (
                                            <>
                                                <img src={`${baseURL}${getadsLateralIocsApi.data && getadsLateralIocsApi.data[0].attributes.file.data.attributes.url}`}  srcSet={`${baseURL}${getadsLateralIocsApi.data && getadsLateralIocsApi.data[0].attributes.file.data.attributes.url}`} className="image" />
                                            </>
                                        ) : <img src="img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="img/pubnashco.jpeg" className="image" />}
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

export default AllIocsCompanies;