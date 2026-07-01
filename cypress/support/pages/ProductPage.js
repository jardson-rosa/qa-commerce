class ProductPage {
  visit(productId) {
    cy.visit(`/product.html?id=${productId}`);
  }

  definirQuantidade(quantidade) {
    cy.get("#product-quantity").clear().type(String(quantidade));
  }

  adicionarAoCarrinho() {
    cy.get("#add-to-cart").click();
  }

  validarMensagemDeSucesso() {
    cy.get("#alert-container").should(
      "contain",
      "Produto adicionado ao carrinho!"
    );
  }
}

module.exports = new ProductPage();
