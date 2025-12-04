import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Table from '../components/Table'
import AddMicModal from '../components/AddMicModal'
import { useVault } from '../store/useVault'
import type { Mic } from '../types'

export default function Inventory() {
  const { mics, addMic, updateMic, deleteMic } = useVault()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Mic | null>(null)

  const rows = useMemo(
    () => [...mics].sort((a, b) => a.label.localeCompare(b.label)),
    [mics]
  )

  const handleEdit = (row: Mic) => {
    setEditing(row)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteMic(id)
  }

  const handleSave = (mic: Mic) => {
    if (editing) {
      updateMic(mic)
    } else {
      addMic(mic)
    }
    setOpen(false)
    setEditing(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onAddClick={() => { setEditing(null); setOpen(true) }} />

      <section className="hero-gradient pt-28 pb-20 border-b border-gray-200/20">
        <div className="max-w-[1100px] w-[92%] mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Vault Inventory</h1>
          <p className="text-blue-100 max-w-2xl">Track wireless microphone's band, frequency, and service date in one place. Click the button above to register a microphone, then you can edit the registered microphone's details, or delete it. Frequencies must be entered as XXX.XXX MHz.</p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-[1100px] w-[92%] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Inventory</h2>
          </div>
          <Table rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </section>

      <Footer />
      <AddMicModal
        open={open}
        initial={editing ?? undefined}
        onClose={() => { setOpen(false); setEditing(null) }}
        onSave={handleSave}
      />
    </div>
  )
}