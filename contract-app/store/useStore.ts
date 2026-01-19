import { create } from "zustand";

export type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

export interface Contract {
  id: string;
  blueprintName: string;
  clientName: string;
  status: ContractStatus;
  createdAt: string;
}

interface Store {
  contracts: Contract[];

  createContract: (data: {
    blueprintName: string;
    clientName: string;
  }) => void;

  updateStatus: (
    id: string,
    status: ContractStatus
  ) => void;

  revokeContract: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  contracts: [
    {
      id: "1",
      blueprintName: "NDA Agreement",
      clientName: "Acme Corp",
      status: "CREATED",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      blueprintName: "Employment Offer",
      clientName: "John Doe",
      status: "SENT",
      createdAt: new Date().toISOString(),
    },
  ],

  createContract: (data) =>
    set((state) => ({
      contracts: [
        ...state.contracts,
        {
          id: crypto.randomUUID(),
          status: "CREATED",
          createdAt: new Date().toISOString(),
          ...data,
        },
      ],
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      contracts: state.contracts.map((c) =>
        c.id === id
          ? { ...c, status }
          : c
      ),
    })),

  revokeContract: (id) =>
    set((state) => ({
      contracts: state.contracts.map((c) =>
        c.id === id
          ? { ...c, status: "REVOKED" }
          : c
      ),
    })),
}));
