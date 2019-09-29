<?php

$FILE_PATH = "./localData/";
$post_data = $_POST["data"];

is_dir($FILE_PATH) or mkdir($FILE_PATH, 0777, true);//文件夹不存在则创建


//打开文件
$filename = "./localData/data.json";
$file = file_get_contents($filename);

//保存文件
file_put_contents($filename, json_encode($post_data, JSON_UNESCAPED_UNICODE)); 
echo 1;

?>