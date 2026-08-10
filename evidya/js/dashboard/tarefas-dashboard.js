//DECLARAÇÕES

const arrayTarefasFixas = ['Temperaturas', 'Controles', 'Manutenções', 'Reprodutibilidade'];
const arrayTarefasPontuais = [];

const listaTarefasFixas = document.getElementById('lista-tarefas-fixas');
const listaTarefasPontuais = document.getElementById('lista-tarefas-pontuais');

const inputNovaTarefa = document.getElementById('input-nova-tarefa');

const btnAdicionarTarefa = document.getElementById('btn-adicionar-tarefa');
const btnLimparLista = document.getElementById('btn-limpar-lista');

const divTarefasPontuais = document.getElementById('div-tarefas-pontuais');
const spanMensagensTarefas = document.getElementById('span-mensagens-tarefas');

//EVENT LISTENERS

btnAdicionarTarefa.addEventListener('click', pegarTarefa);

inputNovaTarefa.addEventListener('keydown', (event) => {
    if (event.key === 'Enter')
        pegarTarefa();
});

btnLimparLista.addEventListener('click', limparLista);

listaTarefasPontuais.addEventListener('change', (event) => {
    let tarefaClicada = event.target.closest('li');
    tarefaClicada.classList.toggle('tarefa-concluida');
});

//GERAÇÃO DE TAREFAS FIXAS

arrayTarefasFixas.forEach(tarefa => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="tarefa-fixa-${arrayTarefasFixas.indexOf(tarefa)}"> <label for="tarefa-fixa-${arrayTarefasFixas.indexOf(tarefa)}">${tarefa}</label>`;
    listaTarefasFixas.appendChild(li);
});

//GERAÇÃO DE TAREFAS PONTUAIS

//FUNÇÃO PARA PEGAR OS VALORES
function pegarTarefa() {
    let tarefa = inputNovaTarefa.value.trim();
    if (arrayTarefasPontuais.includes(tarefa)) {
        spanMensagensTarefas.classList.remove('sucesso');
        spanMensagensTarefas.classList.add('erro');
        setTimeout(() => {
            spanMensagensTarefas.textContent = '';
        }, 1000);
        spanMensagensTarefas.textContent = 'Essa tarefa já foi adicionada!';

    } else if (tarefa !== '') {
        arrayTarefasPontuais.push(tarefa);
        spanMensagensTarefas.classList.remove('erro');
        spanMensagensTarefas.classList.add('sucesso');
        setTimeout(() => {
            spanMensagensTarefas.textContent = '';
        }, 1000);
        spanMensagensTarefas.textContent = 'Tarefa adicionada com sucesso!';
        renderizarTarefasPontuais();
    } else {
        spanMensagensTarefas.classList.remove('sucesso');
        spanMensagensTarefas.classList.add('erro');
        setTimeout(() => {
            spanMensagensTarefas.textContent = '';
        }, 1000);
        spanMensagensTarefas.textContent = 'Digite uma tarefa válida!';
    }
    inputNovaTarefa.value = '';
    inputNovaTarefa.focus();
}

//RENDERIZAÇÃO DE TAREFAS PONTUAIS

function renderizarTarefasPontuais() {
    listaTarefasPontuais.innerHTML = '';
    for (let i = 0; i < arrayTarefasPontuais.length; i++) {
        const li = document.createElement('li');
        li.setAttribute('class', `tarefa-pontual-${i}`);
        li.setAttribute('class', `tarefa-criada`);
        li.innerHTML = `<input type = "checkbox" id="tarefa-pontual-${i}"> <label for="tarefa-pontual-${i}">${arrayTarefasPontuais[i]}</label>`

        const btnRemover = document.createElement('button');
        btnRemover.setAttribute('class', 'btn-remover-tarefa');
        btnRemover.textContent = 'Remover';
        li.appendChild(btnRemover);
        btnRemover.addEventListener('click', () => { removerTarefa(i); });
        listaTarefasPontuais.appendChild(li);
    }
    arrayTarefasPontuais.length >= 3 ? btnLimparLista.classList.remove('ocultar') : btnLimparLista.classList.add('ocultar');
    arrayTarefasPontuais.length > 0 ? divTarefasPontuais.classList.remove('ocultar') : divTarefasPontuais.classList.add('ocultar');
}

//FUNÇÃO DE REMOÇÃO DE TAREFAS PONTUAIS E LIMPEZA DA LISTA

function removerTarefa(index) {
    arrayTarefasPontuais.splice(index, 1);
    renderizarTarefasPontuais();
}

function limparLista() {
    let confirmacao = confirm('Tem certeza que deseja limpar a lista de tarefas pontuais?');
    if (confirmacao) {
        arrayTarefasPontuais.length = 0;
        renderizarTarefasPontuais();
    }
}


