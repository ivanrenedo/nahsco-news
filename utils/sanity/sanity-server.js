import {createClient} from "next-sanity";
import sanityConfig from "./sanity-config";


export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient({
    ...sanityConfig,
    useCdn: false
})

export const getSanityClient = (usePreview) => usePreview ? previewClient : sanityClient; 