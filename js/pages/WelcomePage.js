/**
*WelcomePage.js引导页
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	Navigator
} from 'react-native'

import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
export default class WelcomePage extends Component{
	render(){
		return(
			<View>
				<NavigationBar
					title={"app简易启动引导页"}
					statusBar={{
		      			backgroundColor:'red'
		      		}}
		      		style={{backgroundColor:'#EE6363'}}
				/>
				<Text>app简易启动引导页,2s后自动关闭引导页</Text>
			</View>
		)
	}

	componentDidMount() {
		this.timer = setTimeout( () => {
			//2s后关闭引导页，跳转到首页HomePage
			//resetTo而不是push，是因为引导页过了不让返回
			this.props.navigator.resetTo({
				component: HomePage
			})
		},2000)
	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer)
	}
}