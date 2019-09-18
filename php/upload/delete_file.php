<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-09-18
 * info: 删除文件资源
 * index:
 */

$filepath = $_POST["filepath"];
$filepath = iconv('utf-8', 'gbk', $filepath);

if(!unlink($filepath)){
    echo 0;
}else{
    echo 1;
}


?>