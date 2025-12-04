import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import type { Mic } from '../types'

type Props = {
  rows: Mic[];
  onEdit: (mic: Mic) => void;
  onDelete: (id: string) => void;
}

export default function Table({ rows, onEdit, onDelete }: Props) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Label</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Brand</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Band</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Frequency (MHz)</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">Last Serviced</th>
            <th aria-label="actions" className="px-4 py-3 text-sm font-medium text-gray-500" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No mics yet. Click on the "Add Mic" button.</td>
            </tr>
          )}
          {rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50/50 group transition-colors">
              <td className="px-4 py-3 text-gray-900 font-medium">{row.label}</td>
              <td className="px-4 py-3 text-gray-600">{row.brand}</td>
              <td className="px-4 py-3 text-gray-600">{row.band}</td>
              <td className="px-4 py-3 text-gray-900 font-mono text-sm">{row.frequencyMHz.toFixed(3)}</td>
              <td className="px-4 py-3 text-gray-600 text-sm">{row.lastServiced || '—'}</td>
              <td className="px-4 py-3 text-right flex justify-end gap-2">
                <button onClick={() => onEdit(row)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer transition-colors" title="Edit">
                  <Pencil1Icon className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(row.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer transition-colors" title="Delete">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}