
import nodemailer from "nodemailer";

export default async function handler(req, res){
  if(req.method!=='POST') return res.status(405).send("Method not allowed");
  const {name,email,message}=req.body;
  if(!name||!email||!message) return res.status(400).send("Alla fält krävs");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}
  });
  try{
    await transporter.sendMail({
      from:`"Webbkontakt" <${process.env.SMTP_USER}>`,
      to:process.env.RECEIVER_EMAIL,
      subject:"Ny kontaktförfrågan",
      text:`Namn: ${name}
E-post: ${email}

${message}`
    });
    res.status(200).send("Meddelandet skickades.");
  }catch(e){res.status(500).send("Fel vid sändning.");}
}
