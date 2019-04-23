<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-04-23
 * version: 1.0.0
 * caller: ./project.php
 * info: 简化一些操作的php辅助函数
 * index:
 *          1. _get() 
 */

 
/*--------------------------------------------------------*/
/**
 * info: 确保正确的从$_GET中获取值
 * params: $str 为传入$_GET中的变量名(name)
 * return $val返回所对应的$_GET[]中的变量的值，不存在的情况下，会返回null
 *      建议对返回值进行非空判断
 */
function _get($str){ 
    $val = !empty($_GET[$str]) ? $_GET[$str] : null; 
    return $val; 
} 

?>