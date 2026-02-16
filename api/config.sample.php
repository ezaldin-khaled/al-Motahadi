<?php
/**
 * Copy this file to config.php and fill in your Hostinger SMTP details.
 * Do not commit config.php (it is in .gitignore).
 */

return [
    // Recipient: all contact/booking emails go here
    'to_email' => 'contact@almotahadi.com',
    'from_email' => 'contact@almotahadi.com',
    'from_name' => 'Al Motahadi Rehabilitation Center',

    // Hostinger SMTP (use your domain's email account)
    // In Hostinger: Email Accounts → create contact@almotahadi.com → use that password
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_user' => 'contact@almotahadi.com',
    'smtp_pass' => 'YOUR_EMAIL_PASSWORD',

    // Optional: allow specific origins (leave empty to allow any; set in production for security)
    'cors_origins' => [],
];
