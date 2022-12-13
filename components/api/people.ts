import React from 'react';
const qs = require('qs');
import {useRouter} from 'next/router';
import { apiClient } from '@utils/strapi/client';

const peopleApi = () => {
    const router = useRouter()

    const {locale} = router

    const localeState = locale == "es" ? `${locale}-ES` : locale;
     

      //populatePostNews
      const queryPopularPeople = qs.stringify({
        sort: ['visitas:desc'],
        pagination: {
            start: 0,
            limit: 6,
        },
        populate: '*'
      }, {
        encodeValuesOnly: true, // prettify URL
      });
      
    const fetchPopularPeople = () => apiClient.get(`/gentes?locale=${localeState}&${queryPopularPeople}`);

    //populatePostNews
    const queryRecentPeople = qs.stringify({
        sort: ['publishedAt:desc'],
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
      });
      
    const fetchRecentPeople = () => apiClient.get(`/gentes?locale=${localeState}&${queryRecentPeople}`);
    
  
React.useEffect(() => {

}, [locale])

    return {
        fetchPopularPeople,
        fetchRecentPeople
    }
}

export default peopleApi;