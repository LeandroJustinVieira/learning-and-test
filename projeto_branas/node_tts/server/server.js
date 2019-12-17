const http = require("http");

http.createServer((req, res) => {
    res.write("server");
    res.end();
}).listen(4002);