# Nota de esclarecimento

A descrição do desafio não deixa claro qual o objetivo do uso da autenticação, seja ela para controle de acesso aos dados ou para a criação de receitas/despesas individuais para cada usuário.

Sendo assim, tomei a liberdade de assumir que o sistema é um controle de gastos de uma equipe, assim permitindo que qualquer pessoa logada possa listar/criar/editar/excluir todo e qualquer registro.

Caso o sistema fosse de uso pessoal para cada usuário, e assim então sendo necessário que o sistema listasse apenas os dados daquele usuário em específico, bastaria adicionar um campo de `owner` em cada entidade, adicionar um `.where('owner', '==', userId)` ou coisa similar nas requisições à firestore e pronto. Reiterando: todo mundo tem acesso a todos os dados por questões de escolha pessoal.

# URL

[Clique aqui](https://mario-desafio-agosto-2020.web.app)

# Como rodar localmente

`yarn install` e depois `yarn start`

# Desafio

- [x] Desenvolva e implante (deploy) um gerenciador de contas a pagar, no qual deve ser
      possível realizar operações CRUD (criação, listagem, atualização, remoção) sobre a
      seguinte entidade de Despesa.

- valor: number
- descricao: string
- data: timestamp
- pago: bool

## Tecnologias de uso obrigatório:

- [x] ES6+
- [x] React

## Tecnologias de uso recomendado:

- [x] Redux
- [x] Firebase Firestore
- [x] Firebase Hosting
- [x] Formik
- [x] Material-UI ou styled-components
- [x] React Router

## Extras

- [x] Faça também um CRUD para uma entidade Receita.

- valor: number
- descricao: string
- data: timestamp
- recebido: bool

- [x] Crie uma tela de acompanhamento com informações como saldo e total de Receitas e Despesas no mês atual, gráficos, e informações que achar interessante.

- [x] Implemente autenticação de usuários no sistema (recomendamos o Authentication
      do Firebase).
