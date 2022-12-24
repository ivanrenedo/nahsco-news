const { locales, sourceLocale } = require('./lingui.config.js')
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')({
    dest: 'public',
    swSrc: 'service-worker.js'
});



module.exports = withPlugins(
    [
      withPWA(),
    ],
    {
        env: {
            NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
            PUBLIC_URL: process.env.PUBLIC_URL
        },
        images: {
            domains: ['lh3.googleusercontent.com', 'server.egtourismawards.com']
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
                destination: ['https://lh3.googleusercontent.com/:path*', 'https://server.egtourismawards.com/:path*'],
            }]
        }
    }
    
); 
