/**
 * 保存DATA数据至本地
 */
function saveTasks(){
    let postdata = (DATA.length == 0)? null:DATA;
    $.post("./db/data_save.php", {data:postdata, zone:"tasks"}, (res) => {
        if(res) log("save tasks successfully");
        else err("save tasks failed");
    });
    saveActivity();
}