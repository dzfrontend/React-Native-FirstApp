/**
* 最热模块
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	TextInput,
	ListView,
	RefreshControl,
	DeviceEventEmitter
} from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view' //可滑动tab切换组件

import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'//请求数据方法
import RepositoryCell from './popular/RepositoryCell'
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao' //标签的本地存储

//api请求接口https://api.github.com/search/repositories?q=js&sort=starts，
//其中q=js参数请求的是js相关内容，参数可变如q=ios请求ios内容
const URL = 'https://api.github.com/search/repositories?q='
const QUERY = '&sort=starts'

export default class WelcomePage extends Component{
	constructor(props) {
		super(props);
		this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
		this.state = {
			languages: []
		}
		this.loadData()
	}
	//本地存储
	loadData(){
		//取AsyncStorage
		this.LanguageDao.fetchStorage()
		.then( result => {
			this.setState({
				languages: result
			})
		})
		.catch( error => {
			console.log(error)
		})
	}

	componentDidMount() {
		this.loadData()
	}
	componentDidUpdate() {
		this.loadData()
	}
	render(){
		let content = this.state.languages.length > 0 
		? <ScrollableTabView
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
			{/*
			读取本地存储已经checked为true的标签进行展示
			*/}
			{
				this.state.languages.map( (result,i,arr) => {
					let language = arr[i]
					return language.checked ? <PopularTab tabLabel={language.name} key={i}></PopularTab> : null
				})
			}
		</ScrollableTabView>
		:null;

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
				{content}
			</View>
		)
	}
}

//组件
class PopularTab extends Component{
	constructor(props) {
		super(props);
		this.state = {
			dataSource:new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2 }),//listView r1不等于r2的时候渲染数据
			isLoading:false, //用于上拉刷新
		}
		this.dataRepository = new DataRepository() //实例化这个类
	}
	loadData = () => {
		this.setState({
			isLoading: true
		})

		let url = URL + this.props.tabLabel + QUERY
		this.dataRepository.fetchRepository(url)
		.then( result => {
			let items = result && result.items ? result.items : result?result:[] //result.items为本地存储里面的
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items),
				isLoading: false //数据请求成功不显示上拉刷新的loading
			})
			//本地存储数据过时情况
			if(result&&result.update_date&&!this.dataRepository.checkData(result.update_date)){
				DeviceEventEmitter.emit('showToast','数据过时')
				return this.dataRepository.fetchNetRepository(url) //获取网络数据
			}else{
				DeviceEventEmitter.emit('showToast','显示缓存数据')
			}
		})
		.then( items => {
			//本地存储数据过时获取数据后
			if(!items || items.length === 0) return
			DeviceEventEmitter.emit('showToast','显示网络数据')
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items),
			})
		})
		.catch( error => {
			console.log(error)
			this.setState({
				isLoading: false
			})
		})
	}

	renderRowHandle = (data) => {
		return <RepositoryCell data={data}/>
	}
	render(){
		return <View style={{flex:1}}>
			<ListView
				dataSource={this.state.dataSource}
				renderRow={ data => this.renderRowHandle(data)}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isLoading}
						onRefresh={() => this.loadData()}
						colors={['#2196F3']}
						tintColor={'#2196F3'}
						title={'Loading...'}
						titleColor={'#2196F3'}
					/>
				}
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