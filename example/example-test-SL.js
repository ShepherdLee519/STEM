/**
 * buttons: test-save/test-load
 */
$("#test-save").click(() => {
    // $.post("./php/design/test_tojson.php", {data:DATA}, (res) => {
    //     log("Response:" + res);
    // });
    let id = "1";
    $.post("./php/design/test_save.php", {id:id, data:DATA}, (res) => {
        log(res);
    });
});



$("#test-load").click(() => {
    // _async();
    // let path = PATH + "data.json" + "?time=" + new Date().getTime();
    // $.get(path, (data) => {
    //     DATA = data;

    // });
    // _async();
    // reset();
    _async();
    $.get("./php/design/test_load.php?id=1", (data) => {
        data = JSON.parse(data);
        data = JSON.parse(data);
        DATA = data;
    });
    _async();
    TASKZONE.showData();//加载并显示数据
    // TREE.build();
});