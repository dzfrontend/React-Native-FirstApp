// popular模块获取数据封装
import {
    AsyncStorage,
} from 'react-native';
export default class DataRepository{
	/**
	* 获取数据，先从本地存储获取，没有本地存储信息则从网络获取
	* @param url
	* @returns {Promise}
	**/
	fetchRepository(url) {
        return new Promise((resolve, reject)=> {
            this.fetchLocalRepository(url)
            .then( result => {
                if (result) {
                	//获取本地存储数据不为空resolve返回给调用者
                    resolve(result);
                } else {
                	//否则获取网络数据
                    this.fetchNetRepository(url)
                    .then((data)=> {
                        resolve(data);
                    }).catch((error)=> {
                        reject(error);
                    })
                }
            }).catch((error)=> {
            	//获取本地存储数据异常，要从网络获取数据
                this.fetchNetRepository(url)
                .then((data)=> {
                    resolve(data);
                }).catch((error=> {
                    reject(error);
                }))
            })
        })
    }
	/**
	* 获取本地存储数据
	* @param url
	* @returns {Promise}
	**/
	fetchLocalRepository(url) {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(url, (error, result)=> {
                if (!error) {
                	// result Json格式有可能不正确，所以捕捉
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                	//从本地存储获取数据失败reject
                    reject(error);
                }
            })
        })
    }
    /**
	* 获取网络数据，并且获取成功放到本地存储
	* @param url
	* @returns {Promise}
	**/
	fetchNetRepository(url){
		return new Promise( (resolve,reject) => {
			fetch(url)
			.then( response => response.json())
			.then( result => {
				if(!result){
					reject(new Error('responseData is null')) //获取数据为空
					return
				}
				resolve(result.items) //result.items是因为数据源的数据在items里
				//保存获取的网络数据到本地存储
				this.saveRepository(url,result.items)
			})
			.catch( error => {
				reject(error)
			})
		})
	}
	/**
	* 保存数据到本地存储
	* @param url items callBack
	**/
	saveRepository(url,items,callBack){
		if(!url || !items) return;
		//设置一个时间戳，用户本地存储数据是否过时
		let wrapData = { items: items, update_date: new Date().getTime()}
		AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack)
	}
	/**
	* 检查本地存储时间戳是否过时
	* @param  传事件戳
	* @returns {boolean} false过时
	**/
	checkData(longTime){
		let nowTime = new Date()
		let recordTime = new Date() //传过来的时间
		recordTime.setTime(longTime)
		if(nowTime.getMonth() !== recordTime.getMonth()) return false;
		if(nowTime.getDay() !== recordTime.getDay()) return false;
		if(nowTime.getHours() - recordTime.getHours() > 4) return false;
		return true;
	}
}