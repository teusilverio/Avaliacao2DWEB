// Este arquivo liga os formularios, botoes, funcoes e armazenamento.
import {
    criarTarefa,
    alternarTarefa,
    excluirTarefa,
    editarTarefa
} from "./tasks.js";
import {
    carregarTarefas,
    salvarTarefas,
    carregarPreferencias,
    salvarPreferencias
} from "./storage.js";
import {
    desenharLista,
    atualizarFiltro,
    mostrarMensagem,
    focarBotao
} from "./ui.js";

const formulario = document.querySelector("#formulario-tarefa");
const campoTitulo = document.querySelector("#campo-titulo");
const campoPrioridade = document.querySelector("#campo-prioridade");
const erroPrioridade = document.querySelector("#erro-prioridade");
const listaTarefas = document.querySelector("#lista-tarefas");
const botoesFiltro = document.querySelector("#botoes-filtro");
const botaoDiminuirTexto = document.querySelector("#diminuir-texto");
const botaoAumentarTexto = document.querySelector("#aumentar-texto");
const botaoContraste = document.querySelector("#alternar-contraste");
const textoTamanhoAtual = document.querySelector("#tamanho-atual");
const dialogoExclusao = document.querySelector("#dialogo-exclusao");
const textoConfirmacao = document.querySelector("#texto-confirmacao");
const botaoCancelarExclusao = document.querySelector("#cancelar-exclusao");
const botaoConfirmarExclusao = document.querySelector("#confirmar-exclusao");

// Estas variaveis guardam a lista atual e o filtro que esta na tela.
let tarefas = [];
let filtroAtual = "todas";
let idEditando = null;
let idTarefaParaExcluir = null;
let preferencias = { contrasteAlto: false, tamanhoTexto: 100 };

// Aplica as opcoes guardadas e atualiza os nomes acessiveis dos botoes.
function aplicarPreferencias() {
    document.documentElement.style.setProperty(
        "--tamanho-texto",
        `${preferencias.tamanhoTexto}%`
    );
    document.documentElement.classList.toggle(
        "alto-contraste",
        preferencias.contrasteAlto
    );
    botaoContraste.setAttribute("aria-pressed", String(preferencias.contrasteAlto));
    botaoContraste.textContent = preferencias.contrasteAlto
        ? "Alto contraste: ligado"
        : "Alto contraste: desligado";
    textoTamanhoAtual.textContent = `Texto: ${preferencias.tamanhoTexto}%`;
}

// Salva a opcao e avisa se o navegador nao permitir o armazenamento.
function guardarPreferencias() {
    try {
        salvarPreferencias(preferencias);
        mostrarMensagem("Opções de acessibilidade atualizadas.");
    } catch (erro) {
        mostrarMensagem(`Não foi possível salvar as opções: ${erro.message}`);
    }
}

// Aumenta ou diminui o texto em etapas para manter os controles previsiveis.
botaoDiminuirTexto.addEventListener("click", () => {
    preferencias.tamanhoTexto = Math.max(100, preferencias.tamanhoTexto - 15);
    aplicarPreferencias();
    guardarPreferencias();
});

botaoAumentarTexto.addEventListener("click", () => {
    preferencias.tamanhoTexto = Math.min(145, preferencias.tamanhoTexto + 15);
    aplicarPreferencias();
    guardarPreferencias();
});

botaoContraste.addEventListener("click", () => {
    preferencias.contrasteAlto = !preferencias.contrasteAlto;
    aplicarPreferencias();
    guardarPreferencias();
});

// Atualiza a pagina e guarda os dados depois de cada mudanca.
function atualizarPagina(texto) {
    desenharLista(tarefas, filtroAtual, idEditando);

    try {
        salvarTarefas(tarefas);
        mostrarMensagem(texto);
    } catch (erro) {
        mostrarMensagem(`Não foi possível salvar as tarefas: ${erro.message}`);
    }
}

// Mostra uma mensagem propria quando a prioridade obrigatoria nao foi escolhida.
campoPrioridade.addEventListener("invalid", () => {
    campoPrioridade.setCustomValidity("Selecione uma das prioridades.");
    erroPrioridade.textContent = "Selecione uma das prioridades.";
});

// Depois que uma opcao e escolhida, limpa a mensagem de erro.
campoPrioridade.addEventListener("change", () => {
    campoPrioridade.setCustomValidity("");
    erroPrioridade.textContent = "";
});

// Limpa o erro do titulo quando a pessoa volta a digitar.
campoTitulo.addEventListener("input", () => {
    campoTitulo.setCustomValidity("");
});

