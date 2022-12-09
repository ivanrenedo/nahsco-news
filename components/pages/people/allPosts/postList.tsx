import Link from 'next/link';
import React, { useEffect } from 'react';
import moment from 'moment';
import { urlFor } from '@utils/sanity';


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
                    {data.sort((a, b) => a?.createdAt?.localeCompare(b.createdAt, 'en', {sensitivity: 'base'}))?.map((people, index) => (
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
                                    <Link href="/people/[slug]" as={`/people/${people.slug}`}>
                                        <a className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-image">
                                            <div className="position-rel height-100 post-item-image people-item-image z-index-0">
                                                <img src={urlFor(people.image)} alt={people.title} srcSet={urlFor(people.image)} className="image" />
                                            </div>
                                            <div className="text-white-var-1 display-block position-abs left-0 bottom-0 p-l-8 p-b-8 z-index-1">
                                                <span className='font-weight-3 font-size-4 line-height-2'>{people.fullname}</span>
                                            </div>
                                        </a>
                                    </Link>   
                                </div>
                                <div className="display-flex flex-col flex-grow post-body-wrap">
                                    <div className="post-body-container position-rel display-block box-sizing">
                                        <div className="position-rel display-block box-sizing line-height-2">
                                            <Link href="/people/[slug]" as={`/people/${people.slug}`}>
                                                <a className="font-weight-3 text-black-var-1">
                                                    <div className='post-title font-inherit position-rel overflow-wrap'>{people.title}</div>
                                                </a>
                                            </Link>
                                            <p className="mask-text-line3 m-t-8 post-content">{people.metadata}</p>
                                            <div className="display-flex flex-algn-center post-date neutral-color-2">
                                                <div className="display-flex m-t-4 font-size-5 overflow-wrap">{getCurrentDate(people.publishedAt)}</div>
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