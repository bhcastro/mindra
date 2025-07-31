const botaoRealizar = document.getElementById('botao-realizar');
const botaoFinalizar = document.getElementById('botao-finalizar');
const dadosAnalista = document.querySelector('nav');
const conteudoPrincipal = document.querySelector('main');

function iniciar(){
    const nomeInvalido = 'Digite um nome válido!';
    const unidadeInvalida = 'Digite uma unidade válida!';

    let analista = prompt ('Digite seu nome:');
    while(analista.trim() === ""){
      alert(nomeInvalido);
      analista = prompt ('Digite seu nome:');
    }

    let unidade = prompt ('Digite sua unidade:');
    while(unidade.trim() === ""){
      alert(unidadeInvalida);
      unidade = prompt ('Digite sua unidade:');
    }

    document.getElementById('nome').textContent = `Analista: ${analista}`;
    document.getElementById('unidade').textContent = `Unidade: ${unidade}`;

    let data = new Date();
    let dia = data.getDate();
    dia = dia < 10? `0${dia}` : dia;

    let mes = data.getMonth();
    mes = mes++ < 10? `0${mes}` : mes++;
    
    let ano = data.getFullYear();
    let dataRealizacao = `${dia}/${mes}/${ano}`;
    document.getElementById('data').textContent = `Data: ${dataRealizacao}`;

    dadosAnalista.classList.remove('ocultar');
    botaoRealizar.classList.add('ocultar');
    conteudoPrincipal.classList.remove('ocultar');
}

function imprimir(){
    const paragrafoFooter = document.getElementById('paragrafo-footer');
    const footerPadrao = 'Meliora é um produto pertencente ao ecossistema Mindra, todos os direitos reservados.';
    const footerImpressao = 'Versão para impressão do formulário de interanalista, conheça a versão completa e mais produtos acessando: www.mindra.com.br';
    paragrafoFooter.textContent = footerImpressao;
    window.print();
    if (paragrafoFooter.innerText === footerImpressao) {
      paragrafoFooter.innerText = footerPadrao;
    }
}

botaoRealizar.addEventListener('click', iniciar);
botaoImprimir.addEventListener('click', imprimir);