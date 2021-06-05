const Koa = require('koa');
const axios = require('axios')
const cheerio = require('cheerio')
const app = new Koa();

app.use(async ctx => {
    const url = "https://s.weibo.com/top/summary?cate=realtimehot"
    const {data} = await axios.get(url)
    const res = JSON.stringify(getHtml(data))
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.body = res
});

app.listen(3000);

function getHtml(html) {
    const arr = []
    const $ = cheerio.load(html)
    const content = $(".list_a")
    content.find("li a").each(function (index, node) {
        const href = node.attribs.href
        let title = ''
        if ($(this).children().eq(1).children().length) {
            title = $(this).children().eq(1).children()[0].prev.data
        } else {
            title = $(this).children().eq(1).text()
        }
        const idx = $(this).children().eq(0).text()
        const num = $(this).children().eq(1).children().eq(0).text()
        let tag = ''
        if ($(this).children().eq(2).attr()) {
            tag = $(this).children().eq(2).attr().class;
            const map = new Map([
                ['hot', '热'],
                ['new', '新'],
                ['recommend', '荐'],
                ['boil', '沸'],
            ])
            for (let [key, value] of map) {
                if (tag.includes(key)) {
                    tag = value
                }
            }
        }
        arr.push({title, idx, href, num, tag})
    })
    return arr
}
