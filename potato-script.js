const btn = document.querySelector('.mode');
const html = document.documentElement;
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
    syncButtonLabel();
});

syncButtonLabel();
//14:13 finds button -> when it is clicked -> runs instruction -> gets html, checks if the theme is dark and stores t/f -> updates the button (light/dark)//
//15:56 updated version that includes the os settings//
