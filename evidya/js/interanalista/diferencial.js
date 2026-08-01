const botaoAdicionarCelula = document.getElementById('botao-add-celula');
const botaoRemoverCelula = document.querySelector('.botao-remover');
const botaoImprimir = document.getElementById('botao-imprimir');
const celulas = document.querySelector('.lista__celulas');

const listaDeCelulas = [];
const contagemGlobal = [];

const valorSuperior = 'Valor de células ultrapassado, reveja sua contagem!'
const nomeCelula = 'Insira uma célula válida!';
const valorCelula = 'Não é possível inserir células sem valor!';

let valorTotalCelulas = document.getElementById('output-diferencial');
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
    let excluirCelula = confirm(`Deseja mesmo remover: ${listaDeCelulas[celula]}?`);
    if(excluirCelula === true){
        listaDeCelulas.splice(celula, 1);
        contagemGlobal.splice(celula, 1);
        mostrarCelulas();
        somarCelulas();
        inputCelula.focus();
    }
    if(listaDeCelulas.length === 0){
        celulas.innerHTML = '';
        valorTotalCelulas.textContent = '';
        botaoImprimir.classList.add('ocultar');
    }
}

function mostrarCelulas(){
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
        alert(valorSuperior);
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
