/**
* 页面的一些共用方法
*/
import React, { Component } from 'react'
import{
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity
} from 'react-native'
export default class NavigationBarUtils{
	/**
     * NavigationBar的左侧按钮方法getLeftButton
     */
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
	/**
     * NavigationBar的右侧按钮方法getRightButton
     */
	static getRightButton(title, callBack) {
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={callBack}>
            <View style={{marginRight: 10}}>
                <Text style={{fontSize: 20, color: '#FFFFFF',}}>{title}</Text>
            </View>
        </TouchableOpacity>
    }
}