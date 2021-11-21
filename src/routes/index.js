const Router = require('koa-router')
//const Presidents = require("../models/presidents")
const controller = require("./controller")
const { extend } = require("lodash")

let router = new Router()

/*let getPresidents = (ctx, next) => {
    ctx.body = Presidents
}

let echoRequest = (ctx, next) => {
    ctx.body = {
        param: ctx.params.param,
        queryString: ctx.request.query,
        body: ctx.request.body,
        cookie: ctx.cookie
    }
}*/

router
    .post( "/presidents", (ctx, next) => {
        ctx.body = controller.create(ctx.request.body)
    })
    .get("/presidents", (ctx, next) => {
        ctx.body = controller.read({id: ctx.request.query.id})
    })
    .get("/presidents/:id", (ctx, next) => {
        ctx.body = controller.read({id: ctx.params.id})
    })
    .put( "/presidents", ( ctx, next ) => {
        ctx.body = controller.update( extend( {}, ctx.request.body, ctx.request.query ))
    })
    .put( "/presidents/:id", ( ctx, next ) => {
        ctx.body = controller.update( extend( {}, ctx.request.body, ctx.request.query, {id: ctx.params.id} ))
    })
    .delete("/presidents", ( ctx, next ) => {
        ctx.body = controller.delete( extend( {}, ctx.request.body, ctx.request.query ))
    })
    .delete("/presidents/:id", ( ctx, next ) => {
        ctx.body = controller.delete( {id: ctx.params.id} )
    })
    /*.get("/presidents", getPresidents)
    .get("/echo/:param", echoRequest)
    .post("/echo/:param", echoRequest)*/

module.exports = router