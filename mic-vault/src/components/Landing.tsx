import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Footer from '../components/Footer'
import AddMicModal from '../components/AddMicModal'
//import { useVault } from '../store/useVault'

export default function Landing() {
  //const { addMic } = useVault()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Navbar onAddClick={() => setOpen(true)} />
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__left">
            <h1 className="hero__title">Wireless Mic Vault</h1>
            <p className="hero__text">
              Say goodbye to spreadsheets. Keep track of your wireless microphone's band, frequency, and service date all in one place.
            </p>
            <div className="hero__actions">
              <Link to="/inventory" className="btn btn">Get Started</Link>
            </div>
          </div>
          <div className="hero__right">
            <img src="/mics.png" alt="Wireless microphones" className="hero__image" />
          </div>
        </div>
      </section>

      <Features />
      <section className="cta">
        <div className="container cta__inner">
          <h2 className="cta__title">Ready to get started?</h2>
          <div className="cta__actions">
            <button
              className="btn btn--primary"
              onClick={() => setOpen(true)}
            >
              Add your first mic
            </button>
            <Link to="/inventory" className="btn btn--ghost">
              See current inventory
            </Link>
          </div>
        </div>
      </section>
      <Footer />

      <AddMicModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(_m) => { setOpen(false) }} 
      />
      {/*<AddMicModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(m) => { addMic(m); setOpen(false) }}
      />*/}
    </>
  )
}