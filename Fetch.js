/**
 * Fetch
 * 
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView
} from 'react-native';

import NavigationBar from './NavigationBar'


export default class FetchComponent extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		result: ''
  	}
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
			title="Fetch的使用"
			statusBar={{backgroundColor:'red'}}
        />
        <Text onPress={ () => this.onLoad('http://rap.taobao.org/mock/11793/test') }>点我GET请求获取数据</Text>
        <Text onPress={ () => this.onSubmit('http://rap.taobao.org/mock/11793/test',{userName:'小明',password:'123456'}) }>点我POST请求发送数据返回结果</Text>
        <Text>数据返回结果：{this.state.result}</Text>
      </View>
    );
  }

  onLoad(url){
  	fetch(url)
  	.then( response =>{
  		return response.json()
  	}).then( result => {
  		this.setState({
  			result: JSON.stringify(result)
  		})
  	}).catch( error => {
  		this.setState({
  			result: JSON.stringify(error)
  		})
  	})
  }

  onSubmit(url,data){
  	fetch(url,{
  		method:'POST',
  		header:{
  			'Accept': 'application/json',
  			'Content-Type' :'application/json'
  		},
  		body: JSON.stringify(data) //序列化
  	})
  	.then( response =>{
  		return response.json()
  	}).then( result => {
  		this.setState({
  			result: JSON.stringify(result)
  		})
  	}).catch( error => {
  		this.setState({
  			result: JSON.stringify(error)
  		})
  	})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
});

