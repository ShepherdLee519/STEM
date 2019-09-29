<?php

$FILE_PATH = "../../upload/pdf/";
$zipname = $FILE_PATH."report.zip";

if(file_exists($zipname)){
    echo 1;
}

echo 0;

?>