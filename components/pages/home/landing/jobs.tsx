import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { t } from '@lingui/macro';
import Image from 'next/image'
import scrollHorizontal from '@components/hook/scrollHorizontal'
import jobsApi from '@components/api/jobs';
import useApi from '@utils/strapi/useApi';
import { baseURL } from '@utils/strapi/client';


const JobSection = () => {
    const scrollRef = React.useRef(null)

    scrollHorizontal({carouselRefs: scrollRef});

    const getCurrentDate = (date) => {
        return moment(date).format("DD MMM YYYY")
    }

    const {fetchLatestJobs} = jobsApi();
    
    //popular events
    const getLatestJobApi = useApi(fetchLatestJobs);


    React.useEffect(() => {
       
        getLatestJobApi.request();

        return () => {
          getLatestJobApi.request();
        }
       
    }, []);
   

  return (
    <>
      {getLatestJobApi.data  && (
        <section className='section-collab section-jobs position-rel'>
          <div className="display-block width-100 box-sizing font-inherit section-collab-contain">
            <div className="format-div-2">
                <div className="display-block position-rel font-inherit">
                    <p className="font-size-2 font-weight-2 let-Spac-sub landing-page-center m-r-8">{t`Jobs`}</p>
                    <div className="hr"></div>
                </div>
                <div className="display-block box-sizing position-rel font-inherit p-t-24">
                  <ul className="position-rel display-flex overflow-auto-x overflow-h-y people-gap section-event-contain section-event-wrap" ref={scrollRef}>
                    {getLatestJobApi.data.map((job, i) => (
                        <li key={i} className="position-rel cursor-initial flex-algn-stretch" > 
                          <div className="display-block job-item-container">
                            <Link href="/job/[slug]" as={`/job/${job.attributes.Slug}`}>
                              <a className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-image event-image-container">
                                <div className="position-rel height-100 z-index-0">
                                  <Image layout='fill' objectFit='cover' src={`${baseURL}${job.attributes.image.data.attributes.url}`} alt={job.attributes.title} className="image" />
                                </div>
                              </a>
                            </Link>
                            <div className="p-l-8 p-t-8 p-b-8">
                              <div className="font-weight-2 m-b-2 m-b-8 font-size-4 mask-text">{job.attributes.companyName.toUpperCase()}</div>
                              <div className="text-black-var-1 display-block z-index-1">
                                <h2 className='line-height-2 mask-text-line3 font-weight-3 font-size-4'>{job.attributes.title.toUpperCase()}</h2>
                              </div>
                              <div className="display-block box-sizing font-inherit text-black-var-3">
                                <div className='font-size-5 m-t-4'>{job.attributes.location}</div>
                                <div className="font-size-5 text-black-var-3 m-t-2">{getCurrentDate(job.attributes.publishedAt)}</div>
                              </div>
                            </div>
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

export default React.memo(JobSection) ;