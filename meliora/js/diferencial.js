const divSeletor = document.getElementById('seletor');
const sectionContador = document.getElementById('section-contador');
const sectionDiferencial = document.getElementById('section-diferencial');
const botaoHabilitarContador = document.getElementById('botao-div-diferencial-habilitar-contador');
const botaoInserirCelulas = document.getElementById('botao-div-diferencial-inserir-celulas');
const botaoAdicionarCelula = document.getElementById('botao-add-celula');
const botaoRemoverCelula = document.querySelector('.botao-remover');
const botaoZerarContagem = document.createElement('button');
const botaoImprimir = document.getElementById('botao-imprimir');
const botaoVoltarDiferencial = document.createElement('button');
const celulas = document.getElementById('lista__celulas');

const listaDeCelulas = [];
const contagemGlobal = [];

const mensagemSuperior = document.createElement('p');
const valorSuperior = 'Valor de células ultrapassado, reveja sua contagem!';
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
    let totalTemp = contagemGlobal.reduce((a, b) => a + b, 0);
    console.log(totalTemp);
    if(listaDeCelulas.length === 0){
        celulas.innerHTML = '';
        valorTotalCelulas.textContent = '';
        botaoImprimir.classList.add('ocultar');
        mensagemSuperior.remove();
    }else if(mensagemSuperior && totalTemp < 100){
        mensagemSuperior.remove();
    }
}

function mostrarCelulas(){
    if(contagemGlobal.length == 3){
        botaoZerarContagem.textContent = 'Limpar contagem';
        botaoZerarContagem.classList.add('botoes');
        botaoZerarContagem.id = 'botao-limpar-celulas';
        divSeletor.appendChild(botaoZerarContagem);
        botaoZerarContagem.addEventListener('click', zerarContagem);
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
        mensagemSuperior.id = 'mensagem-superior';
        mensagemSuperior.textContent = valorSuperior;
        mensagemSuperior.classList.add('mensagem-superior');
        divSeletor.appendChild(mensagemSuperior);
    }else{
        botaoImprimir.classList.add('ocultar');
        valorTotalCelulas.classList.remove('valor-errado');
        valorTotalCelulas.classList.remove('valor-correto');
    }   
    valorTotalCelulas.textContent = `Total: ${total}`;
    valorTotalCelulas.classList.add('mostrar-total');
    }
}

function zerarContagem(){
    listaDeCelulas.length = 0;
    contagemGlobal.length = 0;
    botaoAdicionarCelula.classList.remove('ocultar');
    valorTotalCelulas.textContent = '';
    botaoZerarContagem.remove();
    mensagemSuperior.remove();
    mostrarCelulas();
}

botaoAdicionarCelula.addEventListener('click', adicionarCelula);

botaoInserirCelulas.addEventListener('click', ()=>{
    criarBotaoVoltarDiferencial()
    sectionDiferencial.classList.remove('ocultar');
    botaoInserirCelulas.classList.add('ocultar');
    botaoHabilitarContador.classList.add('ocultar');
    botaoVoltarDiferencial.classList.remove('ocultar');
})

botaoVoltarDiferencial.addEventListener('click', ()=>{
    zerarContagem();
    sectionDiferencial.classList.add('ocultar');
    botaoInserirCelulas.classList.remove('ocultar');
    botaoHabilitarContador.classList.remove('ocultar');
    botaoVoltarDiferencial.remove();
})


function criarBotaoVoltarDiferencial(){
    botaoVoltarDiferencial.id = 'botao-div-diferencial-voltar';
    botaoVoltarDiferencial.classList.add('botoes');
    botaoVoltarDiferencial.textContent = 'Voltar';
    sectionDiferencial.appendChild(botaoVoltarDiferencial);
}
