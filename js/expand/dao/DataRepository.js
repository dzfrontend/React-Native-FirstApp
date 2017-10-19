// popular模块获取数据封装
export default class DataRepository{
	fetchNetRepository(url){
		return new Promise( (resolve,reject) => {
			fetch(url)
			.then( response => response.json())
			.then( result => {
				resolve(result)
			})
			.catch( error => {
				reject(error)
			})
		})
	}
}