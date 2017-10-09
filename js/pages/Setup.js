/**
*Setup.js初始化配置页面
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	Navigator
} from 'react-native'

import WelcomePage from './WelcomePage'

function setup(){
	//进行一些初始化配置
	class Root extends Component{
		renderScene(route,navigator){
			let Component = route.component
			return <Component {...route.params} navigator={navigator}/>
		}
		render(){
			//路由：初始化initialRoute进入引导页
			return <Navigator
				initialRoute={{component: WelcomePage}}
				renderScene={(route,navigator) => this.renderScene(route,navigator)}
			/>
		}
	}
	return <Root/>
}

module.exports = setup