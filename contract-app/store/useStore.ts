import { create } from "zustand";
import { nanoid } from "nanoid";

type Section = {
  id: string;
  title: string;
  content: string;
};

type Blueprint = {
  id: string;
  name: string;
  sections: Section[];
};

type Contract = {
  id: string;
  blueprintId: string;
  blueprintName: string;
  clientName: string;
  companyName: string;
  date: string;
  status: string;
  createdAt: Date;
};

type Store = {
  blueprints: Blueprint[];
  contracts: Contract[];

  createBlueprint: (name: string) => void;
  addSection: (id: string) => void;
  updateSection: (
    bid: string,
    sid: string,
    field: string,
    value: string
  ) => void;

  createContract: (c: any) => void;
  updateStatus: (id: string, status: string) => void;
};

export const useStore = create<Store>((set) => ({
  blueprints: [],
  contracts: [],

  createBlueprint: (name) =>
    set((s) => ({
      blueprints: [
        ...s.blueprints,
        {
          id: nanoid(),
          name,
          sections: [],
        },
      ],
    })),

  addSection: (id) =>
    set((s) => ({
      blueprints: s.blueprints.map((b) =>
        b.id === id
          ? {
              ...b,
              sections: [
                ...b.sections,
                {
                  id: nanoid(),
                  title: "New Section",
                  content: "",
                },
              ],
            }
          : b
      ),
    })),

  updateSection: (bid, sid, field, value) =>
    set((s) => ({
      blueprints: s.blueprints.map((b) =>
        b.id === bid
          ? {
              ...b,
              sections: b.sections.map((sec) =>
                sec.id === sid
                  ? { ...sec, [field]: value }
                  : sec
              ),
            }
          : b
      ),
    })),

  createContract: (c) =>
    set((s) => ({
      contracts: [
        ...s.contracts,
        {
          id: nanoid(),
          status: "CREATED",
          createdAt: new Date(),
          ...c,
        },
      ],
    })),

  updateStatus: (id, status) =>
    set((s) => ({
      contracts: s.contracts.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    })),
}));
