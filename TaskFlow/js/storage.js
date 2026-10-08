// Este arquivo le as tarefas do navegador e grava as mudancas no localStorage.
const CHAVE_TAREFAS = "tarefas";
const CHAVE_PREFERENCIAS = "taskflow-preferencias";

// Converte prioridades antigas para os nomes em portugues usados agora.
function ajustarPrioridade(prioridade) {
    const prioridades = {
        baixa: "baixa",
        media: "media",
        alta: "alta",
        low: "baixa",
        medium: "media",
        high: "alta"
    };

    return prioridades[prioridade];
}

// Verifica os dados salvos antes de mostra-los na pagina.
function ajustarTarefa(tarefa) {
    if (
        !tarefa
        || (typeof tarefa.id !== "string" && typeof tarefa.id !== "number")
        || typeof tarefa.titulo !== "string"
        || typeof tarefa.concluida !== "boolean"
    ) {
        return null;
    }

    const prioridade = ajustarPrioridade(tarefa.prioridade);

    if (!prioridade) {
        return null;
    }

    return {
        id: String(tarefa.id),
        titulo: tarefa.titulo,
        descricao: typeof tarefa.descricao === "string" ? tarefa.descricao : "",
        prioridade,
        concluida: tarefa.concluida
    };
}

// Se os dados estiverem quebrados, devolve uma mensagem em vez de parar a pagina.
export function carregarTarefas() {
    try {
        const dados = localStorage.getItem(CHAVE_TAREFAS);

        if (dados === null) {
            return { tarefas: [], erro: null };
        }

        const listaSalva = JSON.parse(dados);

        if (!Array.isArray(listaSalva)) {
            throw new Error("Os dados salvos nao sao uma lista.");
        }

        const tarefas = listaSalva.map(ajustarTarefa);

        if (tarefas.some((tarefa) => tarefa === null)) {
            throw new Error("Ha uma tarefa salva com dados invalidos.");
        }

        return { tarefas, erro: null };
    } catch (erro) {
        return {
            tarefas: [],
            erro: `Não foi possível carregar as tarefas: ${erro.message}`
        };
    }
}

// Transforma a lista em texto JSON para guardar no navegador.
export function salvarTarefas(tarefas) {
    localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
}

// Salva contraste e tamanho de texto sem misturar essas opcoes com as tarefas.
export function salvarPreferencias(preferencias) {
    localStorage.setItem(CHAVE_PREFERENCIAS, JSON.stringify(preferencias));
}

// Recupera opcoes acessiveis; usa valores padrao se ainda nao foram escolhidas.
export function carregarPreferencias() {
    const opcoesPadrao = { contrasteAlto: false, tamanhoTexto: 100 };
    const dados = localStorage.getItem(CHAVE_PREFERENCIAS);

    if (dados === null) {
        return opcoesPadrao;
    }

    try {
        const preferencias = JSON.parse(dados);
        const tamanhosValidos = [100, 115, 130, 145];

        return {
            contrasteAlto: preferencias.contrasteAlto === true,
            tamanhoTexto: tamanhosValidos.includes(preferencias.tamanhoTexto)
                ? preferencias.tamanhoTexto
                : 100
        };
    } catch (erro) {
        throw new Error(`Não foi possível ler as opções de acessibilidade: ${erro.message}`);
    }
}
