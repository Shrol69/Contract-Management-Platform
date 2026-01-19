import React from 'react';

export const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    CREATED: "bg-gray-100 text-gray-700 border-gray-200",
    APPROVED: "bg-blue-50 text-blue-700 border-blue-200",
    SENT: "bg-purple-50 text-purple-700 border-purple-200",
    SIGNED: "bg-green-50 text-green-700 border-green-200",
    LOCKED: "bg-gray-800 text-white border-gray-900",
    REVOKED: "bg-red-50 text-red-700 border-red-200",
  };

  // Default to gray if status is unknown
  const currentStyle = styles[status as keyof typeof styles] || styles.CREATED;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStyle}`}>
      {status}
    </span>
  );
};