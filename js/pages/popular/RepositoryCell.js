import React, { Component } from 'react'
import{
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native'

export default class RespositoryCell extends Component{
	render(){
		return <TouchableOpacity sytle={styles.container}>
			<View style={styles.cell_container}>
				<Text style={styles.title}>{this.props.data.full_name}</Text>
				<Text style={styles.description}>{this.props.data.description}</Text>
				<View style={{flexDirection: 'row',justifyContent:'space-between'}}>
					<View style={{flexDirection: 'row',alignItems:'center'}}>
						<Text>Author:</Text>
						<Image 
							style={{width:22,height:22}}
							source={{uri: this.props.data.owner.avatar_url}}
						/>
					</View>
					<View style={{flexDirection: 'row',alignItems:'center'}}>
						<Text>Stars:</Text>
						<Text>{this.props.data.stargazers_count}</Text>
					</View>
					<Image source={require('../../../res/images/ic_star.png')} style={{width:22,height:22}}/>
				</View>
			</View>
		</TouchableOpacity>
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	title:{
		fontSize: 16,
		marginBottom:2,
		color:'#212121'
	},
	description: {
		fontSize:14,
		marginBottom:2,
		color:'#757575',
		borderRadius:2
	},
	cell_container:{
		backgroundColor:'#fff',
		padding:10,
		marginLeft:5,
		marginRight:5,
		marginVertical:3,
		borderWidth:0.5,
		borderColor:'#ddd',
		//ios里面阴影用shadow android里面用elevation
		shadowColor:'gray', //阴影颜色
		shadowOffset:{width:0.5,height:0.5}, //阴影偏移量
		shadowOpacity:0.4,
		shadowRadius:1, //阴影半径
		elevation:2
	}
})