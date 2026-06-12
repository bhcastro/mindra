import { supabaseClient } from './supabase.js';

//Bloco de código de login

const inputUsuario = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');
const botaoLogin = document.getElementById('btn-login');
const divLogado = document.getElementById('div-logado');
const formLogin = document.getElementById('form-login');
const btnSair = document.getElementById('botao-sair');
const outputUsuario = document.querySelector('h1');
const outputMensagem = document.getElementById('output-mensagem');

botaoLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    let usuario = inputUsuario.value;
    let senha = inputSenha.value;
    let email = usuario;
    let password = senha;

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
        outputMensagem.textContent = "Falha no login! Verifique suas credenciais.";
        outputMensagem.textContent = "";
    } else {
        outputMensagem.textContent = "Entrando...";
        setTimeout(3000);
        window.location.href = 'dashboard.html';
        outputMensagem.textContent = "";
    }
});

// btnSair.addEventListener('click', async () => {
//     const { error } = await supabaseClient.auth.signOut();
//     if (!error) {
//         outputMensagem.textContent = "";
//         window.location.href = 'login.html';
//     }
// });

//Final do bloco de código de login