let pub = document.getElementById("publish");

pub.onsubmit = function () {
  console.log("submit Button");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/publish", true);

  xhr.send(JSON.stringify({ message: this.elements.message.value }));
  this.elements.message.value = "";
  return false;
};

let mess = document.getElementById("messages");

function subscribe() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/subscribe", true);

  xhr.onload = function () {
    let li = document.createElement("li");
    li.textContent = this.responseText;
    mess.appendChild(li);

    subscribe();
  };

  xhr.onerror = xhr.onabort = function () {
    setTimeout(subscribe, 500);
  };
  xhr.send("");
}

subscribe();
