
const socket = io.connect();

socket.emit('askData');

function sendData(e) {
  //const input = document.getElementById('MyForm');
  const formData = {
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      thumbnail: document.getElementById("thumbnail").value
  }
  console.log(formData);
  socket.emit('new-message', formData);
  return false;
}

function render(data) {
  const html = data
    .map(function (elem, index) {
      console.log(elem)
      return `<tr>
                <td>${elem.title}</td>
                <td>${elem.price}</td>
                <td><img style="width: 50px" src="${elem.thumbnail}"></img></td>
            </tr>`;
      })
      .join(' ');

  document.getElementById('lista').innerHTML = html;
}

socket.on("message", (chat) => {
  let chatparse = JSON.parse(chat);
  console.log(chatparse);
  const html = chatparse
    .map((mensaje) => {
      return `<div>
                 <div class="">${mensaje.fecha} ${mensaje.email} dice: </div>
                 <div class="">${mensaje.mensaje}</div>
                 <div class="">---------------------- </div>
                 <div class="">---------------------- </div>
              </div>`;
    })
    .join(" ");
  document.getElementById("chat").innerHTML = html;
});

const chatForm = document.getElementById("chatform");
console.log(chatForm)
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let chat = {
    email: e.target.elements.email.value,
    mensaje: e.target.elements.msg.value,
  };

  if (!msg) {
    return false;
  }

  // enviar chat al servidor
  console.log(chat)
  socket.emit("chatMessage", chat);

  // borrar el input
  e.target.elements.msg.value = "";
  e.target.elements.email.value = "";
  e.target.elements.msg.focus();
});


socket.on('messages', function (data) {
  console.log('RECIBI MENSAJE');
  render(data);
});