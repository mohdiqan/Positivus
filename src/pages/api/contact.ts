import nodemailer from "nodemailer";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const message = data.get("message") as string;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    ignoreTLS: false,
    auth: {
      user: "jamywardy636@gmail.com", // replace with your admin email
      pass: "zstr hhha accm tzmc",
    },
  });

  // const mailOptions = {
  //   from: email,
  //   to: "mohdiqan123@gmail.com", // admin email to receive contact form mails
  //   subject: `New message from ${name}`,
  //   text: message,
  // };
  const mailOptions = {
    from: "jamywardy636@gmail.com", // fixed authenticated sender
    to: "connect@zindimusemedia.com",
    replyTo: email, // user's email for reply
    subject: `New message from ${name}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}\n\nBest regards,\nYour Website Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
};
