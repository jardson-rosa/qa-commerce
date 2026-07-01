const { Given, When, Then, Before} = require("@badeball/cypress-cucumber-preprocessor");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");

Before(function () {
  cy.limparCarrinho();
});

Given("que o carrinho do usuário está vazio", function () {
  cy.limparCarrinho();
  cy.request("GET", `/api/carrinho/${Cypress.env("userId")}`).then((response) => {
    expect(response.body).to.have.length(0);
  });
});

Given(
  'que o produto {string} já está no carrinho com quantidade {string}',
  function (productId, quantity) {
    cy.adicionarProdutoViaApi(productId, quantity);
  }
);

When(
  'eu adiciono o produto {string} com quantidade {string} ao carrinho',
  function (productId, quantity) {
    cy.wrap({ productId, quantity: Number(quantity) }).as("contextoProduto");
    ProductPage.visit(productId);
    ProductPage.definirQuantidade(quantity);
    ProductPage.adicionarAoCarrinho();
    ProductPage.validarMensagemDeSucesso();
  }
);

When("acesso a página do carrinho", function () {
  CartPage.visit();
});

Then("devo ver o produto listado no carrinho", function () {
  cy.get("@contextoProduto").then(({ productId }) => {
    cy.obterProduto(productId).then((product) => {
      CartPage.validarProdutoListado(product.name);
    });
  });
});

Then("o total de produtos deve refletir preço e quantidade", function () {
  cy.get("@contextoProduto").then(({ productId, quantity }) => {
    cy.obterProduto(productId).then((product) => {
      const total = (product.price * quantity).toFixed(2);
      cy.get("#total-products").should(
        "contain",
        `Valor total do(s) Produto(s): R$${total}`
      );
    });
  });
});

Then("o frete fixo deve ser exibido", function () {
  const frete = Cypress.env("shippingFee").toFixed(2);
  cy.get("#shipping-fee").should("contain", `Frete: R$${frete}`);
});

Then("o total com frete deve estar correto", function () {
  cy.get("@contextoProduto").then(({ productId, quantity }) => {
    cy.obterProduto(productId).then((product) => {
      const totalComFrete = (
        product.price * quantity +
        Cypress.env("shippingFee")
      ).toFixed(2);
      cy.get("#total-with-shipping").should(
        "contain",
        `Valor total + Frete fixo: R$${totalComFrete}`
      );
    });
  });
});

Then("a quantidade do produto deve ser {string}", function (quantity) {
  CartPage.validarQuantidade(quantity);
});
