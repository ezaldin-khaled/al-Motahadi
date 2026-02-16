<?php
/**
 * Contact / booking form endpoint.
 * POST: sends email via SMTP to contact@almotahadi.com
 * Accepts JSON or application/x-www-form-urlencoded.
 *
 * Fields (any of):
 *   - first_name, last_name  OR  full_name
 *   - email (required)
 *   - phone
 *   - message
 */

// CORS: allow frontend origin
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Load config (copy config.sample.php to config.php)
$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration error']);
    exit;
}
$config = require $configPath;

// Optional CORS restrict by origin
if (!empty($config['cors_origins'])) {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $config['cors_origins'], true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
}

// Parse body (JSON or form)
$input = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true) ?? [];
} else {
    $input = $_POST;
}

// Normalize: support both "first_name + last_name" and "full_name"
$firstName = trim((string) ($input['first_name'] ?? ''));
$lastName  = trim((string) ($input['last_name'] ?? ''));
$fullName  = trim((string) ($input['full_name'] ?? ''));
if ($fullName === '' && ($firstName !== '' || $lastName !== '')) {
    $fullName = trim($firstName . ' ' . $lastName);
}
$email  = trim((string) ($input['email'] ?? ''));
$phone  = trim((string) ($input['phone'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));

// Validate
$errors = [];
if ($fullName === '') {
    $errors[] = 'Name is required';
}
if ($email === '') {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address';
}
if (strlen($message) > 10000) {
    $errors[] = 'Message too long';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode('. ', $errors)]);
    exit;
}

// Sanitize for email
$fullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$toEmail = $config['to_email'] ?? 'contact@almotahadi.com';
$fromEmail = $config['from_email'] ?? $toEmail;
$fromName = $config['from_name'] ?? 'Al Motahadi';

// Send via PHPMailer (SMTP) or PHP mail() fallback
$subject = 'Contact form: ' . $fullName;
$bodyPlain = "Name: $fullName\nEmail: $email\nPhone: " . ($phone ?: '(not provided)') . "\n\nMessage:\n$message";
$bodyHtml = sprintf(
    "<p><strong>Name:</strong> %s</p>\n<p><strong>Email:</strong> %s</p>\n<p><strong>Phone:</strong> %s</p>\n<p><strong>Message:</strong></p>\n<p>%s</p>",
    $fullName,
    $email,
    $phone ?: '(not provided)',
    nl2br($message)
);

$sent = false;
$autoload = __DIR__ . '/vendor/autoload.php';

if (is_file($autoload)) {
    try {
        require_once $autoload;
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = $config['smtp_host'] ?? 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_user'] ?? $fromEmail;
        $mail->Password   = $config['smtp_pass'] ?? '';
        $mail->SMTPSecure = $config['smtp_secure'] ?? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = (int) ($config['smtp_port'] ?? 587);
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($toEmail);
        $mail->addReplyTo($email, $fullName);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $bodyHtml;
        $mail->AltBody = $bodyPlain;

        $mail->send();
        $sent = true;
    } catch (Exception $e) {
        error_log('Contact form PHPMailer error: ' . $e->getMessage());
    }
}

// Fallback: PHP mail() (Hostinger often sends via SMTP for your domain)
if (!$sent) {
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $fromName . ' <' . $fromEmail . '>',
        'Reply-To: ' . $fullName . ' <' . $email . '>',
        'X-Mailer: PHP/' . PHP_VERSION,
    ];
    $sent = @mail($toEmail, $subject, $bodyHtml, implode("\r\n", $headers));
}

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send message. Please try again or contact us directly.']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Thank you. Your message has been sent.']);
