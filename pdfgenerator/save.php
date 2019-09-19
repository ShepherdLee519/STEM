<?php

$post_data = $_POST["data"];

//打开文件
$filename = "./test.pdf";

//保存文件
file_put_contents($filename, base64_decode($post_data)); 
echo 1;

?>