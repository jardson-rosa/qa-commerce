class CartPage {
  visit() {
    cy.visit("/cart.html");
  }

  validarProdutoListado(nomeProduto) {
    cy.get("#cart-list").should("contain", nomeProduto);
  }

  validarQuantidade(quantidade) {
    cy.get("#cart-list").should("contain", `Quantidade: ${quantidade}`);
  }

  validarTotais(totalProdutos, frete, totalComFrete) {
    cy.get("#total-products").should("contain", totalProdutos);
    cy.get("#shipping-fee").should("contain", frete);
    cy.get("#total-with-shipping").should("contain", totalComFrete);
  }

  validarContadorDoCarrinho(quantidade) {
    cy.get("#cart-count").should("have.text", String(quantidade));
  }
}

module.exports = new CartPage();
