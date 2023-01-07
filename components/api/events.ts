import React from 'react';
const qs = require('qs');
import {useRouter} from 'next/router';
import { apiClient } from '@utils/strapi/client';

const eventsApi = () => {
    const router = useRouter()
  
    const {locale} = router 

    const localeState = locale == "es" ? `${locale}-ES` : locale;
     

      //populatePostService
      const queryPopularEvents = qs.stringify({
        sort: ['visitas:desc'],
        populate: '*',
        pagination: {
            start: 0,
            limit: 6,
        },
      }, {
        encodeValuesOnly: true, // prettify URL
      });
      
    const fetchPopularEvents = () => apiClient.get(`/events?locale=${localeState}&${queryPopularEvents}`);

     //populatePostService
     const queryLatestEvents = qs.stringify({
      sort: ['publishedAt:desc'],
      populate: '*',
      pagination: {
          start: 0,
          limit: 6,
      },
    }, {
      encodeValuesOnly: true, // prettify URL
    });
    
  const fetchLatestEvents = () => apiClient.get(`/events?locale=${localeState}&${queryLatestEvents}`);

    //RecentPostService
    const queryRecentEvents = qs.stringify({
        sort: ['publishedAt:desc'],
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
      });
      
    const fetchRecentEvents = () => apiClient.get(`/events?locale=${localeState}&${queryRecentEvents}`);
 
  
    React.useEffect(() => {

    }, [locale])

    return {
        fetchPopularEvents,
        fetchRecentEvents,
        fetchLatestEvents
    }
}

export default eventsApi;