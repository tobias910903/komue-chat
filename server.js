var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api', function (req, res) {
    io.emit('gg', '服务器发来了一个数据~');
});


io.on('connection', function (socket) {
    console.log("当前连接数量：" + io.eio.clientsCount);
    io.emit('userNum', io.eio.clientsCount);

    socket.on('disconnect', function () {
        io.emit('userNum', io.eio.clientsCount);
    });

    socket.on('msg', function (text) {
        io.emit('gg', text);
    });
});


http.listen(8011, '0.0.0.0', function () {
    console.log('端口: 8011');
});
