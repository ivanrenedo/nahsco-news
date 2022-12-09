import React from 'react';
import Link from 'next/link';
import moment from 'moment';

import { t } from '@lingui/macro';
import PubSpace from '@components/espacioPub';
import { urlFor } from '@utils/sanity';
import newsApi from '@components/api/news';




const NewsSection = () => {
    

    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }
    
    function goto(url) {
        window.open(url); 
    }

    const {popularNews, recentIocs, loadingPopularNews, lodingRecentIocs} = newsApi();

   
    


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
                                {popularNews && (
                                    <ul className="section-news-contain display-grid grid-news-item p-t-24">
                                        {popularNews?.map((post, i) => (
                                            <li className={`cursor-initial flex-algn-stretch post-item post-item-${i}`} key={post._id}>
                                                <div className="display-flex flex-algn-center flex-grow post-news-contain flex-algn-stretch width-100 post-item-container">
                                                    <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container">
                                                        <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                                                            <a className="post-item-image overflow-h-x overflow-h-y position-rel">
                                                                <img src={urlFor(post.image)} alt={post.title} srcSet={urlFor(post.image)} className="image" />
                                                            </a>
                                                        </Link>   
                                                    </div>
                                                    <div className="display-flex flex-col flex-grow post-body-wrap">
                                                        <div className="post-body-container position-rel display-block box-sizing">
                                                            <div className="position-rel display-block box-sizing line-height-2">
                                                                <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                                                                    <a className="post-title font-weight-2 text-black-var-1">
                                                                        <div className="m-b-8">{post.title}</div>
                                                                    </a>
                                                                </Link>
                                                                <p className="mask-text-line3 m-b-12 post-content">{post.metadata}</p>
                                                                <div className="display-flex flex-algn-center font-size-6 post-date m-t-4 neutral-color-2">
                                                                    <div className="display-flex m-r-32 font-size-5">{getCurrentDate(post.publishedAt)}</div>
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
                                        <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2621121538375000"
                                            crossOrigin="anonymous"></script>
                                        
                                        <ins className="adsbygoogle"
                                            style={{display:"block"}}
                                            data-ad-client="ca-pub-2621121538375000"
                                            data-ad-slot="1761305707"
                                            data-ad-format="auto"
                                            data-full-width-responsive="true"></ins>
                                        <script>
                                            (adsbygoogle = window.adsbygoogle || []).push({});
                                        </script>

                                        </div>
                                    </PubSpace>
                                    </div>
                                    <div className="position-rel m-t-24">
                                        {recentIocs.length > 0 && (
                                            <>
                                                <div className="display-flex flex-algn-center">
                                                    <div className="display-flex m-r-8 flex-grow">
                                                        <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Latest IOCs`}</h3>
                                                    </div>
                                                </div>
                                                <ul className="display-flex flex-col p-t-16 latest-wrap">
                                                    {recentIocs?.map((post, i) => (
                                                        <li className=" cursor-initial" key={i}>
                                                            <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100">
                                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                                    <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                                                                        <a className="overflow-h-x overflow-h-y position-rel lastest-image">
                                                                            <img src={urlFor(post.image)} alt={post.title} srcSet={urlFor(post.image)} className="image" />
                                                                        </a>
                                                                    </Link> 
                                                                </div>
                                                                <div className="display-flex flex-col flex-grow post-body-wrap">
                                                                    <div className="post-body-container position-rel display-block box-sizing">
                                                                        <div className="position-rel display-block box-sizing line-height-2">
                                                                            <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                                                                                <a className="font-weight-3 font-size-5 post-title small-post text-black-var-1">
                                                                                    <div className="m-b-4 overflow-wrap">{post.title}</div>
                                                                                </a>
                                                                            </Link>
                                                                            <div className="display-flex flex-algn-center font-size-6 neutral-color-2">
                                                                                <div className="display-flex flex-grow">{getCurrentDate(post.publishedAt)}</div>
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