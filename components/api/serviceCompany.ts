import React from 'react';
const qs = require('qs');
import {useRouter} from 'next/router';
import {apiClient} from '@utils/strapi/client';

const serviceCompanyApi = () => {
    const router = useRouter()

    const {locale} = router

    const localeState = locale == "es" ? `${locale}-ES` : locale;
     

      //populatePostService
      const queryPopularService = qs.stringify({
        sort: ['visitas:desc'],
        filters: {
            tags: {
                name: {
                    $eq: "service-company"
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
      
    const fetchPopularService = () => apiClient.get(`/posts?locale=${localeState}&${queryPopularService}`);


    //populatePostService
    const queryRecentService = qs.stringify({
        sort: ['publishedAt:desc'],
        filters: {
            tags: {
                name: {
                    $eq: "service-company"
                }
            }
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchRecentService = () => apiClient.get(`/posts?locale=${localeState}&${queryRecentService}`);


    React.useEffect(() => {
    
    }, [locale])

    return {
        fetchPopularService,
        fetchRecentService
    }
}

export default serviceCompanyApi;