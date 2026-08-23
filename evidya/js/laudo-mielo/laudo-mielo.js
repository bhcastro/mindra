// ======================================================
// ELEMENTOS DO DOM
// ======================================================

const formMedula = document.getElementById('form-medula');
const previewLaudo = document.getElementById('preview-laudo');


// ======================================================
// CAPTURA DOS DADOS DO LAUDO
// ======================================================

function capturarDados() {

    const formData = new FormData(formMedula);

    const dadosLaudo = {

        paciente: {
            sequencia: formData.get('sequencia') || '',
            amostra: formData.get('amostra') || '',
            nome: formData.get('nome') || '',
            nascimento: formData.get('nascimento') || ''
        },

        material: formData.get('material') || '',
        puncao: formData.get('puncao') || '',
        celularidadeGlobal: formData.get('celularidade_global') || '',
        diluicao: formData.get('diluicao') || '',
        relacaoGE: formData.get('relacaoGE') || '',

        serieGranulocitica: {
            celularidade: formData.get('cel_gran') || '',
            maturacao: formData.get('maturacao_gran') || ''
        },

        serieVermelha: {
            celularidade: formData.get('cel_vermelha') || '',
            maturacao: formData.get('maturacao_vermelha') || '',
            alteracoes: formData.getAll('alteracoes_serie_vermelha')
        },

        serieLinfoplasmocitaria: {
            celularidade: formData.get('cel_linfo') || '',
            maturacao: formData.get('maturacao_linfo') || '',
            alteracoes: formData.getAll(
                'alteracoes_serie_linfoplasmocitaria'
            )
        },

        serieMonocitaria: {
            celularidade: formData.get('cel_mono') || '',
            maturacao: formData.get('maturacao_mono') || ''
        },

        serieMegacariocitica: {
            celularidade: formData.get('cel_megac') || '',
            maturacao: formData.get('maturacao_megac') || '',
            alteracoes: formData.getAll(
                'alteracoes_serie_megacariocitica'
            ),
            plaquetogenese: formData.get('plaquetogenese') || ''
        },

        elementosIntersticiais: {
            macrofagos: formData.get('macrofagos') || '',
            alteracoes: formData.getAll('alteracoes_intersticiais')
        },

        conclusao: formData.get('conclusao') || ''
    };

    return dadosLaudo;
}


// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function valorOuNaoInformado(valor) {

    if (!valor || valor.trim() === '') {
        return 'Não informado';
    }

    return valor;
}


function listarAlteracoes(alteracoes) {

    if (!alteracoes || alteracoes.length === 0) {
        return 'Não observadas';
    }

    return alteracoes.join(', ');
}


