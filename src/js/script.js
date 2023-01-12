// // Блокировка кириллицы при вводе
// const input = document.querySelector('.nickname');
// input.addEventListener('keypress', (e) => {
//     let keyCode = e.keyCode || e.which;
//     if (!(/[A-z]/.test(String.fromCharCode(keyCode)) || (/[0-9]/.test(String.fromCharCode(keyCode)))) || (/[ ]/.test(input.value) && keyCode === 32))
//     e.preventDefault();
// });

// Только цифры для кода комнаты
const input = document.querySelector('.Room-code');
input.addEventListener('keypress', (e) => {
    let keyCode = e.keyCode || e.which;
    if (!/[0-9]/.test(String.fromCharCode(keyCode)))
    e.preventDefault();
});

// Блокировка пробелов для имени
const input2 = document.querySelector('.Nickname');
input2.addEventListener('keypress', (e) => {
    let keyCode = e.keyCode || e.which;
    if (!/[ ]/.test(input.value) && keyCode === 32)
    e.preventDefault();
});

// Счетчик символов
const elemLogin = document.querySelector('.Nickname');
const elemCounter = elemLogin.nextElementSibling;
const maxLength = 20;
const updateCounter = (e) => {
    const len = e ? e.target.value.length : 0;
    elemCounter.textContent = `${len} / ${maxLength}`;
}
updateCounter();
elemLogin.addEventListener('keyup', updateCounter);
elemLogin.addEventListener('keydown', updateCounter);