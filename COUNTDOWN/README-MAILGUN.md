# 🚀 Mr. ORK Landing Page con Auto-Email Mailgun

## 📋 Setup Rapido

### 1. Installa le dipendenze
```bash
npm install
```

### 2. Configura Mailgun
Modifica il file `mailgun-config.js` con le tue credenziali:

```javascript
const MAILGUN_CONFIG = {
  user: 'postmaster@tuo-dominio-mailgun.com',    // ✏️ Sostituisci
  password: 'la-tua-password-smtp-mailgun',       // ✏️ Sostituisci
  fromEmail: '"Mr. ORK" <noreply@tuo-dominio.com>', // ✏️ Sostituisci
  // ...
};
```

### 3. Aggiungi la guida PDF
Metti il file PDF della guida in:
```
assets/guida-trading.pdf
```

### 4. Avvia il server
```bash
npm start
```

### 5. Testa tutto
1. Vai su `http://localhost:3000`
2. Compila il form con una tua email
3. Controlla se ricevi l'email con la guida

## 🔧 Come Funziona

1. **User compila form** → Dati inviati a `/submit-form`
2. **Server riceve dati** → Invia email automatica con Mailgun
3. **Email contiene**: Guida PDF + messaggio personalizzato
4. **User riceve email** → Può scaricare la guida
5. **Redirect a thank-you** → Conferma completamento

## 📧 Credenziali Mailgun

Per ottenere le credenziali SMTP di Mailgun:

1. **Login** su [mailgun.com](https://mailgun.com)
2. **Vai su "Sending"** → "Domain settings"
3. **Clicca "SMTP"** → Copia le credenziali
4. **Incolla in** `mailgun-config.js`

## 🎯 Personalizzazioni

- **Template email**: Modifica `getEmailTemplate()` in `server.js`
- **PDF guida**: Sostituisci `assets/guida-trading.pdf`
- **Messaggio successo**: Modifica `index.html` 
- **Analytics**: Già configurato con tracking events

## 🚨 Note Importanti

- ⚠️ **NON** committare `mailgun-config.js` con credenziali reali
- 🔒 In produzione usa variabili ambiente per le password
- 📧 Testa sempre con email vere prima di andare live
- 📊 Controlla i log Mailgun per delivery status

## 🌐 Deploy in Produzione

1. **Hosting**: Vercel, Heroku, DigitalOcean, etc.
2. **Variabili ambiente** per credenziali Mailgun
3. **HTTPS** obbligatorio per form submission
4. **Dominio** configurato in Mailgun
