// Este arquivo cria os elementos da lista e atualiza o que aparece na tela.
const listaTarefas = document.querySelector("#lista-tarefas");
const resumoTarefas = document.querySelector("#resumo-tarefas");
const mensagem = document.querySelector("#mensagem");
const ordemPrioridades = {
    alta: 1,
    media: 2,
    baixa: 3
};

// Converte o valor guardado na tarefa para um texto que a pessoa entende.
function nomePrioridade(prioridade) {
    const nomes = {
        baixa: "Baixa",
        media: "Média",
        alta: "Alta"
    };

    return nomes[prioridade];
}

// Faz um botao de tarefa e informa a acao para o arquivo principal.
function criarBotao(texto, acao, id, classe) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = `botao-acao ${classe}`.trim();
    botao.textContent = texto;
    botao.dataset.acao = acao;
    botao.dataset.idTarefa = id;
    return botao;
}

// Mostra campos para editar uma tarefa, com os valores que ela ja tem.
function criarFormularioEdicao(tarefa) {
    const formulario = document.createElement("form");
    formulario.className = "formulario-edicao";
    formulario.dataset.idTarefa = tarefa.id;

    const rotuloTitulo = document.createElement("label");
    rotuloTitulo.htmlFor = `titulo-edicao-${tarefa.id}`;
    rotuloTitulo.textContent = "Tarefa";

    const campoTitulo = document.createElement("input");
    campoTitulo.id = rotuloTitulo.htmlFor;
    campoTitulo.name = "titulo";
    campoTitulo.value = tarefa.titulo;
    campoTitulo.maxLength = 80;
    campoTitulo.required = true;

    const rotuloDescricao = document.createElement("label");
    rotuloDescricao.htmlFor = `descricao-edicao-${tarefa.id}`;
    rotuloDescricao.textContent = "Descrição";

    const campoDescricao = document.createElement("textarea");
    campoDescricao.id = rotuloDescricao.htmlFor;
    campoDescricao.name = "descricao";
    campoDescricao.value = tarefa.descricao;
    campoDescricao.rows = 3;
    campoDescricao.maxLength = 240;

    const rotuloPrioridade = document.createElement("label");
    rotuloPrioridade.htmlFor = `prioridade-edicao-${tarefa.id}`;
    rotuloPrioridade.textContent = "Prioridade";

    const campoPrioridade = document.createElement("select");
    campoPrioridade.id = rotuloPrioridade.htmlFor;
    campoPrioridade.name = "prioridade";
    campoPrioridade.required = true;

    [
        ["", "Selecione uma prioridade"],
        ["baixa", "Baixa"],
        ["media", "Média"],
        ["alta", "Alta"]
    ].forEach(([valor, texto]) => {
        const opcao = document.createElement("option");
        opcao.value = valor;
        opcao.textContent = texto;
        opcao.selected = valor === tarefa.prioridade || (valor === "" && !tarefa.prioridade);
        opcao.disabled = valor === "";
        campoPrioridade.append(opcao);
    });

    const botoes = document.createElement("div");
    botoes.className = "botoes-edicao";

    const salvar = document.createElement("button");
    salvar.className = "botao botao-principal";
    salvar.type = "submit";
    salvar.textContent = "Salvar alteracoes";

    const cancelar = criarBotao("Cancelar", "cancelar-edicao", tarefa.id, "");
    botoes.append(salvar, cancelar);
    formulario.append(
        rotuloTitulo,
        campoTitulo,
        rotuloDescricao,
        campoDescricao,
        rotuloPrioridade,
        campoPrioridade,
        botoes
    );

    return formulario;
}

// Cria o cartao de uma tarefa. No modo de edicao, mostra o formulario no lugar.
function criarItemTarefa(tarefa, idEditando) {
    const item = document.createElement("li");
    item.className = `tarefa${tarefa.concluida ? " concluida" : ""}`;

    if (tarefa.id === idEditando) {
        item.append(criarFormularioEdicao(tarefa));
        return item;
    }

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;
    item.append(titulo);

    if (tarefa.descricao) {
        const descricao = document.createElement("p");
        descricao.className = "descricao-tarefa";
        descricao.textContent = tarefa.descricao;
        item.append(descricao);
    }

    const prioridade = document.createElement("span");
    prioridade.className = `prioridade prioridade-${tarefa.prioridade}`;
    prioridade.textContent = `Prioridade: ${nomePrioridade(tarefa.prioridade)}`;
    item.append(prioridade);

    const botoes = document.createElement("div");
    botoes.className = "botoes-tarefa";
    botoes.append(
        criarBotao(
            tarefa.concluida ? "Reabrir" : "Concluir",
            "alternar",
            tarefa.id,
            ""
        ),
        criarBotao("Editar", "editar", tarefa.id, ""),
        criarBotao("Excluir", "excluir", tarefa.id, "botao-excluir")
    );
    item.append(botoes);

    return item;
}

// Atualiza a lista conforme o filtro escolhido.
export function desenharLista(tarefas, filtro, idEditando) {
    // Mostra primeiro as tarefas mais importantes sem mudar os dados salvos.
    const tarefasOrdenadas = [...tarefas].sort(
        (tarefaA, tarefaB) =>
            ordemPrioridades[tarefaA.prioridade] - ordemPrioridades[tarefaB.prioridade]
    );
    let tarefasVisiveis = tarefasOrdenadas;

    if (filtro === "pendentes") {
        tarefasVisiveis = tarefasOrdenadas.filter((tarefa) => !tarefa.concluida);
    }

    if (filtro === "concluidas") {
        tarefasVisiveis = tarefasOrdenadas.filter((tarefa) => tarefa.concluida);
    }

    listaTarefas.replaceChildren();

    if (tarefasVisiveis.length === 0) {
        const aviso = document.createElement("li");
        aviso.className = "lista-vazia";
        aviso.textContent = tarefas.length === 0
            ? "Você ainda não adicionou tarefas."
            : "Não há tarefas para mostrar neste filtro.";
        listaTarefas.append(aviso);
    }

    tarefasVisiveis.forEach((tarefa) => {
        listaTarefas.append(criarItemTarefa(tarefa, idEditando));
    });

    const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;
    const palavraTarefa = tarefas.length === 1 ? "tarefa" : "tarefas";
    resumoTarefas.textContent = `${tarefas.length} ${palavraTarefa}, ${pendentes} pendentes`;
}

// Marca o filtro escolhido tanto visualmente quanto para leitores de tela.
export function atualizarFiltro(filtro) {
    document.querySelectorAll("[data-filtro]").forEach((botao) => {
        const selecionado = botao.dataset.filtro === filtro;
        botao.classList.toggle("ativo", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
    });
}

// A regiao de status avisa sobre mudancas sem tirar o foco da pessoa.
export function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

// Devolve o foco a um botao depois de atualizar os elementos da lista.
export function focarBotao(id, acao) {
    const botoes = listaTarefas.querySelectorAll("[data-acao]");
    const botao = Array.from(botoes).find((item) => (
        item.dataset.idTarefa === id && item.dataset.acao === acao
    ));

    if (botao) {
        botao.focus();
    } else {
        listaTarefas.focus();
    }
}
