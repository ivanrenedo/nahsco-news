import React, {useState} from 'react';
import {useRouter} from 'next/router';
import { getSanityClient } from '@utils/sanity/sanity-server';

const serviceCompanyApi = () => {
    const router = useRouter()

    const [serviceCompany, setServices] = useState<any[]>([])
    const [AllserviceCompany, setAllServices] = useState<any[]>([])

    const [loading, setLoading] = useState(true)

    const {locale} = router



    const fetchServices = async() => {

        try {
            setLoading(true);

            const result =await getSanityClient(true).fetch(`
                *[_type == "post" && language == $locale && "service companies" in categories[]->name ][0...4] | order(visitas desc) {
                    _id, 
                    title,
                    body,
                    image,
                    visitas, 
                    language,
                    "slug": slug.current,
                    publishedAt,
                    "category": categories[]-> {name}
                }
            `,{locale})

            setServices(result)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        
    }

    const fetchAllServices = async() => {

        try {
            setLoading(true);

            const result =await getSanityClient(true).fetch(`
                *[_type == "post" && language == $locale && "service companies" in categories[]->name ] | order(publishedAt desc) {
                    _id, 
                    title,
                    body,
                    image,
                    visitas, 
                    language,
                    "slug": slug.current,
                    publishedAt,
                    "category": categories[]-> {name}
                }
            `,{locale})

            setAllServices(result)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        
    }

    React.useEffect(() => {
        ( async() => {
            await fetchServices();
            await fetchAllServices()
        })();

        return () => {
            ( async() => {
                await fetchServices();
                await fetchAllServices()
            })();
        }
    }, [locale])

    return {
        serviceCompany,
        AllserviceCompany,
        loading
    }
}

export default serviceCompanyApi;