/**
 * author: Shepherd.Lee
 * Date: 2019-05-21
 * version: 1.1.1
 * info: p=baseinfo 基本信息界面的js
 */

 const BASEINFO_PATH = "datas/baseinfo/",
    STD = ["science", "technology", "engineering", "mathematics"];


$(function(){
    log("hello!! - baseinfo");
    _async();
    let getStdData = (type) => {
        let returndata;
        $.get(BASEINFO_PATH + type + ".json", (data) => returndata = data);
        return returndata;
    };
    var scienceStd = getStdData(STD[0]), 
        technologyStd = getStdData(STD[1]),
        engineeringStd = getStdData(STD[2]), 
        mathematicsStd = getStdData(STD[3]);
    _async();
   
    
    (function(){
        let stds = [];
        stds.push(scienceStd, technologyStd, engineeringStd, mathematicsStd);
        stds.forEach((std, index) => {
            let ul = "<ul>";
            std.forEach((arr) => {
                let li = `
                    <li>
                        <h4>${arr["firstTitle"]}</h4>
                        <ul>
                `.trim();
                arr["childrenTitles"].forEach((child) => li += `<li>${child}</li>`);
                ul += li + "</ul></li>";
            });
            $("#baseinfo-course-" + STD[index]).append(ul);
        });
    }());
});







function editTheme(){
    const prefix = "baseinfo-theme-";
    let id = (idname) => `#${prefix}${idname}`;
    let $name = $(id("name")).val(),
        $describe = $(id("describe")).val(),
        $people = $(id("people")).val();

    $(id("name-view")).val($name);
    $(id("describe-view")).val($describe);
    $(id("people-view")).val($people);

    $("#editTheme").modal("hide");
}






$("#baseinfo-subject-checkbox").change(function() { 
    let $checkbox = $("#baseinfo-subject-checkbox input[type=checkbox]:checked"),
        $divs = $("#courseDivs div");

    [...$divs].forEach((v) => $(v).addClass("hidden"));
    [...$checkbox].forEach((v) => {
        let value = $(v).val();
        $divs.eq(value - 1).toggleClass("hidden");
    })
});