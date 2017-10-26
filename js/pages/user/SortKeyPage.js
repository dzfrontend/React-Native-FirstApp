/**
* 
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	Image,
	TouchableOpacity
} from 'react-native'

import NavigationBar from '../../common/NavigationBar'
import NavigationBarUtils from '../../util/NavigationBarUtils'
import SortableListView from 'react-native-sortable-listview' //拖拽排序组件

import LanguageDao,{ FLAG_LANGUAGE } from '../../expand/dao/LanguageDao' //本地存储信息
import ArrayUtils from '../../util/ArrayUtils' //array数组封装方法共用库

export default class SortKeyPage extends Component{
	
	constructor(props) {
        super(props);
        this.dataArray = []; //所有的标签(res/data/key.json里面所有的数据)
        this.sortResultArray = []; //排序之后的标签
        this.originalCheckedArray = []; //原始选中的标签
        this.state = {
            checkedArray: [] //当前选中标签
        }
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
    }
	componentDidMount() {
		this.loadData()
	}
	loadData(){
		//取AsyncStorage
		this.LanguageDao.fetchStorage()
		.then( result => {
			this.getCheckedItems(result)
		})
		.catch( error => {
			console.log(error)
		})
	}
	//赋值dataArray、checked为true的标签、originalCheckedArray
	getCheckedItems(result){
		this.dataArray = result
		
		let checkedArray = []
		for(var i=0;i<result.length;i++){
			if(result[i].checked){
				checkedArray.push(result[i])
			}
		}
		this.setState({
			checkedArray: checkedArray
		})

		this.originalCheckedArray = ArrayUtils.clone(checkedArray)

	}
	render(){
		//导航栏右侧按钮
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
					title={"Sort"}
					statusBar={{
		      			backgroundColor:'#2196F3'
		      		}}
		      		style={{backgroundColor:'#2196F3'}}
		      		leftButton={NavigationBarUtils.getLeftButton(() => this.onBack())}
		      		rightButton={rightButton}
				/>
				{/*order为key、onRowMoved里面内置的，只需要改数据this.state.checkedArray、renderRow渲染每一行数据*/}
				<SortableListView
					style={{flex:1}}
					data={this.state.checkedArray}
					order={Object.keys(this.state.checkedArray)}
					onRowMoved={ e => {
						this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from,1)[0])
						this.forceUpdate()
					}}
					renderRow={ row => <RowComponent data={row} />}
				/>
			</View>
		)
	}

	onBack(){

	}
	onSave(){

	}
}

// renderRow排序列表
class RowComponent extends Component{
	render(){
		return <TouchableHighlight
            underlayColor={'#eee'}
            style={styles.item}
            {...this.props.sortHandlers}
        >
            <View style={styles.row}>
                <Image source={require('./img/ic_sort.png')}  style={styles.image}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
	}
}
const styles = StyleSheet.create({
	title:{
		fontSize:20,
		color:'#fff'
	},
	container:{
		flex: 1
	},
	text:{
		fontSize:28
	},
	item:{
		padding:15,
		backgroundColor: '#F8F8F8',
		borderBottomWidth:1,
		borderColor: '#eee'
	},
	row:{
		marginLeft: 10, 
		flexDirection: 'row',
		alignItems:'center'
	},
	image:{
        tintColor:'#2196F3',
        width: 16,
        height: 16,
        marginRight: 10,
    }
})