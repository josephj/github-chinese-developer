<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<title>兩岸三地的 Github 開發者</title>
<meta name="author" content="josephj">
<?php
require_once "lib/static-loader/StaticLoader.php";
$loader = new StaticLoader("./conf/static-loader/config.php");
$loader->set("_filter", "_list", "_info");
echo $loader->load();
?>
</head>
<body>
