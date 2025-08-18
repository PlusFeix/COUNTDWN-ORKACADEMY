const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const MAILGUN_CONFIG = require('./mailgun-config');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// Configurazione Mailgun SMTP
const transporter = nodemailer.createTransport({
  host: MAILGUN_CONFIG.host,
  port: MAILGUN_CONFIG.port,
  secure: false,
  auth: {
    user: MAILGUN_CONFIG.user,
    pass: MAILGUN_CONFIG.password
  }
});

// Template email HTML
const getEmailTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>La tua guida "I 5 Errori Fatali del Trader"</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0a0a0a, #0d1b0d); color: #fff; padding: 30px; border-radius: 15px;">
    <h1 style="color: #00ff64; text-align: center;">🎉 Benvenuto nella Mr. ORK Trading Academy!</h1>
    
    <p>Ciao <strong>${name}</strong>,</p>
    
    <p>Grazie per aver riservato il tuo posto VIP! Come promesso, ecco la tua guida gratuita:</p>
    
    <div style="background: rgba(0,255,100,0.1); border: 1px solid #00ff64; border-radius: 10px; padding: 20px; margin: 20px 0;">
      <h2 style="color: #00ff64;">📚 "I 5 Errori Fatali del Trader"</h2>
      <p>Scopri gli errori che il 90% dei trader commette senza saperlo e che distruggono i loro profitti.</p>
      <a href="https://your-domain.com/guida-trading.pdf" 
         style="background: #00ff64; color: #000; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-top: 10px;">
        📥 SCARICA LA GUIDA
      </a>
    </div>
    
    <h3 style="color: #00ff64;">🔥 Il tuo posto VIP è confermato!</h3>
    <p>Sei tra i primi 50 trader selezionati per accedere alla nostra academy esclusiva.</p>
    
    <div style="background: rgba(0,255,100,0.05); padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h4>Cosa succede ora:</h4>
      <ul>
        <li>✅ Studia attentamente la guida</li>
        <li>🎯 Implementa le strategie anti-errore</li>
        <li>📧 Aspetta l'email per l'apertura dei posti</li>
        <li>🚀 Preparati a trasformare il tuo trading</li>
      </ul>
    </div>
    
    <p style="text-align: center; margin-top: 30px;">
      <strong>Mr. ORK Trading Academy</strong><br>
      <small>Il trading professionale a portata di click</small>
    </p>
  </div>
</body>
</html>
`;

// Route per gestire la submission del form
app.post('/submit-form', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    console.log(`📧 Invio email a: ${email} (${name})`);
    
    // Configurazione email
    const mailOptions = {
      from: MAILGUN_CONFIG.fromEmail,
      to: email,
      subject: MAILGUN_CONFIG.subject,
      html: getEmailTemplate(name),
      // Opzionale: allegato PDF
      attachments: [
        {
          filename: 'guida-5-errori-fatali-trader.pdf',
          path: MAILGUN_CONFIG.localPdfPath // Percorso al tuo PDF
        }
      ]
    };
    
    // Invio email
    await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email inviata con successo a ${email}`);
    
    // Risposta di successo
    res.json({ 
      success: true, 
      message: 'Email inviata con successo!' 
    });
    
  } catch (error) {
    console.error('❌ Errore invio email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore nell\'invio dell\'email' 
    });
  }
});

// Route per servire la pagina principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Mailgun SMTP configurato`);
});
