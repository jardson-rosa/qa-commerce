# language: pt
Funcionalidade: Validação do checkout
  Como cliente
  Quero ser informado sobre campos inválidos
  Para corrigir meus dados antes de concluir a compra

  Contexto:
    Dado que tenho produtos no carrinho
    E estou na página de checkout

  Cenário: Tentar finalizar sem preencher campos obrigatórios
    Quando tento finalizar o pedido sem preencher os dados
    Então devo ver a mensagem "Por favor, preencha todos os campos obrigatório marcados com asteriscos!"
    E os campos obrigatórios vazios devem exibir "Este campo é obrigatório."

  Cenário: Email inválido
    Quando preencho os dados de entrega com email inválido
    E tento finalizar o pedido
    Então devo ver a mensagem "Por favor, insira um email válido."

  Cenário: CEP com tamanho incorreto
    Quando preencho os dados de entrega com CEP "123"
    E tento finalizar o pedido
    Então devo ver a mensagem "O CEP deve ter 8 caracteres."