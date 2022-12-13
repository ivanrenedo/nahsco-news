import Link from 'next/link';
import React, { useEffect } from 'react';
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
                    {data?.map((job, index) => (
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
                                    <Link href="/job/[slug]" as={`/job/${job.attributes.Slug}`}>
                                        <a className="post-item-image overflow-h-x overflow-h-y position-rel">
                                        <img src={`${baseURL}${job.attributes.image.data.attributes.url}`} alt={job.attributes.title} srcSet={`${baseURL}${job.attributes.image.data.attributes.url}`} className="image" />
                                        </a>
                                    </Link>   
                                </div>
                                <div className="display-flex flex-col flex-grow post-body-wrap">
                                    <div className="post-body-container position-rel display-block box-sizing">
                                        <div className="position-rel display-block box-sizing line-height-2">
                                            <Link href="/job/[slug]" as={`/job/${job.attributes.Slug}`}>
                                                <a className="font-weight-3 text-black-var-1">
                                                    <div className='post-title font-inherit position-rel'>{job.attributes.companyName}</div>
                                                </a>
                                            </Link>
                                            <p className="mask-text-line3 m-t-8 post-content">{job.attributes.title}</p>
                                            <p className="mask-text-line3 post-content font-size-5">{job.attributes.location}</p>
                                            <div className="display-flex flex-algn-center post-date neutral-color-2">
                                                <div className="display-flex font-size-5">{getCurrentDate(job.attributes.publishedAt)}</div>
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


export default PostListComponent