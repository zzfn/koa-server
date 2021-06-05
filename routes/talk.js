const Router = require('koa-router')
const Bot = require('../utils/bot')
const router = new Router({prefix: '/talk'})
router.post('/', async ctx => {
    const bot = new Bot({
        access_token: '',
        secret: ''
    })
    ctx.body = await bot.send(ctx.request.body)
})


module.exports = router