function formatarData(data) {

    if (!data) {
        return 'Não informado';
    }

    const partes = data.split('-');

    if (partes.length !== 3) {
        return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


function formatarDataAtual() {

    const agora = new Date();

    return agora.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}


// ======================================================
// CONVERSÃO DE VALORES PARA TEXTO DO LAUDO
// ======================================================

function textoMaterial(material) {

    const valores = {
        Aspirado: 'Aspirado de medula óssea',
        imprint: 'Imprint de medula óssea'
    };

    return valores[material] || 'Não informado';
}


function textoPuncao(puncao) {

    const valores = {
        esternal: 'Esternal',
        cip: 'Crista ilíaca posterior',
        cia: 'Crista ilíaca anterior',
        nao_mencionado: 'Não mencionado'
    };

    return valores[puncao] || 'Não informado';
}


function textoCelularidade(valor) {

    const valores = {
        hipocelular: 'Hipocelular',
        normocelular: 'Normocelular',
        hipercelular: 'Hipercelular'
    };

    return valores[valor] || 'Não informado';
}


function textoDiluicao(valor) {

    const valores = {
        discreta: 'Discreta',
        moderada: 'Moderada',
        intensa: 'Intensa'
    };

    return valores[valor] || 'Não informado';
}


function textoPlaquetogenese(valor) {

    const valores = {
        conservada: 'Conservada',
        diminuida: 'Diminuída',
        aumentada: 'Aumentada'
    };

    return valores[valor] || 'Não informado';
}


function textoMacrofagos(valor) {

    const valores = {
        aumentado: 'Em número aumentado',
        diminuido: 'Em número diminuído'
    };

    return valores[valor] || 'Não informado';
}


// ======================================================
// MONTAGEM DO HTML DO LAUDO
// ======================================================

function montarLaudo(dados) {

    return `
        <article id="laudo-pdf">

            <header class="laudo-cabecalho">

                <div>
                    <h1>Mielograma</h1>
                </div>

            </header>


            <section class="laudo-secao">

                <h2>Dados do paciente</h2>

                <div class="laudo-grid">

                    <p>
                        <strong>Sequência:</strong>
                        ${valorOuNaoInformado(dados.paciente.sequencia)}
                    </p>

                    <p>
                        <strong>Amostra:</strong>
                        ${valorOuNaoInformado(dados.paciente.amostra)}
                    </p>

                    <p class="campo-largo">
                        <strong>Nome:</strong>
                        ${valorOuNaoInformado(dados.paciente.nome)}
                    </p>

                    <p>
                        <strong>Data de nascimento:</strong>
                        ${formatarData(dados.paciente.nascimento)}
                    </p>

                </div>

            </section>


            <section class="laudo-secao">

                <h2>Características da amostra</h2>

                <div class="laudo-grid">

                    <p>
                        <strong>Material:</strong>
                        ${textoMaterial(dados.material)}
                    </p>

                    <p>
                        <strong>Punção:</strong>
                        ${textoPuncao(dados.puncao)}
                    </p>

                    <p>
                        <strong>Celularidade global:</strong>
                        ${textoCelularidade(dados.celularidadeGlobal)}
                    </p>

                    <p>
                        <strong>Diluição com sangue periférico:</strong>
                        ${textoDiluicao(dados.diluicao)}
                    </p>

                    <p>
                        <strong>Relação G/E:</strong>
                        ${valorOuNaoInformado(dados.relacaoGE)}
                    </p>

                </div>

            </section>


            <section class="laudo-secao">

                <h2>Série granulocítica</h2>

                <p>
                    <strong>Celularidade:</strong>
                    ${textoCelularidade(
        dados.serieGranulocitica.celularidade
    )}
                </p>

                <p>
                    <strong>Maturação:</strong>
                    ${valorOuNaoInformado(
        dados.serieGranulocitica.maturacao
    )}
                </p>

            </section>


            <section class="laudo-secao">

                <h2>Série vermelha</h2>

                <p>
                    <strong>Celularidade:</strong>
                    ${textoCelularidade(
        dados.serieVermelha.celularidade
    )}
                </p>

                <p>
                    <strong>Maturação:</strong>
                    ${valorOuNaoInformado(
        dados.serieVermelha.maturacao
    )}
                </p>

                <p>
                    <strong>Alterações:</strong>
                    ${listarAlteracoes(
        dados.serieVermelha.alteracoes
    )}
                </p>

            </section>


            <section class="laudo-secao">

                <h2>Série linfoplasmocitária</h2>

                <p>
                    <strong>Celularidade:</strong>
                    ${textoCelularidade(
        dados.serieLinfoplasmocitaria.celularidade
    )}
                </p>

                <p>
                    <strong>Maturação:</strong>
                    ${valorOuNaoInformado(
        dados.serieLinfoplasmocitaria.maturacao
    )}
                </p>

                <p>
                    <strong>Alterações:</strong>
                    ${listarAlteracoes(
        dados.serieLinfoplasmocitaria.alteracoes
    )}
                </p>

            </section>


            <section class="laudo-secao">

                <h2>Série monocitária</h2>

                <p>
                    <strong>Celularidade:</strong>
                    ${textoCelularidade(
        dados.serieMonocitaria.celularidade
    )}
                </p>

                <p>
                    <strong>Maturação:</strong>
                    ${valorOuNaoInformado(
        dados.serieMonocitaria.maturacao
    )}
                </p>

            </section>


            <section class="laudo-secao">

                <h2>Série megacariocítica</h2>

                <p>
                    <strong>Celularidade:</strong>
                    ${textoCelularidade(
        dados.serieMegacariocitica.celularidade
    )}
                </p>

                <p>
                    <strong>Maturação:</strong>
                    ${valorOuNaoInformado(
        dados.serieMegacariocitica.maturacao
    )}
                </p>

                <p>
                    <strong>Alterações:</strong>
                    ${listarAlteracoes(
        dados.serieMegacariocitica.alteracoes
    )}
                </p>

                <p>
                    <strong>Plaquetogênese:</strong>
                    ${textoPlaquetogenese(
        dados.serieMegacariocitica.plaquetogenese
    )}
                </p>

            </section>


            <section class="laudo-secao">

                <h2>Elementos intersticiais</h2>

                <p>
                    <strong>Macrófagos:</strong>
                    ${textoMacrofagos(
        dados.elementosIntersticiais.macrofagos
    )}
                </p>

                <p>
                    <strong>Alterações:</strong>
                    ${listarAlteracoes(
        dados.elementosIntersticiais.alteracoes
    )}
                </p>

            </section>


            <section class="laudo-secao laudo-conclusao">

                <h2>Conclusão</h2>

                <p>
                    ${valorOuNaoInformado(dados.conclusao)}
                </p>

            </section>


            <footer class="laudo-assinatura">

                <p>
                    <strong>Laudado por:</strong>
                </p>

                <p>
                    Bruno Castro
                </p>

                <p>
                    CRM: 123456
                </p>

                <p>
                    ${formatarDataAtual()}
                </p>

            </footer>

        </article>
    `;
}


// ======================================================
// EXIBIR PRÉ-VISUALIZAÇÃO
// ======================================================

function exibirPreview(dados) {

    previewLaudo.innerHTML = montarLaudo(dados);

    previewLaudo.hidden = false;

    previewLaudo.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


formMedula.addEventListener('submit', async (event) => {

    event.preventDefault();

    try {

        const dadosLaudo =
            capturarDados();


        console.log(
            'Dados capturados:',
            dadosLaudo
        );


        // Preview para o usuário
        exibirPreview(dadosLaudo);


        // PDF independente do preview
        const pdfBlob =
            await gerarPdfBlob(dadosLaudo);


        console.log(
            'PDF Blob:',
            pdfBlob
        );


        console.log(
            'Tipo:',
            pdfBlob.type
        );


        console.log(
            'Tamanho:',
            pdfBlob.size,
            'bytes'
        );


        abrirPdfTeste(pdfBlob);


    } catch (error) {

        console.error(
            'Erro ao gerar PDF:',
            error
        );


        alert(
            'Não foi possível gerar o PDF.'
        );

    }

});

// ======================================================
// AGUARDAR RENDERIZAÇÃO DO NAVEGADOR
// ======================================================

function aguardarRenderizacao() {

    return new Promise((resolve) => {

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                resolve();

            });

        });

    });

}


