const listaContador = document.getElementById('lista-contador');
const spanAlertas = document.getElementById('span-div-diferencial');
const paragrafoSaidaGlobal = document.getElementById('paragrafo-saida-global');
const paragrfoSaidaEritroblastos = document.getElementById('paragrafo-saida-eritroblastos');
const botaoVoltarContador = document.createElement('button');

spanAlertas.innerHTML = '';
const mensagemValorMaximo = 'Contagem finalizada.';
const mensagemContando = 'Contando...';
const mensagemAguardando = 'Aguardando início da contagem...';
const mensagemInicieContagem = 'Clique aqui para iniciar a contagem.';

let totalContagem = 0;
let contadorCelulas = {};
let eritroblastos = 0;
let totalLeucocitos = 0;
const valorMaximo = 100;

const teclasValidas = ["A", "S", "D", "V", "C", "X", "Z", "Q", "W", "E", "R", "G"];

const teclasPadrao = {  "A": "Segmentados",
                        "S": "Linfócitos",
                        "D": "Monócitos",
                        "V": "Bastonetes",
                        "C": "Meta",
                        "X": "Mielo",
                        "Z": "Promielo",
                        "Q": "Basófilo",
                        "W": "Eosinófilo",
                        "E": "Linf. Atp.",
                        "R": "Blasto",
                        "G": "Eritroblastos"
                    };


botaoHabilitarContador.addEventListener('click', ()=>{
    sectionContador.classList.remove('ocultar');
    botaoInserirCelulas.classList.add('ocultar');
    botaoHabilitarContador.classList.add('ocultar');
    botaoVoltarDiferencial.classList.remove('ocultar');
    habilitarContador();
})

function habilitarContador(){
    criarBotaoVoltarContador()
    sectionContador.focus();
    spanAlertas.textContent = mensagemInicieContagem;
    sectionContador.removeEventListener('keydown', listener);
    sectionContador.addEventListener('keydown', listener);
}

function listener(event){
    const teclaPressionada = event.key.toUpperCase();
    if(teclasValidas.includes(teclaPressionada)){
        validacaoTecla(teclaPressionada);
    }
}

botaoVoltarContador.addEventListener('click', ()=>{
    sectionContador.removeEventListener('keydown', listener);
    zerarContador();
    sectionContador.classList.add('ocultar');
    botaoInserirCelulas.classList.remove('ocultar');
    botaoHabilitarContador.classList.remove('ocultar');
    botaoVoltarContador.remove();
})

function criarBotaoVoltarContador(){
    if(!document.getElementById('botao-div-contador-voltar')){
        botaoVoltarContador.id = 'botao-div-contador-voltar';
        botaoVoltarContador.classList.add('botoes');
        botaoVoltarContador.textContent = 'Voltar';
        sectionContador.appendChild(botaoVoltarContador);
    }
    
}

function validacaoTecla(tecla){
    if(tecla === "G" && totalContagem < valorMaximo){
        eritroblastos++;
        paragrfoSaidaEritroblastos.innerHTML = `<strong>Eritroblastos:</strong> ${eritroblastos}`;
    } else {
        contagemNormal(tecla);
    }
}

function contagemNormal(tecla){
    sectionContador.focus();
    if(totalContagem == valorMaximo){
        spanAlertas.textContent = mensagemValorMaximo;
    }else{
        if(!contadorCelulas[tecla]){
            contadorCelulas[tecla] = 0;
            totalContagem++;
            criarCelula(tecla);
        }else{
            contadorCelulas[tecla]++;
            totalContagem++;
            atualizarLista(tecla);
        }
    }
}

function criarCelula(tecla){
    const novaCelula = document.createElement('li');
    novaCelula.id = `celula-${tecla}`;
    novaCelula.classList.add('lista-celula-item');
    contadorCelulas[tecla]++;
    novaCelula.innerHTML = `${teclasPadrao[tecla]}: ${contadorCelulas[tecla]}`;
    listaContador.appendChild(novaCelula);
    atualizarLista(tecla);
}

function atualizarLista(tecla){
    if(totalContagem != 0){
        spanAlertas.textContent = mensagemContando;
        botaoZerarContagem.textContent = 'Limpar contagem';
        botaoZerarContagem.id = 'botao-limpar-celulas';
        botaoZerarContagem.classList.add('botoes');
        sectionContador.insertBefore(botaoZerarContagem, botaoVoltarContador);
        botaoZerarContagem.removeEventListener('click', zerarContador);
        botaoZerarContagem.addEventListener('click', zerarContador);
    }
    let atualizarCelula = document.getElementById(`celula-${tecla}`);
    atualizarCelula.innerHTML = `${teclasPadrao[tecla]}: ${contadorCelulas[tecla]}`;
    paragrafoSaidaGlobal.innerHTML = `Total: ${totalContagem}`;
}



function zerarContador(){
    totalLeucocitos = 0;
    totalContagem = 0;
    paragrafoSaidaGlobal.textContent = '';
    contadorCelulas = {};
    listaContador.innerHTML = '';
    eritroblastos = 0;
    paragrfoSaidaEritroblastos.textContent = '';
    spanAlertas.textContent = mensagemAguardando;
    botaoZerarContagem.remove();
    sectionContador.focus();
}