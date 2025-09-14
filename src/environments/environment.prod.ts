export const environment = {
  production: true,
  emailjsServiceId: process.env['EMAILJS_SERVICE_ID'] as string,
  emailjsTemplateId: process.env['EMAILJS_TEMPLATE_ID'] as string,
  emailjsPublicKey: process.env['EMAILJS_PUBLIC_KEY'] as string
};
