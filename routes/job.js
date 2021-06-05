const Router = require('koa-router')
const getHtml = require("../utils/common");
const axios = require('axios')
const job = require('../scheduler')

const router = new Router({prefix: '/job'})


const jobs = {}

router.get('/', async ctx => {
    const {cron, name} = ctx.request.body
    jobs[name] = job(cron, () => {
        console.log('ss')
    })

})
router.post('/cancel', async ctx => {
    const {id} = ctx.request.body
    jobs[id].cancel()
})
module.exports = router
