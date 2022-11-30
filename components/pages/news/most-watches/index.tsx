import React from 'react';

import { mostWatches } from '@components/pages/home/people/data';
import Link from 'next/link';







const MostWatches = () => (
    <section className="section section-mostwatch-wrap flex-algn-center display-flex flex-col position-rel header-p-l header-p-r">
        <div className="display-block width-100 box-sizing font-inherit">
            <div className="format-div-2">
                <div className="">
                    <ul className='section-mostwatch-container display-grid'>
                        {mostWatches.map((post, i) => (
                            <li className={`cursor-initial flex-algn-stretch section-mostwatch-item section-mostwatch-item-${i}`} key={post.id}>
                                <div className="display-flex flex-algn-center flex-grow flex-algn-stretch width-100 height-100 post-item-container">
                                    <Link href="/news/[slug]" as={`/news/${post.slug}`}>
                                        <a className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container width-100 height-100">
                                            <div className="overflow-h-x overflow-h-y position-rel post-image section-mostwatch-image">
                                                <img src={post.photo} alt={post.title} srcSet={post.photo} className="image" />
                                            </div>
                                            <div className="position-abs bottom-0 left-0 right-0 text-white-var-1 p-l-8 p-b-8 p-r-8 z-index-10">
                                                <div className="service-title font-weight-2">{post.title}</div>
                                                <div className="service-content mask-text m-t-8">{post.content}</div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
)

export default MostWatches