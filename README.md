# Presentazione

Taskly è una web-app pensata per organizzare al meglio le tue attività quotidiane.
Con Taskly puoi creare liste personalizzate di task, ognuna arricchita da un’immagine
di copertina per renderla più riconoscibile e visivamente accattivante.
All’interno di ogni lista puoi aggiungere una check-list di attività, spuntare quelle
completate e tenere sempre sotto controllo i tuoi progressi.
Che si tratti di lavoro, studio o vita personale, Taskly ti offre un modo semplice e
intuitivo per strutturare le tue giornate.

[Provala subito!](https://falemitroz.github.io/Taskly/)

> **Nota importante:** Questo link permette di testare la web-app usando il local storage del browser.  
> I dati creati sono temporanei e disponibili solo sul dispositivo in cui sono stati generati.
>
> Per eliminare tutti i dati salvati, accedi, vai nella pagina **Profile** e cancella definitivamente l'account.

---

## Settaggio iniziale

1. Aprire il terminale nella cartella principale del progetto e installare le dipendenze con i seguenti comandi:

```bash
cd client && npm install
```

```bash
cd ../server && npm install
```

```bash
cd ..
```

2. Creare i file .env per il client e il server. Puoi crearli manualmente oppure eseguire i comandi seguenti:

```bash
cd client && touch .env
```

```bash
cd ../server && touch .env
```

```bash
cd ..
```

3. Inserire le variabili d'ambiente nei rispettivi file:

```bash
# /client/.env
REACT_APP_API_URL_LOCAL=http://localhost:<your_server_port>
REACT_APP_API_URL_MOBILE=http://192.168.x.x:<your_server_port>
REACT_APP_USE_MOCK=false
```

```bash
# /server/.env
JWT_SECRET=<your_jwt_secret>

DB_USERNAME=<your_db_username>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_db_name>
DB_HOST=<your_db_host>
DB_DIALECT=postgres

PORT=5000
CLIENT_URL_LOCAL=http://localhost:<your_client_port>
CLIENT_URL_MOBILE=http://192.168.x.x:<your_client_port>
```

> Sostituisci i valori tra parentesi angolari e "192.168.x.x" con le informazioni corrispondenti al tuo computer e alla tua rete locale.

---

## Modalità d'esecuzione

- **Default:** client e server comunicano tramite localhost.
- **Mobile:** come Default, ma il server accetta richieste anche da altri dispositivi sulla stessa rete locale.
- **Mock:** viene avviato solo il client, utilizzando dati mock per simulare le chiamate al backend.

### Comandi d'avvio

> Aprire due terminali separati per client e server, quindi eseguire i comandi corrispondenti alla modalità desiderata:

1. **Default**

```bash
npm start
```

oppure

```bash
npm run start
```

2. **Mobile**

```bash
npm run start:mobile
```

3. **Mock** (il server non deve essere avviato)

```bash
npm run start:mock
```

> oppure tramite il link fornito con la presentazione.
