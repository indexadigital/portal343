describe('Busca e filtros', () => {
  it('deve exibir formulário de busca no desktop', () => {
    cy.viewport(1280, 720)
    cy.visit('/')

    cy.get('.search-form').should('be.visible')
    cy.get('.search-form input[name="s"]').should('exist')
  })

  it('deve submeter busca e redirecionar com query param', () => {
    cy.viewport(1280, 720)
    cy.visit('/')

    cy.get('.search-form input[name="s"]').first().type('política{enter}')
    cy.url().should('include', '?s=pol')
  })

  it('deve exibir botão de busca mobile em viewport pequeno', () => {
    cy.viewport(375, 667)
    cy.visit('/')

    // Busca mobile via collapse toggle
    cy.get('.navbar-toggler').should('be.visible')
  })

  it('deve abrir busca mobile ao clicar no ícone', () => {
    cy.viewport(375, 667)
    cy.visit('/')

    cy.get('.navbar-toggler').click()
    cy.get('.busca_mobile').should('be.visible')
    cy.get('.busca_mobile input[name="s"]').should('be.visible')
  })

  it('deve filtrar por categoria ao navegar pelo menu', () => {
    cy.visit('/politica')

    cy.get('.news').should('have.length.at.least', 1)
    cy.get('h2').should('contain', 'Política')
  })
})
