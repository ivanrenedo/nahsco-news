import React from 'react';
const qs = require('qs');
import {useRouter} from 'next/router';
import { apiClient } from '@utils/strapi/client';

const jobsApi = () => {
    const router = useRouter()
  
    const {locale} = router

    const localeState = locale == "es" ? `${locale}-ES` : locale;
     

    //populatePostService
    const queryPopularJobs = qs.stringify({
        sort: ['publishedAt:desc'],
        pagination: {
            start: 0,
            limit: 6,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchPopularJobs = () => apiClient.get(`/jobs?locale=${localeState}&${queryPopularJobs}`);

    //populatePostService
    const queryRecentJobs = qs.stringify({
        sort: ['publishedAt:desc'],
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify URL
    });
      
    const fetchRecentJobs = () => apiClient.get(`/jobs?locale=${localeState}&${queryRecentJobs}`);
  
    React.useEffect(() => {
       
    }, [locale])

    return {
        fetchPopularJobs,
        fetchRecentJobs
    }
}

export default jobsApi;