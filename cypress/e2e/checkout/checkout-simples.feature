# language: pt
Funcionalidade: Checkout
  Como cliente
  Quero finalizar a compra preenchendo os dados obrigatórios
  Para receber confirmação do pedido

  Contexto:
    Dado que tenho produtos no carrinho
    E estou na página de checkout

  Cenário: Finalizar checkout com pagamento via Pix
    Quando preencho os dados de entrega válidos
    E seleciono a forma de pagamento "pix"
    E aceito os termos e condições
    E finalizo o pedido
    Então devo ser redirecionado para a página de status do pedido
    E devo ver o status "Pagamento aprovado"

  Cenário: Finalizar checkout com cartão de crédito
    Quando preencho os dados de entrega válidos
    E seleciono a forma de pagamento "credit_card"
    E preencho os dados válidos do cartão
    E aceito os termos e condições
    E finalizo o pedido
    Então devo ser redirecionado para a página de status do pedido
    E devo ver o status "Pagamento aprovado"