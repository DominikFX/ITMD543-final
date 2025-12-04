import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AddMicModal from '../components/AddMicModal'
import { useVault } from '../store/useVault'
import type { Mic } from '../types'
import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'

const statuses = {
  safe: {
    line: 'bg-green-200',
    badge: 'bg-green-50 border-green-200 text-green-700',
    icon: <CheckCircledIcon />,
  },
  warning: {
    line: 'bg-yellow-200',
    badge: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    icon: <ExclamationTriangleIcon />,
  },
  danger: {
    line: 'bg-red-200',
    badge: 'bg-red-50 border-red-200 text-red-600',
    icon: <ExclamationTriangleIcon />,
  },
}

export default function Frequencies() {
  const { mics, addMic } = useVault()
  const [isModalOpen, setModalOpen] = useState(false)

  const sortedMics = [...mics].sort((a, b) => a.frequencyMHz - b.frequencyMHz)

  function handleSave(mic: Mic) {
    addMic(mic)
    setModalOpen(false)
  }

  function getGapStatus(gap: number): 'safe' | 'warning' | 'danger' {
    if (gap < 0.5) return 'danger'
    if (gap < 1.0) return 'warning'
    return 'safe'
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onAddClick={() => setModalOpen(true)} />
      <section className="hero-gradient pt-28 pb-20 border-b border-gray-200/20">
        <div className="max-w-[1100px] w-[92%] mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Frequency Ladder</h1>
          <p className="text-blue-100">A simple list of your RF landscape, ordered from low to high.</p>
        </div>
      </section>
      <section className="py-12 flex-1">
        <div className="max-w-[600px] w-[92%] mx-auto">

          {sortedMics.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">No microphones in inventory.</div>
          ) : (
            <div className="flex flex-col">
              {sortedMics.map((mic, index) => {
                const nextMic = sortedMics[index + 1]
                
                const gap = nextMic ? nextMic.frequencyMHz - mic.frequencyMHz : 0
                const status = getGapStatus(gap)
                const styles = statuses[status]

                return (
                  <div key={mic.id} className="flex flex-col">
                    <div className="flex items-center gap-6 bg-white border border-gray-200 p-5 rounded-xl shadow-sm z-10 relative">
                      <div className="font-mono text-2xl font-bold text-brand-dark min-w-[140px]">
                        {mic.frequencyMHz.toFixed(3)} <span className="text-sm text-gray-400 font-sans font-medium">MHz</span>
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-gray-900">{mic.label}</div>
                        <div className="text-sm text-gray-500">{mic.brand} - {mic.band}</div>
                      </div>
                    </div>
                    {nextMic && (
                      <div className="h-16 relative flex flex-col items-center">
                        <div className={`w-0.5 flex-1 ${styles.line}`} />
                        
                        <div className={`absolute top-1/2 -translate-y-1/2 px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 ${styles.badge}`}>
                          {styles.icon}
                          <span>+{gap.toFixed(3)} MHz gap</span>
                        </div>
                        <div className={`w-0.5 flex-1 ${styles.line}`} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />

      <AddMicModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}