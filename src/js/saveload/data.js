/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 00:23:03 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-03-27 04:45:31
 */

import data from "../../datas/data.json";
let DATA = data;

let dataProxy = new Proxy(DATA, {
	set(target, key, value){
		if(key === "self"){
			DATA = {};
			for(let [k, v] of Object.entries(value)){
				target[k] = v;
			}
			return true;
		}
		return false;
	},
	get(target, key){
		if(key == "reset"){
			return () => {
				DATA = data;
			};
		}else{
			return target[key];
		}
	}
});

export { dataProxy as DATA };