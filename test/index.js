/* eslint-env mocha */

const pool = require('../server/db')
const { truncateTables } = require('../server/db/manage')
const { seedActions } = require('../server/db/seeds')

beforeEach(async function resetDb () {
  await truncateTables(pool)
  await seedActions(pool)
})

const app = require('../server/app')
const TEST_PORT = 4000
const startApp = () => app.listen(TEST_PORT, () => {
  console.log(`Tests running on port ${TEST_PORT}`)
})
const tearDown = () => app.listen().close()

startApp()
require('./authorTest')()
require('./reportedTest')()
require('./requestedTest')()
// require('./synonymsTest')();
// require('./termsTest')();
require('./entriesTest')()
tearDown()
