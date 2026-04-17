<?php
// УКАЖИТЕ РАБОЧИЙ EMAIL ПОЛУЧАТЕЛЯ
$to = 'zakaz@metallo-chpu.ru';
$subject = 'Новый запрос с сайта MetalHub';

$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

$boundary = md5((string) microtime(true));
$headers = "From: no-reply@metalhub.tech\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= "Имя: $name\n";
$body .= "Телефон: $phone\n";
$body .= "Email: $email\n\n";
$body .= "Сообщение:\n$message\n\n";

if (!empty($_FILES['attachment']['tmp_name']) && is_uploaded_file($_FILES['attachment']['tmp_name'])) {
    $fileName = basename($_FILES['attachment']['name']);
    $fileData = chunk_split(base64_encode(file_get_contents($_FILES['attachment']['tmp_name'])));
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
    $body .= $fileData . "\r\n";
}

$body .= "--$boundary--";

$success = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MetalHub — заявка отправлена</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="legal-page">
  <main>
    <div class="legal-card">
      <h1><?php echo $success ? 'Запрос отправлен' : 'Не удалось отправить запрос'; ?></h1>
      <p><?php echo $success ? 'Спасибо. Мы получили вашу заявку и свяжемся с вами после обработки.' : 'Проверьте настройки почты на сервере и адрес получателя в файле send.php.'; ?></p>
      <a class="btn btn-primary" href="index.html">Вернуться на сайт</a>
    </div>
  </main>
</body>
</html>
