const Router = require('koa-router')
const MongoClient = require('mongodb').MongoClient;
const url = require('../mongodb/config')
const client = new MongoClient(url);

const router = new Router({prefix: '/monitor'})

router.post('/trace', async ctx => {
    const req = ctx.request.body
    try {
        await client.connect();
        const re =await client.db("zzf").collection('logs').insertOne({...req,time:new Date()});
        ctx.body=re.result
    } finally {
        await client.close();
    }
})

module.exports = router
