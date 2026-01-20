import { create } from "zustand";
import { nanoid } from "nanoid";

/* ================= TYPES ================= */

export type Section = {
  id: string;
  title: string;
  content: string;
};

export type Blueprint = {
  id: string;
  name: string;
  sections: Section[];
};

export type Contract = {
  id: string;
  blueprintId: string;
  blueprintName: string;
  clientName: string;
  companyName: string;
  date: string;
  status: string;
  createdAt: Date;
};

export type CompanyProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type Log = {
  id: string;
  action: string;
  contractId: string;
  time: Date;
};

type Store = {
  blueprints: Blueprint[];
  contracts: Contract[];
  company: CompanyProfile;
  logs: Log[];

  createBlueprint: (name: string) => void;
  deleteBlueprint: (id: string) => void;
  editBlueprintName: (id: string, name: string) => void;

  addSection: (id: string) => void;
  updateSection: (
    bid: string,
    sid: string,
    field: "title" | "content",
    value: string
  ) => void;

  createContract: (
    c: Omit<Contract, "id" | "status" | "createdAt">
  ) => void;

  editContract: (
    id: string,
    data: Partial<Contract>
  ) => void;

  deleteContract: (id: string) => void;

  updateStatus: (id: string, status: string) => void;

  updateCompany: (data: CompanyProfile) => void;

  addLog: (action: string, contractId: string) => void;
};

/* ================= HELPERS ================= */

function save(key: string, data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function load(key: string, fallback: any) {
  if (typeof window === "undefined") return fallback;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

/* ================= STORE ================= */

export const useStore = create<Store>((set, get) => ({
  blueprints: load("blueprints", []),
  contracts: load("contracts", []),
  logs: load("logs", []),

  company: load("company", {
    name: "Eurusys Technologies LLC",
    email: "info@eurusys.com",
    phone: "+971 55 123 4567",
    address: "Abu Dhabi, UAE",
  }),

  /* ===== BLUEPRINTS ===== */

  createBlueprint: (name) => {
    const newBlueprint: Blueprint = {
      id: nanoid(),
      name,
      sections: [],
    };

    const updated = [
      ...get().blueprints,
      newBlueprint,
    ];

    save("blueprints", updated);
    set({ blueprints: updated });
  },

  deleteBlueprint: (id) => {
    const updated = get().blueprints.filter(
      (b) => b.id !== id
    );

    save("blueprints", updated);
    set({ blueprints: updated });
  },

  editBlueprintName: (id, name) => {
    const updated = get().blueprints.map(
      (b) =>
        b.id === id
          ? { ...b, name }
          : b
    );

    save("blueprints", updated);
    set({ blueprints: updated });
  },

  addSection: (id) => {
    const updated = get().blueprints.map(
      (b) =>
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
    );

    save("blueprints", updated);
    set({ blueprints: updated });
  },

  updateSection: (
    bid,
    sid,
    field,
    value
  ) => {
    const updated = get().blueprints.map(
      (b) =>
        b.id === bid
          ? {
              ...b,
              sections: b.sections.map(
                (s) =>
                  s.id === sid
                    ? {
                        ...s,
                        [field]: value,
                      }
                    : s
              ),
            }
          : b
    );

    save("blueprints", updated);
    set({ blueprints: updated });
  },

  /* ===== CONTRACTS ===== */

  createContract: (c) => {
    const id = nanoid();

    const newContract: Contract = {
      id,
      status: "CREATED",
      createdAt: new Date(),
      ...c,
    };

    const contracts = [
      ...get().contracts,
      newContract,
    ];

    const logs = [
      ...get().logs,
      {
        id: nanoid(),
        action: "Contract created",
        contractId: id,
        time: new Date(),
      },
    ];

    save("contracts", contracts);
    save("logs", logs);

    set({ contracts, logs });
  },

  editContract: (id, data) => {
    const contracts = get().contracts.map(
      (c) =>
        c.id === id
          ? { ...c, ...data }
          : c
    );

    const logs = [
      ...get().logs,
      {
        id: nanoid(),
        action: "Contract edited",
        contractId: id,
        time: new Date(),
      },
    ];

    save("contracts", contracts);
    save("logs", logs);

    set({ contracts, logs });
  },

  deleteContract: (id) => {
    const contracts = get().contracts.filter(
      (c) => c.id !== id
    );

    const logs = [
      ...get().logs,
      {
        id: nanoid(),
        action: "Contract deleted",
        contractId: id,
        time: new Date(),
      },
    ];

    save("contracts", contracts);
    save("logs", logs);

    set({ contracts, logs });
  },

  updateStatus: (id, status) => {
    const contracts = get().contracts.map(
      (c) =>
        c.id === id
          ? { ...c, status }
          : c
    );

    const logs = [
      ...get().logs,
      {
        id: nanoid(),
        action: `Status changed to ${status}`,
        contractId: id,
        time: new Date(),
      },
    ];

    save("contracts", contracts);
    save("logs", logs);

    set({ contracts, logs });
  },

  /* ===== COMPANY ===== */

  updateCompany: (data) => {
    save("company", data);
    set({ company: data });
  },

  addLog: (action, contractId) => {
    const logs = [
      ...get().logs,
      {
        id: nanoid(),
        action,
        contractId,
        time: new Date(),
      },
    ];

    save("logs", logs);
    set({ logs });
  },
}));
