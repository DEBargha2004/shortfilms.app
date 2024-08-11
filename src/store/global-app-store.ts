import { create } from "zustand";

type State = {
  isSideNavOpen: boolean;
  isSidebarMinimized: boolean;
};

type Actions = {
  setIsSideNavOpen: (isSideNavOpen: State["isSideNavOpen"]) => void;
  setIsSidebarMinimized: (
    isSidebarMinimized: State["isSidebarMinimized"]
  ) => void;
};

export const useGlobalAppStore = create<State & Actions>((set) => ({
  isSideNavOpen: false,
  isSidebarMinimized: false,
  setIsSideNavOpen: (isSideNavOpen) => set({ isSideNavOpen }),
  setIsSidebarMinimized: (isSidebarMinimized) => set({ isSidebarMinimized }),
}));
