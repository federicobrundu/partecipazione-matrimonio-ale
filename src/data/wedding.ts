export const weddingConfig = {
  bride: 'Alessandra',
  groom: 'Marco',
  tagline: 'Siamo felici di condividere con voi il giorno più importante della nostra vita',
  date: '15 Giugno 2026',
  dateISO: '2026-06-15T15:30:00',
  locations: {
    ceremony: {
      title: 'Cerimonia',
      name: 'Chiesa di San Giovanni',
      address: 'Via Roma 1, Città',
      time: '15:30',
      mapsUrl: 'https://maps.google.com',
    },
    reception: {
      title: 'Ricevimento',
      name: 'Villa dei Fiori',
      address: 'Strada Provinciale 10, Città',
      time: '18:00',
      mapsUrl: 'https://maps.google.com',
    },
  },
  dressCode: 'Elegante — toni naturali e colori pastello benvenuti',
  rsvp: {
    deadline: '30 Aprile 2026',
    formUrl: '', // Inserire link Google Form o simile
    email: 'rsvp@example.com',
  },
  gallery: [] as string[], // URL immagini da Canva/export
  socialHashtag: '#AleMarco2026',
}
