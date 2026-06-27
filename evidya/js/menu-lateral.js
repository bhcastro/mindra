import { supabaseClient } from './supabase.js';


const main = document.querySelector('main');
const divMenuLateral = document.createElement('div');

main.appendChild(divMenuLateral);
divMenuLateral.innerHTML = `

<div id="div-background" class="ocultar"></div>
        <aside class="menu-lateral">
            <button id="btn-fechar-menu" class="ocultar botoes-menu">✕</button>
            <button id="btn-menu" class="botoes-menu">>></button>
            <div class="" id="div-info-usuario">
                <div class="outputs" id="avatar-usuario">BH</div>
                <div class="outputs" id="div-nome-usuario"><strong id="nome-usuario">Bruno Castro</strong></div>
                <div class="outputs" id="cargo-usuario">Dev</div>
            </div>
            <div id="div-nav">
                <nav>
                    <a href="dashboard.html" class="botoes-menu-lateral">Home</a>
                    <a href="controles.html" class="botoes-menu-lateral">Controles</a>
                    <a href="#" class="botoes-menu-lateral">Estatísticas</a>
                    <a href="#" class="botoes-menu-lateral">Interanalista</a>
                    <a href="#" class="botoes-menu-lateral">Configuração</a>
                    <button id="btn-sair" class="botoes-menu-lateral">Sair</button>
                </nav>
            </div>
        </aside>`


const menuLateral = document.querySelector('.menu-lateral');
const divBackground = document.getElementById('div-background');
const btnMenu = document.getElementById('btn-menu');
const avatarUsuario = document.getElementById('avatar-usuario');
const btnFecharMenu = document.getElementById('btn-fechar-menu');
const btnSair = document.getElementById('btn-sair');

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

btnSair.addEventListener('click', async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
        window.location.href = 'login.html';
    }
});