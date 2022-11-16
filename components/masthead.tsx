import React from 'react';
import Link from 'next/link';

type Masthead = {
    pathname: string;
    pageName: string;
    text: string
}

const Masthead = ({pathname, pageName, text}:Masthead) => {


    return (
        <>
            <div className="masthed">
                <div className="display-flex flex-algn-center flex-justify-center"> 
                    <div className="masthed-text">
                        {text}
                        <Link href={ pathname }>
                            <a className="let-Spac-button font-weight-2">
                                {pageName}
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Masthead;