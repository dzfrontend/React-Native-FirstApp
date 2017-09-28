import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ListView,
	RefreshControl
} from 'react-native'

import NavigationBar from './NavigationBar'
//假数据
var data = {
	'result':[
		{'email':'123456789@qq.com','fullName':'鹿晗',key:1},
		{'email':'123456789@qq.com','fullName':'鹿晗2',key:2},
		{'email':'123456789@qq.com','fullName':'鹿晗3',key:3},
		{'email':'123456789@qq.com','fullName':'鹿晗4',key:4},
		{'email':'123456789@qq.com','fullName':'鹿晗5',key:5},
		{'email':'123456789@qq.com','fullName':'鹿晗6',key:6},
		{'email':'123456789@qq.com','fullName':'鹿晗7',key:7},
		{'email':'123456789@qq.com','fullName':'鹿晗8',key:8},
		{'email':'123456789@qq.com','fullName':'鹿晗9',key:9},
		{'email':'123456789@qq.com','fullName':'鹿晗10',key:10},
		{'email':'123456789@qq.com','fullName':'鹿晗11',key:11},
		{'email':'123456789@qq.com','fullName':'鹿晗12',key:12},
	]
}

export default class ListViewComponent extends Component{
	constructor(props) {
	    super(props);
	    const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}) //放在构造函数里，DataSource里面前后数据不一样时才渲染
	  	this.state = {
	  		dataSource:ds.cloneWithRows(data.result),
	  		isLoading:true, //进入页面默认刷新
	  	}
	  	this.onLoad() //请求成功后关闭刷新
	}
	render(){
		return(
			<View style={styles.container}>
				<NavigationBar
		      		title='ListView'
		      		statusBar={{
		      			backgroundColor:'red'
		      		}}
		      		style={{backgroundColor:'#EE6363'}}
		      	/>
		     	{/*dataSource指定数据源，renderRow渲染数据，renderSeparator为分割线，RefreshControl组件进行上拉刷新*/}
				<ListView 
					dataSource={this.state.dataSource}
					renderRow={ (item) => this.renderRow(item)}
					renderSeparator={ (sectionID,rowID,adjacentRowHighlighted) => this.renderSeparator(sectionID,rowID,adjacentRowHighlighted)}
					renderFooter={ () => this.renderFooter() }
					refreshControl={
						<RefreshControl
							refreshing={this.state.isLoading}
							onRefresh={ () => this.onLoad()}
						/>
					}
				/>
			</View> 
		)
	}

	renderRow = (item) => {
		return <View style={styles.row}>
			<Text style={styles.tips}>{item.fullName}</Text>
			<Text style={styles.tips}>{item.email}</Text>
		</View>
	}
	renderSeparator = (sectionID,rowID,adjacentRowHighlighted) => {
		return(
			<View style={styles.line} key={rowID}></View>
		)
	}
	renderFooter = () => {
		return (
			<View><Text style={styles.tips}>已经到底部了...</Text></View>
		)
	}

	onLoad = () => {
		//这里模拟网络请求
		setTimeout( () => {
			this.setState({
				isLoading:false
			})
		},2000)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor:'#fff'
	},
	tips:{
		fontSize:18,
	},
	row:{
		height:80
	},
	line:{
		height:1,
		backgroundColor:'#000'
	}
})