<?php
$PastaRaiz = 'painel';
define('DIRPAGE', "http://{$_SERVER['HTTP_HOST']}/{$PastaRaiz}");
if (substr($_SERVER['DOCUMENT_ROOT'], -1) == '/') {
  define('DIRREQ', "{$_SERVER['DOCUMENT_ROOT']}{$PastaRaiz}");
} else {
  define('DIRREQ', "{$_SERVER['DOCUMENT_ROOT']}/{$PastaRaiz}");
}

define('NOMESITE', "HR - PAINEL");

define('INDEX', $PastaRaiz);
define('DIRIMG', DIRPAGE . "/img/");
define('LOGO', DIRIMG . "logo_hr.png");
define('DIRCSS', DIRPAGE . "/css/");
define('MAINCSS', DIRCSS . "main.css");
define('DIRJS', DIRPAGE . "/js/");
define('DIRJQUERY', DIRJS . "jquery-3.7.1.min.js");
define('DIRBOOTSTRAP', DIRPAGE . "/bootstrap-5.3.3-dist/");


define('HOST', "10.0.0.1");
define('DB', "db1");
define('USER', "TI");
define('PASS', "T3cnologia20");


// define('HOST', "10.0.0.164");
// define('DB', "formularios");
// define('USER', "suporteti");
// define('PASS', "hrti@2022");