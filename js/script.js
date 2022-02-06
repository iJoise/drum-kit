import { data } from "./data.js";

const keys = document.querySelector(".keys");
const container = document.querySelector(".container");

const row1 = document.createElement("div");
row1.classList.add("row-1");
const row2 = document.createElement("div");
row2.classList.add("row-2");
const row3 = document.createElement("div");
row3.classList.add("row-3");

for (let index = 0; index < data.length; index++) {
  const elem = data[index];

  const item = document.createElement("div");
  item.classList.add("key");
  item.setAttribute("data-key", elem.title.toLocaleLowerCase());

  const kbd = document.createElement("kbd");
  kbd.textContent = elem.title;

  const span = document.createElement("span");
  span.textContent = elem.name;
  span.classList.add("sound");

  item.appendChild(kbd);
  item.appendChild(span);

  if (index < 10) {
    row1.appendChild(item);
  } else if (index >= 10 && index < 19) {
    row2.appendChild(item);
  } else {
    row3.appendChild(item);
  }

  const audio = document.createElement("audio");
  audio.setAttribute("data-key", elem.title.toLocaleLowerCase());
  audio.setAttribute("src", elem.src);

  container.appendChild(audio);

  keys.appendChild(row1);
  keys.appendChild(row2);
  keys.appendChild(row3);
}

window.addEventListener("keydown", function (e) {
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
});

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const allKeys = document.querySelectorAll(".key");
allKeys.forEach((key) =>
  key.addEventListener("transitionend", removeTransition)
);
