import React, {useState} from 'react';
import {useRouter} from 'next/router';
import { getSanityClient } from '@utils/sanity/sanity-server';

const newsApi = () => {
    const router = useRouter();

    const [popularNews, setPopularNews] = useState<any[]>([])
    const [recentIocs, setIocs] = useState<any[]>([]);
    const [recentNews, setRecentNews] = useState<any[]>([]);
    const [allIocs, setallIocs] = useState<any[]>([]);

    const [postCount, setPostCount] = useState(1);

    const [loadingPopularNews, setLoadingPopularNews] = useState(true)
    const [loadingNews, setLoadingNews] = useState(true)
    const [lodingRecentIocs, setLodingIocs] = useState(true);

    const {locale} = router


    const fetchPopularNews = async() => {

        try {
            setLoadingPopularNews(true);

            const result = await getSanityClient(true).fetch(`
                *[_type == "post" && language == $locale && "news" in categories[]->name ][0...5] | order(visitas desc) {
                    _id, 
                    title,
                    body,
                    visitas, 
                    language,
                    metadata,
                    image,
                    "slug": slug.current,
                    publishedAt,
                    "category": categories[]-> {name}
                }
            `,{locale})

            setLoadingPopularNews(false)
            setPopularNews(result)
            
        } catch (error) {
            console.log(error)
            setLoadingPopularNews(false)
        }
        
    }

    const fetchRecentNews = async() => {
        setLoadingNews(true)
        try {
            /* offset: router.query.offset, limit: router.query.limit */
            const result = await getSanityClient(true).fetch(`
                *[_type == "post" && language == $locale && "news" in categories[]->name ] | order(publishedAt desc) {
                    _id, 
                    title, 
                    body,
                    visitas, 
                    language,
                    metadata,
                    image,
                    "slug": slug.current,
                    publishedAt,
                    "category": categories[]-> {name}
                }
            `,{locale})

            setRecentNews(result)
            setLoadingNews(false)
            
        } catch (error) {
            console.log(error)
            setLoadingPopularNews(false)
        }
        
    }

    const fetchAllIocs = async() => {

        try {
            setLodingIocs(true);
            /* offset: router.query.offset, limit: router.query.limit */
            const result = await getSanityClient(true).fetch(`
                *[_type == "post" && language == $locale && "iocs" in categories[]->name ] | order(publishedAt desc) {
                    _id, 
                    title, 
                    body,
                    visitas, 
                    language,
                    metadata,
                    image,
                    "slug": slug.current,
                    publishedAt,
                    "category": categories[]-> {name}
                }
            `,{locale})

            setallIocs(result)
            setLodingIocs(false);
        } catch (error) {
            console.log(error)
            setLodingIocs(false);
        }
        
    }

    const fetchRecentIocs = async() => {

        try {
            setLodingIocs(true);

            const result = await getSanityClient(true).fetch(`
                *[_type == "post" && language == $locale && "iocs" in categories[]->name && publishedAt < now() ][0...3] | order(publishedAt desc) {
                    _id, 
                    title,
                    body,
                    visitas, 
                    language,
                    metadata,
                    image,
                    "slug": slug.current,
                    publishedAt,
                    "category": categories[]-> {name}
                }
            `,{locale})

            setIocs(result)
            setLodingIocs(false)
            
        } catch (error) {
            console.log(error)
            setLodingIocs(false)
        }
        
    }

    const countNews = async() => {

        try {

            const count = await getSanityClient(true).fetch(`
                count(*[_type == "post" && language == $locale && "news" in categories[]->name ])
            `,{locale})

            setPostCount(count)
            
        } catch (error) {
            console.log(error)
        }
        
    }

    React.useEffect(() => {
        ( async() => {
            await fetchPopularNews();
            await fetchRecentIocs();
            await fetchAllIocs();
            await fetchRecentNews();
            await countNews();
        })();

        return () => {
            ( async() => {
                await fetchPopularNews();
                await fetchRecentIocs();
                await fetchAllIocs();
                await fetchRecentNews()
                await countNews()
            })();
        }
    }, [locale])

    return {
        popularNews,
        recentIocs,
        loadingPopularNews,
        lodingRecentIocs,
        loadingNews,
        postCount,
        recentNews,
        allIocs
    }
}

export default newsApi;