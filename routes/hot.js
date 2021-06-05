const Router = require('koa-router')
const getHtml = require("../utils/common");
const axios=require('axios')

const router = new Router({prefix: '/hot'})

module.exports = router


router.get('/', async ctx => {
    const url = "https://s.weibo.com/top/summary?cate=realtimehot"
    const {data} = await axios.get(url)
    ctx.body = JSON.stringify(getHtml(data))
})

module.exports = router
