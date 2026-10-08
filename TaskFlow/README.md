# TaskFlow — guia de estudo

## Resumo

O TaskFlow é um pequeno gerenciador de tarefas feito com HTML, CSS e JavaScript, sem bibliotecas ou frameworks. Ele serve para praticar a criação de uma página acessível e responsiva e para aprender como o JavaScript pode atualizar a interface e guardar informações.

Com o projeto, é possível:

- Adicionar uma tarefa com título, descrição opcional e prioridade.
- Editar ou excluir uma tarefa.
- Confirmar a exclusão em uma caixa de diálogo antes de remover os dados.
- Marcar uma tarefa como concluída e reabri-la.
- Filtrar tarefas por todas, pendentes ou concluídas.
- Ver a lista ordenada por prioridade: alta, média e baixa.
- Ver a quantidade de tarefas e quantas ainda estão pendentes.
- Aumentar ou diminuir o texto e ligar o alto contraste.
- Manter tarefas e opções de acessibilidade salvas no navegador.

**Em poucas palavras:** o HTML forma a página, o CSS organiza e apresenta os elementos, e os módulos JavaScript controlam tarefas, tela e armazenamento.

## Como abrir o projeto

1. Abra a pasta `Avaliacao2DWEB` no Visual Studio Code.
2. No Explorer do VS Code, abra `TaskFlow/index.html`.
3. Clique com o botão direito no arquivo e escolha **Open with Live Server**.
4. O Live Server abre uma página local no navegador. Se não abrir o Chrome, copie o endereço local exibido pelo VS Code e cole-o no Chrome.

Não abra o arquivo com duplo clique no Explorador de Arquivos. Como o projeto usa módulos JavaScript, abra-o por um servidor local como o Live Server.

## Organização dos arquivos

```text
TaskFlow/
├── index.html          estrutura da página e seus campos
├── README.md           este guia de estudo
├── css/
│   ├── style.css       aparência, cores, foco e contraste
│   └── responsive.css  adaptação para telas de tablet e computador
└── js/
    ├── main.js         eventos e ligação entre as partes
    ├── tasks.js        funções que criam e alteram tarefas
    ├── ui.js           criação e atualização dos elementos da tela
    └── storage.js      leitura e gravação no localStorage
```

### O que cada parte faz

- **`index.html` — estrutura:** contém o cabeçalho, o formulário, os filtros, a lista e as regiões de mensagens. Usa elementos semânticos, como `header`, `main`, `section`, `form` e `footer`. Cada campo tem um `label` associado.
- **`css/style.css` — estilos principais:** define cores, espaçamento, campos, cartões, botões, foco visível e modo de alto contraste. Também contém o estilo usado em telas pequenas.
- **`css/responsive.css` — adaptação da tela:** em telas estreitas o conteúdo fica em uma coluna; a partir de 700 px, formulário e lista passam para colunas; a partir de 1000 px, há mais espaço para o formulário e a lista.
- **`js/main.js` — coordenação:** escuta o envio do formulário e os cliques em adicionar, filtrar, concluir, editar, cancelar e excluir. Mantém a lista atual e pede aos outros módulos que atualizem a tela ou os dados salvos.
- **`js/tasks.js` — regras das tarefas:** cria um objeto para cada tarefa e devolve listas atualizadas ao concluir, editar ou excluir.
- **`js/ui.js` — interface:** cria os cartões e botões usando elementos do DOM. Usa `textContent` para inserir texto, sem tratar o título digitado como código HTML.
- **`js/storage.js` — persistência:** lê e grava tarefas e preferências no `localStorage`.

## Como os dados e o JavaScript se conectam

1. A pessoa preenche o formulário e o navegador verifica os campos obrigatórios.
2. `main.js` recebe o evento `submit` e lê os valores com `FormData`.
3. `tasks.js` cria um objeto de tarefa. As tarefas juntas formam um array.
4. `ui.js` desenha novamente a lista usando os dados do array.
5. `storage.js` transforma o array em JSON e guarda esse texto no `localStorage`.
6. Quando a página abre novamente, `storage.js` lê o JSON e `main.js` pede que a lista seja desenhada.

O navegador guarda as tarefas na chave `tarefas` e as opções visuais na chave `taskflow-preferencias`. Os dados ficam **neste navegador e neste dispositivo**; não são enviados a uma conta nem sincronizados com outros dispositivos. Apagar os dados do site no navegador também pode apagá-los.

O projeto também reconhece prioridades antigas em inglês (`low`, `medium`, `high`) e as converte para os valores em português.

## Acessibilidade incluída

