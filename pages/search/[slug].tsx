import React from "react";
import moment from 'moment';
import Link from "next/link";
import { t } from '@lingui/macro';
import { useRouter } from 'next/router';


import BaseShape from "@components/layout/general/baseShape"
import LayoutMain from "@components/layout/LayoutAuth"
import AdsLeaderBoard from "@components/ads/leaderBoard";
import PubSpace from "@components/espacioPub";
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon} from  'react-share';
import LinkedIndIcon from "@components/icons/linkedin";


 


const NewsListPage = () => {
    
    const currentPage = "window.location.href";

    function goto(url) {
        window.open(url);
    }
    
    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }
    

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
                                                                                <img src="/img/img1.jfif" alt="publícate en NAHSCO" srcSet="/img/img1.jfif" className="image" />
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

                                                                                    <div className="publishedAt display-flex font-weight-3 neutral-color-1 m-t-16 m-b-8">{`${t`Published at`} ${getCurrentDate('2022-03-12')} ${t`on event`}`}</div>
                                                                                    <div className="post-item-title m-b-12 m-t-8 font-size-2 font-weight-2 line-height-2">Simon Lizotte take a big advance in the last tournament A</div>
                                                                                    <div className="post-item-body">
                                                                                        <div className="post-item-body-container">
                                                                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam voluptas nobis reiciendis repellat accusantium beatae quae, sint est, ex qui dicta! Rerum repudiandae, nobis non commodi nihil mollitia placeat ex?
                                                                                            Ullam officiis recusandae dignissimos accusantium aliquid, beatae, quo libero cum iste architecto ex minus eligendi quisquam aliquam. Deserunt quo illum sint rerum labore veniam, exercitationem ipsam dignissimos temporibus saepe fugit!
                                                                                            Iste officia veniam veritatis reprehenderit dolores illo quasi quod ad, non quisquam qui possimus consectetur at nulla velit eum nam expedita! Perspiciatis non vel, optio tempora earum commodi. Quos, reiciendis!
                                                                                            Temporibus, quis? Quidem aliquam laudantium ad sapiente debitis nostrum neque facere. Labore, earum cupiditate? Sit perferendis ab nobis iste eum praesentium suscipit qui excepturi eveniet at, nesciunt, eligendi deserunt natus!
                                                                                            Eligendi necessitatibus consequatur eveniet accusamus cupiditate nostrum explicabo? Ducimus reiciendis id vel, consequuntur optio aut maiores dolorum harum ex facilis deserunt incidunt corporis cum! Est, laborum nemo? Voluptates, quod laborum.
                                                                                            Fugiat, dolor assumenda dolore porro dicta quos magni adipisci distinctio aut quidem? Reiciendis atque doloremque eum, repellendus ex optio aut laboriosam error neque deserunt. Blanditiis iusto sunt similique commodi illo.
                                                                                            Ducimus voluptatibus magnam illum. Quasi in eos illo? Inventore dolorum nam ab error fugit veniam impedit possimus recusandae? Explicabo amet ducimus illum, consequuntur nobis hic laudantium praesentium ex ipsum labore!
                                                                                            Magnam minus quod, molestias totam iste soluta. Maxime architecto nam obcaecati nostrum quae dicta, unde assumenda error voluptatibus atque aperiam dignissimos velit, officiis quos porro ex mollitia officia, ad est!
                                                                                            Voluptatem cupiditate amet minima atque explicabo aliquam illo odio fugiat vel quisquam neque in, exercitationem sequi corporis eius dolores vero tempora esse dolore totam accusamus ullam placeat. Laborum, reprehenderit qui.
                                                                                            Voluptatibus, dicta iste nobis possimus sit atque aliquid quibusdam aut architecto nesciunt provident, similique vitae ratione pariatur dolorem voluptates minus laborum cumque placeat totam distinctio ex fugit! Consectetur, fugit tempora.
                                                                                            Dolore consectetur illum ad incidunt. Doloribus, pariatur. Cum dicta ullam, assumenda repellendus quas excepturi tenetur placeat eum nesciunt, sit est quae quos expedita, mollitia deleniti nostrum dolorum maxime aliquam quam!
                                                                                            Ipsum possimus architecto recusandae impedit vel at corrupti voluptas beatae omnis facilis cum totam provident deleniti eius adipisci sapiente maxime doloremque, natus, ipsa odit quaerat suscipit? Vitae fugit eius magnam.
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
                                                                                <h3 className="font-weight-2 let-Spac-sub landing-page-center width-100">{t`Popular news`}</h3>
                                                                            </div>
                                                                        </div>
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
    
    return {
        props: {}, // will be passed to the page component as props
    }
}


export default NewsListPage;