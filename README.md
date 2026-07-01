# QA-Commerce

### Loja virtual Geek para simulação de testes

QA-Commerce é uma aplicação de e-commerce criada para prática de testes de QA.
Ela possui uma API REST (produtos, carrinho, checkout, pedidos e usuários) e uma
suíte de testes automatizados end-to-end escrita em **Cypress** com **BDD/Gherkin**
(cucumber, em português).

---

## Pré-requisitos

- **Node.js** (versão LTS recomendada) — [https://nodejs.org/en/](https://nodejs.org/en/)
- **Git** — [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Visual Studio Code** (ou editor de sua preferência) — [https://code.visualstudio.com/download](https://code.visualstudio.com/download)

> **Observação (Windows):** a aplicação usa o pacote nativo `sqlite3`. Se o
> `npm install` falhar ao compilar o `sqlite3`, instale o
> [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/) com o
> workload **"Desktop development with C++"**, ou utilize uma versão LTS do Node.js
> (que costuma ter binários pré-compilados disponíveis).

---



## Passo a passo para subir a aplicação



### 1. Clonar o repositório

```bash
git clone https://github.com/jardson-rosa/qa-commerce.git
cd qa-commerce
```



### 2. Instalar as dependências

```bash
npm install
```



### 3. Inicializar o banco de dados (opcional)

O banco é criado automaticamente pelo `npm start`, mas você pode inicializá-lo
manualmente com:

```bash
npm run db
```



### 4. Subir o servidor

```bash
npm start
```

No console aparecerão os endereços do site e do banco. Acesse:

- **Site:** [http://localhost:3000/](http://localhost:3000/)
- **Documentação da API (Swagger):** [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

---



## Passo a passo para executar os testes (Cypress + BDD)

Os testes são escritos em BDD/Gherkin (`.feature`) e executados pelo Cypress.

### Executar toda a suíte (sobe servidor + banco e roda os testes)

```bash
npm run test
```

Esse comando inicializa o banco, sobe o servidor, aguarda a aplicação responder em
`http://localhost:3000` e então executa todos os testes em modo headless.

### Executar apenas os testes (com o servidor já rodando)

Em um terminal, suba a aplicação com `npm start`. Em outro terminal:

```bash
# Roda todos os testes em modo headless
npm run test:e2e

# Abre a interface interativa do Cypress
npm run test:e2e:open

# Roda apenas um grupo específico de cenários (ex.: apenas os testes de API)
npx cypress run --spec "cypress/e2e/api/**/*.feature"
```



### Estrutura dos testes

```
cypress/
├── e2e/
│   ├── api/            # Testes de API (carrinho e produtos)
│   ├── carrinho/       # Testes de UI do carrinho
│   └── checkout/       # Testes de UI do checkout
├── fixtures/
│   └── schemas/        # JSON Schemas para validação de contrato da API
└── support/
    ├── commands.js         # Custom commands de API (reutilizáveis)
    ├── pages/              # Page Objects (UI)
    ├── step_definitions/   # Steps que implementam os cenários .feature
    └── utils/              # Utilitários (ex.: validação de schema)
```

---



## Cenários BDD

Todos os cenários estão escritos em português (`# language: pt`), organizados por
funcionalidade.

### API de carrinho

**Arquivo:** `cypress/e2e/api/carrinho-api.feature`


| Cenário                               | Passos                                                        | O que valida                                                                                            |
| ------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Adicionar produto ao carrinho via API | Adiciona o produto `"1"` ao carrinho do usuário `"1"` via API | Status **201**, contrato da resposta (schema) e mensagem `"Produto adicionado ao carrinho com sucesso"` |




### API de produtos

**Arquivo:** `cypress/e2e/api/produtos-api.feature`


| Cenário                       | Passos                                     | O que valida                                                                                          |
| ----------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Listar produtos com paginação | Consulta a API de produtos na página `"1"` | Status **200**, contrato da listagem (schema), lista `products` não vazia e `currentPage` igual a `1` |




### Carrinho de compras (UI)

**Arquivo:** `cypress/e2e/carrinho/adicionar-produto.feature`

Contexto: o carrinho do usuário começa vazio.


| Cenário                                        | Passos                                                                 | O que valida                                                                                                               |
| ---------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Adicionar um produto pela página do produto    | Adiciona o produto `"1"` com quantidade `"1"` e acessa o carrinho      | Produto listado no carrinho, total de produtos refletindo preço × quantidade, frete fixo exibido e total com frete correto |
| Incrementar quantidade de produto já existente | Produto `"1"` já no carrinho com quantidade `"1"`; adiciona mais `"2"` | A quantidade final do produto deve ser `"3"`                                                                               |




### Checkout — fluxo de sucesso (UI)

**Arquivo:** `cypress/e2e/checkout/checkout-simples.feature`

Contexto: há produtos no carrinho e o usuário está na página de checkout.


| Cenário                                  | Passos                                                                                                       | O que valida                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Finalizar checkout com pagamento via Pix | Preenche dados de entrega válidos, seleciona `"pix"`, aceita os termos e finaliza                            | Redirecionamento para a página de status e status `"Pagamento aprovado"` |
| Finalizar checkout com cartão de crédito | Preenche dados de entrega válidos, seleciona `"credit_card"`, preenche o cartão, aceita os termos e finaliza | Redirecionamento para a página de status e status `"Pagamento aprovado"` |




### Checkout — validação de campos (UI)

**Arquivo:** `cypress/e2e/checkout/validacao-campos.feature`

Contexto: há produtos no carrinho e o usuário está na página de checkout.


| Cenário                                            | Passos                                        | O que valida                                                                                                                                       |
| -------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tentar finalizar sem preencher campos obrigatórios | Tenta finalizar sem preencher os dados        | Mensagem `"Por favor, preencha todos os campos obrigatório marcados com asteriscos!"` e campos obrigatórios exibindo `"Este campo é obrigatório."` |
| Email inválido                                     | Preenche com email inválido e tenta finalizar | Mensagem `"Por favor, insira um email válido."`                                                                                                    |
| CEP com tamanho incorreto                          | Preenche com CEP `"123"` e tenta finalizar    | Mensagem `"O CEP deve ter 8 caracteres."`                                                                                                          |


---

