import { create } from "zustand";

export const countStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })), // corrected "descrease" to "decrease"
  reset: () => set({ count: 0 }),
  update_count: (newcount) => set({ count: newcount }),
}));

