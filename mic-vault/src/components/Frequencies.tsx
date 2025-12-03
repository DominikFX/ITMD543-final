import Navbar from './Navbar'
import Footer from './Footer'
import { useVault } from '../store/useVault'
import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'

export default function Spectrum() {
  const { mics } = useVault()
  const sortedMics = [...mics].sort((a, b) => a.frequencyMHz - b.frequencyMHz)

  return (
    <>
      <Navbar />
      <section className="hero hero--mini">
        <div className="container hero__mini">
          <h1>Frequency Ladder</h1>
          <p>A simple list of your RF landscape, ordered from low to high.</p>
        </div>
      </section>
      <section className="section section--padded">
        <div className="container">

          {sortedMics.length === 0 ? (
            <div className="empty-state">No microphones in inventory.</div>
          ) : (
            <div className="ladder">
              {sortedMics.map((mic, index) => {
                const nextMic = sortedMics[index + 1]
                let gap = 0
                let status = 'safe'

                if (nextMic) {
                  gap = nextMic.frequencyMHz - mic.frequencyMHz
                  if (gap < 0.5) status = 'danger'
                  else if (gap < 1.0) status = 'warning'
                }

                return (
                  <div key={mic.id} className="ladder__step">
                    <div className="mic-card">
                      <div className="mic-card__freq">
                        {mic.frequencyMHz.toFixed(3)} <span className="unit">MHz</span>
                      </div>
                      <div className="mic-card__info">
                        <div className="mic-card__label">{mic.label}</div>
                        <div className="mic-card__band">{mic.band}</div>
                      </div>
                    </div>
                    {nextMic && (
                      <div className={`connector connector--${status}`}>
                        <div className="connector__line" />
                        <div className="connector__badge">
                          {status === 'danger' && <ExclamationTriangleIcon />}
                          {status === 'safe' && <CheckCircledIcon />}
                          <span>+{gap.toFixed(3)} MHz gap</span>
                        </div>
                        <div className="connector__line" />
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
    </>
  )
}