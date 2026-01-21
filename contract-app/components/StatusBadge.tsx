import {
  CheckCircle,
  Clock,
  Send,
  Lock,
  XCircle,
  FileText,
} from "lucide-react";

type Status =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

const config: Record<
  Status,
  {
    label: string;
    icon: any;
    className: string;
  }
> = {
  CREATED: {
    label: "Created",
    icon: FileText,
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
  APPROVED: {
    label: "Approved",
    icon: Clock,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  SENT: {
    label: "Sent",
    icon: Send,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  SIGNED: {
    label: "Signed",
    icon: CheckCircle,
    className: "bg-green-50 text-green-700 border-green-200",
  },
  LOCKED: {
    label: "Locked",
    icon: Lock,
    className: "bg-slate-800 text-white border-slate-900",
  },
  REVOKED: {
    label: "Revoked",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export function StatusBadge({
  status,
}: {
  status: Status | string;
}) {
  const data =
    config[status as Status] || {
      label: status,
      icon: FileText,
      className:
        "bg-gray-100 text-gray-600 border-gray-200",
    };

  const Icon = data.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${data.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {data.label}
    </span>
  );
}
