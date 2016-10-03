var enter = document.getElementById("entered");
enter.addEventListener("submit", chat, false);

function chat() {
  var message = document.getElementById("message").value;
  var newMessage = document.getElementById("newMessage");

  newMessage.firstChild.nodeValue = "test";
}
