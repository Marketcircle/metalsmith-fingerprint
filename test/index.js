var assertDir = require('assert-dir-equal')
var fingerprint = require('../')
var Metalsmith = require('metalsmith')

describe('metalsmith-fingerprint', function () {

    it('should fingerprint the file', function (done) {
        (new Metalsmith('test/fixtures/basic'))
            .use(fingerprint({ pattern: 'hello.txt' }))
            .use(function (files, metalsmith, done) {
                metalsmith.metadata().fingerprint['hello.txt'].should.equal('hello-0933ec0a4398386c8fc86d4a663cd92a67f52f83fdc8bdef1640a4246ac56fcf.txt')
                return process.nextTick(done)
            })
            .build(function (err) {
                if (err) return done(err)
                assertDir('test/fixtures/basic/expected', 'test/fixtures/basic/build')
                return done(null)
            })
    })

})
