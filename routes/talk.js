const Router = require('koa-router')
const Bot = require('../utils/bot')
const router = new Router({prefix: '/talk'})
router.post('/', async ctx => {
    const bot = new Bot({
        access_token: 'ea2d4dcbc2c30db03c827a3c5f5576a0e2fa770d81972a0917b26fb3ae762d62', // Webhook地址后的access_token
        secret: 'SECb1a1d7dcdc22d1d3bf11e403e69d73dfe5e6455db5bbf5dc8a5242e234b95042' // 安全设置：加签的secret
    })
    ctx.body = await bot.send(ctx.request.body)
})


module.exports = router
