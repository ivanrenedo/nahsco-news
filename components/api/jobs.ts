import React, {useState} from 'react';
import {useRouter} from 'next/router';
import { getSanityClient } from '@utils/sanity/sanity-server';

const jobsApi = () => {
    const router = useRouter()

    const [jobs, setJobs] = useState<any[]>([])
    const [allJobs, setAllJobs] = useState<any[]>([])
  
    const [loading, setLoading] = useState(true)
  
    const {locale} = router



    const fetchEvents = async() => {

        try {
            setLoading(true);
  
            const result = await getSanityClient(true).fetch(`
              *[_type == "job" && publishedAt < now() ][0...6] | order(publishedAt desc) {
                  _id, 
                  companyName,
                  title,
                  body,
                  image,
                  location,
                  jobType,
                  workPlace,
                  "slug": slug.current,
                  publishedAt
              }
          `)
  
            setJobs(result)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        
    }

    const fetchAllEvents = async() => {

        try {
            setLoading(true);
  
            const result = await getSanityClient(true).fetch(`
              *[_type == "job" && publishedAt < now() ][0...6] | order(publishedAt desc) {
                  _id, 
                  companyName,
                  title,
                  body,
                  image,
                  location,
                  jobType,
                  workPlace,
                  "slug": slug.current,
                  publishedAt
              }
          `)
  
            setAllJobs(result)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        
    }
  
    React.useEffect(() => {
        ( async() => {
            await fetchEvents();
            await fetchAllEvents()
        })();
  
        return () => {
            ( async() => {
                await fetchEvents();
                await fetchAllEvents()
            })();
        }
    }, [locale])

    return {
        jobs,
        allJobs,
        loading
    }
}

export default jobsApi;