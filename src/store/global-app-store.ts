import { create } from 'zustand'

type State = {
  isSideNavOpen: boolean
}

type Actions = {
  setIsSideNavOpen: (isSideNavOpen: State['isSideNavOpen']) => void
}

export const useGlobalAppStore = create<State & Actions>(set => ({
  isSideNavOpen: false,
  setIsSideNavOpen: isSideNavOpen => set({ isSideNavOpen })
}))
