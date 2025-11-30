import { create } from "zustand"

interface HeaderState {
  title: string
  description: string
  setHeader: (title: string, description: string) => void
  resetHeader: () => void
}

export const useHeaderStore = create<HeaderState>((set) => ({
  title: "",
  description: "",
  setHeader: (title, description) => set({ title, description }),
  resetHeader: () => set({ title: "", description: "" }),
}))
