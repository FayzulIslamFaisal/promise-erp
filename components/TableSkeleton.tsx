import React from "react";

// ShadCN-style Table Skeleton
// Displays loading skeletons only (no real data rendering)

export default function TableSkeleton({
  columns = 5,
  rows = 8,
  className = "",
}) {
  return (
    <div className={`rounded-2xl shadow-sm bg-white overflow-hidden ${className}`}>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-muted/40">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
                >
                  <div className="h-3 w-24 rounded-md bg-slate-200 animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t last:border-b">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 align-middle text-sm">
                    <div className="h-4 w-3/4 rounded-md bg-slate-200 animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
