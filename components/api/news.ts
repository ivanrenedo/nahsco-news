import React from 'react';
const qs = require('qs');
import {useRouter} from 'next/router';


import {apiClient} from '@utils/strapi/client';

const newsApi = () => {
    const router = useRouter();

    const {locale, query} = router;

    const localeState = locale == "es" ? `${locale}-ES` : locale;

      //populatePostNews
      const queryPopularNews = qs.stringify({
        sort: ['visitas:desc'],
        filters: {
            tags: {
                name: {
                    $eq: "news"
                }
            }
        },
        pagination: {
            start: 0,
            limit: 6,
        },
        populate: '*'
      }, {
        encodeValuesOnly: true, // prettify URL
      });
      
    const fetchPopularNews = () => apiClient.get(`/posts?locale=${localeState}&${queryPopularNews}`);

    //populatePostNews
    const queryLatestNews = qs.stringify({
        sort: ['publishedAt:desc'],
        filters: {
            tags: {
                name: {
                    $eq: "news"
                }
            }
        },
        pagination: {
            start: 0,
            limit: 6,
        },
        populate: '*'
      }, {
        encodeValuesOnly: true, // prettify URL
      });
      
    const fetchLatestNews = () => apiClient.get(`/posts?locale=${localeState}&${queryLatestNews}`);

    //populatePostNews
    const queryRecentNews = qs.stringify({
        sort: ['publishedAt:desc'],
        filters: {
            tags: {
                name: {
                    $eq: "news"
                }
            }
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });

    const fetchRecentNews = () => apiClient.get(`/posts?locale=${localeState}&${queryRecentNews}`);

    //populatePostIOCs
    const queryPopularIocs = qs.stringify({
        sort: ['visitas:desc'],
        filters: {
            tags: {
                name: {
                    $eq: "iocs"
                }
            }
        },
        pagination: {
            start: 0,
            limit: 6,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
    const fetchPopularIocs = () => apiClient.get(`/posts?locale=${localeState}&${queryPopularIocs}`);

    //RecentPostIOCs
    const queryRecentIocs = qs.stringify({
        sort: ['publishedAt:desc'],
        filters: {
            tags: {
                name: {
                    $eq: "iocs"
                }
            }
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });

    const fetchRecentIocs = () => apiClient.get(`/posts?locale=${localeState}&${queryRecentIocs}`);

    
    const updatePost = ({id, count}) => {

        const data = {
            "data": {
                "visitas": count
            }
        }

        apiClient.put(`/posts/${id}`, data).catch((err) => {
            console.log({err})
        })
    }



    React.useEffect(() => {
       
    }, [locale, query])

    return {
        fetchPopularNews,
        fetchPopularIocs,
        fetchRecentNews,
        fetchRecentIocs,
        updatePost,
        fetchLatestNews
    }
}

export default newsApi;