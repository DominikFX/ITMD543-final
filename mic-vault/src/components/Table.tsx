import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import type { Mic } from '../types'

type Props = {
  rows: Mic[];
  onEdit: (mic: Mic) => void;
  onDelete: (id: string) => void;
}

export default function Table({ rows, onEdit, onDelete }: Props) {
  return (
    <div className="table__wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Brand</th>
            <th>Band</th>
            <th>Frequency (MHz)</th>
            <th>Last Serviced</th>
            <th aria-label="actions" />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="table__empty">No mics yet. Click on the "Add Mic" button.</td>
            </tr>
          )}
          {rows.map(row => (
            <tr key={row.id}>
              <td>{row.label}</td>
              <td>{row.brand}</td>
              <td>{row.band}</td>
              <td>{row.frequencyMHz.toFixed(3)}</td>
              <td>{row.lastServiced || '—'}</td>
              <td className="table__actions">
                <button className="icon-btn" onClick={() => onEdit(row)} title="Edit">
                  <Pencil1Icon />
                </button>
                <button className="icon-btn icon-btn-delete" onClick={() => onDelete(row.id)} title="Delete">
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}