import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { t } from '@lingui/macro';

import scrollHorizontal from '@components/hook/scrollHorizontal'
import { urlFor } from '@utils/sanity';
import eventsApi from '@components/api/events';


const EventSection = () => {
    const scrollRef = React.useRef(null)

    scrollHorizontal({carouselRefs: scrollRef});

    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }

    const {events, loading} = eventsApi();
    
   

  return (
    <>
        {events.length > 0 && (
            <section className='section-collab position-rel primary-bg-1'>
                <div className="display-block width-100 box-sizing font-inherit section-collab-contain">
                    <div className="format-div-2">
                        <div className="display-block position-rel font-inherit">
                            <h2 className="font-size-2 font-weight-2 let-Spac-sub landing-page-center m-r-8 secundary-text-1">{t`Events`}</h2>
                            <div className="hr"></div>
                        </div>
                        <div className="content-wrap-post">
                            <div className="">
                                <ul className="section-event-contain display-grid section-event-wrap people-gap p-t-24">
                                    {events.map((event, i) => (
                                        <li className={`cursor-initial flex-algn-stretch event-item post-item-${i}`} key={event._id}>
                                            <div className="display-flex flex-algn-center flex-grow flex-col flex-algn-stretch width-100 post-item-container">
                                                <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel event-image-container">
                                                    <Link  href="/event/[slug]" as={`/event/${event.slug}`}>
                                                        <a className="overflow-h-x overflow-h-y position-rel height-100">
                                                            <img src={urlFor(event.image)} alt={event.title} srcSet={urlFor(event.image)} className="image" />
                                                        </a>
                                                    </Link> 
                                                </div>
                                                <div className="display-flex flex-col flex-grow p-t-12 p-b-16 p-l-8 p-r-8">
                                                    <div className="post-body-container position-rel display-block box-sizing">
                                                        <div className="position-rel display-block box-sizing line-height-2">
                                                            <Link  href="/event/[slug]" as={`/event/${event.slug}`}>
                                                                <a className="font-size-4 font-weight-2 text-white-var-2 event-title">
                                                                    <div className="m-b-8">{event.title}</div>
                                                                </a>
                                                            </Link> 
                                                            <p className="mask-text-line3 font-size-5 event-content neutral-color-3">{event.location}</p>
                                                            <div className="display-flex flex-algn-center font-size-6 post-date m-t-4 neutral-color-2">
                                                                <div className="display-flex m-r-32 font-size-5">{getCurrentDate(event.dateFrom)} - {getCurrentDate(event.dateTo)}</div>
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
            </section>
        )}
    </>
  )
}

export default EventSection;