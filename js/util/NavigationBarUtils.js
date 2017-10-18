/**
* NavigationBar的左侧按钮方法getLeftButton
**/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity
} from 'react-native'
export default class NavigationBarUtils{
	static getLeftButton(callBack){
		return <TouchableOpacity 
				onPress={callBack} 
				style={{padding:8}}
			>
			<Image 
				style={{width:26,height:26}} 
				source={require('../../res/images/ic_arrow_back_white_36pt.png')}
				tintColor='white'
			/>
		</TouchableOpacity>
	}
}