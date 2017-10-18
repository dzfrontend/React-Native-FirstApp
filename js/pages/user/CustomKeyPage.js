/**
* 
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text
} from 'react-native'

import NavigationBar from '../../common/NavigationBar'
import NavigationBarUtils from '../../util/NavigationBarUtils'

export default class UserPage extends Component{
	onSave(){
		this.props.navigator.pop();
	}
	render(){
		return(
			<View style={styles.container}>
				<NavigationBar
					title={"自定义标签"}
					statusBar={{
		      			backgroundColor:'#6495ED'
		      		}}
					leftButton={NavigationBarUtils.getLeftButton(() => this.onSave())}
		      		style={{backgroundColor:'#6495ED'}}
				/>
				<Text style={styles.text}>自定义标签</Text>
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