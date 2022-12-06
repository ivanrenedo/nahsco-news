const sanityConfig = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_ID,
    apiVersion: "2022-12-04",
    token: process.env.SANITY_WRITE_KEY,
    useCdn: process.env.NEXT_PUBLIC_SANITY_DATASET,
};

export default sanityConfig;