import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { registerRoute, setDefaultHandler, setCatchHandler, Route } from 'workbox-routing'
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { warmStrategyCache} from 'workbox-recipes'
import * as navigationPreload from 'workbox-navigation-preload';

clientsClaim()


// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST
// Precache fallback route and image
WB_MANIFEST.push(
  {
    url: '/fallback',
    revision: '1234567800'
  },
  {
    url: '/',
    revision: '1234567810'
  },
  {
    url: '/news',
    revision: '1234567820'
  },
  {
    url: '/iocs',
    revision: '1234567830'
  },
  {
    url: '/service-companies',
    revision: '1234567840'
  },
  {
    url: '/people',
    revision: '1234567850'
  },
  {
    url: '/events',
    revision: '1234567860'
  },
  {
    url: '/jobs',
    revision: '1234567870'
  }
)
precacheAndRoute(WB_MANIFEST, {cleanURLs: true})
warmStrategyCache({urls: ['/', '/news', '/iocs', '/service-companies', '/people', '/events', '/jobs'], strategy: new CacheFirst()})

cleanupOutdatedCaches()
registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'start-url',
    plugins: [new ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
/* const networkOnlyNavigationRoute = new Route(
  ({request, url}) => request.mode === 'navigate' 
  && url.pathname !== '/' && url.pathname !== '/news' && url.pathname !== '/iocs' && url.pathname !== '/service-companies' && url.pathname !== '/people' && url.pathname !== '/events' && url.pathname !== '/jobs',
  new NetworkOnly({
    cacheName: 'pages',
    plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 3153623, purgeOnQuotaError: !0 })]
  })
) */
/* registerRoute(networkOnlyNavigationRoute); */
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 3153643, purgeOnQuotaError: !0 })]
  }),
  'GET'
)

registerRoute(
  /^https:\/\/www\.(?:googletagmanager)\.com\/.*/i,
  new NetworkOnly({
    cacheName: 'google-analytic',
    plugins: [new ExpirationPlugin({ maxEntries: 5, maxAgeSeconds: 3153648, purgeOnQuotaError: !0 })]
  }),
  'GET'
)

registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new CacheFirst({
    cacheName: 'static-font-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
// disable image cache, so we could observe the placeholder image when offline
registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp|mp4)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-image-assets',
    plugins: [new ExpirationPlugin({maxEntries: 20, maxAgeSeconds: 12 * 60 * 60})]
  }),
  'GET'
)

registerRoute(
  /\.(?:js)$/i,
  new StaleWhileRevalidate({
    cacheName: 'static-js-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
registerRoute(
  /\.(?:css)$/i,
  new CacheFirst({
    cacheName: 'static-style-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })]
  }),
  'GET'
)
/* registerRoute(
  /\.(?:json|xml|csv)$/i,
  new NetworkOnly({
    cacheName: 'static-data-assets'
  }),
  'GET'
) */
registerRoute(
  /^https:\/\/server\.egtourismawards\.com\/.*/i,
  new StaleWhileRevalidate({
    cacheName: 'apis',
    plugins: [new ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 3153643, purgeOnQuotaError: !0 })]
  }),
  'GET'
)

//Other resources
registerRoute(
  new RegExp('/_next/static/'),
  new StaleWhileRevalidate({
      cacheName: 'static-caches'
  }),
  'GET'
);

// following lines gives you control of the offline fallback strategies
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler(new StaleWhileRevalidate())

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(({ event }) => {
  // The FALLBACK_URL entries must be added to the cache ahead of time, either
  // via runtime or precaching. If they are precached, then call
  // `matchPrecache(FALLBACK_URL)` (from the `workbox-precaching` package)
  // to get the response from the correct cache.
  console.log(event.request)
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case 'document':
      // If using precached URLs:
      return matchPrecache('/fallback');
      // return caches.match('/fallback')
      break
    case 'image':
      // If using precached URLs:
      //return matchPrecache('/img/fallback.png');
      // return caches.match('/static/images/fallback.png')
      break
    case 'font':
    // If using precached URLs:
    // return matchPrecache(FALLBACK_FONT_URL);
    return 
    //break
    default:
      // If we don't have a fallback, just return an error response.
      return Response.error()
  }
})  

navigationPreload.enable();
