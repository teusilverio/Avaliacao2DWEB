const formulario = document.querySelector("#task-form");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const titulo = document.querySelector("#task-title").value;
    const descricao = document.querySelector("#task-description").value;
    const prioridade = document.querySelector("#task-priority").value;

    console.log(titulo);
    console.log(descricao);
    console.log(prioridade);
});


function renderizarTarefas(tarefas) {
    const lista = document.querySelector("#task-list");

    lista.innerHTML = "";

    tarefas.forEach((tarefa) => {
        const item = document.createElement("li");

        item.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>${tarefa.descricao}</p>
            <span>Prioridade: ${tarefa.prioridade}</span>
        `;

        lista.appendChild(item);
    });
}

const tarefa = {
    id: 1,
    titulo: "Estudar JavaScript",
    descricao: "Revisar funções e objetos",
    prioridade: "alta",
    concluida: false
};

const tarefas = [
    {
        id: 1,
        titulo: "Estudar JavaScript",
        descricao: "Revisar funções e objetos",
        prioridade: "alta",
        concluida: false
    },
    {
        id: 2,
        titulo: "Fazer trabalho",
        descricao: "Finalizar o TaskFlow",
        prioridade: "media",
        concluida: false
    }
];