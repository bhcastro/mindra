const divSeletor = document.getElementById('seletor');
const sectionContador = document.getElementById('section-contador');
const sectionDiferencial = document.getElementById('section-diferencial');
const botaoHabilitarContador = document.getElementById('botao-div-diferencial-habilitar-contador');
const botaoInserirCelulas = document.getElementById('botao-div-diferencial-inserir-celulas');
const botaoVoltar = document.getElementById('botao-div-diferencial-voltar');
const botaoAdicionarCelula = document.getElementById('botao-add-celula');
const botaoRemoverCelula = document.querySelector('.botao-remover');
const botaoImprimir = document.getElementById('botao-imprimir');
const celulas = document.getElementById('lista__celulas');

const listaDeCelulas = [];
const contagemGlobal = [];

const valorSuperior = 'Valor de células ultrapassado, reveja sua contagem!'
const nomeCelula = 'Insira uma célula válida!';
const valorCelula = 'Não é possível inserir células sem valor!';

let valorTotalCelulas = document.getElementById('output-global');
let inputCelula = document.querySelector('.celula');
let inputValor = document.querySelector('.valor__celulas');

function adicionarCelula(){
    let campoCelula = inputCelula.value.trim();
    let campoValor = parseInt(inputValor.value);
    if (campoCelula === '' || !isNaN(campoCelula)) {
        alert(nomeCelula);
        inputCelula.focus();
        return;
    }
    if (isNaN(campoValor)) {
        alert(valorCelula);
        inputValor.focus();
        return;
    }
    listaDeCelulas.push(inputCelula.value);
    contagemGlobal.push(parseInt(inputValor.value));
    somarCelulas();
    mostrarCelulas();
    inputCelula.focus();
}

function removerCelula(celula){
    listaDeCelulas.splice(celula, 1);
    contagemGlobal.splice(celula, 1);
    mostrarCelulas();
    somarCelulas();
    inputCelula.focus();
    if(listaDeCelulas.length === 0){
        celulas.innerHTML = '';
        valorTotalCelulas.textContent = '';
        botaoImprimir.classList.add('ocultar');
    }
}

function mostrarCelulas(){
    let totalTemp = contagemGlobal.reduce((a, b) => a + b, 0);
    console.log(totalTemp);
    if(totalTemp >= 5){
        const botaoLimparCelulas = document.createElement('button');
        botaoLimparCelulas.textContent = 'Limpar contagem';
        botaoLimparCelulas.classList.add('botoes');
        botaoLimparCelulas.id = 'botao-limpar-celulas';
        divSeletor.appendChild(botaoLimparCelulas);
        botaoLimparCelulas.addEventListener('click', () => {
            listaDeCelulas.length = 0;
            contagemGlobal.length = 0;
            valorTotalCelulas.textContent = '';
            botaoLimparCelulas.remove();
            mostrarCelulas();
        });
    }
    let novaCelula = '';
    listaDeCelulas.forEach((celula, index) =>{novaCelula = novaCelula += `<li class="diferencial">${celula}: ${contagemGlobal[index]}<input type="button" class="botoes" id="botao-remover" value="-" onclick="removerCelula(${index})"></li>`
});
    celulas.innerHTML = novaCelula;
    inputCelula.value = '';
    inputValor.value = '';
}

function somarCelulas(){
    botaoAdicionarCelula.classList.remove('ocultar');
    let total = 0;
    for (let celula of contagemGlobal) {
    total += celula;
    if (total === 100){
        botaoAdicionarCelula.classList.add('ocultar');
        botaoImprimir.classList.remove('ocultar');
        valorTotalCelulas.classList.add('valor-correto');
        valorTotalCelulas.classList.remove('valor-errado');
    }else if (total > 100) {
        botaoAdicionarCelula.classList.add('ocultar');
        botaoImprimir.classList.add('ocultar');
        valorTotalCelulas.classList.add('valor-errado');
        valorTotalCelulas.classList.remove('valor-correto');
        let mensagemSuperior = document.createElement('span');
        mensagemSuperior.textContent = valorSuperior;
        mensagemSuperior.classList.add('mensagem-superior');
        divSeletor.appendChild(mensagemSuperior);

    }else{
        botaoAdicionarCelula.classList.remove('ocultar');
        botaoImprimir.classList.add('ocultar');
        valorTotalCelulas.classList.remove('valor-errado');
        valorTotalCelulas.classList.remove('valor-correto');
    }   
    valorTotalCelulas.textContent = `Total: ${total}`;
    valorTotalCelulas.classList.add('mostrar-total');
    }
}

botaoAdicionarCelula.addEventListener('click', adicionarCelula);

botaoHabilitarContador.addEventListener('click', ()=>{
    sectionContador.classList.remove('ocultar');
    botaoInserirCelulas.classList.add('ocultar');
    botaoHabilitarContador.classList.add('ocultar');
    botaoVoltar.classList.remove('ocultar');
})

botaoInserirCelulas.addEventListener('click', ()=>{
    sectionDiferencial.classList.remove('ocultar');
    botaoInserirCelulas.classList.add('ocultar');
    botaoHabilitarContador.classList.add('ocultar');
    botaoVoltar.classList.remove('ocultar');
})

botaoVoltar.addEventListener('click', ()=>{
    sectionContador.classList.add('ocultar');
    sectionDiferencial.classList.add('ocultar');
    botaoInserirCelulas.classList.remove('ocultar');
    botaoHabilitarContador.classList.remove('ocultar');
    botaoVoltar.classList.add('ocultar');
})
