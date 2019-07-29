<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-07-27
 * version: 2.0.0
 * info: 简化一些操作的php辅助函数 考虑将mysql的连接等也包装起来
 * index:
 *          1. _get()/_post()
 *          2. _space()
 */

 
function _get($str){ 
    $val = !empty($_GET[$str]) ? $_GET[$str] : null; 
    return $val; 
} 

function _post($str){ 
    $val = !empty($_POST[$str]) ? $_POST[$str] : null; 
    return $val; 
}

function _space($num = 8){
    echo str_repeat("&nbsp;", $num);
}
 
?>
