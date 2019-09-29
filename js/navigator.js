/*
 * author: Shepherd.Lee
 * Date: 2019-09-21
 * info: 点击link切换zone的代码
 * index:
 */

$(function(){
    _hello("navigator");

    let links = ["design", "preview"];
    
    links.forEach(link => {
        $(`#${link}-link`).click(function(e){
            e.preventDefault();

            if(link === "preview"){
                _addClass($("#saveData"),"hidden");
                _removeClass($("#savePDF"), "hidden");
                _removeClass($("#downloadPDF"), "hidden");
                injectPreview();//注入preview内容
            }else{
                _removeClass($("#saveData"), "hidden");
                _addClass($("#savePDF"), "hidden");
                _addClass($("#downloadPDF"), "hidden");
            }

            [...$("#containers-wrapper > div")].forEach(div => {
                _addClass($(div), "hidden");
            });
            
            $(`#${link}-container`).removeClass("hidden");

            return false;
        });
    });
});