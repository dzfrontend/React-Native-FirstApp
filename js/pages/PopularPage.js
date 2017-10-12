/**
*WelcomePage.js引导页
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	TextInput,
	ListView
} from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view' //可滑动tab切换组件

import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'//请求数据方法
import RepositoryCell from '../common/RepositoryCell'
//api请求接口https://api.github.com/search/repositories?q=js&sort=starts，
//其中q=js参数请求的是js相关内容，参数可变如q=ios请求ios内容
const URL = 'https://api.github.com/search/repositories?q='
const QUERY = '&sort=starts'

export default class WelcomePage extends Component{
	
	
	render(){
		return(
			<View style={styles.container}>
				<NavigationBar
					title={"最热"}
					statusBar={{
		      			backgroundColor:'#2196F3'
		      		}}
		      		style={{backgroundColor:'#2196F3'}}
				/>

				{/*
					tabBarBackgroundColor修改tab的背景颜色
					tabBarInactiveTextColor修改tab未选中文字的颜色
					tabBarActiveTextColor修改tab选中文字的颜色
				*/}
				<ScrollableTabView
					renderTabBar={ () => <ScrollableTabBar/> }
					tabBarBackgroundColor="#2196F3"
					tabBarInactiveTextColor="mintcream"
					tabBarActiveTextColor="#fff"
					tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
				>
					{/*
					<Text tabLabel="JavaScript">JavaScript</Text>
					<Text tabLabel="Java">Java</Text>
					*/}
					<PopularTab tabLabel="JavaScript"></PopularTab>
					<PopularTab tabLabel="Java"></PopularTab>
				</ScrollableTabView>

				{/*
					<Text
						onPress={ () => {
							this.loadData()
						}}
					>点我获取数据</Text>
					<TextInput 
						style={{height:40}}
						onChangeText={text => this.text = text}
					/>
					<Text style={{height:500}}>{this.state.result}</Text>
				*/}
			</View>
		)
	}
}

//组件
class PopularTab extends Component{
	constructor(props) {
		super(props);
		this.state = {
			// result:'',
			dataSource:new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2 })//listView r1不等于r2的时候渲染数据
		}
		this.dataRepository = new DataRepository() //实例化这个类
	}
	loadData = () => {
		let url = URL + this.props.tabLabel + QUERY //this.text为文本框输入的内容
		this.dataRepository.fetchNetRepository(url)
		.then( result => {
			this.setState({
				// result: JSON.stringify(result) //将obj转化为字符串
				dataSource: this.state.dataSource.cloneWithRows(result.items)
			})
		})
		.catch( error => {
			this.setState({
				result: JSON.stringify(error) //将错误显示出来
			})
		})
	}

	renderRowHandle = (data) => {
		return <RepositoryCell data={data}/>
	}
	render(){
		return <View>
			{/*<Text style={{height:500}}>{this.state.result}</Text>*/}
			<ListView
				dataSource={this.state.dataSource}
				renderRow={ data => this.renderRowHandle(data)}
			/>
		</View>
	}
	componentDidMount() {
		this.loadData()
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	}
})