// Le os campos e cria uma tarefa nova quando o formulario e enviado.
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const dados = new FormData(formulario);
    const titulo = String(dados.get("titulo") || "");

    if (!titulo.trim()) {
        campoTitulo.setCustomValidity("Digite o nome da tarefa.");
        campoTitulo.reportValidity();
        return;
    }

    const tarefa = criarTarefa(
        titulo,
        String(dados.get("descricao") || ""),
        String(dados.get("prioridade") || "")
    );

    tarefas = [tarefa, ...tarefas];
    formulario.reset();
    erroPrioridade.textContent = "";
    atualizarPagina(`Tarefa adicionada: ${tarefa.titulo}.`);
    campoTitulo.focus();
});

// Troca entre todas, pendentes e concluidas.
botoesFiltro.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-filtro]");

    if (!botao) {
        return;
    }

    filtroAtual = botao.dataset.filtro;
    idEditando = null;
    atualizarFiltro(filtroAtual);
    desenharLista(tarefas, filtroAtual, idEditando);
});

// Os botoes de cada tarefa usam este evento para concluir, editar ou excluir.
listaTarefas.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-acao]");

    if (!botao) {
        return;
    }

    const id = botao.dataset.idTarefa;
    const tarefa = tarefas.find((item) => item.id === id);

    if (!tarefa) {
        return;
    }

    if (botao.dataset.acao === "alternar") {
        tarefas = alternarTarefa(tarefas, id);
        atualizarPagina(tarefa.concluida ? "Tarefa reaberta." : "Tarefa concluída.");
        focarBotao(id, "alternar");
    }

    if (botao.dataset.acao === "excluir") {
        idTarefaParaExcluir = id;
        textoConfirmacao.textContent =
            `Deseja realmente excluir "${tarefa.titulo}"? Esta ação não pode ser desfeita.`;
        dialogoExclusao.showModal();
    }

    if (botao.dataset.acao === "editar") {
        idEditando = id;
        desenharLista(tarefas, filtroAtual, idEditando);
        document.getElementById(`titulo-edicao-${id}`).focus();
    }

    if (botao.dataset.acao === "cancelar-edicao") {
        idEditando = null;
        desenharLista(tarefas, filtroAtual, idEditando);
        mostrarMensagem("Edição cancelada.");
        focarBotao(id, "editar");
    }
});

// Cancelar ou pressionar Esc fecha a caixa sem excluir a tarefa.
botaoCancelarExclusao.addEventListener("click", () => {
    dialogoExclusao.close();
});

// Só remove a tarefa depois do clique explícito no botão de confirmação.
botaoConfirmarExclusao.addEventListener("click", () => {
    const tarefa = tarefas.find((item) => item.id === idTarefaParaExcluir);

    if (!tarefa) {
        dialogoExclusao.close();
        return;
    }

    const idExcluido = idTarefaParaExcluir;
    tarefas = excluirTarefa(tarefas, idExcluido);
    idTarefaParaExcluir = null;
    dialogoExclusao.close();
    atualizarPagina(`Tarefa excluída: ${tarefa.titulo}.`);
    focarBotao(idExcluido, "excluir");
});

// Ao cancelar, devolve o teclado ao botão de exclusão da tarefa mantida.
dialogoExclusao.addEventListener("close", () => {
    if (idTarefaParaExcluir) {
        focarBotao(idTarefaParaExcluir, "excluir");
        idTarefaParaExcluir = null;
    }
});

// Apaga a mensagem de validacao assim que o titulo editado muda.
listaTarefas.addEventListener("input", (evento) => {
    if (evento.target.name === "titulo") {
        evento.target.setCustomValidity("");
    }
});

// Salva as alteracoes quando o formulario de edicao e enviado.
listaTarefas.addEventListener("submit", (evento) => {
    if (!evento.target.matches(".formulario-edicao")) {
        return;
    }

    evento.preventDefault();

    const dados = new FormData(evento.target);
    const id = evento.target.dataset.idTarefa;
    const titulo = String(dados.get("titulo") || "");

    if (!titulo.trim()) {
        const campoEdicao = evento.target.elements.titulo;
        campoEdicao.setCustomValidity("Digite o nome da tarefa.");
        campoEdicao.reportValidity();
        return;
    }

    evento.target.elements.titulo.setCustomValidity("");
    tarefas = editarTarefa(
        tarefas,
        id,
        titulo,
        String(dados.get("descricao") || ""),
        String(dados.get("prioridade") || "")
    );

    idEditando = null;
    atualizarPagina("Alterações salvas.");
    focarBotao(id, "editar");
});

// Carrega as tarefas salvas quando a pagina abre.
const resultado = carregarTarefas();
tarefas = resultado.tarefas;
atualizarFiltro(filtroAtual);
desenharLista(tarefas, filtroAtual, idEditando);

if (resultado.erro) {
    mostrarMensagem(resultado.erro);
}

// Carrega as opcoes visuais salvas anteriormente neste navegador.
try {
    preferencias = carregarPreferencias();
    aplicarPreferencias();
} catch (erro) {
    mostrarMensagem(erro.message);
}
