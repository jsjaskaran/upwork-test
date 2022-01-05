const assert = require('assert')
const supertest = require('supertest')
const app = require('../server')

describe("Run command", () => {
	before(() => {
		console.log('Running tests now...')
	})

	after(() => {
		console.log('Ending tests...')
	})

	describe("Test 1", () => {
		it('Should execute the command - /execute', (done) => {
			supertest(app)
				.post('/execute')
				.send({command: 'ls -alh'})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if(err) return done(err)
					return done()
				})
		}),

		it('Should return error with - /execute', (done) => {
			supertest(app)
				.post('/execute')
				.send({command: 'abcd'})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if(err) return done(err)
					return done()
				})
		})
	})

})