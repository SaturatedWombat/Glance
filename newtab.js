var enter = document.getElementById("entered");
enter.addEventListener("submit", chat, false);

function chat(enter) {
  var message = document.getElementById("message").value;
  var newMessage = document.getElementById("newMessage");

  enter.which = enter.which || enter.keyCode;
  if (enter.keyCode == 13) {
    newMessage.innerHTML = message;
  }

}
