# language: pt
Funcionalidade: Carrinho de compras
  Como cliente da loja
  Quero adicionar produtos ao carrinho
  Para visualizar corretamente os itens e totais antes de pagar

  Contexto:
    Dado que o carrinho do usuário está vazio

  Cenário: Adicionar um produto pela página do produto
    Quando eu adiciono o produto "1" com quantidade "1" ao carrinho
    E acesso a página do carrinho
    Então devo ver o produto listado no carrinho
    E o total de produtos deve refletir preço e quantidade
    E o frete fixo deve ser exibido
    E o total com frete deve estar correto

  Cenário: Incrementar quantidade de produto já existente
    Dado que o produto "1" já está no carrinho com quantidade "1"
    Quando eu adiciono o produto "1" com quantidade "2" ao carrinho
    E acesso a página do carrinho
    Então a quantidade do produto deve ser "3"