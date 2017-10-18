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
import UserCustomKeyPage from './user/CustomKeyPage'

export default class UserPage extends Component{
	render(){
		return(
			<View style={styles.container}>
				<NavigationBar
					title={"我的"}
					statusBar={{
		      			backgroundColor:'#6495ED'
		      		}}
		      		style={{backgroundColor:'#6495ED'}}
				/>
				<Text 
					style={styles.text}
					onPress={ () => {
						this.props.navigator.push({
							component: UserCustomKeyPage,
							params: {...this.props} //把父组件的路由信息用作路由参数
						})
					}}
				>自定义标签</Text>
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