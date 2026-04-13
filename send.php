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