import type { ReactNode } from 'react'
import { SewingPinIcon, EyeOpenIcon, ClockIcon, CalendarIcon } from '@radix-ui/react-icons'

type FeatProps = { title: string; text: string; icon: ReactNode }

function Feat({ title, text, icon }: FeatProps) {
  return (
    <div className="feat">
      <div className="feat__icon" aria-hidden="true">{icon}</div>
      <h4 className="feat__title">{title}</h4>
      <p className="feat__text">{text}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section className="section section--padded">
      <div className="container">
        <h2 className="section__title">Vault Features</h2>
        <div className="grid-2">
          <Feat title="Keep Track of Your Mics' Details" text="Every mic in your vault gets its own detailed record, including model, serial number, and assigned location. No more guessing which mic is where - everything's right in front of you." icon={<SewingPinIcon />} />
          <Feat title="Know When It Was Last Serviced" text="Each microphone automatically logs its last maintenance date so you can stay ahead of potential issues. Forget sticky notes and spreadsheets; this system remembers for you." icon={<CalendarIcon />} />
          <Feat title="Edit Details Quickly and Easily" text="Updating information takes seconds with clean, in-place editing. You can adjust assignments, notes, and frequencies without digging through menus or forms." icon={<ClockIcon />} />
          <Feat title="Visually See Free Frequencies" text="A color-coded frequency map lets you spot open channels instantly. It's the fastest way to coordinate setups and avoid interference during live events." icon={<EyeOpenIcon />} />
        </div>
      </div>
    </section>
  )
}