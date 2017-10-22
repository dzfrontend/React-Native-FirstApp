/**
* 顶部导航栏封装共用组件
* 例：<NavigationBar
		title={"最热"}
		statusBar={{
  			backgroundColor:'#2196F3'
  		}}
  		style={{backgroundColor:'#2196F3'}}
	/>
**/
import React, { Component, PropTypes } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	Platform,
	StatusBar,
} from 'react-native'
//安卓和ios的NAV_BAR高度
const NAV_BAR_HEIGHT_ANDROID = 50
const NAV_BAR_HEIGHT_IOS = 44
//statusBar
const STATUS_BAR_HEIGHT = 20
// 设置NavigationBar上面的statusBar约束
const StatusBarShape = {
	backgroundColor: PropTypes.String,
	barStyle: PropTypes.oneOf(['default','light-content','dark-content']),
	hidden: PropTypes.bool
}
export default class NavigationBar extends Component{
	//设置NavigationBar属性约束(类型检查)
	static propTypes = {
		style:View.propTypes.style,
		title:PropTypes.string, //NavigationBar标题
		titleView:PropTypes.element,
		hide:PropTypes.bool, //显示隐藏
		leftButton:PropTypes.element,//左侧按钮
		rightButton:PropTypes.element,//右侧按钮
		statusBar:PropTypes.shape(StatusBarShape) //状态栏的形状shape
	}
	//当用户没有设置StatusBarShape中的一些值得时候，设置statusBar的defaultProps默认值
	static defaultProps = {
		statusBar:{
			barStyle:'light',
			hidden:false
		}
	}
	constructor(props){
		super(props)
		this.state = {
			title:'',
			hide:false,
		}
	}

	render(){
		//用户没有设置titleView 则显示title
		let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>
		//NavigationBar
		let content = <View style={styles.navBar}>
			{this.props.leftButton}
			<View style={styles.titleViewContainer}>
				{titleView}
			</View>
			{this.props.rightButton}
		</View>
		//app最上面状态栏
		let status = <View style={[styles.statusBarStyle,this.props.statusBar]}>
			<StatusBar {...this.props.statusBar} />
		</View>
		return(
			<View style={[styles.container,this.props.style]}>
				{status}
				{content}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'gray'
	},
	navBar:{
		justifyContent:'space-between',
		alignItems:'center',
		height:Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
		// backgroundColor:'red',
		flexDirection:'row'
	},
	titleViewContainer:{
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		left:40,
		right:40,
		top:0,
		bottom:0
	},
	title:{
		fontSize:20,
		color:'white'
	},
	statusBarStyle:{
		height:Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
	}
})