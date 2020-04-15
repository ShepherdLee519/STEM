<?php

$userid = $_POST["userid"];
$username = iconv('utf-8', 'gbk', $_POST["username"]);

// $FILE_PATH = "../../upload/pdf/";
$FILE_PATH = "../../userdata/".$userid."_".$username."/";
$zipname = $FILE_PATH."report.zip";

if(file_exists($zipname)){
    echo 1;
}

echo 0;

?>