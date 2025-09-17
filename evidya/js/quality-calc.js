const inputValues = document.getElementById('input-values');
const buttonAddValue = document.getElementById('button-add-value');
const listValue = document.getElementById('list-value');
const spanLastValue = document.getElementById('span-last-value');

const outputTotalAdd = document.getElementById('output-total-add');
const outputMedia = document.getElementById('output-media');
const outputSD = document.getElementById('output-sd');
const output1SD = document.getElementById('output-1sd');
const output2SD = document.getElementById('output-2sd');
const output3SD = document.getElementById('output-3sd');
const outputCV = document.getElementById('output-cv');
const outputActualDate = document.getElementById('output-date');

const arrayValues = [];
const arrayDifferences = [];

const errorMessage = 'Digite um valor valido!';

function getData(){
    let inputValue = inputValues.value.trim();
    let replacedValue = inputValue.replace(',', '.');
    let value = parseFloat(replacedValue);

    if(value === "" || isNaN(value)){
        alert(errorMessage);
        inputValues.focus();
        inputValues.value = "";
    }else{
        arrayValues.push(value);
        showData();
        media();
    }
}

function showData(){
    spanLastValue.textContent = "";
    listValue.innerHTML = "";
    for(let i = 0; i <arrayValues.length; i++){

        let newValue = document.createElement('li');
        newValue.textContent = arrayValues[i];

        let editButton = document.createElement('button');
        editButton.className = 'li-buttons';
        editButton.textContent = 'Editar';
        newValue.prepend(editButton);
        editButton.onclick = () => editValue(i);

        let removeButton = document.createElement('button');
        removeButton.className = 'li-buttons';
        removeButton.textContent = 'Remover';
        newValue.appendChild(removeButton);
        removeButton.onclick = () => removeValue(i);

        listValue.prepend(newValue);
        inputValues.focus();
        inputValues.value = "";
    }
    arrayValues.length == 0 ? spanLastValue.textContent = "" : spanLastValue.textContent = `Último valor inserido: ${arrayValues[arrayValues.length - 1]}`;
    arrayValues.length == 0 ? outputTotalAdd.textContent = '-' : outputTotalAdd.textContent = arrayValues.length;
    
    if (!document.querySelector('.clear-button') && arrayValues.length > 3) {
        let buttonClearList = document.createElement('button');
        buttonClearList.textContent = 'Limpar';
        buttonClearList.className = 'clear-button'
        buttonClearList.onclick = () => removeAll();
        listValue.appendChild(buttonClearList);
    }
}

//Cálculos

function media(){
    let total = arrayValues.reduce((acc, i) => acc + i, 0);
    let media = total/arrayValues.length;
    isNaN(media) ? outputMedia.textContent = '-' : outputMedia.textContent = media.toFixed(2);
    standardDeviation(media);
}

function standardDeviation(media){
    arrayDifferences.length = 0;
    for (let i = 0; i < arrayValues.length; i++){
        let differenceValue = parseFloat(((arrayValues[i] - media) ** 2));
        arrayDifferences.push(differenceValue);
    }
    let totalDifference = arrayDifferences.reduce((acc, i) => acc + i, 0);
    mediaDifference = totalDifference / arrayDifferences.length;
    finalSD = Math.sqrt(mediaDifference).toFixed(2);

    isNaN(finalSD) ? outputSD.textContent = '-' : outputSD.textContent = finalSD;
    isNaN(finalSD) ? output1SD.textContent = '-' : output1SD.textContent = finalSD;
    isNaN(finalSD) ? output2SD.textContent = '-' : output2SD.textContent = (finalSD*2).toFixed(2);
    isNaN(finalSD) ? output3SD.textContent = '-' : output3SD.textContent = (finalSD*3).toFixed(2);

    coefficientVariation(finalSD, media);
}

function coefficientVariation(finalSD, media) {
    let variation = ((finalSD / media)*100).toFixed(2);
    isNaN(variation) ? outputCV.textContent = '-' : outputCV.textContent = `${variation}%`;
}

function todayDate(){
    let actualDate = new Date();
    let year = actualDate.getFullYear();
    let month = actualDate.getMonth() + 1;
    let day = actualDate.getDate();
    month < 10? month = `0${month}` : month;
    day < 10? day = `0${day}` : day;

    outputActualDate.textContent = `Data: ${day}/${month}/${year}`;
}

function editValue(i){
    let newValue = parseFloat(prompt('Digite o novo valor:').replace(',', '.'));
    if(isNaN(newValue)){
        alert(errorMessage);
        newValue = prompt('Digite o novo valor:');
    }else{
        arrayValues[i] = newValue;
        media();
        showData();
    }
}

function removeValue(i){
    arrayValues.splice(i, 1);
    media();
    showData();
}

function removeAll(){
    let confirmation = confirm('Limpar lista? Esta ação não poderá ser desfeita.');
    if (confirmation === true) {
        arrayValues.length = 0;
        arrayDifferences.length = 0;
        showData();
        media();
    }
}

inputValues.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') getData();
});

buttonAddValue.addEventListener('click', getData);
todayDate();