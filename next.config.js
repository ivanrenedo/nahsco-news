const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')



module.exports = withPlugins(
    [
      /* [withPWA,  
        {
            pwa: {
                dest: 'public',
                swSrc: 'service-worker.js'
            }
        }], */
    ],
    {
        env: {
            GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
            GRAPHQL_ENDPOINT_WS: process.env.GRAPHQL_ENDPOINT_WS,
            GRAPHQL_ENDPOINT_RT: process.env.GRAPHQL_ENDPOINT_RT,
            GOOGLE_ENDPOINT_AUTH: process.env.GOOGLE_ENDPOINT_AUTH,
            SCHEMA_VERSION: process.env.SCHEMA_VERSION,
            SCHEMA_VERSION_KEY: process.env.SCHEMA_VERSION_KEY,
            S3_ENDPOINT: process.env.S3_ENDPOINT,
            BUCKET_NAME: process.env.BUCKET_NAME,
            DO_URL: process.env.DO_URL,
            AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            PUBLIC_URL: process.env.PUBLIC_URL,
        },
        images: {
            domains: ['lh3.googleusercontent.com']
        },
        reactStrictMode: true
    },
    {
        async rewrites () {
            return [{
                destination: ['https://lh3.googleusercontent.com/:path*'],
            }]
        }
    }
    
); 