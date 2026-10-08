localStorage.setItem(
    "tarefas",
    JSON.stringify(tarefas)
);

const tarefasSalvas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];