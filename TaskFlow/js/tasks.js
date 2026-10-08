export function adicionarTarefa(titulo, descricao, prioridade) {
    const novaTarefa = {
        id: Date.now(),
        titulo: titulo,
        descricao: descricao,
        prioridade: prioridade,
        concluida: false
    };

    return novaTarefa;
}