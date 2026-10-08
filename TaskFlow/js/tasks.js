// Este arquivo guarda as funcoes que criam e alteram as tarefas.

// Cria um objeto com os dados preenchidos no formulario.
export function criarTarefa(titulo, descricao, prioridade) {
    if (!titulo.trim()) {
        throw new Error("Digite o nome da tarefa.");
    }

    if (!["baixa", "media", "alta"].includes(prioridade)) {
        throw new Error("Selecione uma prioridade.");
    }

    return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        prioridade,
        concluida: false
    };
}

// Troca o estado de concluida sem alterar as outras tarefas.
export function alternarTarefa(tarefas, id) {
    return tarefas.map((tarefa) => {
        if (tarefa.id === id) {
            return { ...tarefa, concluida: !tarefa.concluida };
        }

        return tarefa;
    });
}

// Devolve uma nova lista sem a tarefa escolhida.
export function excluirTarefa(tarefas, id) {
    return tarefas.filter((tarefa) => tarefa.id !== id);
}

// Atualiza somente o texto e a prioridade da tarefa editada.
export function editarTarefa(tarefas, id, titulo, descricao, prioridade) {
    if (!titulo.trim()) {
        throw new Error("Digite o nome da tarefa.");
    }

    if (!["baixa", "media", "alta"].includes(prioridade)) {
        throw new Error("Selecione uma prioridade.");
    }

    return tarefas.map((tarefa) => {
        if (tarefa.id === id) {
            return {
                ...tarefa,
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                prioridade
            };
        }

        return tarefa;
    });
}
