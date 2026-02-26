import { useUIStore } from '@/lib/stores/ui-store'

describe('UIStore (Zustand)', () => {
  beforeEach(() => {
    useUIStore.getState().resetUI()
  })

  describe('estado inicial', () => {
    it('deve iniciar com menu mobile fechado', () => {
      expect(useUIStore.getState().isMobileMenuOpen).toBe(false)
    })

    it('deve iniciar com busca mobile fechada', () => {
      expect(useUIStore.getState().isMobileSearchOpen).toBe(false)
    })

    it('deve iniciar com termo de busca vazio', () => {
      expect(useUIStore.getState().searchTerm).toBe('')
    })
  })

  describe('menu mobile', () => {
    it('openMobileMenu deve abrir o menu', () => {
      useUIStore.getState().openMobileMenu()
      expect(useUIStore.getState().isMobileMenuOpen).toBe(true)
    })

    it('closeMobileMenu deve fechar o menu', () => {
      useUIStore.getState().openMobileMenu()
      useUIStore.getState().closeMobileMenu()
      expect(useUIStore.getState().isMobileMenuOpen).toBe(false)
    })

    it('toggleMobileMenu deve alternar o estado', () => {
      useUIStore.getState().toggleMobileMenu()
      expect(useUIStore.getState().isMobileMenuOpen).toBe(true)

      useUIStore.getState().toggleMobileMenu()
      expect(useUIStore.getState().isMobileMenuOpen).toBe(false)
    })
  })

  describe('busca mobile', () => {
    it('openMobileSearch deve abrir a busca', () => {
      useUIStore.getState().openMobileSearch()
      expect(useUIStore.getState().isMobileSearchOpen).toBe(true)
    })

    it('closeMobileSearch deve fechar a busca', () => {
      useUIStore.getState().openMobileSearch()
      useUIStore.getState().closeMobileSearch()
      expect(useUIStore.getState().isMobileSearchOpen).toBe(false)
    })

    it('toggleMobileSearch deve alternar o estado', () => {
      useUIStore.getState().toggleMobileSearch()
      expect(useUIStore.getState().isMobileSearchOpen).toBe(true)

      useUIStore.getState().toggleMobileSearch()
      expect(useUIStore.getState().isMobileSearchOpen).toBe(false)
    })
  })

  describe('busca', () => {
    it('setSearchTerm deve atualizar o termo de busca', () => {
      useUIStore.getState().setSearchTerm('política piauí')
      expect(useUIStore.getState().searchTerm).toBe('política piauí')
    })

    it('setSearchTerm com string vazia deve limpar', () => {
      useUIStore.getState().setSearchTerm('teste')
      useUIStore.getState().setSearchTerm('')
      expect(useUIStore.getState().searchTerm).toBe('')
    })
  })

  describe('resetUI', () => {
    it('deve resetar todos os estados para o inicial', () => {
      useUIStore.getState().openMobileMenu()
      useUIStore.getState().openMobileSearch()
      useUIStore.getState().setSearchTerm('teste')

      useUIStore.getState().resetUI()

      const state = useUIStore.getState()
      expect(state.isMobileMenuOpen).toBe(false)
      expect(state.isMobileSearchOpen).toBe(false)
      expect(state.searchTerm).toBe('')
    })
  })
})
