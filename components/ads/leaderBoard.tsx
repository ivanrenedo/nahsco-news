import React from 'react'



const AdsLeaderBoard = ({children}) => (
    <div className="position-rel display-flex box-sizing font-inherit banner-space overflow-h-x overflow-h-y flex-justify-center">
        <div className="display-flex flex-justify-center flex-algn-center flex-grow width-100" style={{minHeight: 60, maxWidth: 1200, maxHeight: '300px'}}>
            {children}
        </div>
    </div>
)

export default AdsLeaderBoard