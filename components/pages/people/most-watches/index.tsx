import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import peopleApi from '@components/api/people';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';








const MostPeopleWatches = () => {
    const {fetchPopularPeople, updatePeople} = peopleApi();

     //recent news
     const getPopularPeopleApi = useApi(fetchPopularPeople);

     useEffect(() => {
         getPopularPeopleApi.request();
         return () => {
            getPopularPeopleApi.request();
        }
     }, [])
 
     useEffect(() => {
         
     }, [getPopularPeopleApi.data])
    
    return(
        <>
            {getPopularPeopleApi.data?.length > 4 && (
                <section className="section section-mostwatch-wrap flex-algn-center display-flex flex-col position-rel header-p-l header-p-r">
                    <div className="display-block width-100 box-sizing font-inherit">
                        <div className="format-div-2">
                            <div className="">
                                <ul className='section-mostwatch-container display-grid'>
                                    {getPopularPeopleApi.data?.map((post, i) => (
                                        <li className={`cursor-initial flex-algn-stretch section-mostwatch-item section-mostwatch-item-${i}`} onClick={() => updatePeople({id: post.id, count: +post.attributes.visitas + 1})} key={i}>
                                            <div className="display-flex flex-algn-center flex-grow flex-algn-stretch width-100 height-100 post-item-container">
                                                <Link href="/news/[slug]" as={`/news/${post.attributes.Slug}`}>
                                                    <a className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container width-100 height-100">
                                                        <div className="overflow-h-x overflow-h-y position-rel post-image section-mostwatch-image">
                                                            <Image layout='fill' objectFit='cover' src={`${baseURL}${post.attributes.image.data.attributes.url}`} alt={post.attributes.title} className="image" />
                                                        </div>
                                                        <div className="position-abs bottom-0 left-0 right-0 text-white-var-1 p-l-8 p-b-8 p-r-8 z-index-10">
                                                            <h2 className="service-title font-weight-2">{post.attributes.title.toUpperCase()}</h2>
                                                            <div className="service-content mask-text m-t-8">{post.attributes.metadata}</div>
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
            )}
        </>
    
    )
}

export default React.memo(MostPeopleWatches) 