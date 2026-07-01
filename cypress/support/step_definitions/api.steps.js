const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { validarSchema } = require("../utils/validarSchema");
const produtosSchema = require("../../fixtures/schemas/produtos.schema.json");
const carrinhoSchema = require("../../fixtures/schemas/carrinho.schema.json");

When(
  "adiciono o produto {string} ao carrinho do usuário {string} via API",
  function (productId, userId) {
    cy.limparCarrinho(Number(userId));
    cy.adicionarProdutoViaApi(productId, 1, Number(userId)).as("ultimaResposta");
  }
);

When("consulto a API de produtos na página {string}", function (page) {
  cy.listarProdutos(page).as("ultimaResposta");
});

Then("a resposta deve ter status {string}", function (status) {
  cy.get("@ultimaResposta").its("status").should("eq", Number(status));
});

Then("a resposta deve seguir o contrato de adição ao carrinho", function () {
  cy.get("@ultimaResposta")
    .its("body")
    .then((body) => validarSchema(carrinhoSchema, body));
});

Then("a resposta deve seguir o contrato de listagem de produtos", function () {
  cy.get("@ultimaResposta")
    .its("body")
    .then((body) => validarSchema(produtosSchema, body));
});

Then("a mensagem deve conter {string}", function (mensagem) {
  cy.get("@ultimaResposta").its("body.message").should("contain", mensagem);
});

Then("a lista {string} não deve estar vazia", function (campo) {
  cy.get("@ultimaResposta")
    .its(`body.${campo}`)
    .should("have.length.greaterThan", 0);
});

Then("o campo {string} deve ser {string}", function (campo, valor) {
  cy.get("@ultimaResposta").its(`body.${campo}`).should("eq", Number(valor));
});
