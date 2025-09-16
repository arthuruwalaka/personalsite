const fs = require("fs");
const path = require("path");

// Read the environment file
const envPath = path.join(
  __dirname,
  "src",
  "environments",
  "environment.prod.ts"
);
let envContent = fs.readFileSync(envPath, "utf8");

// Debug: Log environment variables
console.log('Environment variables from Vercel:', {
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID ? 'SET' : 'NOT SET',
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID ? 'SET' : 'NOT SET',
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY ? 'SET' : 'NOT SET'
});

// Replace placeholders with environment variables
envContent = envContent.replace(
  "EMAILJS_SERVICE_ID_PLACEHOLDER",
  process.env.EMAILJS_SERVICE_ID || ""
);
envContent = envContent.replace(
  "EMAILJS_TEMPLATE_ID_PLACEHOLDER",
  process.env.EMAILJS_TEMPLATE_ID || ""
);
envContent = envContent.replace(
  "EMAILJS_PUBLIC_KEY_PLACEHOLDER",
  process.env.EMAILJS_PUBLIC_KEY || ""
);

// Write the updated file
fs.writeFileSync(envPath, envContent);

console.log("Environment variables replaced successfully");
