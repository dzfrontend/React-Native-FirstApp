import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

export default class Girl extends Component{
	constructor(props){
		super(props)
		this.state = {

		}
	}
	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.text}>I am girl</Text>
				<Text style={styles.text}>我收到了男孩送的：{this.props.word}</Text>
				<Text style={styles.text}
					onPress={ () => {
						this.props.onCallBack('一盒巧克力') //子页面向父页面回传数据
						this.props.navigator.pop() //关闭当前页面
					}}>点我回赠巧克力</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor:'red',
		justifyContent:'center'
	},
	text:{
		fontSize:20,
		textAlign:'center'
	}
})