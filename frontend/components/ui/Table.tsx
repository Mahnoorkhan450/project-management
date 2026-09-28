import type {
  ReactNode,
} from "react";

interface TableProps {
  children: ReactNode;
}

export function Table({
  children,
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[600px] text-left text-sm">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
}: TableProps) {
  return (
    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
      {children}
    </thead>
  );
}

export function TableBody({
  children,
}: TableProps) {
  return (
    <tbody className="divide-y divide-slate-200 bg-white">
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
}: TableProps) {
  return (
    <tr className="transition hover:bg-slate-50">
      {children}
    </tr>
  );
}

export function TableHead({
  children,
}: TableProps) {
  return (
    <th className="px-5 py-3 font-semibold">
      {children}
    </th>
  );
}

export function TableCell({
  children,
}: TableProps) {
  return (
    <td className="px-5 py-4 text-slate-700">
      {children}
    </td>
  );
}