<?php
require dirname(__FILE__).'/../vendor/autoload.php';

use App\Twig;
use App\Mail;
use App\Db;

$router = new AltoRouter();
$router->setBasePath('');

$router->map( 'GET', '/', function(){
    $twig = new Twig('base.html.twig');
    // $request = new Db();
    // $projects = $request->q('SELECT name, link, url_image, description, techno FROM projects');
    $twig->render([
        // 'projects' => $projects
    ]);
});

// Contact page
$router->map('POST', '/form-contact', function(){
    $mail = new Mail();
    echo $mail->hydrate();
});

// 404 Page __________________________________
$router->map('GET', '/[*]', function () {
    echo "cette page n'existe pas";
});



// Launch Routing
$match = $router->match();

if( is_array($match) && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    // no route was matched
    header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}