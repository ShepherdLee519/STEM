<?php

$FILE_PATH = "C:/stem/localData/";
$post_data = $_POST["data"];
is_dir($FILE_PATH) or mkdir($FILE_PATH, 0777, true);//文件夹不存在则创建
$filename = "C:/stem/localData/data.json";
file_put_contents($filename, json_encode($post_data)); 
echo 1;

?>