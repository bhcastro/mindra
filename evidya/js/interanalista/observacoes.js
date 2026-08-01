const listaObsUrina = document.getElementById('lista-obs-urina');
const botaoAdicionarUrina = document.getElementById('botao-add-obs-urina');
const inputObsUrina = document.getElementById('input-obs-urina');

const listaObsHemato = document.getElementById('lista-obs-hemato')
const botaoAdicionarHemato = document.getElementById('botao-add-obs-hemato');
const inputObsHemato = document.getElementById('input-obs-hemato');

const listaObsPlaqueta = document.getElementById('lista-obs-plaqueta');
const inputObsPlaqueta = document.getElementById('input-obs-plaqueta');
const botaoAdicionarPlaqueta = document.getElementById('botao-add-obs-plaqueta');

const valorInvalido = 'Não é possível inserir observções em branco.';
const valorRepetido = 'Observação já inserida';
const mensagemConfirmacao = 'Apagar todas as observações? Esta ação não pode ser desfeita!';

let arrayObsUrina = [];
let arrayObsHemato = [];
let arrayObsPlaqueta = [];


function pegarValor(array, lista, input){
  let novaObs = input.value.trim();
  if(novaObs === "" || array.includes(novaObs)){
    if(novaObs == ""){
      alert(valorInvalido);
      input.focus();
    }else{
    alert(valorRepetido);
    input.value = "";
    input.focus();
    }
  }else{
    array.push(novaObs);
    input.value = "";
    input.focus();
    mostrarObs(array, lista)
  }
}

function mostrarObs(array, lista){
  lista.textContent = "";

  if(array.length !== 0){
    let botaoLimparLista = document.createElement('button');
    botaoLimparLista.className = 'botoes';
    botaoLimparLista.classList.add('botao-limpar');
    botaoLimparLista.textContent = 'Limpar';
    lista.appendChild(botaoLimparLista);
    botaoLimparLista.onclick = ()=> limparLista(array, lista);
  }

  for(let i = 0; i <array.length; i++){

    let novaObs = document.createElement('li');
    novaObs.textContent = array[i];

    let botaoEditar = document.createElement('button');
    botaoEditar.textContent = 'Editar';
    botaoEditar.className = 'botoes';
    botaoEditar.onclick = ()=> editarObs(array, lista ,i);
    novaObs.appendChild(botaoEditar);

    let botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.className = 'botoes';
    botaoRemover.onclick = ()=> removerObs(array, lista, i);
    novaObs.appendChild(botaoRemover);

    lista.appendChild(novaObs);
  }
}

function editarObs(array, lista, i){
  let obsEditada = prompt('Digite a nova observação:', array[i]);
  if(obsEditada === null) return;

  obsEditada =obsEditada.trim();
  
  while(obsEditada === "" || array.includes(obsEditada)){
    if(obsEditada === ""){
      alert(valorInvalido);
    }else{
      alert(valorRepetido);
    }
    obsEditada = prompt('Digite a nova observação:').trim();
  }
  array[i] = obsEditada;
  mostrarObs(array, lista);
}

function removerObs(array, lista, i){
  array.splice(i, 1);
  mostrarObs(array, lista);
}

function limparLista(array, lista){
  let confirmacao = confirm(mensagemConfirmacao);
  if(confirmacao == true){
    array.length = 0;
    mostrarObs(array, lista);
  }
}

botaoAdicionarUrina.addEventListener('click', ()=> pegarValor(arrayObsUrina, listaObsUrina, inputObsUrina));
botaoAdicionarHemato.addEventListener('click', ()=> pegarValor(arrayObsHemato, listaObsHemato, inputObsHemato));
botaoAdicionarPlaqueta.addEventListener('click', ()=> pegarValor(arrayObsPlaqueta, listaObsPlaqueta, inputObsPlaqueta));