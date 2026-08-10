const form = document.getElementById("form-medula");

const btnAssinar = document.getElementById("assinarLaudo");
const btnImprimir = document.getElementById("imprimirLaudo");
const btnSalvarRascunho = document.getElementById("salvarRascunho");

const modalAssinatura = document.getElementById("modalAssinatura");

const cancelarAssinatura =
    document.getElementById("cancelarAssinatura");

const confirmarAssinatura =
    document.getElementById("confirmarAssinatura");

const statusLaudo =
    document.getElementById("statusLaudo");

const dataAssinaturaContainer =
    document.getElementById("dataAssinaturaContainer");

const dataAssinatura =
    document.getElementById("dataAssinatura");

const assinaturaDigitalContainer =
    document.getElementById("assinaturaDigitalContainer");

const assinaturaDigital =
    document.getElementById("assinaturaDigital");

const areaDiferencial =
    document.getElementById("areaDiferencial");

const realizarContagem =
    document.getElementById("realizarContagem");

const digitarContagem =
    document.getElementById("digitarContagem");

let laudoAssinado = false;


/* =====================================================
   COLETA DOS DADOS
===================================================== */

function coletarDadosLaudo() {

    const formData = new FormData(form);

    const dados = {};

    for (const [chave, valor] of formData.entries()) {

        if (dados[chave]) {

            if (!Array.isArray(dados[chave])) {
                dados[chave] = [dados[chave]];
            }

            dados[chave].push(valor);

        } else {

            dados[chave] = valor;

        }

    }


    /*
     * Informações de controle.
     * Essas propriedades serão úteis no Supabase.
     */

    dados.status = laudoAssinado
        ? "assinado"
        : "rascunho";

    dados.updated_at = new Date().toISOString();


    if (laudoAssinado) {
        dados.signed_at = new Date().toISOString();
    }


    return dados;
}


/* =====================================================
   SALVAR LAUDO
===================================================== */

async function salvarLaudo(dados, status = "rascunho") {

    /*
     * FUTURA INTEGRAÇÃO COM SUPABASE
     *
     * Exemplo futuro:
     *
     * const { data, error } = await supabase
     *     .from("laudos_mielograma")
     *     .insert({
     *         ...dados,
     *         status: status
     *     });
     *
     * if (error) {
     *     throw error;
     * }
     *
     * return data;
     */


    console.log("Dados preparados para o banco:", dados);

    /*
     * Temporariamente simulamos o salvamento.
     */

    return {
        sucesso: true,
        id: crypto.randomUUID(),
        status: status
    };
}


/* =====================================================
   SALVAR RASCUNHO
===================================================== */

btnSalvarRascunho.addEventListener("click", async () => {

    if (laudoAssinado) {
        alert("Este laudo já foi assinado e não pode ser alterado.");
        return;
    }


    const dados = coletarDadosLaudo();


    try {

        btnSalvarRascunho.disabled = true;

        btnSalvarRascunho.textContent = "Salvando...";


        const resultado = await salvarLaudo(
            dados,
            "rascunho"
        );


        if (resultado.sucesso) {

            alert("Rascunho salvo com sucesso.");

        }

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível salvar o rascunho."
        );

    } finally {

        btnSalvarRascunho.disabled = false;

        btnSalvarRascunho.textContent =
            "Salvar rascunho";

    }

});


/* =====================================================
   ABRIR MODAL DE ASSINATURA
===================================================== */

btnAssinar.addEventListener("click", () => {

    if (laudoAssinado) {

        alert(
            "Este laudo já foi assinado."
        );

        return;
    }


    /*
     * Validação HTML nativa.
     */

    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }


    modalAssinatura.classList.remove("ocultar");

});


/* =====================================================
   CANCELAR ASSINATURA
===================================================== */

cancelarAssinatura.addEventListener("click", () => {

    modalAssinatura.classList.add("ocultar");

});


/* =====================================================
   CONFIRMAR ASSINATURA
===================================================== */

