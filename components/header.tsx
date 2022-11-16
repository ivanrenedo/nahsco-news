import React from 'react';
import Head from 'next/head';

const HeadComponent: React.FC<{ titulo: string }> = ({ titulo }) => {

    return (
        <Head>
            <title>{titulo}</title>
            <meta charSet="utf-8" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="keywords" content="plataforma de musica,music streaming,podcast" />
            {/* <!-- Appel --> */}
            <meta name="apple-mobile-web-app-title" content="Progressive Web app" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="theme-color" content="#00a785" />
        </Head>
    )
}

export default HeadComponent;