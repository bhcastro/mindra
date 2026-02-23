const botaoEntrar = document.getElementById('botao-entrar');
const botaoSair = document.getElementById('botao-sair');
const divAutenticacao = document.getElementById('form-login');
const divLogado = document.getElementById('div-logado');
const saudacaoUsuario = document.getElementById('saudacao-usuario');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const erroLogin = document.getElementById('erro-login');
const spanAssinatura = document.getElementById('span-assinatura');
const formLogin = document.getElementById('form-login');

// const users = [

//     {
//         username: "bhcastro",
//         password: "102030",
//         nome: "Bruno C.",
//         funcao: "Analista"
//     },
//     {
//         username: "kccastro",
//         password: "102030",
//         nome: "Katherine C.",
//         funcao: "Analista"
//     },
//     {
//         username: "kacastro",
//         password: "102030",
//         nome: "Kaio C.",
//         funcao: "Gestor"
//     }
// ]

// formLogin.addEventListener('submit', function (event) {
//     event.preventDefault();
//     entrar();
// });


function entrar() {
    erroLogin.innerHTML = '';
    const email = inputEmail.value;
    const password = inputPassword.value;
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log('Logado:', user.email);
            window.location.href = '../html/contador-mielograma.html';
        }).catch((error) => {
            erroLogin.textContent = 'Usuário ou senha inválidos';
            inputEmail.focus();
        });
}

function sair() {
    localStorage.removeItem('loggedUser');
    divAutenticacao.classList.remove('ocultar');
    divLogado.classList.add('ocultar');
    inputEmail.value = '';
    inputPassword.value = '';
    erroLogin.innerHTML = '';
}

botaoEntrar.addEventListener('click', entrar);
botaoSair.addEventListener('click', sair);



//IMPORTANDO O FIREBASE

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7YEa3sLeDoHd3uzWF8We6m3P24LJu1r8",
    authDomain: "mindra-1a90d.firebaseapp.com",
    projectId: "mindra-1a90d",
    storageBucket: "mindra-1a90d.firebasestorage.app",
    messagingSenderId: "545416001538",
    appId: "1:545416001538:web:1ea3df3e22dcad58390f1b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };