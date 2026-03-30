const html = document.documentElement;

document.addEventListener('DOMContentLoaded', () => {
  wordPlacement();
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light"){
    html.setAttribute("data-theme", savedTheme);
}

const btn = document.querySelector('.mode');
const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');



function getCurrentTheme() {
    const explicit = html.getAttribute('data-theme');
    if (explicit === 'dark' || explicit === 'light') return explicit;
    return mediaDark.matches ? 'dark' : 'light'; //fallbck to @media//
}

function syncButtonLabel() {
    btn.textContent = getCurrentTheme() === 'dark' ? 'light' : 'dark';
}

btn.addEventListener('click', () => {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem("theme", next);

    syncButtonLabel();
    updateGreeningSpots();
});

syncButtonLabel();


//finds button -> when it is clicked -> runs instruction -> gets html, checks if the theme is dark and stores t/f -> updates the button (light/dark)//

function wordPlacement(){
let allWords = document.querySelectorAll('.word');
  let frameSize = [500, 300];
  for (let i=0; i<allWords.length; i++){
    const word = allWords[i];
    const wordWidth = word.offsetWidth;
    const wordHeight = word.offsetHeight;
    let posX = Math.random()*(frameSize[0]-wordWidth);
    let posY = Math.random()*(frameSize[1]-wordHeight);
    word.style.left = posX + "px";
    word.style.top = posY + "px";
  }
}





const spotsLayer = document.createElement("div");
spotsLayer.className = "greening-spots";
document.body.prepend(spotsLayer); //?//

let spotsTimer = null;
let spotsCount = 0;
const maxSpots = 18;

function rand(min, max) {
    return Math.random() * (max-min) + min; //?//
}
function randomRadius() {
      return `${rand(40, 60)}% ${rand(40, 60)}% ${rand(40, 60)}% ${rand(40, 60)}% / ${rand(40, 60)}% ${rand(40, 60)}% ${rand(40, 60)}% ${rand(40, 60)}%`;
}

function addSpot() {
    if (spotsCount >= maxSpots) return;

const spot = document.createElement("div");
spot.className = "greening-spot";
spot.style.setProperty("--size", `${rand(60, 220)}px`); 
spot.style.setProperty("--x", `${rand(0,85)}vw`);
spot.style.setProperty("--y", `${rand(0,85)}vh`);
spot.style.setProperty("--radius", randomRadius());

spotsLayer.append(spot); //?//
spotsCount += 1;

}

function startGreeningSpots() {
  addSpot();
  spotsTimer = setInterval(addSpot, 2500);
}

function stopGreeningSpots() {
    clearInterval(spotsTimer);
    spotsTimer = null;
    spotsLayer.replaceChildren();
    spotsCount = 0;
}

function updateGreeningSpots() {
    if (getCurrentTheme() === "light") startGreeningSpots();
    else stopGreeningSpots();
}

updateGreeningSpots();


//make the section draggable:
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "framebody")) {
    // if present, the header is where you move from:
    document.getElementById(elmnt.id + "body").onmousedown = dragMouseDown;
  } else {
    // otherwise, move from anywhere inside:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElement(document.getElementById("frame"));

