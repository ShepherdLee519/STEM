/**
 * author: Shepherd.Lee
 * Date: 2019-09-22
 * info: 从全局数据中加载内容注入preview中
 *       所有的函数统一格式 injectPreviewXXX eg.injectPreviewCover
 *       统一由这里的injectPreview调用
 *       injectPreview会在点击preview-link后调用
 *      
 */

$(function(){
    _hello("inject");
});



/**
 * 调用inject/下的各个函数，将数据注入preview中
 */
function injectPreview(){
    log("--------inject---------");
    injectPreviewCover();
    injectPreviewTheme();
    injectPreviewCoreQuestion();
    injectPreviewTaskModal();
    injectPreviewCourse();
}