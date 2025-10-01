import { envEmailConfig } from "@/config/envEmailConfig";
import nodemailer, { Transporter } from "nodemailer";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envEmailConfig.host,
      port: Number(envEmailConfig.port),
      secure: Number(envEmailConfig.port) === 465,
      auth: {
        user: envEmailConfig.email_user,
        pass: envEmailConfig.api_pass,
      },
    });
  }

  async sendWelcomeEmail(id:number,name: string, apellido: string, email: string) {
    try {
      await this.transporter.sendMail({
        from: '"Generador de CV 📄" <noreply@proyect-cv.com>',
        to: envEmailConfig.email_send,
        subject: "Bienvenido",
        html: `<h1>Nuevo Registro ${name}, bienvenido!</h1>`,
      });
    } catch (error) {
      console.error("Error enviando email", error);
    }
  }
}
