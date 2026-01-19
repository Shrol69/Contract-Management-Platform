import { create } from 'zustand';
import { Contract, ContractStatus } from '@/types';

interface StoreState {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  updateStatus: (id: string, newStatus: ContractStatus) => void;
}

export const useStore = create<StoreState>((set) => ({
  // Starting with some dummy data so the table isn't empty
  contracts: [
    { id: '1', blueprintName: 'NDA Agreement', clientName: 'Acme Corp', status: 'CREATED', createdAt: new Date().toISOString() },
    { id: '2', blueprintName: 'Employment Offer', clientName: 'John Doe', status: 'SENT', createdAt: new Date().toISOString() },
  ],

  addContract: (contract) => set((state) => ({ 
    contracts: [...state.contracts, contract] 
  })),

  updateStatus: (id, newStatus) => set((state) => ({
    contracts: state.contracts.map((c) => {
      if (c.id === id) {
        // Simple logic: If it's locked, don't change it.
        if (c.status === 'LOCKED') return c;
        return { ...c, status: newStatus };
      }
      return c;
    })
  })),
}));