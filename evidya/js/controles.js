// Declarações

const outputs = {
    N1: {
        outputMedia: document.getElementById('media-n1'),
        outputDp1: document.getElementById('dp-1-n1'),
        outputDp2: document.getElementById('dp-2-n1'),
        outputDp3: document.getElementById('dp-3-n1'),
        outputCv: document.getElementById('cv-n1'),
        outputTotalPontos: document.getElementById('total-pontos-n1')
    },
    N2: {
        outputMedia: document.getElementById('media-n2'),
        outputDp1: document.getElementById('dp-1-n2'),
        outputDp2: document.getElementById('dp-2-n2'),
        outputDp3: document.getElementById('dp-3-n2'),
        outputCv: document.getElementById('cv-n2'),
        outputTotalPontos: document.getElementById('total-pontos-n2')
    }
}

const inputSetor = document.getElementById('seletor-setores');
const outputSetor = document.getElementById('output-setor-controle');

const inputEquipamento = document.getElementById('seletor-equipamentos');
const outputEquipamento = document.getElementById('output-equipamento-controle');

const inputLote = document.getElementById('seletor-lotes');
const outputLote = document.getElementById('output-lote-controle');

const inputAnalito = document.getElementById('seletor-analitos');
const outputAnalito = document.getElementById('output-analito-controle');

const outputMediaN1 = document.getElementById('media-n1');
const outputMediaN2 = document.getElementById('media-n2');

const inputControleN1 = document.getElementById('input-controle-n1');
const inputControleN2 = document.getElementById('input-controle-n2');

const listaControleN1 = [];

const listaControleN2 = [];

const btnSalvar = document.getElementById('btn-salvar');
btnSalvar.addEventListener('click', pegarValores);


let dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
document.getElementById('output-data-controle').textContent = dataAtual;



// Coleta de dados

inputSetor.addEventListener('change', () => {
    let setor = inputSetor.value;
    outputSetor.textContent = setor;
});

inputEquipamento.addEventListener('change', () => {
    let equipamento = inputEquipamento.value;
    outputEquipamento.textContent = equipamento;
});

inputLote.addEventListener('change', () => {
    let lote = inputLote.value;
    outputLote.textContent = lote;
});

inputAnalito.addEventListener('change', () => {
    let analito = inputAnalito.options[inputAnalito.selectedIndex].text;
    outputAnalito.textContent = analito;
});


function pegarValores() {
    let nivel1 = parseFloat(inputControleN1.value.replace(",", "."));
    let nivel2 = parseFloat(inputControleN2.value.replace(",", "."));

    if (isNaN(nivel1) || isNaN(nivel2)) {
        alert("Por favor, insira apenas números nos campos de controle.");
        return;
    } else {
        listaControleN1.push(parseFloat(nivel1));
        listaControleN2.push(parseFloat(nivel2));
        inputControleN1.value = "";
        inputControleN2.value = "";

        if (listaControleN1.length >= 3 && listaControleN2.length >= 3) {
            const resultadosN1 = calcularDados(listaControleN1);
            const resultadosN2 = calcularDados(listaControleN2);
            exibirResultados(outputs.N1, resultadosN1);
            exibirResultados(outputs.N2, resultadosN2);
        }
    }
}

// Cálculos


function calcularDados(lista) {
    const media = lista.reduce((acc, valor) => acc + parseFloat(valor), 0) / lista.length;
    let somaVariancia = 0;
    for (let i = 0; i < lista.length; i++) {
        somaVariancia += (lista[i] - media) ** 2;
    }
    const dp = Math.sqrt(somaVariancia / (lista.length - 1));
    const cv = (dp / media) * 100;
    return { media, dp, dp2: dp * 2, dp3: dp * 3, cv, totalPontos:lista.length };
}


// Exibir resultados

function exibirResultados(outputs, resultados) {
    outputs.outputMedia.textContent = resultados.media.toFixed(2).replace(".", ",");
    outputs.outputDp1.textContent = resultados.dp.toFixed(2).replace(".", ",");
    outputs.outputDp2.textContent = resultados.dp2.toFixed(2).replace(".", ",");
    outputs.outputDp3.textContent = resultados.dp3.toFixed(2).replace(".", ",");
    outputs.outputCv.textContent = resultados.cv.toFixed(2).replace(".", ",");
    outputs.outputTotalPontos.textContent = resultados.totalPontos;
}