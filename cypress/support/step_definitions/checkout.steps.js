const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const CheckoutPage = require("../pages/CheckoutPage");

Given("que tenho produtos no carrinho", function () {
  cy.adicionarProdutoViaApi(1, 3);
});

Given("estou na página de checkout", function () {
  CheckoutPage.visit();
});

When("preencho os dados de entrega válidos", function () {
  CheckoutPage.preencherTodosOsDadosValidos();
});

When('seleciono a forma de pagamento {string}', (metodoPagamento) => {
  CheckoutPage.selecionarMetodoPagamento(metodoPagamento);
});

When('aceito os termos e condições', () => {
  CheckoutPage.aceitarTermos();
});

When("tento finalizar o pedido sem preencher os dados", function () {
  CheckoutPage.finalizarPedido();
});

When("tento finalizar o pedido", function () {
  CheckoutPage.finalizarPedido();
});

When("finalizo o pedido", function () {
  CheckoutPage.finalizarPedido();
});

When("preencho os dados de entrega com email inválido", function () {
  CheckoutPage.preencherEmailInvalido('teste@com');
  CheckoutPage.finalizarPedido();
});

When("preencho os dados de entrega com CEP {string}", function (cepInvalido) {
  CheckoutPage.preencherCepInvalido(cepInvalido);
  CheckoutPage.finalizarPedido();
});

When('preencho os dados válidos do cartão', () => {
  CheckoutPage.preencherDadoscartao();
});

Then("devo ver a mensagem {string}", function (message) {
  CheckoutPage.validarMensagemDeErroGlobal(message);
});

Then("os campos obrigatórios vazios devem exibir {string}", function (message) {
  CheckoutPage.validarErroNosCamposObrigatorios(message);
});

Then('devo ser redirecionado para a página de status do pedido', () => {
  cy.url().should('include', '/status');
});

Then('devo ver o status {string}', (statusEsperado) => {
  CheckoutPage.validarStatusPedido(statusEsperado);
});