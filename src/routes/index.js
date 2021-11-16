const Router = require('koa-router')
const Presidents = require("../models/presidents")
let router = new Router()

let getPresidents = (ctx, next) => {
    ctx.body = Presidents
}

let echoRequest = (ctx, next) => {
    ctx.body = {
        param: ctx.params.param,
        queryString: ctx.request.query,
        body: ctx.request.body,
        cookie: ctx.cookie
    }
}

router
    .get("/api/presidents", getPresidents)
    .get("/echo/:param", echoRequest)
    .post("/echo/:param", echoRequest)

module.exports = router