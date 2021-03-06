const Router = require('koa-router')

const router = new Router({prefix: '/cache'})

module.exports = router


router.get('/Expired', async ctx => {
    // ctx.response.lastModified = new Date();
    const Expired=new Date(new Date().getTime()+10000).toUTCString()
    ctx.set('Expires',Expired)
    ctx.body={
        now:new Date().toUTCString(),
        Expired
    }
})
router.get('/cache-control', async ctx => {
    // ctx.response.lastModified = new Date();
    const Expired=new Date(new Date().getTime()+10000).toUTCString()
    ctx.set('Cache-Control','max-age=10')
    ctx.body={
        now:new Date().toUTCString(),
        Expired
    }
})
router.get('/etag', async ctx => {
    console.log(1)
    // ctx.response.lastModified = new Date();
    const Expired=new Date(new Date().getTime()+10000).toUTCString()
    ctx.set('Etag','1123')
    ctx.status = 304;
    ctx.body={
        a:1,
        now:new Date().toUTCString(),
        Expired
    }
})
router.get('/Last-Modified', async ctx => {
    // ctx.response.lastModified = new Date();
    const Expired=new Date(new Date().getTime()+10000).toUTCString()
    ctx.set('Cache-Control','max-age=10')
    ctx.body={
        now:new Date().toUTCString(),
        Expired
    }
})
module.exports = router
