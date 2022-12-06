import React, {useState} from 'react';
import {useRouter} from 'next/router';
import { getSanityClient } from '@utils/sanity/sanity-server';

const eventsApi = () => {
    const router = useRouter()

    const [events, setEvents] = useState<any[]>([])
    const [allEvents, setAllEvents] = useState<any[]>([])
  
    const [loading, setLoading] = useState(true)
  
    const {locale} = router



    const fetchEvents = async() => {

        try {
            setLoading(true);
  
            const result = await getSanityClient(true).fetch(`
            *[_type == "event" && publishedAt < now() ][0...6] | order(publishedAt desc) {
                _id, 
                title,
                body,
                image,
                location,
                dateFrom,
                dateTo,
                "slug": slug.current,
                publishedAt
            }
        `)
  
            setEvents(result)
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
            *[_type == "event" && publishedAt < now() ] | order(publishedAt desc) {
                _id, 
                title,
                body,
                image,
                location,
                dateFrom,
                dateTo,
                "slug": slug.current,
                publishedAt
            }
        `)
  
            setAllEvents(result)
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
        events,
        allEvents,
        loading
    }
}

export default eventsApi;