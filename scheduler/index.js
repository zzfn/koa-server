const schedule = require('node-schedule');

function job(cron, fn) {
    return schedule.scheduleJob(cron, fn)
}

module.exports = job

