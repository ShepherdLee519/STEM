<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-09-29
 * info: 根据userid，若存在数据项，则更新data值，否则先新建数据项
 */

// @include "../mysqllink.php";
@include "../helper.php";
$id = $_POST["userid"];
$name = $_POST["username"];
$data = $_POST["data"];

$FILE_PATH = "../../userdata/".$id."_".$name."/";
_mkdir($FILE_PATH);
_mkdir($FILE_PATH."upload/");
chmod($FILE_PATH, 0777);
chmod($FILE_PATH."upload/", 0777);

$filename = $FILE_PATH."data.json";
$file = file_get_contents($filename);

//保存文件
file_put_contents($filename, json_encode($data, JSON_UNESCAPED_UNICODE));
chmod($filename, 0777);
echo 1;


?>