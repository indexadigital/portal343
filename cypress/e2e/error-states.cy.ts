describe('Estados de erro', () => {
  it('deve exibir página 404 para rota inexistente', () => {
    cy.visit('/categoria-que-nao-existe/slug-que-nao-existe', { failOnStatusCode: false })

    cy.contains('404').should('be.visible')
    cy.contains('Página não encontrada').should('be.visible')
  })

  it('deve exibir link para voltar à homepage na página 404', () => {
    cy.visit('/xyz/abc', { failOnStatusCode: false })

    cy.contains('Voltar para a página inicial').should('be.visible')
    cy.contains('Voltar para a página inicial').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('deve manter header e footer na página 404', () => {
    cy.visit('/rota-invalida/post-invalido', { failOnStatusCode: false })

    cy.get('header').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('deve lidar com API lenta sem crash (timeout)', () => {
    // Intercepta chamada GraphQL e atrasa resposta
    cy.intercept('POST', '**/graphql', (req) => {
      req.reply({
        delay: 3000,
        body: {
          data: {
            posts: { edges: [] },
          },
        },
      })
    }).as('slowApi')

    cy.visit('/noticias')
    cy.get('header').should('be.visible')
  })

  it('deve exibir a página mesmo quando API retorna dados vazios', () => {
    cy.intercept('POST', '**/graphql', {
      body: {
        data: {
          posts: { edges: [] },
        },
      },
    }).as('emptyApi')

    cy.visit('/geral')
    cy.wait('@emptyApi')
    cy.get('header').should('be.visible')
    cy.get('h2').should('be.visible')
  })
})
