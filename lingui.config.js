module.exports = {
    locales: ['en', 'es'],
    sourceLocale: 'en',
    fallbackLocales: {
      default: 'en'
    },
    catalogs: [
      {
        path: '<rootDir>/locale/{locale}/messages',
        include: ['<rootDir>/'],
        exclude: ['**/node_modules/**'],
      },
    ]
}