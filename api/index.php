<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
$maintenance = __DIR__.'/../storage/framework/maintenance.php';
if (file_exists($maintenance)) {
    require $maintenance;
}

// Register the Composer autoloader...
$autoload = __DIR__.'/../vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(500);
    die('Composer dependencies not installed. Please run: composer install');
}

require $autoload;

// Bootstrap Laravel and handle the request...
$bootstrap = __DIR__.'/../bootstrap/app.php';
if (!file_exists($bootstrap)) {
    http_response_code(500);
    die('Laravel bootstrap file not found.');
}

/** @var Application $app */
$app = require_once $bootstrap;

try {
    $app->handleRequest(Request::capture());
} catch (\Throwable $e) {
    // Log error but don't expose sensitive information in production
    if (env('APP_DEBUG', false)) {
        throw $e;
    }
    http_response_code(500);
    die('Application error occurred.');
}

