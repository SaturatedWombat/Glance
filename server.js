var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sanitize = require('validator').sanitize;
var users = {};

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  // username
  socket.on("user", function(name, callback) {
    if (name in users || name === "") {
      callback(false);
    }
    else {
      callback(true);
      socket.username = name;
      users[socket.username] = socket;
      io.emit("users", Object.keys(users), socket.username, true);
    }
  });

  // messaging
  socket.on('sent', function(msg, callback){
    var new_msg = msg.trim();
    var tell = new_msg.substr(0,5);
    var w = new_msg.substr(0,3);

    function whisper(index) {
      new_msg = new_msg.substr(index);
      var ind = new_msg.indexOf(' ');
      if (ind !== -1) {
        var usern = new_msg.substr(0, ind);
        new_msg = new_msg.substr(ind +1);
        if (usern in users) {
          users[usern].emit('priv', {msg: new_msg, name: ("from " + socket.username)});
          users[socket.username].emit('priv', {msg: new_msg, name: ("to " + usern)});
        }
        else {
          callback("Invalid user. Try again.");
        }
      }
      else {
        callback("No message received. Try again.");
      }
    }

    if(tell === "tell ") {
      whisper(5);
    }
    else if (w === "/w ") {
      whisper(3);
    }
    else {
      io.emit('message', {msg: new_msg, name: socket.username});
    }
  });

  // disconnect
  socket.on('disconnect', function(name){
    if(!socket.username) {
      return;
    }
    var temp = socket.username;
    delete users[socket.username];
    io.emit("users", Object.keys(users), temp, false);
  });

});
