<?php

$pdfdata = $_POST["data"];
$paths = $_POST["paths"];
$userid = $_POST["userid"];
$username = iconv('utf-8','gbk', $_POST["username"]);;

@include "../helper.php";

// $FILE_PATH = "../../upload/pdf/";
$FILE_PATH = "../../userdata/".$userid."_".$username."/";
// $APPENDIX_PATH = "../../upload/";
$APPENDIX_PATH = $FILE_PATH."upload/";
_mkdir($FILE_PATH);
chmod($FILE_PATH, 0777);

$pdfpath = $FILE_PATH."stem_report.pdf";
_deleteFile($pdfpath);
file_put_contents($pdfpath, base64_decode($pdfdata));//保存pdf
chmod($pdfpath, 0777);

$zipname = $FILE_PATH."report.zip";
_deleteFile($zipname);
$zip = new ZipArchive();
$zip->open($zipname, ZipArchive::CREATE); //打开压缩包
setlocale(LC_ALL, 'zh_CN.GBK');     
$zip->addFile($pdfpath, basename($pdfpath));//添加pdf
foreach($paths as $path){
    $path = iconv('utf-8','gbk//ignore', $path);
    $zip->addFromString(
        'upload/'.$path,
        file_get_contents($APPENDIX_PATH.$path)
    ); //向压缩包中添加文件
}
$zip->close();
chmod($zipname, 0777);
echo 1;

?>