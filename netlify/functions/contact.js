const nodemailer = require('nodemailer');
const { google } = require('googleapis');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, preferredDate, companyName, website, meetingPurpose } = data;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !companyName || !meetingPurpose) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Format the date nicely
    const formattedDate = new Date(preferredDate).toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Create event dates for 10:00 AM - 11:00 AM (Europe/Paris)
    const eventDate = new Date(preferredDate);
    eventDate.setHours(10, 0, 0, 0);
    
    const endDate = new Date(eventDate);
    endDate.setHours(11, 0, 0, 0);

    // Generate "Add to Google Calendar" link for the client
    // Format: YYYYMMDDTHHMMSS (local time, without Z to avoid UTC conversion)
    const formatDateForGCal = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    };
    
    const eventTitle = encodeURIComponent(`Rendez-vous Vexaai - Discussion ${companyName}`);
    const eventDetails = encodeURIComponent(`Rendez-vous avec l'équipe Vexaai pour discuter de vos besoins en automatisation IA.\n\nEntreprise: ${companyName}\nSujet: ${meetingPurpose}`);
    const eventLocation = encodeURIComponent('Réunion en ligne (lien à venir)');
    
    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${formatDateForGCal(eventDate)}/${formatDateForGCal(endDate)}&details=${eventDetails}&location=${eventLocation}&ctz=Africa/Algiers`;

    let calendarEventCreated = false;

    // 1. First, create Google Calendar event
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      try {
        const auth = new google.auth.JWT(
          process.env.GOOGLE_CLIENT_EMAIL,
          null,
          process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          ['https://www.googleapis.com/auth/calendar']
        );

        const calendar = google.calendar({ version: 'v3', auth });

        const event = {
          summary: `📞 RDV Vexaai - ${companyName} (${name})`,
          description: `
Contact: ${name}
Email: ${email}
Téléphone: ${phone}
Entreprise: ${companyName}
Site web: ${website || 'Non renseigné'}

Objectif du rendez-vous:
${meetingPurpose}
          `.trim(),
          start: {
            dateTime: eventDate.toISOString(),
            timeZone: 'Africa/Algiers'
          },
          end: {
            dateTime: endDate.toISOString(),
            timeZone: 'Africa/Algiers'
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 30 }
            ]
          }
        };

        const createdEvent = await calendar.events.insert({
          calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
          resource: event
        });

        calendarEventCreated = true;

      } catch (calendarError) {
        console.error('Google Calendar error:', calendarError);
      }
    }

    // 2. Send notification email to Vexaai team
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `🗓️ Nouvelle demande de rendez-vous - ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF301A; border-bottom: 2px solid #FF301A; padding-bottom: 10px;">
            Nouvelle demande de rendez-vous
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">📋 Informations du contact</h3>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Date préférée:</strong> ${formattedDate}</p>
          </div>
          
          <div style="background: #fff3f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">🏢 Informations de l'entreprise</h3>
            <p><strong>Entreprise:</strong> ${companyName}</p>
            <p><strong>Site web:</strong> ${website ? `<a href="${website}">${website}</a>` : 'Non renseigné'}</p>
          </div>
          
          <div style="background: #f0f7ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">💬 Objectif du rendez-vous</h3>
            <p style="white-space: pre-wrap;">${meetingPurpose}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Cet email a été envoyé automatiquement depuis le formulaire de contact Vexaai.
          </p>
        </div>
      `
    };

    await transporter.sendMail(adminMailOptions);

    // 3. Send confirmation email to the client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `✅ Confirmation de votre demande de rendez-vous - Vexaai`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #FF301A; margin: 0;">Vexaai</h1>
            <p style="color: #666;">L'IA Qui Transforme Votre Entreprise</p>
          </div>
          
          <h2 style="color: #333;">Bonjour ${name},</h2>
          
          <p>Merci pour votre demande de rendez-vous ! Nous avons bien reçu votre demande et nous vous contacterons très prochainement pour confirmer le créneau.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #FF301A; margin-top: 0;">📅 Récapitulatif</h3>
            <p><strong>Date souhaitée:</strong> ${formattedDate}</p>
            <p><strong>Heure proposée:</strong> 10h00 - 11h00</p>
            <p><strong>Entreprise:</strong> ${companyName}</p>
            <p><strong>Sujet:</strong></p>
            <p style="white-space: pre-wrap;">${meetingPurpose}</p>
          </div>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h3 style="color: #1a73e8; margin-top: 0;">📆 Ajouter à votre calendrier</h3>
            <p>Bloquez ce créneau dans votre agenda :</p>
            <a href="${googleCalendarLink}" target="_blank" style="display: inline-block; background: #1a73e8; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px 0;">
              📅 Ajouter à Google Calendar
            </a>
          </div>
          
          <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #e65100; margin-top: 0;">📞 Prochaines étapes</h3>
            <p>Notre équipe va examiner votre demande et vous enverra :</p>
            <ul>
              <li>Une confirmation de la date et l'heure définitives</li>
              <li>Le lien pour rejoindre la réunion vidéo</li>
            </ul>
          </div>
          
          <p>Si vous avez des questions en attendant, n'hésitez pas à nous contacter à <a href="mailto:${process.env.EMAIL_USER}" style="color: #FF301A;">${process.env.EMAIL_USER}</a></p>
          
          <p>À très bientôt !</p>
          <p><strong>L'équipe Vexaai</strong></p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="color: #666; font-size: 14px; margin-bottom: 15px;">Suivez-nous sur les réseaux sociaux</p>
            <a href="https://www.instagram.com/vexa__ai" target="_blank" style="display: inline-block; margin: 0 10px;">
              <img src="https://cdn-icons-png.flaticon.com/32/2111/2111463.png" alt="Instagram" width="32" height="32" style="border-radius: 6px;">
            </a>
            <a href="https://www.facebook.com/people/VexaAi/61583050565770/?locale=fr_FR" target="_blank" style="display: inline-block; margin: 0 10px;">
              <img src="https://cdn-icons-png.flaticon.com/32/733/733547.png" alt="Facebook" width="32" height="32">
            </a>
            <a href="https://www.linkedin.com/company/vexaia/" target="_blank" style="display: inline-block; margin: 0 10px;">
              <img src="https://cdn-icons-png.flaticon.com/32/3536/3536505.png" alt="LinkedIn" width="32" height="32">
            </a>
          </div>
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            Cet email a été envoyé automatiquement suite à votre demande sur vexaai.com
          </p>
        </div>
      `
    };

    await transporter.sendMail(clientMailOptions);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Rendez-vous enregistré avec succès!'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Une erreur est survenue',
        details: error.message 
      })
    };
  }
};
