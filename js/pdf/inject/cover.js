/**
 * author: Shepherd.Lee
 * Date: 2019-09-21
 * info: 从THEME中加载数据到#preview-container中的#coverZone
 *      
 */

$(function(){
    // _hello("inject-cover");
});


/**
 * 将数据从THEME中取出 注入preview中的#coverZone
 */
function injectPreviewCover(){
    log("    No.01 cover");

    _inject($("#coverZone"));
    //STD中是四个学科，见design-objectives.js
    STD.forEach((std) => {
        _html(
            THEME,
            ["people", std],
            _(`#cover-people-${std}`)
        );
    });
    _reject();
}