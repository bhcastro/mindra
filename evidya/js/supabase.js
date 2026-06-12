import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = "https://nwizaufhlnsbzjhhxmeu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXphdWZobG5zYnpqaGh4bWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNzMyNjUsImV4cCI6MjA5NTY0OTI2NX0.ACA17cDbssY1db_Jp_N7WQ1-YEDipeUed7lPaea7ym4";

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);




//Bloco de código para popular os seletores com dados do Supabase

const seletorSetor = document.getElementById('seletor-setores');
const seletorEquipamento = document.getElementById('seletor-equipamentos');
const seletorLote = document.getElementById('seletor-lotes');
const seletorControle = document.getElementById('seletor-controle');
const seletorAnalito = document.getElementById('seletor-analitos');

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

    if (error) {
        console.error('Erro ao carregar setores', error);
        return;
    }
    preencherSelect(seletorSetor, data, 'setor');
}

// Evento quando o Setor muda -> Busca Equipamentos
seletorSetor.addEventListener('change', async (e) => {
    const setorId = e.target.value;

    resetFilhos([seletorEquipamento, seletorLote, seletorControle, seletorAnalito]);
    if (!setorId) return;

    const { data, error } = await supabaseClient
        .from('equipamentos')
        .select('id, nome')
        .eq('setor_id', setorId);

    if (error) {
        console.error('Erro ao carregar equipamentos:', error);
        return;
    }

    preencherSelect(seletorEquipamento, data, 'nome');
});

//Evento quando muda o equipamento -> Busca os controles

seletorEquipamento.addEventListener('change', async (e) => {
    const equipamentoId = e.target.value;

    resetFilhos([seletorControle, seletorLote, seletorAnalito]);
    if (!equipamentoId) return;

    const { data, error } = await supabaseClient
        .from('controles')
        .select('id, nome')
        .eq('equipamento_id', equipamentoId);

    if (error) {
        console.error('Erro ao carregar controles', error);
        return;
    }
    preencherSelect(seletorControle, data, 'nome');
});

//Evento quando muda o controle -> Busca os lotes

seletorControle.addEventListener('change', async (e) => {
    const controleId = e.target.value;

    resetFilhos([seletorLote, seletorAnalito]);
    if (!controleId) return;

    const { data, error } = await supabaseClient
        .from('lotes')
        .select('id, nome')
        .eq('controle_id', controleId);

    if (error) {
        console.error('Erro ao carregar lotes', error);
        return;
    }
    preencherSelect(seletorLote, data, 'nome');
});

//Evento quando muda o lote -> Busca os analitos

seletorLote.addEventListener('change', async (e) => {
    const loteId = e.target.value;

    resetFilhos([seletorAnalito]);
    if (!loteId) return;

    const { data, error } = await supabaseClient
        .from('analitos')
        .select('id, nome')
        .eq('lote_id', loteId);

    if (error) {
        console.error('Erro ao carregar analitos', error);
        return;
    }
    preencherSelect(seletorAnalito, data, 'nome');
});

// Executa a carga inicial
carregarSetores();

//Final do bloco de código para popular os seletores com dados do Supabase