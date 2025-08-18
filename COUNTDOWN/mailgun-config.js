// Configurazione Mailgun - PERSONALIZZA QUESTI DATI
const MAILGUN_CONFIG = {
  // Le tue credenziali Mailgun SMTP
  host: 'smtp.mailgun.org',
  port: 587,
  user: 'postmaster@your-mailgun-domain.com', // Sostituisci con il tuo dominio
  password: 'your-mailgun-smtp-password',      // Sostituisci con la tua password
  
  // Configurazione email
  fromEmail: '"Mr. ORK Trading Academy" <noreply@your-domain.com>',
  subject: '🎯 La tua guida "I 5 Errori Fatali del Trader" è qui!',
  
  // URL della guida (se ospitata online)
  guideUrl: 'https://your-domain.com/assets/guida-trading.pdf',
  
  // Percorso locale del PDF (se allegato)
  localPdfPath: './assets/guida-trading.pdf'
};

module.exports = MAILGUN_CONFIG;
