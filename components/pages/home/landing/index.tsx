import React from 'react';
import Link from 'next/link';
import scrollHorizontal from '@components/hook/scrollHorizontal'
import { peoplesSectionArr } from '../landing/data';


const PeopleSection = () => {
  const scrollRef = React.useRef(null)

  scrollHorizontal({carouselRefs: scrollRef});
   

  return (
    <section className='section-collab position-rel primary-bg-1'>
        <div className="display-block width-100 box-sizing font-inherit section-collab-contain">
          <div className="format-div-2">
              <div className="display-block position-rel font-inherit">
                  <h2 className="font-size-2 font-weight-2 let-Spac-sub landing-page-center m-r-8 text-white-var-1">PEOPLE</h2>
                  <div className="hr"></div>
              </div>
              <div className="display-block box-sizing position-rel font-inherit p-t-24">
                  <ul className="position-rel display-flex overflow-auto-x overflow-h-y people-gap p-l-16 p-r-16 text-primary-var-4 section-event-contain section-event-wrap" ref={scrollRef}>
                    {peoplesSectionArr.map((people, i) => (
                        <li key={i} className="position-rel cursor-initial"> 
                          <div className="display-block service-container">
                            <Link href="/people/[slug]" as={`/people/${people.slug}`}>
                              <a className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-image">
                                <div className="position-rel height-100 post-image-people z-index-0">
                                    <img src={people.photo} alt={people.title} srcSet={people.photo} className="image" />
                                </div>
                                <div className="text-white-var-1 display-block position-abs left-0 bottom-0 p-l-8 p-b-8 z-index-1">
                                  <span className='font-weight-3 font-size-4 line-height-2'>{people.title}</span>
                                </div>
                              </a>
                            </Link>
                            <div className="p-l-8 p-t-8 p-b-8">
                              <div className="font-weight-3 m-b-2">{people.name}</div>
                              <div className="display-block box-sizing font-inherit neutral-color-2">
                                <div className="font-size-4">{people.sector}</div>
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
  )
}

export default PeopleSection