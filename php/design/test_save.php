<?php

$data = $_POST["data"];
$id = $_POST["id"];
$post_data = json_encode($data, JSON_UNESCAPED_UNICODE);

require "../mysqllink.php";

$query = "INSERT INTO taskdesign(id, design)
    VALUES('$id', '$post_data') ON DUPLICATE KEY UPDATE design = '$post_data'";

if(!mysqli_query($link, $query)){
    echo("Error occured during insertion!");
    exit();
}else{
    echo 1;
}

mysqli_close($link);

?>