const Koa = require("koa");
const Serve = require('koa-static');
const router = require('../../../edu-dis-labs/src/routes');
const bodyParser = require('koa-bodyparser');
const cookie = require('koa-cookie').default;
const config = require("./config")

let app = new Koa()
app.use(bodyParser());
app.use(cookie());
app.use(Serve(config.server.staticPath))
app.use(router.routes())

app.listen(config.server.port,console.log(`** EDU JACE server starts at port ${config.server.port}`))