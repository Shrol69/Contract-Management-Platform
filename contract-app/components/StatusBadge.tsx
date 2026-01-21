type Props = {
  status: string;
};

export function StatusBadge({ status }: Props) {
  const map: Record<string, string> = {
    CREATED: "bg-slate-100 text-slate-600",
    APPROVED: "bg-blue-100 text-blue-600",
    SENT: "bg-yellow-100 text-yellow-600",
    SIGNED: "bg-green-100 text-green-600",
    LOCKED: "bg-purple-100 text-purple-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        map[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
}
