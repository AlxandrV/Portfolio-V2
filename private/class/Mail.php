<?php
namespace App;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mail
{

    public function hydrate()
    {
        // var_dump($_POST);
        $name = (!is_string($_POST['name'])) ? "name" : htmlspecialchars($_POST['name']) ;
        $email = (!is_string($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) ? "email" : htmlspecialchars($_POST['email']) ;
        $subject = (!is_string($_POST['subject'])) ? "subject" : htmlspecialchars($_POST['subject']) ;
        $message = (!is_string($_POST['message'])) ? "message" : htmlspecialchars($_POST['message']) ;

        if ($name == $_POST['name'] && $email == $_POST['email'] && $subject == $_POST['subject'] && $message == $_POST['message']) {

            $mail = new PHPMailer;
            $mail->isSMTP();
            $mail->SMTPDebug = 0;
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 587;
            $mail->SMTPAuth = true;
            $mail->Username = 'mail@mail.com';
            $mail->Password = '';
            $mail->setFrom('webmaster@mon-site.com', 'Webmaster');
            $mail->addReplyTo('webmaster@mon-site.com', 'Webmaster');
            $mail->addAddress('email@gmail.com', 'Nom du destinataire');
            $mail->Subject = $subject;
            $mail->Body = '
            From: ' . $name . ' / Email: ' . $email . '
            ' . $message;
            if ($mail->send()) {
                $toReturn = 'Message envoyé.';
            } else {
                $toReturn = 'Une erreur s\'est produite, merci de réessayer plus tard.';
            }

        } else {
            $toReturn = 'Un des champs est incorrect.';
        }

        return $toReturn;
    }

}