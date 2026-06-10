import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const data = await request.formData();
  const name = data.get("from_name") as string;
  const email = data.get("reply_to") as string;
  const message = data.get("message") as string;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [import.meta.env.CONTACT_EMAIL],
    subject: `New message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    replyTo: email,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
