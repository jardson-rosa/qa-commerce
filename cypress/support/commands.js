Cypress.Commands.add("limparCarrinho", (userId = Cypress.env("userId")) => {
  cy.request({
    method: "DELETE",
    url: `/api/carrinho/${userId}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add(
  "adicionarProdutoViaApi",
  (productId, quantity = 1, userId = Cypress.env("userId")) => {
    cy.request("POST", "/api/carrinho", {
      userId,
      productId: Number(productId),
      quantity: Number(quantity),
      failOnStatusCode: false
    });
  }
);

Cypress.Commands.add("obterProduto", (productId) => {
  cy.request("GET", `/api/produtos/${productId}`).its("body");
});

Cypress.Commands.add("listarProdutos", (page = 1) => {
  cy.request({
    method: "GET",
    url: `/api/produtos?page=${page}`,
    failOnStatusCode: false,
  });
});
