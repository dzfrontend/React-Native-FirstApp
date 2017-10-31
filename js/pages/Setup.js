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
	//进行一些初始化路由配置
	//这样其他子组件就可以直接this.props.navigator和...this.props使用路由navigator和路由参数{...route.params}
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