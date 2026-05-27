// Declarações

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
let listaDpN1 = [];

const listaControleN2 = [];
let listaDpN2 = [];

const outputDp1N1 = document.getElementById('dp-1-n1');
const outputDp2N1 = document.getElementById('dp-2-n1');
const outputDp3N1 = document.getElementById('dp-3-n1');
const outputCvN1 = document.getElementById('cv-n1');
const outputTotalPontosN1 = document.getElementById('total-pontos-n1');

const outputDp1N2 = document.getElementById('dp-1-n2');
const outputDp2N2 = document.getElementById('dp-2-n2');
const outputDp3N2 = document.getElementById('dp-3-n2');
const outputCvN2 = document.getElementById('cv-n2');
const outputTotalPontosN2 = document.getElementById('total-pontos-n2');

const btnSalvar = document.getElementById('btn-salvar');
btnSalvar.addEventListener('click', pegarValores);

// Exibição dos dados selecionados

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


// Cálculos

function pegarValores() {
    let nivel1 = inputControleN1.value.replace(",", ".");
    let nivel2 = inputControleN2.value.replace(",", ".");

    if (nivel1.trim() === "" || nivel2.trim() === "") {
        alert("Por favor, preencha ambos os campos de controle.");
        return;
    } else if (isNaN(nivel1) || isNaN(nivel2)) {
        alert("Por favor, insira apenas números nos campos de controle.");
        return;
    } else {
        listaControleN1.push(Number(nivel1));
        listaControleN2.push(Number(nivel2));
        inputControleN1.value = "";
        inputControleN2.value = "";
        if (listaControleN1.length >= 2 && listaControleN2.length >= 2) {
            calcularMedia(listaControleN1, outputMediaN1);
            calcularMedia(listaControleN2, outputMediaN2);
        }
    }
}

function calcularMedia(listaControle, outputMedia) {
    let mediaListaControle = listaControle.reduce((acc, valor) => acc + parseFloat(valor), 0) / listaControle.length;
    mediaListaControle = mediaListaControle.toFixed(2);
    outputMedia.textContent = mediaListaControle.replace(".", ",");
    calcularDp(mediaListaControle, listaControle, listaDpN1);
    calcularDP(mediaListaControle, listaControle, listaDpN2);
}

function calcularDp(media, listaControle, listaDp) {
    listaDp.length = 0;

    for (let i = 0; i < listaControle.length; i++) {
        let valorDiferenca = (listaControle[i] - media) ** 2;
        listaDp.push(valorDiferenca);
    }
    let mediaDiferenca = listaDp.reduce((acc, i) => acc + i, 0) / (listaDp.length - 1);
    let dpFinal = Math.sqrt(mediaDiferenca).toFixed(2);

    if (listaControle.length >= 3) {
        outputDp1N1.textContent = dpFinal.replace(".", ",");
        outputDp2N1.textContent = (dpFinal * 2).toFixed(2).replace(".", ",");
        outputDp3N1.textContent = (dpFinal * 3).toFixed(2).replace(".", ",");
    }
}
