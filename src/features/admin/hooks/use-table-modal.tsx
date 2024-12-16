import { create } from 'zustand';

type Action = 'create' | 'update';

interface TableModalState<T> {
  action: Action | null;
  item: T | null;
  onOpen: (action: Action, item?: T | null) => void;
  onClose: VoidFunction;
}

export const useTableModal = create<TableModalState<unknown>>((set) => ({
  action: null,
  item: null,
  onOpen: (action, item = null) => set({ action, item }),
  onClose: () => set({ action: null, item: null }),
}));
