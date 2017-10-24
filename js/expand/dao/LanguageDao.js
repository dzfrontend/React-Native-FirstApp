//UserPage模块自定义标签本地存储
import React, { Component } from 'react'
import{
	AsyncStorage
} from 'react-native'

import keys from '../../../res/data/keys.json' //自定义标签

//定义一个变量区分两个模块(用于本地存储区分):flag_key为自定义标签模块 
export var FLAG_LANGUAGE={flag_language:'flag_language_language',flag_key:'flag_language_key'}

export default class LanguageDao{ //调用先new 然后传一个变量flag
	constructor(flag){
		this.flag = flag //保存传入参数的flag
	}

	fetchStorage(){
		return new Promise( (resolve,reject) => {
			// 用AsyncStorage取
			AsyncStorage.getItem(this.flag,(err,result) => {
				if(err){
					reject(err) //有错误，把错误告诉调用者
					return
				}
				if(!result){
					//没有本地存储，保存数据keys到本地存储并resolve返回到外面
					var data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null
					this.save(data)
					resolve(data)
				}else{
					//result不为空 把结果返回给调用者，JSON.parse把保存的json类型的字符串转化为对象
					try{
						resolve(JSON.parse(result))
					}catch(e){
						reject(e)
					}
				}
			})
		})
	}

	save(data){
		AsyncStorage.setItem(this.flag,JSON.stringify(data),(err) => {

		})
	}
}