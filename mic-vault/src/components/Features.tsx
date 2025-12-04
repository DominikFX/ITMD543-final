import type { ReactNode } from 'react'
import { SewingPinIcon, EyeOpenIcon, ClockIcon, CalendarIcon } from '@radix-ui/react-icons'

type FeatProps = { title: string; text: string; icon: ReactNode }

function Feat({ title, text, icon }: FeatProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="w-9 h-9 grid place-items-center bg-gray-50 rounded-lg mb-3 text-gray-700">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-500 leading-relaxed">{text}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1100px] w-[92%] mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Vault Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Feat title="Keep Track of Your Mics' Details" text="Every mic in your vault gets its own detailed record, including it's wireless band, brand, and frequency. No more guessing which mic is where since everything is right in front of you." icon={<SewingPinIcon />} />
          <Feat title="Know When It Was Last Serviced" text="Each microphone automatically logs its last maintenance date so you can keep track of which need to get checked. Forget sticky notes and spreadsheets, this system remembers it for you." icon={<CalendarIcon />} />
          <Feat title="Edit Details Quickly and Easily" text="Updating information takes seconds with clean row editing. You can adjust assignments, notes, and frequencies without digging through menus or forms." icon={<ClockIcon />} />
          <Feat title="Visually See Free Frequencies" text="A frequency ladder lets you spot open channels instantly. It's the fastest way to coordinate setups and avoid interference during live events." icon={<EyeOpenIcon />} />
        </div>
      </div>
    </section>
  )
}