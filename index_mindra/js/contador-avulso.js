const eritroblastos = document.getElementById('eritroblastos');
const macroplaquetas = document.getElementById('macroplaquetas');
const plaquetasGigantes = document.getElementById('plaquetas-gigantes');
const clearButton = document.createElement('button');
const countSection = document.getElementById('count-section');
const countSectionSpan = document.getElementById('count-section-span');
const calcSection = document.getElementById('calc-section');
const totalCelsOutput = document.getElementById('total');
const outputList = document.getElementById('output-list');
const defaultKeys = {
    "A": "Segmentados",
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
    "G": "Eritroblastos",
    "V": "Macroplaquetas",
    "B": "Plaquetas Gigantes"
};

const validKeys = ["A", "S", "D", "V", "C", "X", "Z", "Q", "W", "E", "R", "G", "B", "N"];
const limitExceed = 'Valor máximo atingido!';
const maxCels = 100;

const inputLeuco = document.getElementById('input-leuco');
const outputLeuco = document.getElementById('output-leuco');

let totalCels = 0;
let totalEritro = 0;
let totalMacroPlt = 0;
let totalPltGigante = 0
let leuco = 0;
let celListCount = {};

countSectionSpan.innerHTML = 'Clique para habilitar';

countSection.addEventListener('focus', () => {
    countSectionSpan.innerHTML = 'Aguardando contagem...'
});
countSection.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    verifyPressedKey(key);
});

function verifyPressedKey(key) {
    if (key == 'G' && totalCels < maxCels) {
        eritroCount(key);
    } else if (key == 'V' || key == 'B' && totalCels < maxCels) {
        pltCount(key);
    } else if (validKeys.includes(key)) {
        countCels(key);
    }
}

function eritroCount(key) {
    if (!celListCount[key]) {
        celListCount[key] = 0;
        celListCount[key]++
    } else {
        celListCount[key]++;
    }
    eritroblastos.innerHTML = `Eritroblastos: ${celListCount[key]}`;
    totalEritro++;
}

function countCels(key) {
    if (totalCels === maxCels) {
        countSectionSpan.innerHTML = 'Contagem finalizada!';
    } else {
        if (!celListCount[key]) {
            celListCount[key] = 0;
            totalCels++;
            createCell(key);
        } else {
            celListCount[key]++;
            totalCels++;
            showCounts(key);
        }
    }
}

function createCell(key) {
    let newCel = document.createElement('li');
    outputList.appendChild(newCel);
    newCel.id = `cel-${defaultKeys[key]}`;
    newCel.classList.add('output-count');
    celListCount[key]++;
    newCel.innerHTML = `${defaultKeys[key]}: ${celListCount[key]}`;
    showCounts(key);
}

function showCounts(key) {
    if (totalCels != 0) {
        clearButton.id = 'clear-button';
        clearButton.textContent = 'Limpar contagem';
        countSection.appendChild(clearButton);
        countSectionSpan.innerHTML = 'Contando...';
    }
    let updateCell = document.getElementById(`cel-${defaultKeys[key]}`);
    updateCell.innerHTML = `${defaultKeys[key]}: ${celListCount[key]}`;
    totalCelsOutput.textContent = `Total: ${totalCels}`;
}

function clearCount() {
    calcSection.classList.add('ocultar');
    totalCels = 0;
    totalEritro = 0;
    celListCount = {};
    clearButton.remove();
    eritroblastos.innerHTML = "";
    inputLeuco.value = "";
    totalCelsOutput.innerHTML = "";
    outputList.innerHTML = "";
    outputLeuco.innerHTML = "";
    countSectionSpan.innerHTML = 'Clique para habilitar';
}

clearButton.addEventListener('click', clearCount);

/*CÁLCULOS*/

inputLeuco.addEventListener('input', (event) => {
    let leuco = event.target.value;
    if (!isNaN(leuco) && totalEritro >= 10) {
        correctLeuco(totalEritro, leuco);
    }
})

countSection.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    if (key === "G" && totalEritro >= 10) {
        correctLeuco(totalEritro, leuco);
    }
});

function correctLeuco(e, l) {
    let eri = Number(e) + 100;
    let leuc = Number(l) * 100;
    let cleuc = leuc / eri;
    let fleuc = Math.floor(cleuc).toLocaleString('pt-BR');
    if (totalEritro >= 10) {
        calcSection.classList.remove('ocultar');
        if (fleuc != 0 && fleuc != "") {
            outputLeuco.innerHTML = `<strong>Leucócitos corrigidos: </strong>${fleuc}`;
        }
        else {
            outputLeuco.innerHTML = "";
        }
    } else {
        outputLeuco.innerHTML = "";
        calcSection.classList.add('ocultar');
    }
}

function pltCount(key) {
    if (key == 'B') {
        totalMacroPlt++
        if (totalMacroPlt >= 15) {
            macroplaquetas.innerHTML = 'Presença de numerosas macroplaquetas';
        } else if (totalMacroPlt >= 10) {
            macroplaquetas.innerHTML = 'Presença de algumas macroplaquetas';
        } else if (totalMacroPlt >= 5) {
            macroplaquetas.innerHTML = 'Presença de raras macroplaquetas';
        }
    } else if (key == 'N') {
        totalPltGigante++
        if (totalPltGigante != 0) {
            plaquetasGigantes.innerHTML = 'Presença de plaquetas gigantes';
        }
    }
}