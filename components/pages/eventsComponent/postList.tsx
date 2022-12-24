import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image'
import moment from 'moment';
import { baseURL } from '@utils/strapi/client';


interface PostListComponent {
    data: Array<any>;
}


const PostListComponent: React.FC<PostListComponent> = ({data}) => {

    let itemRefs = React.useRef<HTMLLIElement[]>([]);

    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }

    useEffect(() => {
      
    }, [data])
     

    return (
        <>
            <section className="z-index-0 position-rel">
                <ul className="display-grid list-post-wrap">
                    {data?.map((event, index) => (
                        <li 
                            key={index}
                            className={`cursor-initial flex-algn-stretch list-post-item list-post-item-${index}`}
                            ref={el => {
                                if (el) {
                                    itemRefs.current![index] = el;
                                } else {
                                    delete itemRefs.current![index];
                                }
                            }} 
                        >
                            <div className="display-flex flex-algn-center flex-grow list-post-container flex-algn-stretch width-100">
                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container">
                                    <Link href="/event/[slug]" as={`/event/${event.attributes.Slug}`}>
                                        <a className="post-item-image overflow-h-x overflow-h-y position-rel">
                                            <Image layout='fill' objectFit='cover' src={`${baseURL}${event.attributes.image.data.attributes.url}`} alt={event.attributes.title} width="100%" height="100%" className="image" />
                                        </a>
                                    </Link>   
                                </div>
                                <div className="display-flex flex-col flex-grow post-body-wrap">
                                    <div className="post-body-container position-rel display-block box-sizing">
                                        <div className="position-rel display-block box-sizing line-height-2">
                                            <Link href="/event/[slug]" as={`/event/${event.attributes.Slug}`}>
                                                <a className="font-weight-3 text-black-var-1">
                                                    <div className='post-title font-inherit position-rel'>{event.attributes.title.toUpperCase()}</div>
                                                </a>
                                            </Link>
                                            <div className="mask-text-line3 m-t-8 post-content font-size-5">{event.attributes.location}</div>
                                            <div className="display-flex flex-algn-center post-date neutral-color-2">
                                                <div className="display-flex m-t-4 font-size-5">{getCurrentDate(event.attributes.dateFrom)} - {getCurrentDate(event.attributes.dateTo)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}


export default React.memo(PostListComponent)