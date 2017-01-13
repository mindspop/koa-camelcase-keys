const camelcase = require('camelcase-keys')
const pathToRegexp = require('path-to-regexp')

module.exports = function camelCase({
  deep = true,
  exclude = [],
  excludeRoutes = '',
} = {}) {
  return async (ctx, next) => {
    let routes = []
    let skip = false
    if (excludeRoutes !== '') {
      if (typeof excludeRoutes === 'string' ||
          Array.isArray(excludeRoutes) ||
          excludeRoutes instanceof RegExp) {
        routes = routes.concat(excludeRoutes)

        for (let route of routes) {
          if (typeof route === 'string') {
            route = pathToRegexp(route)
          }

          if (!(route instanceof RegExp)) {
            throw new Error('Exclude routes should be string|regexp or array of string|regexp type.')
          }

          if (route.test(ctx.path)) {
            skip = true
            break
          }
        }
      } else {
        throw new Error('Exclude routes should be string|regexp or array of string|regexp type.')
      }
    }

    if (!skip && typeof ctx.request.body === 'object') {
      ctx.body = camelcase(ctx.request.body, {
        deep,
        exclude,
      })
    }

    next()
  }
}
