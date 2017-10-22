/**
* 
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	Alert
} from 'react-native'

import NavigationBar from '../../common/NavigationBar'
import NavigationBarUtils from '../../util/NavigationBarUtils'

import LanguageDao,{ FLAG_LANGUAGE } from '../../expand/dao/LanguageDao' //类和变量
import CheckBox from 'react-native-check-box' //第三方组件checkbox
import ArrayUtils from '../../util/ArrayUtils' //array数组封装方法共用库

export default class UserPage extends Component{
	constructor(props){
		super(props)
		this.state = {
			dataArray:[]
		}
		this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key) //实例化class
		this.changeValue = [] //记录用户自定义标签的修改
	}


	loadData(){
		//取AsyncStorage
		this.LanguageDao.fetchStorage()
		.then( result => {
			this.setState({
				dataArray: result
			})
		})
		.catch( error => {
			console.log(error)
		})
	}

	componentDidMount() {
		this.loadData()
	}
	
	//自定义标签展示
	renderView(){
		if(!this.state.dataArray || this.state.dataArray.length === 0){return}
		let len = this.state.dataArray.length
		let views = []
		for(let i=0;i<len-2;i+=2){
			views.push(
				<View key={i}>
					<View style={styles.item}>
						{/*<Text>{this.state.dataArray[i].name}</Text>
						<Text>{this.state.dataArray[i+1].name}</Text>*/}
						{this.renderCheckBox(this.state.dataArray[i])}
						{this.renderCheckBox(this.state.dataArray[i+1])}
					</View>
					<View style={styles.line}></View>
				</View>
			)
		}
		//遗漏元素，奇数遗漏1个元素，偶数遗漏2个元素
		views.push(
			<View key={len-1}>
				<View style={styles.item}>
					{len %2 === 0 ? this.renderCheckBox(this.state.dataArray[len-2]) : null}
					{this.renderCheckBox(this.state.dataArray[len-1])}
				</View>
				<View style={styles.line}></View>
			</View>
		)
		return views
	}
	//checkbox
	checkBoxOnClick = (data) => {
		data.checked = !data.checked
		{
		/*
		//这里的代码移动到了公用util
		for(var i=0,len=this.changeValue.length;i<len;i++){
			//这里作用是把已经存在的元素去掉
			var temp = this.changeValue[i]
			if(temp === data){
				this.changeValue.splice(i,1) //从数组的某个位置去掉一个元素
				return
			}
		}
		this.changeValue.push(data) //记录用户自定义标签的修改
		*/
		}
		ArrayUtils.updateArray(this.changeValue,data)
	}

	onSave(){
		if(this.changeValue.length === 0){
			this.props.navigator.pop() //没变化
			return
		}
		this.LanguageDao.save(this.state.dataArray) //记录保存到本地存储
		this.props.navigator.pop();
	}
	onBack(){
		if(this.changeValue.length === 0){
			this.props.navigator.pop() //没变化
			return
		}
		Alert.alert(
            '提示',
            '要保存修改吗?',
            [
                {
                    text: '否', onPress: () => {
                    this.props.navigator.pop();
                }
                }, {
                text: '是', onPress: () => {
                    this.onSave();
                }
            }
            ]
        )
	}
	renderCheckBox(data){
		return(
			<CheckBox
				style={{flex:1,padding:10}}
				leftText={data.name}
				checkedImage={
					<Image source={require('./img/ic_check_box.png')} style={{tintColor:'#6495ED'}}/>
				}
				unCheckedImage={
					<Image source={require('./img/ic_check_box_outline_blank.png')}  style={{tintColor:'#6495ED'}}/>
				}
				isChecked={data.checked}
				onClick={ () => this.checkBoxOnClick(data) }
			/>
		)
	}
	render(){
		let rightButton = <TouchableOpacity
			onPress={ () => this.onSave() }
		>
			<View style={{margin:10}}>
				<Text style={styles.title}>保存</Text>
			</View>
		</TouchableOpacity>
		return(
			<View style={styles.container}>
				<NavigationBar
					title={"自定义标签"}
					statusBar={{
		      			backgroundColor:'#2196F3'
		      		}}
					leftButton={NavigationBarUtils.getLeftButton(() => this.onBack())}
		      		rightButton={rightButton}
		      		style={{backgroundColor:'#2196F3'}}
				/>
				<ScrollView>
					{this.renderView()}
				</ScrollView>
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
	},
	title:{
		fontSize:20,
		color:'#fff'
	},
	line:{
		height:1,
		backgroundColor:'darkgray'
	},
	item:{
		flexDirection:'row',
		alignItems:'center'
	}
})