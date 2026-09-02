# Partecipazione Matrimonio

Sito web frontend per la partecipazione al matrimonio — React, TypeScript, Vite e Tailwind CSS.

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Contenuti

Modifica i testi e i dettagli dell'evento in `src/data/wedding.ts`.

## Deploy

Il deploy su **GitHub Pages** avviene automaticamente ad ogni push su `main` tramite GitHub Actions (`.github/workflows/deploy.yml`).

### Primo deploy — passi manuali su GitHub

1. Crea il repository su GitHub (es. `partecipazione-matrimonio-ale`)
2. Push del codice (vedi sotto)
3. Su GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**
4. Dopo il primo push su `main`, il workflow pubblicherà il sito

URL finale: `https://<tuo-username>.github.io/partecipazione-matrimonio-ale/`

## Push su GitHub

```bash
git remote add origin https://github.com/<tuo-username>/partecipazione-matrimonio-ale.git
git push -u origin main
```