confirmarAssinatura.addEventListener("click", async () => {

    if (laudoAssinado) {
        return;
    }


    try {

        confirmarAssinatura.disabled = true;

        confirmarAssinatura.textContent =
            "Assinando...";


        /*
         * Aqui futuramente entrará o processo
         * de assinatura eletrônica.
         *
         * Exemplo:
         *
         * const assinatura =
         *     await realizarAssinaturaEletronica();
         */


        laudoAssinado = true;


        const agora = new Date();

        const dataFormatada =
            agora.toLocaleString(
                "pt-BR",
                {
                    dateStyle: "short",
                    timeStyle: "short"
                }
            );


        /*
         * Atualiza interface
         */

        statusLaudo.textContent = "Assinado";

        dataAssinatura.textContent =
            dataFormatada;

        dataAssinaturaContainer
            .classList.remove("ocultar");


        assinaturaDigitalContainer
            .classList.remove("ocultar");


        assinaturaDigital.textContent =
            "Assinatura eletrônica pendente de integração";


        document.body.classList.add(
            "laudo-assinado"
        );


        /*
         * Desabilita todos os campos
         */

        bloquearFormulario();


        /*
         * Prepara dados para banco
         */

        const dados = coletarDadosLaudo();


        /*
         * Salva no backend.
         */

        const resultado =
            await salvarLaudo(
                dados,
                "assinado"
            );


        if (!resultado.sucesso) {

            throw new Error(
                "Erro ao salvar laudo assinado."
            );

        }


        modalAssinatura
            .classList.add("ocultar");


        alert(
            "Laudo assinado e enviado para armazenamento."
        );


    } catch (erro) {

        console.error(erro);

        /*
         * Caso o salvamento falhe,
         * não devemos deixar o usuário
         * acreditar que o laudo foi persistido.
         */

        laudoAssinado = false;

        alert(
            "Não foi possível concluir a assinatura. O laudo não foi enviado ao banco de dados."
        );

    } finally {

        confirmarAssinatura.disabled = false;

        confirmarAssinatura.textContent =
            "Confirmar assinatura";

    }

});


/* =====================================================
    BLOQUEAR FORMULÁRIO
===================================================== */

function bloquearFormulario() {

    const campos =
        form.querySelectorAll(
            "input, textarea, select, button"
        );


    campos.forEach((campo) => {

        /*
         * Mantém os botões principais
         * controlados separadamente.
         */

        if (
            campo.id !== "imprimirLaudo"
        ) {

            campo.disabled = true;

        }

    });


    btnAssinar.disabled = true;

    btnSalvarRascunho.disabled = true;


    /*
     * O botão de impressão continua disponível.
     */

    btnImprimir.disabled = false;

}


/* =====================================================
    IMPRESSÃO / PDF
===================================================== */

btnImprimir.addEventListener("click", () => {

    /*
     * window.print() abre a tela de impressão
     * do navegador.
     *
     * Nessa tela o usuário poderá selecionar:
     *
     * "Salvar como PDF"
     *
     * ou uma impressora física.
     */

    window.print();

});


/* =====================================================
    DIFERENCIAL
===================================================== */

realizarContagem.addEventListener("click", () => {

    alert(
        "A funcionalidade de contagem automática será integrada posteriormente."
    );

});


digitarContagem.addEventListener("click", () => {

    areaDiferencial
        .classList.remove("ocultar");

});


/* =====================================================
    NOVO LAUDO
===================================================== */

document
    .getElementById("novoLaudo")
    .addEventListener("click", (event) => {

        event.preventDefault();


        if (laudoAssinado) {

            alert(
                "Este laudo já foi assinado. Para criar outro laudo, utilize a opção Novo Laudo."
            );

            return;
        }


        const confirmar =
            confirm(
                "Deseja limpar o formulário e iniciar um novo laudo?"
            );


        if (confirmar) {

            form.reset();

        }

    });


/* =====================================================
    SUBMIT
===================================================== */

form.addEventListener("submit", (event) => {

    event.preventDefault();

    /*
     * O formulário não é enviado diretamente.
     *
     * O fluxo oficial será:
     *
     * preencher
     * ↓
     * salvar rascunho
     * ↓
     * assinar
     * ↓
     * salvar no Supabase
     */

});