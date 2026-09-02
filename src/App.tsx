import { Countdown } from './components/Countdown'
import { EventDetails } from './components/EventDetails'
import { Header, Hero } from './components/Hero'
import { Footer, RSVP } from './components/RSVP'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Countdown />
        <EventDetails />
        <RSVP />
      </main>
      <Footer />
    </>
  )
}

export default App
