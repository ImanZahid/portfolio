import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isDark: false,
      setTheme: (theme) => {
        const isDark = theme === 'dark' || 
          (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        
        set({ theme, isDark })
      },
      toggleTheme: () => {
        const { theme } = get()
        const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
        get().setTheme(newTheme)
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Re-apply theme on hydration
          state.setTheme(state.theme)
        }
      },
    }
  )
)

// Initialize theme on first load
if (typeof window !== 'undefined') {
  const store = useThemeStore.getState()
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  // Set initial theme
  store.setTheme(store.theme)
  
  // Listen for system theme changes
  mediaQuery.addEventListener('change', () => {
    if (store.theme === 'system') {
      store.setTheme('system')
    }
  })
}