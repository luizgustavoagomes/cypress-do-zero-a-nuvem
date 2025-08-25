describe('Carregar pagina', () => {
  beforeEach(() => {

    cy.viewport('iphone-xr')
    cy.visit('./src/index.html')
    
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

    const longText = Cypress._.repeat('asdlkajaskfajklshgfjkahslkfjhasklfjkldjalsk', 10)
    //ações
    cy.get('#firstName').type('Luiz Gustavo')
    cy.get('#lastName').type('Azevedo')
    cy.get('#email').type('luiz@gmail.com')
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('button[type="submit"]').click()

    //validações
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    //ações
    cy.get('#firstName').type('Luiz Gustavo')
    cy.get('#lastName').type('Azevedo')
    cy.get('#email').type('luizgmail.com')
    cy.get('#open-text-area').type('Aula Cypress')
    cy.get('button[type="submit"]').click()

    //teste
    cy.get('.error').should('be.visible')
  })

  it('validar campo telefone com valor númerico', () => {
    cy.get('#phone')
      .type('testeLetras')
      .should('have.value', '')
  })

  it('validar campo telefone obrigatorio', () => {
    cy.get('#firstName').type('Luiz Gustavo')
    cy.get('#lastName').type('Azevedo')
    cy.get('#email').type('luizgmail.com')
    cy.get('#open-text-area').type('Aula Cypress')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    //teste
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Luiz Gustavo')
      .should('have.value', 'Luiz Gustavo')
      .clear().should('have.value', '')
    cy.get('#lastName')
      .type('Azevedo')
      .should('have.value', 'Azevedo')
      .clear().should('have.value','')
    cy.get('#email')
      .type('luiz@gmail.com')
      .should('have.value', 'luiz@gmail.com')
      .clear().should('have.value','')
    cy.get('#phone')
      .type('999999')
      .should('have.value', '999999')
      .clear().should('have.value','')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  //Teste caixa de Seleção
  it('seleciona um produto (YouTube) por seu texto', () => {
     cy.get('select').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select').select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  // teste checkBox
  it('marca ambos checkboxes, depois desmarca o último', () =>{
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last().uncheck()
      .should('not.be.checked')

  })

  it('validar campo telefone obrigatorio reforme', () => {
    cy.get('#firstName').type('Luiz Gustavo')
    cy.get('#lastName').type('Azevedo')
    cy.get('#email').type('luizgmail.com')
    cy.get('#open-text-area').type('Aula Cypress')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()

    //teste
    cy.get('.error').should('be.visible')
  })
  
  //testes funcionalidade file

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo da pasta fixtures drag-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',() => {
    cy.fixture('example.json', null).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})
