import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

import Girl from './NavigatorGirl'
import NavigationBar from './NavigationBar'

export default class Boy extends Component{
	constructor(props){
		super(props)
		this.state = {
			word:''
		}
	}
	render(){
		return(
			<View style={styles.container}>
				<NavigationBar
		      		title='男孩'
		      		statusBar={{
		      			backgroundColor:'red'
		      		}}
		      		style={{backgroundColor:'#EE6363'}}
		      	/>
				<Text style={styles.text}>I am boy</Text>
				{/*点击时跳转到Girl组件页面并且携带参数，
				params里面的onCallBack为子页面向父页面回传的数据*/}
				<Text style={styles.text} 
					onPress={ () => {
						this.props.navigator.push({
							component: Girl,
							params:{
								word: '一支玫瑰',
								onCallBack: (word) => {
									this.setState({
										word: word
									})
								}
							}
						})
					}}>点击送女孩一朵玫瑰</Text>
				<Text style={styles.text}>收到女孩回赠：{this.state.word}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'gray',
	},
	text:{
		fontSize:20,
		textAlign:'center'
	}
})