var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    var lis = $("messages");
    if(lis.length > 100) {
      lis.eq(lis.length - 1).remove();
    }

    $("messages") = lis
  });
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});
