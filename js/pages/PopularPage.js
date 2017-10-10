/**
*WelcomePage.js引导页
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	TextInput,
	Navigator
} from 'react-native'

import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'//请求数据方法

//api请求接口https://api.github.com/search/repositories?q=js&sort=starts，
//其中q=js参数请求的是js相关内容，参数可变如q=ios请求ios内容
const URL = 'https://api.github.com/search/repositories?q='
const QUERY = '&sort=starts'

export default class WelcomePage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			result:''
		}
		this.dataRepository = new DataRepository() //实例化这个类
	}
	onLoad = () => {
		let url = URL + this.text + QUERY //this.text为文本框输入的内容
		this.dataRepository.fetchNetRepository(url)
		.then( result => {
			this.setState({
				result: JSON.stringify(result) //将obj转化为字符串
			})
		})
		.catch( error => {
			this.setState({
				result: JSON.stringify(error) //将错误显示出来
			})
		})
	}
	render(){
		return(
			<View>
				<NavigationBar
					title={"最热"}
					statusBar={{
		      			backgroundColor:'red'
		      		}}
		      		style={{backgroundColor:'#6495ED'}}
				/>
				<Text
					onPress={ () => {
						this.onLoad()
					}}
				>点我获取数据</Text>
				<TextInput 
					style={{height:40}}
					onChangeText={text => this.text = text}
				/>
				<Text style={{height:500}}>{this.state.result}</Text>
			</View>
		)
	}
}