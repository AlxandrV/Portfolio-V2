<?php
require dirname(__FILE__).'/../vendor/autoload.php';

use App\Twig;

$router = new AltoRouter();
$router->setBasePath('');

$router->map( 'GET', '/', function(){
    $twig = new Twig('base.html.twig');
    $twig->render();
});

//404 Page __________________________________
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