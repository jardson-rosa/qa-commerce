# language: pt
Funcionalidade: API de produtos
  Cenário: Listar produtos com paginação
    Quando consulto a API de produtos na página "1"
    Então a resposta deve ter status "200"
    E a resposta deve seguir o contrato de listagem de produtos
    E a lista "products" não deve estar vazia
    E "currentPage" deve ser "1"