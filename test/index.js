const chai = require('chai')
const expect = require('chai').expect
const chaiAsPromised = require('chai-as-promised')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const request = require('supertest')

const camelCase = require('../lib/index')

chai.use(chaiAsPromised)

describe('Filter correct routes', function() {
  let jsonObj
  let app

  beforeEach(() => {
    app = new Koa()
    app.use(bodyParser())

    jsonObj = {
      test_obj: 'test',
      a_b: 'ab',
    }
  })

  it('should filter normal string route', function(done) {
    app.use(camelCase({
      excludeRoutes: '/route_a',
    }))

    request(app.listen())
    .post('/route_a')
    .send(jsonObj)
    .expect({}, done)
  })

  it('should filter route array', async function() {
    app.use(camelCase({
      excludeRoutes: ['/route_a', '/route_b']
    }))

    const res1 =  await request(app.listen())
                      .post('/route_a')
                      .send(jsonObj)

    expect(res1.body).to.eql({})

    const res2 =  await request(app.listen())
                      .post('/route_b')
                      .send(jsonObj)

    expect(res2.body).to.eql({})

    const res3 =  await request(app.listen())
                      .post('/route_c')
                      .send(jsonObj)

    expect(res3.body).to.eql({ aB: 'ab', testObj: 'test' })
  })

  it('should filter regexp route', async function() {
    app.use(camelCase({
      excludeRoutes: /a/,
    }))

    const res1 = await request(app.listen())
                 .post('/route_a')
                 .send(jsonObj)
    expect(res1.body).to.eql({})

    const res2 = await request(app.listen())
                 .post('/route_b')
                 .send(jsonObj)
    expect(res2.body).to.eql({ aB: 'ab', testObj: 'test' })
  })

  it('should filter array of regexp and string route', async function() {
    app.use(camelCase({
      excludeRoutes: [/a/, '/route_b'],
    }))

    const res1 = await request(app.listen())
                 .post('/route_a')
                 .send(jsonObj)
    expect(res1.body).to.eql({})

    const res2 = await request(app.listen())
                 .post('/route_b')
                 .send(jsonObj)
    expect(res2.body).to.eql({})

    const res3 = await request(app.listen())
                 .post('/route_c')
                 .send(jsonObj)
    expect(res3.body).to.eql({ aB: 'ab', testObj: 'test' })
  })
})

describe('Camle case with deep config', function() {
  let app
  let jsonObj

  beforeEach(function() {
    app = new Koa()
    app.use(bodyParser())

    jsonObj = {
      obj_a: {
        nested_a: {
          a: 1,
        },
      },
      obj_b: 1,
    }
  })

  it('config deep = false', function(done) {
    app.use(camelCase({ deep: false }))

    request(app.listen())
    .post('/route_a')
    .send(jsonObj)
    .expect({
      objA: {
        nested_a: {
          a: 1,
        },
      },
      objB: 1,
    }, done)
  })

  it('config deep = true (default)', function(done) {
    app.use(camelCase())

    request(app.listen())
    .post('/route_a')
    .send(jsonObj)
    .expect({
      objA: {
        nestedA: {
          a: 1,
        },
      },
      objB: 1,
    }, done)
  })
})
