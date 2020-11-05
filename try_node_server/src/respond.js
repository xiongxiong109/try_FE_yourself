// 处理最终的服务端响应
function respond(ctx) {
    const { body, req, res } = ctx;
    // res.statusCode = 200;
    res.end(body);
}

module.exports = respond