import { supabaseClient } from './supabase.js';

//Bloco de código de login

const inputUsuario = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');
const botaoLogin = document.getElementById('btn-login');
const divLogado = document.getElementById('div-logado');
const formLogin = document.getElementById('form-login');
// const btnSair = document.getElementById('btn-sair');
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
        inputUsuario.value = "";
        inputSenha.value = "";
        outputMensagem.textContent = "Falha no login! Verifique suas credenciais.";
        setTimeout(() => {
            outputMensagem.textContent = "";
        }, 2000);
    } else {
        outputMensagem.textContent = "Entrando...";
        setTimeout(() => {
            window.location.href = 'dashboard.html';
            outputMensagem.textContent = "";
        }, 6000);
        inputUsuario.value = "";
        inputSenha.value = "";
    }
});