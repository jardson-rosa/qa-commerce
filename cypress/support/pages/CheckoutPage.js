class CheckoutPage {
  get inputNome() {return cy.get('#first-name');}
  get inputSobrenome() {return cy.get('#last-name');}
  get inputEndereco() {return cy.get('#address');}
  get inputNumero() {return cy.get('#number');}
  get inputCep() {return cy.get('#cep');}
  get inputPhone() {return cy.get('#phone');}
  get inputEmail() {return cy.get('#email');}
  get inputCardNumber() {return cy.get('#card-number');}
  get inputCardExpiry() {return cy.get('#card-expiry');}
  get inputCardCvc() {return cy.get('#card-cvc');}
  get radioPaymentCard() {return cy.get('#payment-card');}
  get radioPaymentPix() {return cy.get('#payment-pix');}
  get radioPaymentBoleto() {return cy.get('#payment-boleto');}
  get checkTermos() {return cy.get('#terms');}
  get mensagemErroGlobal() {return cy.get('[class="alert alert-danger"], #checkout-form .invalid-feedback:visible');}
  get erroCampoObrigatorio() { return cy.get('#checkout-form .invalid-feedback:visible');}
  get btnFinalizarPedido() { return cy.get('[class="btn btn-primary"]');}
  get statusPedido() { return cy.get('#order-status');}
  

    visit() {
      cy.visit("/checkout.html");
    }

    preencherTodosOsDadosValidos() {
      this.inputNome.type('Jardson');
      this.inputSobrenome.type('Rosa');
      this.inputEndereco.type('Rua das Flores');
      this.inputNumero.type('123');
      this.inputCep.type('06622650');
      this.inputEmail.type('teste@teste.com');
    }

    selecionarMetodoPagamento(metodo) {
      const opcoes = {
        'credit_card': this.radioPaymentCard,
        'pix': this.radioPaymentPix,
        'boleto': this.radioPaymentBoleto
      };
  
      const elemento = opcoes[metodo];
      if (!elemento) {
        throw new Error(`Método de pagamento "${metodo}" não é válido ou não foi mapeado.`);
      }
  
      elemento.check({ force: true });
    }

    aceitarTermos() {
      this.checkTermos.check({ force: true });
    }

    preencherDadoscartao() {
      this.inputCardNumber.type('4444555566667777');
      this.inputCardExpiry.type('12/30');
      this.inputCardCvc.type('123');
    }

    preencherEmailInvalido(emailInvalido) {
      this.preencherTodosOsDadosValidos();
      this.aceitarTermos();
      this.selecionarMetodoPagamento('boleto');
      this.inputEmail.clear().type(emailInvalido);
    }
  
    preencherCepInvalido(cepInvalido) {
      this.preencherTodosOsDadosValidos();
      this.aceitarTermos();
      this.selecionarMetodoPagamento('boleto');
      this.inputCep.clear().type(cepInvalido);
    }

    finalizarPedido() {
      this.btnFinalizarPedido.contains("Finalizar Pedido").click();
    }

    validarErroNosCamposObrigatorios(message) {
      this.erroCampoObrigatorio
        .contains(message)
        .should('be.visible');
    }

    validarMensagemDeErroGlobal(message) {
      this.mensagemErroGlobal
          .should("contain", message)
          .should('be.visible');
    }

    validarStatusPedido(statusEsperado) {
      this.statusPedido
          .should('be.visible')
          .and('contain.text', statusEsperado);
    }
  }
  
  module.exports = new CheckoutPage();
  