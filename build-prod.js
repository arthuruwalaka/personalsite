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
