🥇 Eu faria o "TaskFlow"
Para essa avaliação especificamente, minha escolha seria um gerenciador de tarefas acessível e responsivo.

Não porque seja o projeto mais sofisticado, mas porque ele permite demonstrar todos os critérios da rubrica sem precisar criar centenas de linhas de código.

Você poderia estruturar assim:

taskflow/
│
├── index.html
│
├── css/
│   ├── style.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── tasks.js
│   ├── ui.js
│   └── storage.js
│
└── assets/
    └── ...

E na apresentação de 10 minutos vocês poderiam mostrar:

1. Interface — 2 min
Cadastrar uma tarefa, editar, concluir, excluir e filtrar.

2. Responsividade — 1 min
Diminuir a janela e mostrar a adaptação para celular.

3. Acessibilidade — 2 min
Demonstrar:

navegação pelo teclado;

foco visível;

labels;

contraste;

leitor de tela;

mensagens de feedback.

4. HTML/CSS — 2 min
Mostrar rapidamente a estrutura semântica e o CSS responsivo.

5. JavaScript — 3 min
Explicar:

objetos;

arrays;

funções;

eventos;

módulos;

DOM;

localStorage.




A ideia é evitar tentar fazer tudo de uma vez.

1. Defina o que o TaskFlow vai fazer
Antes de escrever código, estabeleça o MVP (versão mínima):

Criar uma tarefa.

Informar título e descrição.

Escolher prioridade.

Marcar como concluída.

Excluir tarefa.

Filtrar tarefas.

Mostrar quantidade de tarefas pendentes.

Salvar as tarefas no navegador.

Funcionar bem no celular.

Ser navegável pelo teclado e leitor de tela.

Depois podemos adicionar recursos extras, como:

Editar tarefa.

Data de vencimento.

Categorias.

Pesquisa.

Modo escuro.

Ordenação.

Modal de confirmação.

2. Monte a estrutura do projeto
Crie uma pasta chamada taskflow.

Dentro dela:

taskflow/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── tasks.js
│   ├── ui.js
│   └── storage.js
│
└── assets/

Essa estrutura já ajuda vocês a demonstrar módulos JavaScript, que é um dos requisitos da avaliação.

3. Comece pelo HTML
Não comece pelo JavaScript.

Primeiro vamos construir a estrutura da página utilizando HTML semântico.

Uma primeira versão poderia ter:

HEADER
 ├── Logo "TaskFlow"
 └── Botão modo escuro

MAIN
 ├── Seção de apresentação
 │
 ├── Formulário
 │    ├── Título
 │    ├── Descrição
 │    ├── Prioridade
 │    └── Adicionar tarefa
 │
 └── Lista de tarefas
      ├── Filtros
      └── Tarefas

FOOTER

Por exemplo:

<header>
    <h1>TaskFlow</h1>
    <p>Organize suas tarefas de forma simples.</p>
</header>

<main>
    <section aria-labelledby="nova-tarefa">
        <h2 id="nova-tarefa">Nova tarefa</h2>

        <form id="task-form">
            <div>
                <label for="task-title">Título</label>
                <input
                    type="text"
                    id="task-title"
                    name="title"
                    required
                >
            </div>

            <div>
                <label for="task-description">Descrição</label>
                <textarea
                    id="task-description"
                    name="description"
                ></textarea>
            </div>

            <div>
                <label for="task-priority">Prioridade</label>

                <select id="task-priority" name="priority">
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                </select>
            </div>

            <button type="submit">
                Adicionar tarefa
            </button>
        </form>
    </section>

    <section aria-labelledby="minhas-tarefas">
        <h2 id="minhas-tarefas">Minhas tarefas</h2>

        <div id="task-filters">
            <button type="button">Todas</button>
            <button type="button">Pendentes</button>
            <button type="button">Concluídas</button>
        </div>

        <ul id="task-list">
        </ul>
    </section>
</main>

<footer>
    <p>TaskFlow — Projeto Front-End</p>
</footer>

Perceba que já estamos atendendo parte importante da avaliação:

HTML semântico.

label associado aos campos.

Hierarquia de títulos.

Botões reais.

Formulário.

Navegação por teclado.

Estrutura que pode ser interpretada por leitor de tela.

4. Depois faça o CSS
Não tente deixar "bonito" imediatamente.

Primeiro faça a interface funcionar.

Depois podemos trabalhar no visual.

A primeira versão pode ter:

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f6f8;
    color: #1f2937;
}

main {
    width: min(100% - 2rem, 1000px);
    margin: 0 auto;
}

section {
    background: white;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 12px;
}

input,
textarea,
select,
button {
    width: 100%;
    padding: 0.75rem;
    font: inherit;
}

button {
    cursor: pointer;
}

Depois fazemos o layout responsivo.

Por exemplo:

@media (min-width: 768px) {
    #task-form {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
    }
}

Assim vocês já conseguem demonstrar:

"A interface foi desenvolvida mobile-first e utiliza media queries para se adaptar a telas maiores."

Isso conversa diretamente com o critério de Design Responsivo — 2 pontos.

5. Agora entra o JavaScript
Aqui está a parte mais importante.

Cada tarefa pode ser representada como um objeto:

const tarefa = {
    id: 1,
    titulo: "Estudar JavaScript",
    descricao: "Revisar funções e objetos",
    prioridade: "alta",
    concluida: false
};

E várias tarefas ficam em um array:

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

Isso já permite explicar na apresentação:

"Cada tarefa é representada por um objeto JavaScript, e todas as tarefas são armazenadas em um array."

6. Crie a função de adicionar tarefa
No tasks.js:

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

Aqui vocês já têm:

função;

parâmetros;

