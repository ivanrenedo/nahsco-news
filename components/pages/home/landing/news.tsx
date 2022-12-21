import React from 'react';
import Link from 'next/link';
import moment from 'moment';

import { t } from '@lingui/macro';
import PubSpace from '@components/espacioPub';
import newsApi from '@components/api/news';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';
import AdsApi from '@components/api/Ads';




const NewsSection = () => {
    

    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }

    const {fetchPopularNews, fetchPopularIocs, updatePost} = newsApi(); 
    const {fetchPopularVideoHome} = AdsApi();

   //popular news
    const getPopularNewsApi = useApi(fetchPopularNews);

    //popular iocs
    const getPopularIocsApi = useApi(fetchPopularIocs);
    
    //video ads 
    const getVideoHomeApi = useApi(fetchPopularVideoHome);


    

    

    React.useEffect(() => {
       
        getPopularNewsApi.request();
        getPopularIocsApi.request();
        getVideoHomeApi.request()
    }, []);


    return (
        <>  
            <section className="section section-news flex-algn-center display-flex flex-col position-rel">
                <div className="display-block width-100 box-sizing font-inherit">
                    <div className="format-div-2">
                        <div className="display-block position-rel font-inherit">
                            <h2 className="font-size-2 font-weight-2 let-Spac-sub landing-page-center m-r-8 text-primary-var-1">{t`News`}</h2>
                            <div className="hr"></div>
                        </div>
                        <div className="content-wrap-post width-100">
                            <div className=" width-100">
                                {getPopularNewsApi?.data && (
                                    <ul className="section-news-contain display-grid grid-news-item p-t-24">
                                        {getPopularNewsApi?.data?.slice(0, 5).map((post, i) => (
                                            <li className={`cursor-initial flex-algn-stretch post-item post-item-${i}`} onClick={() => updatePost({id: post.id, count: +post.attributes.visitas + 1})} key={post.id}>
                                                <div className="display-flex flex-algn-center flex-grow post-news-contain flex-algn-stretch width-100 post-item-container">
                                                    <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container">
                                                        <Link href="/news/[slug]" as={`/news/${post.attributes.Slug}`}>
                                                            <a className="post-item-image overflow-h-x overflow-h-y position-rel">
                                                                <img src={`${baseURL}${post?.attributes && post?.attributes?.image?.data?.attributes?.url}`} alt={post.attributes.title} srcSet={`${baseURL}${post.attributes.image.data.attributes.url}`} className="image" />
                                                            </a>
                                                        </Link>    
                                                    </div>
                                                    <div className="display-flex flex-col flex-grow post-body-wrap">
                                                        <div className="post-body-container position-rel display-block box-sizing">
                                                            <div className="position-rel display-block box-sizing line-height-2">
                                                                <Link href="/news/[slug]" as={`/news/${post.attributes.Slug}`}>
                                                                    <a className="post-title font-weight-2 text-black-var-1">
                                                                        <div className="m-b-8">{post.attributes.title.toUpperCase()}</div>
                                                                    </a>
                                                                </Link>
                                                                <p className="mask-text-line3 m-b-12 post-content">{post.attributes.metadata}</p>
                                                                <div className="display-flex flex-algn-center font-size-6 post-date m-t-4 neutral-color-2">
                                                                    <div className="display-flex m-r-32 font-size-5">{getCurrentDate(post.attributes.publishedAt)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="content-posts-aside">
                                <div className="space-pub-container">
                                    <div className="position-rel box-sizing">
                                    <PubSpace>
                                        <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container">
                                            <div className="position-rel">
                                                {getVideoHomeApi && getVideoHomeApi?.data?.length > 0 ? (
                                                    <>
                                                        <video autoPlay={true} loop={true} muted={true} src={`${baseURL}${getVideoHomeApi.data && getVideoHomeApi.data[0].attributes.file.data.attributes.url}`} className="image" />
                                                    </>
                                                ) : <img src="img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="img/pubnashco.jpeg" className="image" />}
                                            </div>
                                        </div>
                                    </PubSpace>
                                    </div>
                                    <div className="position-rel m-t-24">
                                        {getPopularIocsApi?.data && (
                                            <>
                                                <div className="display-flex flex-algn-center">
                                                    <div className="display-flex m-r-8 flex-grow">
                                                        <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Latest IOCs`}</h3>
                                                    </div>
                                                </div>
                                                <ul className="display-flex flex-col p-t-16 latest-wrap">
                                                    {getPopularIocsApi?.data?.slice(0, 3).map((post, i) => (
                                                        <li className=" cursor-initial" key={i} onClick={() => updatePost({id: post.id, count: +post.attributes.visitas + 1})}>
                                                            <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100">
                                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                                    <Link href="/news/[slug]" as={`/news/${post.attributes.Slug}`}>
                                                                        <a className="overflow-h-x overflow-h-y position-rel lastest-image">
                                                                        <img src={`${baseURL}${post.attributes.image.data.attributes.url}`} alt={post.attributes.title} srcSet={`${baseURL}${post.attributes.image.data.attributes.url}`} className="image" />
                                                                        </a>
                                                                    </Link> 
                                                                </div>
                                                                <div className="display-flex flex-col flex-grow post-body-wrap">
                                                                    <div className="post-body-container position-rel display-block box-sizing">
                                                                        <div className="position-rel display-block box-sizing line-height-2">
                                                                            <Link href="/news/[slug]" as={`/news/${post.attributes.Slug}`}>
                                                                                <a className="font-weight-3 font-size-5 post-title small-post text-black-var-1">
                                                                                    <div className="m-b-4 overflow-wrap">{post.attributes.title.toUpperCase()}</div>
                                                                                </a>
                                                                            </Link>
                                                                            <div className="display-flex flex-algn-center font-size-6 neutral-color-2">
                                                                                <div className="display-flex flex-grow">{getCurrentDate(post.attributes.publishedAt)}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewsSection;
