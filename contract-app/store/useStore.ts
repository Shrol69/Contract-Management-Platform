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

  editContract: (id: string, data: Partial<Contract>) => void;
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

/* ================= DEMO DATA ================= */

const demoBlueprints: Blueprint[] = [
  {
    id: nanoid(),
    name: "Employment Agreement",
    sections: [
      {
        id: nanoid(),
        title: "Position & Duties",
        content:
          "The Employee shall serve as a Software Engineer and perform duties assigned by the Employer."
      },
      {
        id: nanoid(),
        title: "Compensation",
        content:
          "Employee shall receive ₹60,000 per month payable on 5th of every month."
      },
      {
        id: nanoid(),
        title: "Confidentiality",
        content:
          "Employee shall not disclose confidential information during or after employment."
      },
      {
        id: nanoid(),
        title: "Termination",
        content:
          "Either party may terminate this agreement with 30 days written notice."
      }
    ]
  },

  {
    id: nanoid(),
    name: "Freelance Service Agreement",
    sections: [
      {
        id: nanoid(),
        title: "Scope of Work",
        content:
          "Freelancer agrees to design and develop a web application."
      },
      {
        id: nanoid(),
        title: "Payment Terms",
        content:
          "Client shall pay ₹50,000 upon project completion."
      },
      {
        id: nanoid(),
        title: "IP Rights",
        content:
          "All deliverables belong exclusively to the Client."
      },
      {
        id: nanoid(),
        title: "Dispute Resolution",
        content:
          "Disputes shall be resolved under Indian arbitration law."
      }
    ]
  },

  {
    id: nanoid(),
    name: "Non-Disclosure Agreement (NDA)",
    sections: [
      {
        id: nanoid(),
        title: "Purpose",
        content:
          "Protect confidential business information."
      },
      {
        id: nanoid(),
        title: "Confidential Info",
        content:
          "Includes trade secrets, strategies, and client data."
      },
      {
        id: nanoid(),
        title: "Obligations",
        content:
          "Receiving party shall not disclose information."
      },
      {
        id: nanoid(),
        title: "Term",
        content:
          "Agreement valid for 3 years."
      }
    ]
  },

  {
    id: nanoid(),
    name: "Internship Agreement",
    sections: [
      {
        id: nanoid(),
        title: "Role",
        content:
          "Intern shall assist development team."
      },
      {
        id: nanoid(),
        title: "Duration",
        content:
          "3 months internship."
      },
      {
        id: nanoid(),
        title: "Stipend",
        content:
          "₹10,000 per month."
      },
      {
        id: nanoid(),
        title: "Confidentiality",
        content:
          "Intern must protect company data."
      }
    ]
  },

  {
    id: nanoid(),
    name: "Vendor Agreement",
    sections: [
      {
        id: nanoid(),
        title: "Services",
        content:
          "Vendor provides IT support."
      },
      {
        id: nanoid(),
        title: "Payment",
        content:
          "₹1,00,000 quarterly."
      },
      {
        id: nanoid(),
        title: "SLA",
        content:
          "99% uptime guaranteed."
      },
      {
        id: nanoid(),
        title: "Liability",
        content:
          "No liability for indirect loss."
      }
    ]
  }
];

const demoContracts: Contract[] = [
  {
    id: nanoid(),
    blueprintId: demoBlueprints[0].id,
    blueprintName: "Employment Agreement",
    clientName: "Rahul Sharma",
    companyName: "Eurusys Technologies LLC",
    date: "12 March 2026",
    status: "SIGNED",
    createdAt: new Date()
  },
  {
    id: nanoid(),
    blueprintId: demoBlueprints[1].id,
    blueprintName: "Freelance Service Agreement",
    clientName: "TechNova Pvt Ltd",
    companyName: "Eurusys Technologies LLC",
    date: "20 March 2026",
    status: "APPROVED",
    createdAt: new Date()
  }
];

/* ================= STORE ================= */

export const useStore = create<Store>((set, get) => {
  const seeded = load("seeded", false);

  if (!seeded && typeof window !== "undefined") {
    save("blueprints", demoBlueprints);
    save("contracts", demoContracts);
    save("logs", []);
    save("seeded", true);
  }

  return {
    blueprints: load("blueprints", demoBlueprints),
    contracts: load("contracts", demoContracts),
    logs: load("logs", []),

    company: load("company", {
      name: "Eurusys Technologies LLC",
      email: "info@eurusys.com",
      phone: "+971 55 123 4567",
      address: "Abu Dhabi, UAE"
    }),

    /* ===== BLUEPRINTS ===== */

    createBlueprint: (name) => {
      const newBlueprint = {
        id: nanoid(),
        name,
        sections: []
      };

      const updated = [...get().blueprints, newBlueprint];
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
        (b) => (b.id === id ? { ...b, name } : b)
      );
      save("blueprints", updated);
      set({ blueprints: updated });
    },

    addSection: (id) => {
      const updated = get().blueprints.map((b) =>
        b.id === id
          ? {
              ...b,
              sections: [
                ...b.sections,
                {
                  id: nanoid(),
                  title: "New Section",
                  content: ""
                }
              ]
            }
          : b
      );
      save("blueprints", updated);
      set({ blueprints: updated });
    },

    updateSection: (bid, sid, field, value) => {
      const updated = get().blueprints.map((b) =>
        b.id === bid
          ? {
              ...b,
              sections: b.sections.map((s) =>
                s.id === sid ? { ...s, [field]: value } : s
              )
            }
          : b
      );
      save("blueprints", updated);
      set({ blueprints: updated });
    },

    /* ===== CONTRACTS ===== */

    createContract: (c) => {
      const id = nanoid();
      const newContract = {
        id,
        status: "CREATED",
        createdAt: new Date(),
        ...c
      };

      const contracts = [...get().contracts, newContract];
      save("contracts", contracts);
      set({ contracts });
    },

    editContract: (id, data) => {
      const contracts = get().contracts.map((c) =>
        c.id === id ? { ...c, ...data } : c
      );
      save("contracts", contracts);
      set({ contracts });
    },

    deleteContract: (id) => {
      const contracts = get().contracts.filter(
        (c) => c.id !== id
      );
      save("contracts", contracts);
      set({ contracts });
    },

    updateStatus: (id, status) => {
      const contracts = get().contracts.map((c) =>
        c.id === id ? { ...c, status } : c
      );
      save("contracts", contracts);
      set({ contracts });
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
          time: new Date()
        }
      ];
      save("logs", logs);
      set({ logs });
    }
  };
});
