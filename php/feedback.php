<?php

$sendTo = 'mcrack@yandex.ru';
$secretKey = '6Le9gMEUAAAAAC4pmaKy6nOd8G3K1U2VZMT7XJwr';
$GoogleCapchaUrl = 'https://www.google.com/recaptcha/api/siteverify';

$errorCapchaNone = 'Заполните капчу';
$errorCapchaMessage = 'Капча отправлена не верно';

/* Параметры отправки формы */
$configs = [
    'to' => $sendTo,
    'site_name' => $_SERVER['REMOTE_ADDR']
];

$messages = [
    'missing_required_fields' => 'Вы не заполнили все необходимые поля',
    'success' => 'Данные успешно отправлены'
];

function sendPostCapcha($url, $secret, $response){
    $data = array('secret' => $secret, 'response' => $response, 'remoteip' => $_SERVER['REMOTE_ADDR']);

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) { 
        return false;
    } else {
        return true;
    }
}

function sendFeedback($post, $configs, $messages){

    if ((!empty($post['name'])) and (!empty($post['email'])) and (!empty($post['message']))) {

        $name = trim(strip_tags($post['name']));
        $email = trim(strip_tags($post['email']));
        $message = trim(strip_tags($post['message']));

        mail($configs['to'],
            'Письмо c сайта: ' . $configs['site_name'],
            'Вам написал: ' . $name . '<br />' .
            'Его email: ' . $email . '<br />' .
            'Его сообщение: ' . $message,
            "Content-type:text/html;charset=UTF-8"
        );

        $message = [
            'type' => 'success',
            'message' => $messages['success']
        ];
        return $message;
    } else {
        $message = [
            'type' => 'error',
            'message' => $messages['missing_required_fields']
        ];
        return $message;
    }
}

if($_POST){

    if(!$_POST['g-recaptcha-response']){
        $result = [
            'type' => 'error',
            'message' => $errorCapchaNone
        ];

        showResult($result);
    }

    $g_response = $_POST['g-recaptcha-response'];
    $capchaResult = sendPostCapcha($GoogleCapchaUrl, $secretKey, $g_response);

    if($capchaResult === true){
        $result = sendFeedback($_POST, $configs, $messages);
    } else {
        $result = [
            'type' => 'error',
            'message' => $errorCapchaMessage
        ];
    }

    showResult($result);
}

function showResult($result){
    //die(json_encode($result));
    die($result['message']);
}