objeto;

variáveis;

Date.now();

return.

7. Faça o formulário funcionar
No main.js:

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

Agora, quando clicar em Adicionar tarefa, vocês conseguem capturar os dados.

Esse é um ótimo momento para testar antes de continuar.

8. Depois mostre as tarefas na tela
Crie uma função:

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

Aqui vocês demonstram uma parte muito importante do projeto:

JavaScript alterando a interface HTML dinamicamente.

9. Depois adicione conclusão e exclusão
Cada tarefa poderia ficar mais ou menos assim:

┌────────────────────────────────────┐
│ Estudar JavaScript                 │
│ Revisar funções e objetos         │
│                                    │
│ Prioridade: Alta                   │
│                                    │
│ [Concluir]          [Excluir]      │
└────────────────────────────────────┘

Ao clicar em Concluir:

┌────────────────────────────────────┐
│ ✓ Estudar JavaScript               │
│ Revisar funções e objetos          │
│                                    │
│ Concluída                          │
│                                    │
│ [Desfazer]          [Excluir]      │
└────────────────────────────────────┘

10. Um dos melhores diferenciais: localStorage
Depois que tudo estiver funcionando, façam as tarefas permanecerem mesmo depois de fechar o navegador.

localStorage.setItem(
    "tarefas",
    JSON.stringify(tarefas)
);

Para recuperar:

const tarefasSalvas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

Na apresentação isso fica muito bom:

"Além da manipulação do DOM, utilizamos o localStorage para persistir os dados no navegador."

11. Acessibilidade não deve ser adicionada no final
Esse é um ponto importante para vocês ganharem os 2 pontos de Usabilidade e Acessibilidade.

Desde o início, pensem em:

Contraste
Evitar:

cinza claro + branco

Preferir:

texto escuro + fundo claro

Teclado
O usuário deve conseguir fazer tudo usando:

TAB
SHIFT + TAB
ENTER
ESPAÇO
ESC

Foco
Não façam:

*:focus {
    outline: none;
}

Em vez disso, criem um foco bem visível:

button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
}

Mensagens
Quando uma tarefa for adicionada:

✓ Tarefa adicionada com sucesso.

Isso pode ser anunciado para leitores de tela com:

<div
    id="status-message"
    aria-live="polite"
></div>

12. Depois faça os filtros
Essa é uma ótima oportunidade para demonstrar JavaScript.

[ Todas ] [ Pendentes ] [ Concluídas ]

A lógica será aproximadamente:

const pendentes = tarefas.filter(
    tarefa => !tarefa.concluida
);

const concluidas = tarefas.filter(
    tarefa => tarefa.concluida
);

Isso é simples, mas na apresentação demonstra muito bem o uso de arrays + métodos + funções.

13. Um diferencial muito bom: contador
No topo:

TaskFlow

Você possui 3 tarefas pendentes.

┌──────────┐ ┌──────────┐ ┌──────────┐
│    5     │ │    3     │ │    2     │
│  Total   │ │ Pendentes│ │Concluídas│
└──────────┘ └──────────┘ └──────────┘

O JavaScript calcula automaticamente:

const total = tarefas.length;

const pendentes = tarefas.filter(
    tarefa => !tarefa.concluida
).length;

const concluidas = tarefas.filter(
    tarefa => tarefa.concluida
).length;

Isso deixa o projeto com cara de aplicação real.

14. Por último, modo escuro
Um botão:

☀️ Tema claro

ou

🌙 Tema escuro

Pode alterar uma classe no <body>:

document.body.classList.toggle("dark");

E no CSS:

body.dark {
    background: #111827;
    color: #f9fafb;
}

body.dark section {
    background: #1f2937;
}

Isso é um recurso pequeno, mas ajuda bastante na demonstração de interação com a interface.

🗺️ Ordem que eu seguiria
Não tentaria fazer tudo simultaneamente. Faria exatamente nesta ordem:

FASE 1
│
├── Criar pastas
├── Criar index.html
└── Criar estrutura semântica
        ↓
FASE 2
│
├── Criar style.css
├── Organizar cores
├── Tipografia
└── Responsividade
        ↓
FASE 3
│
├── Criar objetos de tarefas
├── Adicionar tarefa
└── Renderizar tarefas
        ↓
FASE 4
│
├── Concluir
├── Excluir
└── Editar
        ↓
FASE 5
│
├── Filtros
├── Contadores
└── Pesquisa
        ↓
FASE 6
│
├── localStorage
└── Persistência
        ↓
FASE 7
│
├── Acessibilidade
├── Teclado
├── Foco
├── Contraste
└── aria-live
        ↓
FASE 8
│
├── Dark mode
├── Animações discretas
└── Refinamento visual
        ↓
FASE 9
│
└── Testar e preparar apresentação

🎯 E a apresentação pode praticamente se montar sozinha
No final, vocês terão algo para falar em cada critério:

Critério	O que mostrar
UX/Acessibilidade	Teclado, foco, contraste, labels, mensagens
HTML semântico	header, main, section, form, footer
Responsividade	Desktop, tablet e celular
JavaScript	Objetos, arrays, funções, módulos, DOM, eventos
Apresentação	Criar → concluir → filtrar → excluir → recarregar página

Minha sugestão é não começar pelo CSS bonito. Comece fazendo o fluxo "digitar tarefa → clicar em adicionar → tarefa aparecer na tela". Quando isso funcionar, todo o restante fica muito mais fácil de construir.

Se quiser, eu posso montar com você o TaskFlow completo passo a passo, começando pelo index.html, depois style.css e finalmente os 4 arquivos JavaScript, já estruturado para atender exatamente aos critérios dessa avaliação.