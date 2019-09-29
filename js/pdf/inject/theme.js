/**
 * author: Shepherd.Lee
 * Date: 2019-09-21
 * info: 从THEME/QUESTION中加载数据到#preview-container中的#themeZone
 *      
 */

$(function(){
    // _hello("inject-theme");
});


/**
 * 将数据从THEME/QUESTION中取出 注入preview中的#themeZone
 */
function injectPreviewTheme(){
    log("    No.02 theme");

    _inject($("#themeZone"));

    _html(
        THEME,
        "themeName",
        _("#theme-name")
    );

    let grades = ["", "小学一年级", "小学二年级", "小学三年级",
        "小学四年级", "小学五年级", "小学六年级"];
    _("#theme-grade").html(grades[Number.parseInt(THEME.grade)]);

    _html(
        THEME,
        "themeSituation",
        _("#theme-situation")
    );

    _html(
        QUESTION,
        "driverQuestion",
        _("#theme-question")
    );

    _reject();
}