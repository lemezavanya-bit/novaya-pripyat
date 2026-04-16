<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);
    $to = "novayapripyat@mail.ru";
    $subject = "Заявка с сайта от " . $name;
    $body = "Имя: $name\nТелефон: $phone\nСообщение:\n$message";
    $headers = "From: no-reply@novaya-pripyat.by\r\n";
    $headers .= "Reply-To: $to\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "Метод не разрешён";
}
?>


<?php
// ============================================
// ОТПРАВКА СООБЩЕНИЙ ИЗ ФОРМЫ В TELEGRAM
// ============================================

// Настройки Telegram бота
$botToken = '8333740311:AAE_Sy9LdaTtVfHmxNReA4Og0yLEMSBPyvY';
$chatId = '849172302';

// Получаем данные из формы
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Проверяем обязательные поля
if (empty($name) || empty($phone)) {
    echo 'error';
    exit;
}

// Формируем сообщение
$text = "📬 <b>Новое сообщение с сайта!</b>\n\n";
$text .= "👤 <b>Имя:</b> " . htmlspecialchars($name) . "\n";
$text .= "📞 <b>Телефон:</b> " . htmlspecialchars($phone) . "\n";
if (!empty($message)) {
    $text .= "💬 <b>Сообщение:</b> " . htmlspecialchars($message) . "\n";
}
$text .= "\n🕐 " . date('d.m.Y H:i:s');

// Отправляем в Telegram
$url = "https://api.telegram.org/bot{$botToken}/sendMessage";

$data = [
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'HTML'
];

$options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result !== false) {
    echo 'ok';
} else {
    echo 'error';
}
?>
