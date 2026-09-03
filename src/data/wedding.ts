import chiesaImg from '../assets/chiesa.jpeg'
import locationImg from '../assets/location.jpeg'

export const weddingConfig = {
  bride: 'Alessandra',
  groom: 'Andrea',
  date: '25 GIUGNO 2027',
  dateIso: '2027-06-25T17:00:00+02:00',
  hashtag: '#AlessandraAndrea2027',

  // Opzionale: aggiungi src/assets/coppia.jpeg e imposta il path
  couplePhoto: null as string | null,

  timeline: {
    title: 'Programma della giornata',
    items: [
      { time: '17.00', label: 'Cerimonia', detail: 'Santuario Maria SS. di Loreto' },
      { time: '19.00', label: 'Aperitivo di benvenuto', detail: 'Greenpark Events' },
      { time: '20.30', label: 'Cena e festa', detail: 'Greenpark Events' },
    ],
  },

  ceremony: {
    title: 'Cerimonia',
    venue: 'Santuario Maria SS. di Loreto',
    address: 'Santuario Maria SS. di Loreto, 03035 Fontana Liri',
    time: 'La celebrazione inizierà per le ore 17.00',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Santuario+Maria+SS.+di+Loreto,+03035+Fontana+Liri+FR',
    image: chiesaImg,
    imageAlt: 'Illustrazione del Santuario Maria SS. di Loreto a Fontana Liri',
  },

  reception: {
    title: 'Ricevimento',
    venue: 'Greenpark Events',
    address: 'Strada Statale 628, 03037 Pontecorvo',
    time: 'Aperitivo dalle ore 19.00 · Cena dalle ore 20.30',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Greenpark+Events,+Strada+Statale+628,+03037+Pontecorvo+FR',
    image: locationImg,
    imageAlt: 'Illustrazione del parco Greenpark Events a Pontecorvo',
  },

  practicalInfo: {
    parking: {
      title: 'Parcheggio',
      text: 'Parcheggio gratuito disponibile presso la location del ricevimento.',
    },
  },

  details: {
    title: 'Dettagli',
    rsvpIntro:
      'Vi chiediamo gentilmente di confermare la vostra presenza entro il 30 Maggio 2027.',
    rsvpDeadline: '30 Maggio 2027',
    // Opzionale: endpoint Formspree (es. https://formspree.io/f/xxxxx)
    formEndpoint: '',
    whatsappRsvp: '+393465149993',
    giftMessage:
      'Il regalo più grande per noi sarà condividere con voi questo giorno speciale. Per chi volesse, può contribuire al nostro progetto di vita insieme.',
    accountHolder: 'BRUNDU ALESSANDRA MOLLICONE ANDREA ANTONIO',
    iban: 'IT59D0538703229000004117638',
  },
} as const
