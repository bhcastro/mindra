        // Exibição dos dados selecionados

const inputSetor = document.getElementById('seletor-setores');
const outputSetor = document.getElementById('output-setor-controle');

const inputEquipamento = document.getElementById('seletor-equipamentos');
const outputEquipamento = document.getElementById('output-equipamento-controle');

const inputLote = document.getElementById('seletor-lotes');
const outputLote = document.getElementById('output-lote-controle');

const inputAnalito = document.getElementById('seletor-analitos');
const outputAnalito = document.getElementById('output-analito-controle');


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
const btnSalvar = document.getElementById('btn-salvar');

const controleN1 = document.getElementById('controle-n1');
const controleN2 = document.getElementById('controle-n2');

const listaControleN1 = [];
let listaDpN1 = [];
const listaControleN2 = [];
let listaDpN2 = [];

btnSalvar.addEventListener('click', pegarValores);

function pegarValores() {
    let nivel1 = controleN1.value.replace(",", ".");
    let nivel2 = controleN2.value.replace(",", ".");

    if(nivel1.trim() === "" || nivel2.trim() === "") {
        alert("Por favor, preencha ambos os campos de controle.");
        return;
    }else if (isNaN(nivel1) || isNaN(nivel2)) {
        alert("Por favor, insira apenas números nos campos de controle.");
        return;
    }else {
        listaControleN1.push(nivel1);
        listaControleN2.push(nivel2);
        controleN1.value = "";
        controleN2.value = "";
        console.log("Nível 1:", listaControleN1);
        console.log("Nível 2:", listaControleN2);
        calcularMedia(listaControleN1);
    }
}

function calcularMedia(listaN1) {
    let mediaN1 = listaN1.reduce((acc, valor) => acc + parseFloat(valor), 0) / listaN1.length;
    mediaN1 = mediaN1.toFixed(2).replace(".", ",");

    let mediaN2 = listaN2.reduce((acc, valor) => acc + parseFloat(valor), 0) / listaN2.length;
    mediaN2 = mediaN2.toFixed(2).replace(".", ",");
    
    if(listaControleN1.length >= 3 && listaControleN2.length >= 3) {
    exibirMedia(mediaN1, mediaN2);
    calcularDP(mediaN1, listaControleN1);
    //calcularDP(mediaN2, listaControleN2);

    }
}

function calcularDP(media, listaControle, listaDp){
    listaDp.length = 0;

    for(let i = 0; i < listaControle.length; i++) {
        let valorDiferenca = (listaControle[i] - media)**2;
        listaDp.push(valorDiferenca);
    }
    let mediaDiferenca = listaDp.reduce((acc, i) => acc + i, 0) / listaDp.length;
    let dpFinal = Math.sqrt(mediaDiferenca).toFixed(2).replace(".", ",");

    if(listaControle.length >= 3){
        exibirDP(dpFinal);
    }
}

        //Exibição dos resultados

const outputMediaN1 = document.getElementById('media-n1');
const outputMediaN2 = document.getElementById('media-n2');


function exibirMedia(mediaN1, mediaN2) {
    outputMediaN1.textContent = mediaN1;
    //outputMediaN2.textContent = mediaN2;
}

function exibirDP(dp) {
    const outputDp1N1 = document.getElementById('dp-1-n1');
    const outputDp2N1 = document.getElementById('dp-2-n1');
    const outputDp3N1 = document.getElementById('dp-3-n1');

    outputDp1N1.textContent = dp;
    outputDp2N1.textContent = (dp * 2).toFixed(2).replace(".", ",");
    outputDp3N1.textContent = (dp * 3).toFixed(2).replace(".", ",");
}