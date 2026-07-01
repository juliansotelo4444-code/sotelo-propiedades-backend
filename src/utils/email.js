const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  })
};

const sendVerificationEmail = async (to, name, token) => {
  const transporter = createTransporter();
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
      <!-- Header rojo -->
      <div style="background: #CC0000; padding: 32px 40px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: -0.5px;">SOTELO</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 13px; letter-spacing: 4px;">PROPIEDADES</p>
      </div>
      <!-- Contenido -->
      <div style="padding: 40px; background: #ffffff; border: 1px solid #eeeeee;">
        <h2 style="color: #111111; margin: 0 0 16px;">Hola, ${name}!</h2>
        <p style="color: #555555; line-height: 1.7; margin: 0 0 24px;">
          Gracias por registrarte en Sotelo Propiedades. Para activar tu cuenta y empezar a publicar propiedades, 
          hacé clic en el botón de abajo.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${verifyUrl}" 
            style="display: inline-block; padding: 14px 36px; background: #CC0000; color: white; 
                    border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
            Verificar mi cuenta
          </a>
        </div>
        <p style="color: #999999; font-size: 13px; margin: 24px 0 0;">
          Este enlace expira en 24 horas. Si no creaste esta cuenta, ignorá este email.<br>
          O copiá este link: <a href="${verifyUrl}" style="color: #CC0000;">${verifyUrl}</a>
        </p>
      </div>
      <!-- Footer -->
      <div style="padding: 20px 40px; background: #f5f5f5; text-align: center;">
        <p style="color: #aaaaaa; font-size: 12px; margin: 0;">Sotelo Propiedades — Martillero Público</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Sotelo Propiedades" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verificá tu cuenta en Sotelo Propiedades',
    html,
  });
};

module.exports = { sendVerificationEmail };
