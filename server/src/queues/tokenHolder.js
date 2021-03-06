'use strict'

const TokenHolderHelper = require('../helpers/tokenHolder')

const consumer = {}
consumer.name = 'TokenHolderProcess'
consumer.processNumber = 12
consumer.task = async function (job, done) {
    let token = JSON.parse(job.data.token)
    console.log('Process token holder: ', token.from, token.to, token.value)
    if (!token) {
        done()
        return false
    }

    try {
        // Add holder from.
        await TokenHolderHelper.updateQuality(token.from, token.address, -token.value)
        // Add holder to.
        await TokenHolderHelper.updateQuality(token.to, token.address, token.value)
    } catch (e) {
        console.error(consumer.name, token, e)
        done(e)
    }

    done()
}

module.exports = consumer
