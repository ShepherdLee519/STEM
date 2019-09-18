<?php

$FILE_PATH = "./localData/";
// $FILE_PATH = "C:/STEM/localdata/";
$post_data = $_POST["data"];
$zone = $_POST["zone"];

is_dir($FILE_PATH) or mkdir($FILE_PATH, 0777, true);//文件夹不存在则创建
// if(!file_exists($FILE_PATH."data.json")){
//     $filename = "./localData/data_template.json";
//     $file = file_get_contents($filename);
//     $data = json_decode($file, true);
//     file_put_contents($FILE_PATH."data.json", json_encode($data, JSON_UNESCAPED_UNICODE)); 
// }


//打开文件
$filename = "./localData/data.json";
// $filename = $FILE_PATH."data.json";
$file = file_get_contents($filename);
$data = json_decode($file, true);

//修改文件
$data[$zone] = $post_data;

//保存文件
file_put_contents($filename, json_encode($data, JSON_UNESCAPED_UNICODE)); 
echo 1;

?>