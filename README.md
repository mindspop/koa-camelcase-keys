# koa-camelcase-keys

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Dependency status][david-dm-image]][david-dm-url]
[![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]
[![NPM downloads][downloads-image]][npm-url]

> A koa middleware for converting object keys to camelCase using [`camelcase-keys`](https://github.com/sindresorhus/camelcase-keys).

## Installation

```shell
$ npm i --save koa-camelcase-keys
```

## Usage

```js
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const camelCase = require('koa-camelcase-keys')

const app = new Koa()
// convert json body to object
app.use(bodyParser())

// camel case the object from bodyParser middlerware
app.use(camelCase())

// Or
// exclude some routes
app.use(camelCase({ excludeRoutes: ['/route_a', 'route_b'] }))
app.use(camelCase({ excludeRoutes: '/route_a' }))
app.use(camelCase({ excludeRoutes: /a/ }))

// Or
// exclude some keys
app.use(camelCase({ exclude: ['a_b', 'c_d'] }))
app.use(camelCase({ exclude: 'a_b' }))

// Or
// disable deep match
app.use(camelCase({ deep: false }))
```

## API

### camelCase({ deep: true, exclude: [], excludeRoutes: '' } = {})

#### excludeRoutes

Type: `string[]` `RegExp[]`<br>
Default: `''`

Exclude routes from being camelCased.

#### exclude

Type: `string[]` `RegExp[]`<br>
Default: `[]`

Exclude keys from being camelCased.

#### deep

Type: `boolean`<br>
Default: `false`

Recurse nested objects and objects in arrays.

## License
MIT @ [Mindspop](https://github.com/mindspop)

[npm-url]: https://npmjs.org/package/koa-camelcase-keys
[npm-image]: http://img.shields.io/npm/v/koa-camelcase-keys.svg
[downloads-image]: http://img.shields.io/npm/dm/koa-camelcase-keys.svg
[node-version-image]: https://img.shields.io/node/v/koa-camlcase-keys.svg
[node-version-url]: https://nodejs.org/en/download/
[travis-url]: https://travis-ci.org/mindspop/koa-camelcase-keys
[travis-image]: http://img.shields.io/travis/mindspop/koa-camelcase-keys.svg
[david-dm-url]:https://david-dm.org/mindspop/koa-camelcase-keys
[david-dm-image]:https://david-dm.org/mindspop/koa-camelcase-keys.svg
[david-dm-dev-url]:https://david-dm.org/mindspop/koa-camelcase-keys#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/mindspop/koa-camelcase-keys/dev-status.svg
