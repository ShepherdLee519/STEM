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

function _deleteFile($file){
    $file = iconv('utf-8', 'gbk', $file);
    if(file_exists($file)){
        if(!unlink($file)){
            return 0;
        }else{
            return 1;
        }
    }
}

function _mkdir($FILE_PATH){
    is_dir($FILE_PATH) or mkdir($FILE_PATH, 0777, true);//文件夹不存在则创建
}

?>
