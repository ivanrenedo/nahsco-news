import React from 'react';

const PhotoIcon = () => (
    <svg className='size-logo' id="photo-camera" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path id="primary" d="M21,7V19a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V7A1,1,0,0,1,4,6H8l.72-1.45A1,1,0,0,1,9.62,4h4.76a1,1,0,0,1,.9.55L16,6h4A1,1,0,0,1,21,7Zm-9,3a3,3,0,1,0,3,3A3,3,0,0,0,12,10Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
)

const Photo = () => (
    <PhotoIcon />
)

export default Photo;