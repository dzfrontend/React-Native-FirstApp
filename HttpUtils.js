/**
 * fetch get和post封装
 * 使用：
	HttpUtils.get(url).then( result => {})
 	HttpUtils.post(url,data).then( result => {})
**/

export default class HttpUtils{
	static get(url){
		return new Promise( (resolve,reject) => { //用Promise处理fetch后的then操作
			fetch(url)
			.then(response => response.json())
			.then( result => {
				resolve(result)
			})
			.catch( error => {
				reject(error)
			})
		})
	}
	static post(url,data){
		return new Promise( (resolve,reject) => {
			fetch(url,{
				method: 'POST',
				header: {
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				body: JSON.stingify(data)
			})
			.then(response => response.json())
			.then( result => {
				resolve(result)
			})
			.catch( error => {
				reject(error)
			})
		})
	}
}