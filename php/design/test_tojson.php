<?php

$post_data = $_POST["data"];

$filename = "../../datas/design/data.json";
file_put_contents($filename, json_encode($post_data)); 
echo 1;
?>