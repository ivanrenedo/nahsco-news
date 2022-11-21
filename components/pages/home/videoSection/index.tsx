import React from 'react'
import SocialMedia from '../socialMedia'

const VideoBackgroundSection = () => {


  return (
    <section aria-label='video background of NAHSCO' className='video-bg-container'>
        <div className="overlay"></div>
        <video src="/video/petr2.mp4" autoPlay loop muted />
        <div className="content position-rel">
            <SocialMedia />
            <h1 className='title-video display-flex'>
              <span className='first-title'>EG'S LEADING HIDROCARBONS SECTOR</span>
              <span className='second-title'>NEWS HUB</span>
            </h1>
        </div>
    </section>
  )
}

export default VideoBackgroundSection