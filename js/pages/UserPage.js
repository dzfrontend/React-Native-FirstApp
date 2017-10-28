/**
* 
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text
} from 'react-native'

import NavigationBar from '../common/NavigationBar'
import CustomKeyPage from './user/CustomKeyPage' //订阅标签组件
import SortKeyPage from './user/SortKeyPage' //标签排序组件

export default class UserPage extends Component{
	render(){
		return(
			<View style={styles.container}>
				<NavigationBar
					title={"我的"}
					statusBar={{
		      			backgroundColor:'#2196F3'
		      		}}
		      		style={{backgroundColor:'#2196F3'}}
				/>
				<Text 
					style={styles.text}
					onPress={ () => {
						this.props.navigator.push({
							component: CustomKeyPage,
							params: {...this.props} //把父组件的路由信息用作路由参数
						})
					}}
				>自定义标签</Text>
				<Text 
					style={styles.text}
					onPress={ () => {
						this.props.navigator.push({
							component: SortKeyPage,
							params: {...this.props} //把父组件的路由信息用作路由参数
						})
					}}
				>标签排序</Text>
				<Text 
					style={styles.text}
					onPress={ () => {
						this.props.navigator.push({
							component: CustomKeyPage,
							params: {
								...this.props,
								isRemoveKey:true
							}
						})
					}}
				>标签移除</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1
	},
	text:{
		fontSize:28
	}
})