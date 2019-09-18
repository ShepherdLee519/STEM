<?php
/**
 * author: Shepherd.Lee
 * Date: 2019-09-18
 * info: 上传文件资源
 * index:
 */

$name = $_POST["name"];
$str = "addFile";//name(input)
$FILE_PATH = "../../upload/"; //文件上传文件夹，注意文件夹的路径末尾需要有'/'
is_dir($FILE_PATH) or mkdir($FILE_PATH, 0777, true);//文件夹不存在则创建
$FILE_MAX_SIZE = 8 * 1024 * 1024; //当前最大上传大小为8M - 需要在php.ini中修改


if($_FILES[$str]['error'] > 0){
    die(0);
}

setlocale(LC_ALL, 'zh_CN.UTF8');//设置编码格式否则中文文件乱码
$filename = str_replace(' ', '', $_FILES[$str]['name']);
$upload_file = $FILE_PATH.$filename;//文件名去空格
$main = preg_replace("/(.*)\.\w+/", "\\1" , $upload_file);//除了后缀名(不含.)
$suffix = preg_replace("/.*\.(\w+)/", "\\1", $upload_file);//后缀名部分(不含.)
if($name !== ""){
    $filename = str_replace(' ', '', $name).".".$suffix;
    $upload_file = $FILE_PATH.$filename;
}

$num = 1;
$flag = false;
while(file_exists($upload_file)){//文件重复的情况下
    $upload_file = $main."_".$num.".".$suffix;
    $flag = true;
    $num++;
}

if($flag){
    $filename = preg_replace("/(.*)\.(\w+)/", "\\1", $filename)."_".($num-1).".".$suffix; 
}


if(is_uploaded_file($_FILES[$str]['tmp_name'])){
    if(!move_uploaded_file(
            $_FILES[$str]['tmp_name'], 
            iconv("UTF-8","gb2312", $upload_file)
        )){
        echo 0;
    }
}

class FileInfo{
    public $fullpath;
    public $filename;
    public $fullname;
    public $suffix;
}
$data = new FileInfo();
$data->filename = preg_replace("/(.*)\.(\w+)/", "\\1", $filename);//不带后缀名的文件名
$data->fullname = $filename;//带后缀名
$data->fullpath = $upload_file;//完整路径
$data->suffix = $suffix;//仅后缀名(不带.)

echo json_encode($data, JSON_UNESCAPED_UNICODE);

?>