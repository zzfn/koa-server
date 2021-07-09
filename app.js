const Koa = require('koa');
const app = new Koa();
const routing = require('./routes');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
app.proxy=true
app.use(
    cors({
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
app.use(bodyParser());
routing(app)
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});

