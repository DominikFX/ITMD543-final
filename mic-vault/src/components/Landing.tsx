import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Footer from '../components/Footer'
import AddMicModal from '../components/AddMicModal'
import { useVault } from '../store/useVault'
import type { Mic } from '../types'

export default function Landing() {
  const { addMic } = useVault()
  const [open, setOpen] = useState(false)

  function handleSave(mic: Mic) {
    addMic(mic)
    setOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onAddClick={() => setOpen(true)} />
      <section className="hero-gradient pt-32 pb-20 border-b border-gray-200/20">
        <div className="max-w-[1100px] w-[92%] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Wireless Mic Vault</h1>
            <p className="text-lg text-blue-100 mb-8 max-w-lg leading-relaxed">
              Say goodbye to spreadsheets. Keep track of your wireless microphone's band, frequency, and service date all in one place.
            </p>
            <Link to="/inventory" className="inline-block bg-white text-gray-900 px-6 py-3 rounded-xl font-bold">
              Get Started
            </Link>
          </div>
          <div className="flex justify-end">
            <img src="/mics.png" alt="Wireless microphones" className="w-full max-w-[500px] rounded-2xl shadow-2xl shadow-black/40 rotate-1" />
          </div>
        </div>
      </section>

      <Features />
      <section className="hero-gradient py-16 text-center border-y border-gray-200/20">
        <div className="max-w-[1100px] w-[92%] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Ready to get started?</h2>
          <div className="flex gap-4">
            <button 
              className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:brightness-95" 
              onClick={() => setOpen(true)}
            >
              Add your first mic
            </button>
            <Link to="/inventory" className="border border-white/40 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/10">
              See current inventory
            </Link>
          </div>
        </div>
      </section>
      <Footer />

      <AddMicModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}