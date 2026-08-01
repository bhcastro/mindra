//Calculadora automatica das plaquetas

const inputPlaquetasContadas = document.getElementById('plaquetas-contadas');
const inputValorRbc = document.getElementById('valor-rbc');
const outputCalculoPlaquetas = document.getElementById('output-plaquetas');

function calcularPlaquetas(){
    let plaquetasContadas = parseFloat(inputPlaquetasContadas.value.trim());
    let valorRbc = parseFloat(inputValorRbc.value.trim());

    if (!isNaN(plaquetasContadas) && !isNaN(valorRbc)) {
        const plaquetasCalculadas = (plaquetasContadas * valorRbc * 1000).toLocaleString('pt-BR');
        outputCalculoPlaquetas.textContent = `Valor calculado: ${plaquetasCalculadas}`;
    }else{
    outputCalculoPlaquetas.textContent = 'Insira valores válidos.';
    }
}
inputValorRbc.addEventListener('input', calcularPlaquetas);

//Calculadora automatica dos reticulócitos

const inputReticulocitos = document.getElementById('input-reticulocitos');
const outputReticulocitos = document.getElementById('output-reticulocitos');

function calcularReticulocitos(){
    let reticulocitosContados = parseFloat(inputReticulocitos.value.trim());

    if (!isNaN(reticulocitosContados)){
        let reticulocitosCalculados = (reticulocitosContados / 10).toFixed(2).replace('.',',');
        outputReticulocitos.textContent = `Valor calculado: ${reticulocitosCalculados}`;
    }else{
        outputReticulocitos.textContent = 'Insira um valor válido.'
    }
}
inputReticulocitos.addEventListener('input', calcularReticulocitos);
