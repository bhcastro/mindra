//DECLARAÇÕES
//===========

const listaTarefasDiarias = [
  "Temperaturas",
  "Manutenções",
  "Controles",
  "Separar Repro",
  "Limpar bancada",
  "Desprezar Soroteca"
];
const listaTarefasCriadas = [];
const arrayRecoletas = [];

const divNovaColeta = document.getElementById("div-recoletas");
const inputNovaColeta = document.getElementById("input-nova-coleta");
const btnAdicionarNovaColeta = document.getElementById("btn-adicionar-nova-coleta");

const inputNovaTarefa = document.getElementById("input-nova-tarefa");
const divNovaTarefa = document.getElementById("div-nova-tarefa");
const btnAdicionarNovaTarefa = document.getElementById("btn-adicionar-nova-tarefa");

const btnLimparListaTarefas = document.getElementById("btn-limpar-lista");
const btnLimparListaRecoletas = document.getElementById('btn-limpar-lista-recoletas')

const divTarefasPontuais = document.getElementById("div-tarefas-pontuais");

const listaTarefasPendentes = document.getElementById("lista-tarefas-pendentes");
const listaTarefasPontuais = document.getElementById("lista-tarefas-pontuais");
const listaRecoletas = document.getElementById('lista-recoletas');

const spanMensagensTarefas = document.getElementById("span-mensagens-tarefas");
const spanMensagensRecoletas = document.getElementById('span-mensagens-recoletas');


//===================
//FIM DAS DECLARAÇÕES

//CRIAÇÃO DAS TAREFAS DIÁRIAS
//===========================

for (let i = 0; i < listaTarefasDiarias.length; i++) {
  let tarefaDiaria = document.createElement("li");
  listaTarefasPendentes.appendChild(tarefaDiaria);
  tarefaDiaria.innerHTML = `<input type="checkbox" id="${listaTarefasDiarias[i]}"><label for="${listaTarefasDiarias[i]}">${listaTarefasDiarias[i]}</label>`;
}

//==================================
//FIM DA CRIAÇÃO DAS TAREFAS DIÁRIAS


//EVENT LISTENERS
//===============

btnAdicionarNovaTarefa.addEventListener("click", ()=>{
	let input = inputNovaTarefa.value.trim();
	obterValores(input, listaTarefasCriadas, listaTarefasPontuais, spanMensagensTarefas, divTarefasPontuais)
	inputNovaTarefa.value = "";
	inputNovaTarefa.focus();
});

inputNovaTarefa.addEventListener("keydown", (event)=>{
	if(event.key === 'Enter'){
		let input = inputNovaTarefa.value.trim();
		obterValores(input, listaTarefasCriadas, listaTarefasPontuais, spanMensagensTarefas, divTarefasPontuais)
		inputNovaTarefa.value = "";
		inputNovaTarefa.focus();
	}
});

btnLimparListaTarefas.addEventListener('click', ()=>{

console.log("CLIQUE NO BOTÃO DE TAREFAS");
	
	let confirmacao = confirm ('Deseja remover todos os itens?');
	if(confirmacao){
		limparLista(listaTarefasCriadas, listaTarefasPontuais, divTarefasPontuais);
	}
});


btnAdicionarNovaColeta.addEventListener("click", ()=>{
	let input = inputNovaColeta.value.trim();
	if(!isNaN(input)){
		obterValores(input, arrayRecoletas, listaRecoletas, spanMensagensRecoletas, divNovaColeta);
		divNovaColeta.classList.remove('ocultar');	
	}else{
		spanMensagensRecoletas.textContent = 'Valor inválido!';
		spanMensagensRecoletas.classList.remove('sucesso');
		spanMensagensRecoletas.classList.add('erro');
	}
	inputNovaColeta.value = "";
	inputNovaColeta.focus();
});

inputNovaColeta.addEventListener("keydown", (event)=>{
	if(event.key === 'Enter'){
		let input = inputNovaColeta.value.trim();
		if(!isNaN(input)){
			obterValores(input, arrayRecoletas, listaRecoletas, spanMensagensRecoletas, divNovaColeta);
		}else{
			spanMensagensRecoletas.textContent = 'Valor inválido!';
			spanMensagensRecoletas.classList.remove('sucesso');
			spanMensagensRecoletas.classList.add('erro');
		}
		inputNovaColeta.value = "";
		inputNovaColeta.focus();
	}
});

btnLimparListaRecoletas.addEventListener('click', ()=>{
	let confirmacao = confirm ('Deseja remover todos os itens?');
	if(confirmacao){
		limparLista(arrayRecoletas, listaRecoletas, divNovaColeta);
	}
});

listaTarefasPendentes.addEventListener('change', (event)=>{
	if(event.target.type === 'checkbox'){
		event.target.closest('li').classList.toggle('tarefa-concluida')
	}
});

listaTarefasPontuais.addEventListener('change', (event)=>{
	if(event.target.type === 'checkbox'){
		event.target.closest('li').classList.toggle('tarefa-concluida')
	}
});

listaRecoletas.addEventListener('change', (event)=>{
	if(event.target.type === 'checkbox'){
		event.target.closest('li').classList.toggle('tarefa-concluida');
	}
});



//FIM DOS EVENT LISTENERS
//=======================


//FUNÇÕES ÚNICAS DE EXECUÇÃO TOTAL
//================================
function obterValores(input, array, lista, span, div) {
	if(input === ""){
		setTimeout(()=>{
			span.textContent = "";
		}, 3000);
		span.textContent = 'Valor inválido!';
		span.classList.remove('sucesso');
		span.classList.add('erro');
	}else if(array.includes(input)){
		setTimeout(()=>{
			span.textContent = "";
		}, 3000);
		span.classList.remove('sucesso');
		span.classList.add('erro')
		span.textContent = 'Valor já inserido!';
	}else{
		array.push(input);
		div.classList.remove('ocultar');
		setTimeout(()=>{
			span.textContent = "";
		}, 3000);
		span.textContent = 'Adicionado com sucesso!';
		span.classList.remove('erro');
		span.classList.add('sucesso');
	}
	exibirValores(array, lista);
}
	

function exibirValores(array, lista){
	lista.textContent = "";
	for (let i = 0; i < array.length; i++) {
		let novoDado = document.createElement('li');
		novoDado.innerHTML = `<label><input type="checkbox">&nbsp${array[i]}</label>`;
		lista.appendChild(novoDado);
	}
}

function limparLista(array, lista, div){
	array.length = 0;
	lista.textContent = "";
	div.classList.add('ocultar');

	console.log("classes:", div.className);
 console.log("display:", getComputedStyle(div).display);
}