// ======================================================
// GERAR PDF COMO BLOB
// ======================================================

async function gerarPdfBlob(dados) {

    let containerTemporario = null;

    try {

        // --------------------------------------------------
        // CRIA CONTAINER EXCLUSIVO PARA O PDF
        // --------------------------------------------------

        containerTemporario = document.createElement('div');

        containerTemporario.id = 'container-pdf-temporario';


        // Coloca fora da tela, MAS NÃO usa display:none
        containerTemporario.style.position = 'absolute';
        containerTemporario.style.left = '-10000px';
        containerTemporario.style.top = '0';
        containerTemporario.style.width = '210mm';
        containerTemporario.style.backgroundColor = '#ffffff';


        // Monta o laudo
        containerTemporario.innerHTML = montarLaudo(dados);


        // Insere no DOM
        document.body.appendChild(containerTemporario);


        // --------------------------------------------------
        // LOCALIZA O LAUDO DENTRO DO CONTAINER
        // --------------------------------------------------

        const elementoLaudo =
            containerTemporario.querySelector('#laudo-pdf');


        if (!elementoLaudo) {

            throw new Error(
                'Elemento #laudo-pdf não encontrado.'
            );

        }


        // --------------------------------------------------
        // GARANTE TAMANHO E FUNDO
        // --------------------------------------------------

        elementoLaudo.style.display = 'block';
        elementoLaudo.style.visibility = 'visible';
        elementoLaudo.style.opacity = '1';
        elementoLaudo.style.backgroundColor = '#ffffff';


        // --------------------------------------------------
        // AGUARDA RENDERIZAÇÃO
        // --------------------------------------------------

        await aguardarRenderizacao();


        // Se houver fontes externas, aguarda também
        if (document.fonts && document.fonts.ready) {

            await document.fonts.ready;

        }


        // --------------------------------------------------
        // TESTES
        // --------------------------------------------------

        const dimensoes =
            elementoLaudo.getBoundingClientRect();


        console.log(
            'Dimensões do laudo:',
            dimensoes
        );


        console.log(
            'HTML do laudo:',
            elementoLaudo.innerHTML
        );


        if (
            dimensoes.width === 0 ||
            dimensoes.height === 0
        ) {

            throw new Error(
                'O laudo possui largura ou altura igual a zero.'
            );

        }


        // --------------------------------------------------
        // CONFIGURAÇÕES DO PDF
        // --------------------------------------------------

        const opcoes = {

            margin: 0,

            filename:
                `mielograma-${dados.paciente.sequencia || 'sem-sequencia'}.pdf`,

            image: {

                type: 'jpeg',

                quality: 0.98

            },

            html2canvas: {

                scale: 2,

                useCORS: true,

                allowTaint: true,

                backgroundColor: '#ffffff',

                logging: true,

                scrollX: 0,

                scrollY: 0,

                windowWidth:
                    elementoLaudo.scrollWidth,

                windowHeight:
                    elementoLaudo.scrollHeight

            },

            jsPDF: {

                unit: 'mm',

                format: 'a4',

                orientation: 'portrait'

            },

            pagebreak: {

                mode: [
                    'css',
                    'legacy'
                ],

                avoid: [
                    '.laudo-secao',
                    '.laudo-assinatura'
                ]

            }

        };


        // --------------------------------------------------
        // GERA PDF
        // --------------------------------------------------

        const pdfBlob = await html2pdf()

            .set(opcoes)

            .from(elementoLaudo)

            .outputPdf('blob');


        // --------------------------------------------------
        // VALIDA RESULTADO
        // --------------------------------------------------

        if (!(pdfBlob instanceof Blob)) {

            throw new Error(
                'O resultado da geração não é um Blob.'
            );

        }


        if (pdfBlob.size === 0) {

            throw new Error(
                'O PDF gerado possui tamanho zero.'
            );

        }


        console.log(
            'PDF gerado com sucesso:',
            pdfBlob
        );


        return pdfBlob;


    } finally {

        // --------------------------------------------------
        // REMOVE O HTML TEMPORÁRIO
        // --------------------------------------------------

        if (containerTemporario) {

            containerTemporario.remove();

        }

    }

}


// ======================================================
// ABRIR PDF PARA TESTE
// ======================================================

function abrirPdfTeste(pdfBlob) {

    const urlPdf = URL.createObjectURL(pdfBlob);

    window.open(
        urlPdf,
        '_blank'
    );
}