- **Rótulos de campos:** clicar no nome do campo também ajuda a focá-lo. Campos obrigatórios têm validação nativa do navegador.
- **Prioridade obrigatória:** o formulário começa com “Selecione uma prioridade”. Se ela não for escolhida, o navegador e a mensagem ao lado do campo explicam o que falta.
- **Teclado:** `Tab` avança pelos controles e `Shift + Tab` volta. `Enter` ativa botões e envia formulários; a barra de espaço também ativa botões quando estão focados. Não foram criados atalhos de teclado próprios.
- **Foco visível:** uma borda destaca o controle atualmente selecionado pelo teclado.
- **Pular para o conteúdo:** o link no início da página permite passar diretamente para as tarefas. Ele aparece ao receber foco.
- **Leitores de tela:** regiões `role="status"` e `aria-live="polite"` anunciam mensagens sem interromper a leitura. Os filtros informam quando estão selecionados.
- **Confirmação de exclusão:** uma caixa nativa de diálogo identifica a tarefa e pede confirmação. Cancelar ou pressionar `Esc` mantém os dados; só **Sim, excluir** remove a tarefa. Isso ajuda a evitar exclusões acidentais, mas não substitui autenticação nem é uma barreira de segurança contra alguém que já usa o dispositivo.
- **Texto e mensagens claras:** cartões vazios informam quando ainda não há tarefas ou quando o filtro escolhido não encontrou resultados.
- **Cor não é o único indicador:** a prioridade também aparece escrita, e os filtros mostram o estado selecionado.
- **Controles de texto:** os botões **A−** e **A+** diminuem e aumentam o texto em etapas. O tamanho escolhido é guardado no navegador.
- **Alto contraste:** **Alto contraste: desligado/ligado** alterna uma apresentação de alto contraste e guarda a preferência.
- **Movimento reduzido:** a folha de estilos respeita a preferência de movimento reduzido do sistema.

### Lupa e ampliação

Os botões A− e A+ ampliam ou reduzem o texto e os elementos dimensionados em `rem` dentro da página; eles **não são uma lupa que acompanha o ponteiro**. Para ampliar toda a página no Chrome, use:

- `Ctrl` + `+` para ampliar.
- `Ctrl` + `-` para reduzir.
- `Ctrl` + `0` para voltar ao tamanho normal.

No Windows, a Lupa do sistema pode ser aberta com `Win` + `+` e fechada com `Win` + `Esc`. Os atalhos podem variar conforme o sistema operacional e a configuração do teclado.

### Contraste e avaliação

O modo normal usa texto escuro em fundos claros, e o modo de alto contraste usa preto, branco e foco amarelo. A aparência foi pensada para facilitar a leitura, mas isso não substitui uma auditoria formal nem garante, por si só, conformidade completa com todas as diretrizes WCAG.

Para estudar e verificar o resultado:

1. Navegue pela página somente com `Tab`, `Shift + Tab`, `Enter` e espaço.
2. Teste os botões de alto contraste e de aumento de texto.
3. No Chrome, abra as Ferramentas do desenvolvedor com `F12` e use **Lighthouse → Accessibility** para receber sugestões automáticas.
4. Inspecione a árvore de acessibilidade no painel **Elements → Accessibility**.
5. Se desejar, use uma ferramenta complementar, como a extensão axe DevTools, e avalie também com uma pessoa usuária de leitor de tela.

Ferramentas automáticas ajudam a encontrar problemas, mas não substituem testes manuais com teclado, ampliação e tecnologias assistivas. Teste também a página em larguras de celular, tablet e computador e confirme que não há rolagem horizontal indesejada.

## Estados vazios e mensagens

As mensagens da lista são criadas em `js/ui.js`, dentro da função `desenharLista`:

- Sem tarefas cadastradas: “Você ainda não adicionou tarefas.”
- Lista filtrada sem resultados: “Não há tarefas para mostrar neste filtro.”

As mensagens de confirmação e erro são enviadas para a região acessível `#mensagem`, usando `mostrarMensagem` em `js/ui.js`. A validação da prioridade é controlada em `js/main.js` e aparece junto ao campo no HTML.

## Conceitos de JavaScript para revisar

- **Variáveis (`let` e `const`):** guardam valores, como `tarefas`, `filtroAtual` e os elementos da página.
- **Tipos e operadores:** strings guardam textos, números indicam tamanho, e `===`, `!` e `||` permitem comparar ou combinar condições.
- **Funções:** agrupam ações reutilizáveis, como `criarTarefa`, `desenharLista` e `salvarTarefas`.
- **Objetos:** cada tarefa reúne propriedades como `id`, `titulo`, `descricao`, `prioridade` e `concluida`.
- **Arrays:** `tarefas` é a lista de objetos. Métodos como `map` e `filter` criam versões atualizadas da lista.
- **Eventos:** `submit`, `click`, `input` e `change` fazem o JavaScript responder ao que a pessoa faz.
- **DOM:** `document.createElement`, `append` e `textContent` criam e atualizam os elementos HTML.
- **Módulos:** `export` disponibiliza funções e `import` permite usá-las em outro arquivo.
- **JSON e armazenamento:** `JSON.stringify` transforma dados em texto; `JSON.parse` faz o caminho inverso para o `localStorage`.

## Ideias para testar manualmente

1. Tente adicionar uma tarefa sem título e sem prioridade.
2. Escolha uma prioridade e adicione uma tarefa com descrição.
3. Edite o título, a descrição e a prioridade; salve. Depois teste cancelar.
4. Conclua uma tarefa, filtre as concluídas e reabra-a.
5. Tente excluir uma tarefa, escolha **Manter tarefa** e confirme que ela continua na lista. Abra a caixa novamente, escolha **Sim, excluir** e observe o estado vazio.
6. Atualize a página e confirme que as tarefas continuam guardadas.
7. Aumente o texto, ligue o alto contraste e atualize a página para verificar se as opções foram mantidas.
8. Repita os testes usando apenas o teclado e em diferentes larguras de tela.
9. Adicione tarefas em ordens diferentes e confirme que a lista mostra primeiro prioridade alta, depois média e por fim baixa.
