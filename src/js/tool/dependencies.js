const fs = require("fs");
const { resolve, join } = require("path");

let json = {
    "root": "",
    "paths": {
        ".\\": {

        }
    }
};

let jsPath = resolve(__dirname, "../");
let targetPath = resolve("./");
let opath = resolve("./external-dependencies.json");
json["root"] = targetPath.replace(jsPath, "");
scan(targetPath);

setTimeout(() => {
    console.log(json);
    fs.writeFile(opath, JSON.stringify(json, null, "\t"), (err) => {
        if(err) return;
    });
}, 2000);

function scan(filePath){
    fs.readdir(filePath, (err, files) => {
        if(err) return;
        files.forEach(filename => {
            let path = join(filePath, filename);
            fs.stat(path, (err, stats) => {
                if(err) return;
                if(stats.isDirectory){
                    scan(path);
                }
                if(stats.isFile){
                    resolveJson(filePath, filename);
                }
            })
        });
    });
}

function resolveJson(path, name){
    path = path.replace(jsPath, "");
    if(path === json["root"]) path = ".\\";
    else path = path.replace(json["root"], "");
    
    if(json["paths"][path] !== undefined){
        json["paths"][path][name] = [];
    }else{
        json["paths"][path] = {};
    }
}