import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native'

import NavigationBar from './NavigationBar'

export default class Girl extends Component{
	constructor(props){
		super(props)
		this.state = {

		}
	}
	render(){
		return(
			<View style={styles.container}>
				<NavigationBar
		      		title='女孩'
		      		statusBar={{
		      			backgroundColor:'red'
		      		}}
		      		style={{backgroundColor:'#EE6363'}}
		      		leftButton={
		      			<TouchableOpacity onPress={ () => { this.props.navigator.pop() } }>
		      				<Image style={{width:22,height:22,margin:5}} source={require('./res/images/ic_arrow_back_white_36pt.png')} />
		      			</TouchableOpacity>
		      		}
		      		rightButton={
		      			<TouchableOpacity>
		      				<Image style={{width:22,height:22,margin:5}} source={require('./res/images/ic_star.png')} />
		      			</TouchableOpacity>
		      		}
		      	/>
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
		backgroundColor:'#fff'
	},
	text:{
		fontSize:20,
		textAlign:'center'
	}
})