const html = document.documentElement;

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


//14:13 finds button -> when it is clicked -> runs instruction -> gets html, checks if the theme is dark and stores t/f -> updates the button (light/dark)//
//15:56 updated version that includes the os settings//

const spotsLayer = document.createElement("div");
spotsLayer.className = "greening-spots";
document.body.prepend(spotsLayer); //?//

let spotsTimer = null;
let spotsCount = 0;
const maxSpots = 8;

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
spot.style.setProperty("--size", `${rand(60, 220)}px`); //what does $ stand for?//
spot.style.setProperty("--x", `${rand(0,85)}vw`);
spot.style.setProperty("--y", `${rand(0,85)}vh`);
spot.style.setProperty("--radius", randomRadius());

spotsLayer.append(spot); //?//
spotsCount += 1;

}

function startGreeningSpots() {
  stopGreeningSpots();
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
