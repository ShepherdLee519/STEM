<?php

$id = $_GET["id"];

require "../mysqllink.php";

$query = "SELECT design FROM taskdesign
        WHERE id = '$id'";
$ret = mysqli_query($link, $query);

if(!$ret){
    echo("Error occured during insertion!");
    exit();
}else{
    $result = mysqli_fetch_assoc($ret);
    echo json_encode($result["design"]);
}

mysqli_close($link);

?>