const dadosPaciente ={
    sequencia: '',
    amostra: '',
    nome: '',
    dataNascimento: '',
}

const inputSequencia = document.getElementById('sequencia');
const inputAmostra = document.getElementById('amostra');
const inputNome = document.getElementById('nome');
const inputDataNascimento = document.getElementById('dataNascimento');

const formMedula = document.getElementById('form-medula');

formMedula.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Clicou');
    carregarDados();
});


function carregarDados() {
    let sequencia = inputSequencia.value.trim();
    let amostra = inputAmostra.value.trim();
    let nome = inputNome.value.trim();
    let dataNascimento = inputDataNascimento.value;

    dadosPaciente.sequencia = sequencia;
    dadosPaciente.amostra = amostra;
    dadosPaciente.nome = nome;
    dadosPaciente.dataNascimento = dataNascimento;

    console.log(dadosPaciente);
}
