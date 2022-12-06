import React, {useState} from 'react';
import {useRouter} from 'next/router';
import { getSanityClient } from '@utils/sanity/sanity-server';

const peopleApi = () => {
    const router = useRouter()

  const [people, setPeople] = useState<any[]>([])
  const [allPeople, setAllPeople] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const {locale} = router
    
  const fetchPeople = async() => {

    try {
        setLoading(true);

        const result = await getSanityClient(true).fetch(`
          *[_type == "people" && language == $locale ][0...6] | order(visitas desc) {
              _id, 
              fullname,
              title,
              body,
              metadata,
              image,
              sector,
              visitas, 
              language,
              "slug": slug.current,
              publishedAt
          }
      `,{locale})

        setPeople(result)
        setLoading(false)
        
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
    
}

const fetchAllPeople = async() => {

    try {
        setLoading(true);

        const result = await getSanityClient(true).fetch(`
          *[_type == "people" && language == $locale ] | order(publishedAt desc) {
              _id, 
              fullname,
              title,
              body,
              metadata,
              image,
              sector,
              visitas, 
              language,
              "slug": slug.current,
              publishedAt
          }
      `,{locale})

      setAllPeople(result)
        setLoading(false)
        
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
    
}

React.useEffect(() => {
    ( async() => {
        await fetchPeople();
        await fetchAllPeople()
    })();

    return () => {
        ( async() => {
            await fetchPeople();
            await fetchAllPeople()
        })();
    }
}, [locale])

    return {
        people,
        allPeople,
        loading
    }
}

export default peopleApi;