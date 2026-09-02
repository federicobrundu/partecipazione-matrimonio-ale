export const weddingConfig = {
  bride: 'Alessandra',
  groom: 'Andrea',
  date: '25 GIUGNO 2027',
  ceremony: {
    title: 'Cerimonia',
    venue: 'Santuario Maria SS. di Loreto',
    address: 'Santuario Maria SS. di Loreto, 03035 Fontana Liri',
    time: 'La celebrazione inizierà per le ore 17.00',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Santuario+Maria+SS.+di+Loreto,+03035+Fontana+Liri+FR',
    imageAlt: 'Illustrazione del Santuario Maria SS. di Loreto a Fontana Liri',
  },
  reception: {
    title: 'Ricevimento',
    venue: 'Greenpark Events',
    address: 'Strada Statale 628, 03037 Pontecorvo',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Greenpark+Events,+Strada+Statale+628,+03037+Pontecorvo+FR',
    imageAlt: 'Illustrazione del parco Greenpark Events a Pontecorvo',
  },
  details: {
    title: 'Dettagli',
    rsvpIntro:
      'Vi chiediamo gentilmente di confermare la vostra presenza entro il 30 Maggio 2027 contattando:',
    contacts: [
      { name: 'Andrea', phone: '389 425 4661', tel: '+393894254661' },
      { name: 'Alessandra', phone: '346 514 9993', tel: '+393465149993' },
    ],
    giftMessage:
      'Il regalo più grande per noi sarà condividere con voi questo giorno speciale. Per chi volesse, può contribuire al nostro progetto di vita insieme ❤️',
    accountHolder: 'BRUNDU ALESSANDRA MOLLICONE ANDREA ANTONIO',
    iban: 'IT59D0538703229000004117638',
  },
} as const
