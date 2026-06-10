import { Resend } from 'resend';

const prerender = false;
const POST = async ({ request }) => {
  const resend = new Resend("re_W3k599e1_KyVUgx7Bruz7FwbUrZeymGR6");
  const data = await request.formData();
  const name = data.get("from_name");
  const email = data.get("reply_to");
  const message = data.get("message");
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["pandugamanojkumar9@gmail.com"],
    subject: `New message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    replyTo: email
  });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
