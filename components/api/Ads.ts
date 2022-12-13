import React, {useState} from 'react';
const qs = require('qs');
import {useRouter} from 'next/router';
import { apiClient } from '@utils/strapi/client';

const AdsApi = () => {
    const router = useRouter()

    const {locale} = router 

    const localeState = locale == "es" ? `${locale}-ES` : locale;

    //Top banner home
    const queryPopularTopBanner = qs.stringify({
        filters: {
            name: {
                $eq: "top-banner"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchPopularTopBanner = () => apiClient.get(`/publicidads?locale=${localeState}&${queryPopularTopBanner}`);

    //lateral home service
    const queryPopularLateralHome = qs.stringify({
        filters: {
            name: {
                $eq: "lateral-home"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchPopularLateralHome = () => apiClient.get(`/publicidads?locale=${localeState}&${queryPopularLateralHome}`);

    //video home
    const queryPopularVideoHome = qs.stringify({
        filters: {
            name: {
                $eq: "Video-home"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchPopularVideoHome = () => apiClient.get(`/publicidads?locale=${localeState}&${queryPopularVideoHome}`);

    //video ioc
    const queryPopularVideoIoc = qs.stringify({
        filters: {
            name: {
                $eq: "Video-ioc"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchPopularVideoIoc = () => apiClient.get(`/publicidads?locale=${localeState}&${queryPopularVideoIoc}`);

    //banner bottom home
    const queryBottomBannerHome = qs.stringify({
        filters: {
            name: {
                $eq: "banner-bottom-home"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchBottomBannerHome = () => apiClient.get(`/publicidads?locale=${localeState}&${queryBottomBannerHome}`);


    //banner bottom home
    const queryTopBannerNews = qs.stringify({
        filters: {
            name: {
                $eq: "top-banner-news"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchTopBannerNews = () => apiClient.get(`/publicidads?locale=${localeState}&${queryTopBannerNews}`);

    //banner bottom home
    const queryLateralrNews = qs.stringify({
        filters: {
            name: {
                $eq: "lateral-news"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchLateralNews = () => apiClient.get(`/publicidads?locale=${localeState}&${queryLateralrNews}`);

    //banner bottom home
    const queryTopBannerIoc = qs.stringify({
        filters: {
            name: {
                $eq: "top-banner-ioc"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchTopBannerIoc = () => apiClient.get(`/publicidads?locale=${localeState}&${queryTopBannerIoc}`);

    //banner bottom home
    const queryLateralIoc = qs.stringify({
        filters: {
            name: {
                $eq: "lateral ioc-people"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchLateralIoc = () => apiClient.get(`/publicidads?locale=${localeState}&${queryLateralIoc}`);

    //banner bottom home
    const queryLateralService = qs.stringify({
        filters: {
            name: {
                $eq: "lateral ioc-people"
            }
        }, 
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchLateralService = () => apiClient.get(`/publicidads?locale=${localeState}&${queryLateralService}`);

    return {
        fetchPopularTopBanner,
        fetchPopularLateralHome,
        fetchPopularVideoHome,
        fetchPopularVideoIoc,
        fetchBottomBannerHome,
        fetchTopBannerNews,
        fetchLateralNews,
        fetchTopBannerIoc,
        fetchLateralIoc,
        fetchLateralService
    }
}

export default AdsApi;