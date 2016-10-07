var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sanitize = require('validator').sanitize;
var usernames = [];

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on("user", function(name, callback) {
    if (usernames.indexOf(name) !== -1) {
      callback(false);
    }
    else {
      callback(true);
      socket.username = name;
      usernames.push(socket.username);
      io.emit("users", usernames);
    }
  });

  socket.on('sent', function(msg){
    io.emit('message', {msg: msg, name: socket.username});
  });

  socket.on('disconnect', function(name){
    if(!socket.username) {
      return;
    }
    usernames.splice(usernames.indexOf(socket.username, 1));
    io.emit("users", usernames);
  });

});
