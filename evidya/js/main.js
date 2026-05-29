
const menuLateral = document.querySelector('.menu-lateral');
const divBackground = document.getElementById('div-background');
const btnMenu = document.getElementById('btn-menu');
const avatarUsuario = document.getElementById('avatar-usuario');
const btnFecharMenu = document.getElementById('btn-fechar-menu');

function abrirMenu() {
    menuLateral.classList.add('menu-lateral-ativo');
    divBackground.classList.remove('ocultar');
    btnMenu.classList.add('ocultar');
    btnFecharMenu.classList.remove('ocultar');
}

function fecharMenu() {
    menuLateral.classList.remove('menu-lateral-ativo');
    divBackground.classList.add('ocultar');
    btnMenu.classList.remove('ocultar');
    btnFecharMenu.classList.add('ocultar');
}

btnFecharMenu.addEventListener('click', fecharMenu);
btnMenu.addEventListener('click', abrirMenu);

avatarUsuario.addEventListener('click', fecharMenu);
divBackground.addEventListener('click', fecharMenu);