
const animateMove = (element, prop, pixels) =>
  anime({
    targets: element,
    [prop]: `${pixels}px`,
    easing: "easeOutCirc"
  });

const getRandomNumber = (num) => {
  return Math.floor(Math.random() * (num + 1));
};

const runaway = (element) => {
  const top = getRandomNumber(window.innerHeight - element.offsetHeight);
  const left = getRandomNumber(window.innerWidth - element.offsetWidth);
  animateMove(element, "left", left);
  animateMove(element, "top", top);
};

  