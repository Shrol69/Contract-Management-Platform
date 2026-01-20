import { create } from "zustand";
import { nanoid } from "nanoid";

type Field = {
  id: string;
  type: "text" | "date" | "signature" | "checkbox";
  label: string;
  x: number;
  y: number;
};

type Blueprint = {
  id: string;
  name: string;
  fields: Field[];
};

type Store = {
  contracts: any[];
  blueprints: Blueprint[];

  createContract: (c: any) => void;
  updateStatus: (id: string, status: string) => void;
  revokeContract: (id: string) => void;

  createBlueprint: (name: string) => void;
  addField: (
    blueprintId: string,
    field: Field
  ) => void;
};

export const useStore = create<Store>((set) => ({
  contracts: [],
  blueprints: [],

  createContract: (contract) =>
    set((state) => ({
      contracts: [
        ...state.contracts,
        {
          id: nanoid(),
          status: "CREATED",
          createdAt: new Date(),
          ...contract,
        },
      ],
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    })),

  revokeContract: (id) =>
    set((state) => ({
      contracts: state.contracts.filter(
        (c) => c.id !== id
      ),
    })),

  /* BLUEPRINT */

  createBlueprint: (name) =>
    set((state) => ({
      blueprints: [
        ...state.blueprints,
        {
          id: nanoid(),
          name,
          fields: [],
        },
      ],
    })),

  addField: (blueprintId, field) =>
    set((state) => ({
      blueprints: state.blueprints.map((b) =>
        b.id === blueprintId
          ? {
              ...b,
              fields: [...b.fields, field],
            }
          : b
      ),
    })),
}));
