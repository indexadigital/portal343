import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  isMobileMenuOpen: boolean
  isMobileSearchOpen: boolean
  searchTerm: string
  openMobileMenu: () => void
  closeMobileMenu: () => void
  toggleMobileMenu: () => void
  openMobileSearch: () => void
  closeMobileSearch: () => void
  toggleMobileSearch: () => void
  setSearchTerm: (term: string) => void
  resetUI: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isMobileMenuOpen: false,
      isMobileSearchOpen: false,
      searchTerm: '',

      openMobileMenu: () => set({ isMobileMenuOpen: true }, false, 'openMobileMenu'),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }, false, 'closeMobileMenu'),
      toggleMobileMenu: () =>
        set(
          (state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }),
          false,
          'toggleMobileMenu'
        ),

      openMobileSearch: () => set({ isMobileSearchOpen: true }, false, 'openMobileSearch'),
      closeMobileSearch: () => set({ isMobileSearchOpen: false }, false, 'closeMobileSearch'),
      toggleMobileSearch: () =>
        set(
          (state) => ({ isMobileSearchOpen: !state.isMobileSearchOpen }),
          false,
          'toggleMobileSearch'
        ),

      setSearchTerm: (term: string) => set({ searchTerm: term }, false, 'setSearchTerm'),

      resetUI: () =>
        set(
          { isMobileMenuOpen: false, isMobileSearchOpen: false, searchTerm: '' },
          false,
          'resetUI'
        ),
    }),
    { name: 'UIStore' }
  )
)
