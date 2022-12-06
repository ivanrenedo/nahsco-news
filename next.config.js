const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const { locales, sourceLocale } = require('./lingui.config.js')


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
            NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
            NEXT_PUBLIC_SANITY_ID: process.env.NEXT_PUBLIC_SANITY_ID,
            SANITY_WRITE_KEY: process.env.SANITY_WRITE_KEY
        },
        images: {
            domains: ['lh3.googleusercontent.com']
        },
        reactStrictMode: true,
        i18n: {
            locales,
            defaultLocale: sourceLocale,
            localeDetection: false
        },
        webpack: (config) => {
            config.module.rules.push({
              test: /\.po/,
              use: ['@lingui/loader'],
            })
        
            return config
        },
    },
    {
        async rewrites () {
            return [{
                destination: ['https://lh3.googleusercontent.com/:path*'],
            }]
        }
    }
    
); 