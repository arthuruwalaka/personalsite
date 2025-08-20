# Project Setup Guide

## Environment Configuration

This project uses EmailJS for contact form functionality. To set up the project:

### 1. EmailJS Setup

1. Go to [EmailJS](https://www.emailjs.com/) and create an account
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials

### 2. Environment Variables

Create a `.env` file in the root directory with your EmailJS credentials:

```bash
# EmailJS Configuration
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 3. Update Environment Files

Update the following files with your real credentials:

- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
ng serve
```

## Security Notes

- Never commit your `.env` file to version control
- The `.gitignore` file is configured to exclude sensitive files
- Environment files contain placeholder values for security
