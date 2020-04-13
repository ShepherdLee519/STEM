/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-26 23:32:34 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 04:47:42
 */

export var SESSION_INFO = {
    local: true, //默认本地读入
    session: false, //是否有session信息

    //需保存的session内容
    userid: "", 
    username: ""
};

export function getSession(){
    if(SESSION_INFO.local) return false;
    else if(!SESSION_INFO.session){
        let userid = sessionStorage.getItem("userid"),
            username = sessionStorage.getItem("username");
        
        if(!userid || !username){
            SESSION_INFO.local = true;
            return false;
        }else{
            SESSION_INFO.userid = userid;
            SESSION_INFO.username = username;
            SESSION_INFO.session = true;
        }
    }
    return true;
}