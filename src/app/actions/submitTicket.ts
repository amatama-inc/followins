"use server";

import { Resend } from 'resend';

// Only instantiate Resend if the API key is present
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitTicket(formData: FormData) {
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const category = formData.get('category') as string;
  const message = formData.get('message') as string;

  if (!email || !message) {
    return { success: false, error: 'Email and message are required' };
  }

  const subject = `[Support] ${category} - from ${username || email}`;
  const textBody = `
New support ticket submitted:

Category: ${category}
Email: ${email}
Instagram Username: ${username || 'N/A'}

Message:
${message}
  `;

  try {
    if (resend) {
      await resend.emails.send({
        from: 'Support Ticket <support@followins.app>', // Update this with your verified domain
        to: 'amatama.inc@gmail.com', // Sending to the support address
        replyTo: email,
        subject: subject,
        text: textBody,
      });
      return { success: true };
    } else {
      // Mock success for now, log to console
      console.log('--- MOCK EMAIL SEND ---');
      console.log('To: amatama.inc@gmail.com');
      console.log('Subject:', subject);
      console.log('Body:', textBody);
      console.log('-------------------------');
      console.log('Please set RESEND_API_KEY to send actual emails.');
      
      return { success: true, mock: true };
    }
  } catch (error) {
    console.error('Error submitting ticket:', error);
    return { success: false, error: 'Failed to submit the support ticket. Please try again later.' };
  }
}
