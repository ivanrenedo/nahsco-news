import LinkedIndIcon from '@components/icons/linkedin';
import TwitterIcon from '@components/icons/twitter';
import WorldIcon from '@components/icons/world'
import React from 'react'

const SocialMedia = () => {

    const goto = (url:string) => {

        window.open(url);
    }

  return (
    <div className="position-abs height-100 left-0 top-0 bottom-0 header-p-l social-media-container">
        <ul className='height-100 display-flex flex-col flex-algn-center flex-justify-center social-media-contain'>
            <li className='m-b-4'>
                <button onClick={() => goto('https://www.nahsco.com/')}>
                    <div className="icon-media">
                        <WorldIcon />
                    </div>
                </button>
            </li>
            <li className='m-b-4'>
                <button onClick={() => goto('https://www.linkedin.com/company/nahsco/about/')}>
                    <div className="icon-media">
                        <LinkedIndIcon />
                    </div>
                </button>
            </li>
            <li>
                <button onClick={() => goto('https://twitter.com/nahscoeqguinea?lang=en')}>
                    <div className="icon-media">
                        <TwitterIcon />
                    </div>
                </button>
            </li>
        </ul>
    </div>
  )
}

export default SocialMedia