<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-05-24
 * version: 1.0.0
 * info: 连接数据库，创建数据库句柄$link
 */


$servername = "localhost";
$port = "3307";
$username = "root";
$password = "hello";
$db = "database2";

$link = mysqli_connect($servername.":".$port, $username, $password);
$res = mysqli_set_charset($link, 'utf8');

mysqli_query($link, "use ".$db);
?>
