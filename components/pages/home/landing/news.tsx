import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import {posts} from '@components/pages/home/landing/data';
import PubSpace from '@components/espacioPub';




const NewsSection = () => {

    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }
    
    function goto(url) {
        window.open(url); 
    }

    return (
        <>  
            <section className="section section-news flex-algn-center display-flex flex-col position-rel">
                <div className="display-block width-100 box-sizing font-inherit">
                    <div className="format-div-2">
                        <div className="display-block position-rel font-inherit">
                            <h2 className="font-size-2 font-weight-2 let-Spac-sub landing-page-center m-r-8 text-primary-var-1">NEWS</h2>
                            <div className="hr"></div>
                        </div>
                        <div className="content-wrap-post">
                            <div className="">
                                <ul className="section-news-contain display-grid grid-news-item p-t-24">
                                    {posts.map((post, i) => (
                                        <li className={`cursor-initial flex-algn-stretch post-item post-item-${i}`} key={post.id}>
                                            <div className="display-flex flex-algn-center flex-grow post-news-contain flex-algn-stretch width-100 post-item-container">
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container">
                                                    <Link  href="/" as="/">
                                                        <a className="post-item-image border-r-10 overflow-h-x overflow-h-y position-rel">
                                                            <img src={post.photo} alt={post.title} srcSet={post.photo} className="image" />
                                                        </a>
                                                    </Link>   
                                                </div>
                                                <div className="display-flex flex-col flex-grow post-body-wrap">
                                                    <div className="post-body-container position-rel display-block box-sizing">
                                                        <div className="position-rel display-block box-sizing line-height-2">
                                                            <Link  href="/" as="/">
                                                                <a className="post-title font-weight-2 text-black-var-1">
                                                                    <div className="m-b-8">{post.title}</div>
                                                                </a>
                                                            </Link>
                                                            <p className="mask-text-line3 m-b-12 post-content">{post.content}</p>
                                                            <div className="display-flex flex-algn-center font-size-6 post-date m-t-4 neutral-color-2">
                                                                <div className="display-flex m-r-32 font-size-5">{getCurrentDate(post.createdAt)}</div>
                                                                <div className="display-flex flex-justify-center flex-algn-center flex-row-reverse height-100">
                                                                    views
                                                                    <span className="m-r-2">{post.views}</span> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="content-posts-aside">
                                <div className="space-pub-container">
                                    <div className="position-rel box-sizing">
                                        <PubSpace>
                                            <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                <div className="position-rel">
                                                    <img src="img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="img/pubnashco.jpeg" className="image" />
                                                </div>
                                            </div>
                                        </PubSpace>
                                    </div>
                                    <div className="position-rel m-t-16">
                                        <div className="display-flex flex-algn-center">
                                            <div className="display-flex m-r-8 flex-grow">
                                                <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">Latest news</h3>
                                            </div>
                                        </div>
                                        <ul className="display-flex flex-col p-t-16 latest-wrap">
                                            {posts.slice(0,3).map((post, i) => (
                                                <li className=" cursor-initial" key={i}>
                                                    <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100">
                                                        <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                            <Link  href="/" as="/">
                                                                <a className="border-r-10 overflow-h-x overflow-h-y position-rel lastest-image">
                                                                    <img src={post.photo} alt={post.title} srcSet={post.photo} className="image" />
                                                                </a>
                                                            </Link> 
                                                        </div>
                                                        <div className="display-flex flex-col flex-grow post-body-wrap">
                                                            <div className="post-body-container position-rel display-block box-sizing">
                                                                <div className="position-rel display-block box-sizing line-height-2">
                                                                    <Link  href="/" as="/">
                                                                        <a className="font-weight-3 font-size-5 post-title text-black-var-1">
                                                                            <div className="m-b-4">{post.title}</div>
                                                                        </a>
                                                                    </Link>
                                                                    <div className="display-flex flex-algn-center font-size-6 neutral-color-2">
                                                                        <div className="display-flex flex-grow">{getCurrentDate(post.createdAt)}</div>
                                                                        <div className="display-flex flex-justify-center flex-algn-center flex-row-reverse">
                                                                            views
                                                                            <span className="m-r-2">{post.views}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
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