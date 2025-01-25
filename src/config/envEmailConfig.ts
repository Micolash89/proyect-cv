
export const  envEmailConfig = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    api_pass: process.env.GOOGLE_EMAIL_PASS,
    email_user: process.env.PUBLIC_EMAIL_USER,
    port: Number(process.env.PORT) || 587 ,
    email_send: process.env.EMAIL_SEND,
}