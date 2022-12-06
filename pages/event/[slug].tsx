import React from "react";
import moment from 'moment';
import Link from "next/link";
import { t } from '@lingui/macro';


import BaseShape from "@components/layout/general/baseShape"
import LayoutMain from "@components/layout/LayoutAuth"
import AdsLeaderBoard from "@components/ads/leaderBoard";
import PubSpace from "@components/espacioPub";
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon} from  'react-share';
import LinkedIndIcon from "@components/icons/linkedin";
import eventsApi from "@components/api/events";
import { getSanityClient } from "@utils/sanity/sanity-server";
import { urlFor } from "@utils/sanity";
import { PortableText } from "@portabletext/react";



const BodyComponent = {
    types: {
        image: ({value}) => <img className="body-image-post" src={urlFor(value)} /> 
    },
   /*  block: {
        normal: ({children}) => <p className="paragraphe-post">{children}</p>
    }, */
    
}


const NewsListPage = ({post}) => {
    
    const currentPage = "window.location.href";

    const {events} = eventsApi();

    function goto(url) {
        window.open(url);
    }
    
    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }
    console.log(post)

    return(
        <LayoutMain title='News'>
            <div className="landing-page">
                <AdsLeaderBoard>
                    <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                        <div className="position-rel">
                            <img src="/img/publicidad.jpg" alt="publícate en NAHSCO" srcSet="/img/publicidad.jpeg" className="image" />
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
                                            <section className="section section-news flex-algn-center display-flex flex-col position-rel">
                                                <div className="display-block width-100 box-sizing font-inherit">
                                                    <div className="format-div-2">
                                                        <div className="content-wrap-post flex-flow">
                                                            <div className=" display-flex flex-grow position-rel">
                                                                <div className="display-block position-rel font-inherit box-sizing">
                                                                    <div className="position-rel flex-flow">
                                                                        <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                                            <div className="position-rel post-item-container-page">
                                                                                <img src={urlFor(post.image)} alt={post.title} srcSet={urlFor(post.image)} className="image" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="width-100 z-index-12 display-block position-rel top-body-post">
                                                                            <div className="background-var1 top-body-post-container">
                                                                               <div className="display-flex flex-col position-rel font-inherit box-sizing">

                                                                                    <div className="position-rel display-flex box-sizing font-inherit overflow-h-x overflow-h-y flex-justify-center">
                                                                                        <div className="display-flex flex-justify-center flex-algn-center flex-grow width-100" style={{minHeight: 60, maxWidth: 1200, maxHeight: '300px'}}>
                                                                                            <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                                                                <div className="position-rel">
                                                                                                    <img src="/img/publicidad.jpg" alt="publícate en NAHSCO" srcSet="/img/publicidad.jpeg" className="image" />
                                                                                                </div>
                                                                                            </div> 
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="publishedAt display-flex font-weight-3 neutral-color-1 m-t-16 m-b-8">{`${t`Published at`} ${getCurrentDate(post.publishedAt)} ${t`on event`}`}</div>
                                                                                    <div className="post-item-title m-b-12 m-t-8 font-size-1 font-weight-2 line-height-2">{post.title}</div>
                                                                                    <p className="m-b-12 font-size-3 font-weight-3 line-height-2">{`En ${post.location}`}</p>
                                                                                    <div className="display-flex flex-algn-center width-100 m-b-8">
                                                                                        <div className="display-flex font-size-4">
                                                                                            <div className="">{getCurrentDate(post.dateFrom)}</div>
                                                                                            <span className="p-l-2 p-r-2">-</span>
                                                                                            <div className="">{getCurrentDate(post.dateTo)}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="post-item-body">
                                                                                        <div className="post-item-body-container">
                                                                                            <PortableText value={post.body} components={BodyComponent} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="display-flex flex-col flex-algn-end flex-justify-center width-100 m-t-32 m-b-32">
                                                                                        <div className="post-item-footer display-flex flex-algn-center">
                                                                                            <span className=" font-weight-3">{t`Share in`}</span>
                                                                                            <WhatsappShareButton url={currentPage}>
                                                                                                <WhatsappIcon size={32} round/>
                                                                                            </WhatsappShareButton>
                                                                                            <LinkedinShareButton url={currentPage}>
                                                                                                <LinkedIndIcon />
                                                                                            </LinkedinShareButton>
                                                                                            <TwitterShareButton url={currentPage}>
                                                                                                <TwitterIcon size={32} round />
                                                                                            </TwitterShareButton>
                                                                                            <FacebookShareButton url={currentPage}>
                                                                                                <FacebookIcon size={32} round />
                                                                                            </FacebookShareButton>
                                                                                        </div>
                                                                                    </div>
                                                                                    <AdsLeaderBoard>
                                                                                        <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                                                            <div className="position-rel">
                                                                                                <img src="/img/publicidad.jpg" alt="publícate en NAHSCO" srcSet="/img/publicidad.jpeg" className="image" />
                                                                                            </div>
                                                                                        </div> 
                                                                                    </AdsLeaderBoard>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="content-posts-aside ">
                                                                <div className="space-pub-container">
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
                                                                                <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Latest events`}</h3>
                                                                            </div>
                                                                        </div>
                                                                        <ul className="display-flex flex-col p-t-16 popular-wrap-post-view display-grid">
                                                                            {events.slice(0,3).map((post, i) => (
                                                                                <li className={`cursor-initial popular-wrap-post-item popular-wrap-post-${i}`} key={i}>
                                                                                    <div className="display-flex flex-algn-center flex-grow displey-flex flex-algn-stretch width-100 popular-post-container">
                                                                                        <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel">
                                                                                            <Link href="/event/[slug]" as={`/event/${post.slug}`}>
                                                                                                <a className="overflow-h-x overflow-h-y position-rel lastest-image">
                                                                                                    <img src={urlFor(post.image)} alt={post.title} srcSet={urlFor(post.image)} className="image" />
                                                                                                </a>
                                                                                            </Link> 
                                                                                        </div>
                                                                                        <div className="display-flex flex-col flex-grow post-body-wrap">
                                                                                            <div className="post-body-container position-rel display-block box-sizing">
                                                                                                <div className="position-rel display-block box-sizing line-height-2">
                                                                                                    <Link href="/event/[slug]" as={`/event/${post.slug}`}>
                                                                                                        <a className="font-weight-3 post-title text-black-var-1">
                                                                                                            <div className="m-b-4">{post.title}</div>
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
                                                                    <div className="position-rel box-sizing m-t-32">
                                                                        <PubSpace>
                                                                            <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container cursor-point" onClick={() => goto('https://www.nahsco.com/')}>
                                                                                <div className="position-rel">
                                                                                    <img src="/img/pubnashco.jpeg" alt="publícate en NAHSCO" srcSet="/img/pubnashco.jpeg" className="image" />
                                                                                </div>
                                                                            </div>
                                                                        </PubSpace>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
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

    const pageSlug = context.query.slug;

    if (!pageSlug) {
        return {
            notFound: true
        }
    }

    const peoples = await getSanityClient(true).fetch(`
        *[_type == "event" && slug.current == $pageSlug ] {
            _id, 
            title,
            body,
            image,
            location,
            dateFrom,
            dateTo,
            "slug": slug.current,
            publishedAt
        }
    `,{pageSlug})
    
    return {
        props: {
            post: peoples[0]
        }, // will be passed to the page component as props
    }
}


export default NewsListPage;