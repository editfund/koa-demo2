const Koa = require('koa')
const app = new Koa()
app.use(async (ctx) => {
    if (ctx.url == '/' && ctx.method == 'GET') {
        let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /> <br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = await paresPostData(ctx)
        ctx.body = postData
    } else {
        //其它请求显示404页面
        ctx.body = '<h1>404!</h1>';
    }
})

function paresPostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = ''
            ctx.req.addListener('data', (data) => {
                postData += data
            })
            ctx.req.on('end', () => {
                let postdata = parseData(postData)
                resolve(postdata)
            })

        } catch (err) {
            reject(err)
        }
    })
}

function parseData(queryStr) {
    let queryData = {}
    let queryList = queryStr.split('&')
    for (let [index, queryItem] of queryList.entries()) {
        let itemList = queryItem.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000');
})