import { supabaseClient } from './supabase.js';


//Bloco de código para popular os seletores com dados do Supabase

const seletorSetores = document.getElementById('seletor-setores');
const seletorEquipamentos = document.getElementById('seletor-equipamentos');
const seletorControles = document.getElementById('seletor-controles');
const seletorLotes = document.getElementById('seletor-lotes');
const seletorAnalitos = document.getElementById('seletor-analitos');

// Função para limpar seletores filhos
const resetFilhos = (listaSelects) => {
    listaSelects.forEach(select => {
        if (select) {
            select.innerHTML = `<option value="" selected disabled>Selecione...</option>`;
            select.disabled = true;
        }
    });
};

// Função para preencher as opções
const preencherSelect = (elemento, dados, labelProp) => {
    if (!elemento) return;
    elemento.innerHTML = `<option value="" selected disabled>Selecione...</option>` +
        dados.map(item => `<option value="${item.id}">${item[labelProp]}</option>`).join('');
    elemento.disabled = false;
};

// Carga Inicial de Setores
async function carregarSetores() {
    console.log("Tentando carregar setores...");
    const { data, error } = await supabaseClient.from('setores').select('id, setor');

    console.log("Data:", data);
    console.log("Erro:", error);

    if (error) {
        console.error('Erro ao carregar setores', error);
        return;
    }
    preencherSelect(seletorSetores, data, 'setor');
}

// Evento quando o Setor muda -> Busca Equipamentos


seletorSetores.addEventListener('change', async (e) => {
    const setorId = e.target.value;

    resetFilhos([seletorEquipamentos, seletorControles, seletorLotes, seletorAnalitos]);
    if (!setorId) return;

    const { data, error } = await supabaseClient
        .from('equipamentos')
        .select('id, nome')
        .eq('setor_id', setorId);


    if (error) {
        console.error('Erro ao carregar equipamentos:', error);
        return;
    }

    preencherSelect(seletorEquipamentos, data, 'nome');
});

//Evento quando muda o equipamento -> Busca os controles

seletorEquipamentos.addEventListener('change', async (e) => {
    const equipamentoId = e.target.value;

    resetFilhos([seletorControles, seletorLotes, seletorAnalitos]);
    if (!equipamentoId) return;

    const { data, error } = await supabaseClient
        .from('controles')
        .select('id, nome')
        .eq('equipamento_id', equipamentoId);

    if (error) {
        console.error('Erro ao carregar controles', error);
        return;
    }
    preencherSelect(seletorControles, data, 'nome');
});

//Evento quando muda o controle -> Busca os lotes

seletorControles.addEventListener('change', async (e) => {
    const loteId = e.target.value;

    resetFilhos([seletorAnalitos]);
    if (!loteId) return;

    const { data, error } = await supabaseClient
        .from('lotes_controles')
        .select('id, numero_lote')
        .eq('controle_id', loteId);

    if (error) {
        console.error('Erro ao carregar lotes', error);
        return;
    }
    preencherSelect(seletorLotes, data, 'numero_lote');
});

//Evento quando muda o lote -> Busca os analitos

seletorLotes.addEventListener('change', async (e) => {
    const loteId = e.target.value;

    resetFilhos([seletorAnalitos]);
    if (!loteId) return;

    const { data, error } = await supabaseClient
        .from('analitos')
        .select('id, nome')
        .eq('lote_id', loteId);

    if (error) {
        console.error('Erro ao carregar analitos', error);
        return;
    }
    preencherSelect(seletorAnalitos, data, 'nome');
});

// Executa a carga inicial

carregarSetores();

//Final do bloco de código para popular os seletores com dados do Supabase

//Bloco para captura de valores

