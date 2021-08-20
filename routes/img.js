const Router = require('koa-router')


const router = new Router({prefix: '/img'})


router.get('/get', async ctx => {
    console.log('https://dummyimage.com/')
    console.log('https://source.unsplash.com/')
    console.log('https://placeholder.com/')
    ctx.body='https://dummyimage.com/'
})
module.exports = router
