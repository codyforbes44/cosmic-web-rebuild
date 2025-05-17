
import { create } from 'zustand';

interface CalendlyStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCalendly = create<CalendlyStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
</lov-add-dependency>zustand@latest</lov-add-dependency>
