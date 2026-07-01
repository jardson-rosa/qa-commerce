# language: pt
Funcionalidade: API de carrinho
  Como consumidor da API
  Quero adicionar um produto ao carrinho
  Para garantir que o endpoint responde com o status e o corpo corretos

  Cenário: Adicionar produto ao carrinho via API
    Quando adiciono o produto "1" ao carrinho do usuário "1" via API
    Então a resposta deve ter status "201"
    E a resposta deve seguir o contrato de adição ao carrinho
    E a mensagem deve conter "Produto adicionado ao carrinho com sucesso"
