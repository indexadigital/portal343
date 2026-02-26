describe('Fluxo de navegação principal', () => {
  it('deve carregar a homepage com destaques e seções', () => {
    cy.visit('/')
    cy.get('header').should('be.visible')
    cy.get('footer').should('be.visible')
    cy.get('.sections').should('have.length.at.least', 1)
  })

  it('deve navegar da homepage para listagem de categoria', () => {
    cy.visit('/')

    // Clica no link "VEJA MAIS" da seção Geral
    cy.contains('a', 'VEJA MAIS').first().click()

    // Deve estar na página de categoria
    cy.url().should('match', /\/(geral|politica|noticias)/)
    cy.get('.container').should('be.visible')
  })

  it('deve navegar da listagem para detalhe de post', () => {
    cy.visit('/noticias')

    // Clica no primeiro post da listagem
    cy.get('.news a').first().click()

    // Deve estar na página de detalhe do post
    cy.url().should('match', /\/[a-z-]+\/[a-z0-9-]+/)
    cy.get('article').should('be.visible')
  })

  it('deve navegar pelo menu desktop', () => {
    cy.visit('/')

    // Menu deve estar visível em desktop
    cy.get('.submenu .menu').should('be.visible')

    // Navega para uma categoria pelo menu
    cy.get('.submenu .menu a').contains('Política').click()
    cy.url().should('include', '/politica')
  })

  it('deve ter o logo linkando para a homepage', () => {
    cy.visit('/noticias')

    cy.get('.navbar-brand').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('deve exibir seção "VEJA TAMBÉM" na página de post', () => {
    cy.visit('/noticias')
    cy.get('.news a').first().click()

    cy.contains('VEJA TAMBÉM').should('be.visible')
  })

  it('deve exibir sidebar "ÚLTIMAS" na página de post', () => {
    cy.visit('/noticias')
    cy.get('.news a').first().click()

    cy.contains('ÚLTIMAS').should('be.visible')
  })
})
