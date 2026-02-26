describe('Responsividade', () => {
  const viewports: [number, number, string][] = [
    [1920, 1080, 'Full HD'],
    [1280, 720, 'HD'],
    [768, 1024, 'Tablet'],
    [375, 667, 'iPhone SE'],
    [390, 844, 'iPhone 14'],
  ]

  viewports.forEach(([width, height, device]) => {
    describe(`${device} (${width}x${height})`, () => {
      beforeEach(() => {
        cy.viewport(width, height)
      })

      it('deve carregar a homepage sem erros', () => {
        cy.visit('/')
        cy.get('header').should('be.visible')
        cy.get('main').should('be.visible')
        cy.get('footer').should('be.visible')
      })

      it('deve exibir o logo', () => {
        cy.visit('/')
        cy.get('.navbar-brand img').should('be.visible')
      })

      it('não deve ter scroll horizontal', () => {
        cy.visit('/')
        cy.document().then((doc) => {
          expect(doc.documentElement.scrollWidth).to.be.at.most(
            doc.documentElement.clientWidth + 1
          )
        })
      })
    })
  })

  describe('Desktop vs Mobile', () => {
    it('deve exibir menu desktop em tela grande', () => {
      cy.viewport(1280, 720)
      cy.visit('/')

      cy.get('.submenu .menu').should('be.visible')
      cy.get('.search-form').should('be.visible')
    })

    it('deve exibir hamburger menu em tela pequena', () => {
      cy.viewport(375, 667)
      cy.visit('/')

      cy.get('.btn-menu').should('be.visible')
    })

    it('deve abrir offcanvas menu em mobile', () => {
      cy.viewport(375, 667)
      cy.visit('/')

      cy.get('.btn-menu').click()
      cy.get('.offcanvas').should('have.class', 'show')
      cy.get('.menu-offcanvas').should('be.visible')
    })

    it('deve fechar offcanvas ao clicar no botão close', () => {
      cy.viewport(375, 667)
      cy.visit('/')

      cy.get('.btn-menu').click()
      cy.get('.offcanvas').should('have.class', 'show')

      cy.get('.btn-close').click()
      cy.get('.offcanvas').should('not.have.class', 'show')
    })
  })
})
