# language: pt
Funcionalidade: API de carrinho
  Cenário: Adicionar produto ao carrinho via API
    Quando adiciono o produto "1" ao carrinho do usuário "1" via API
    Então a resposta deve ter status "201"
    E a mensagem deve conter "Produto adicionado ao carrinho com sucesso"