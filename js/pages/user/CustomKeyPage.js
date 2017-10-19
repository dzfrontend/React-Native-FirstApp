/**
* 
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView
} from 'react-native'

import NavigationBar from '../../common/NavigationBar'
import NavigationBarUtils from '../../util/NavigationBarUtils'

import LanguageDao,{ FLAG_LANGUAGE } from '../../expand/dao/LanguageDao'

export default class UserPage extends Component{
	constructor(props){
		super(props)
		this.state = {
			dataArray:[]
		}
		this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
	}

	onSave(){
		this.props.navigator.pop();
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

	renderView(){
		return <Text>{JSON.stringify(this.state.dataArray)}</Text>
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
					leftButton={NavigationBarUtils.getLeftButton(() => this.onSave())}
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
	}
})