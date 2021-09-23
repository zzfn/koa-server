const Router = require('koa-router')
const MongoClient = require('mongodb').MongoClient;
const url = require('../mongodb/config')


const router = new Router({prefix: '/monitor'})

router.post('/trace', async ctx => {
    const req = ctx.request.body
    const client = new MongoClient(url);
    try {
        await client.connect();
        const re =await client.db("zzf").collection('logs').insertOne({...req,time:new Date(),ip:ctx.request.ip});
        ctx.body=re.result
    } finally {
        if(client){
            await client.close();
        }
    }
})
router.get('/trace', async ctx => {
    const req = ctx.request.body
    const client = new MongoClient(url);
    try {
        await client.connect();
        const re =await client.db("zzf").collection('logs').find({}).toArray();
        console.log(re)
        ctx.body=re
    } finally {
        if(client){
            await client.close();
        }
    }
})
module.exports = router
