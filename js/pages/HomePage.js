/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage' //最热组件
import UserPage from './UserPage'

import Toast,{DURATION} from 'react-native-easy-toast' //提示框

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state= {
      selectedTab: 'popular'
    };
  }
  //提示框全局注册，其他组件就可以用了
  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('showToast',(text) => {
      this.toast.show(text,DURATION.LENGTH_LONG)
    })
  }
  componentWillUnmount() {
    this.listener&&this.listener.remove()
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator style={styles.tabNavigator}>
          {/*可以用样式对renderIcon图片进行着色*/}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'popular'}
            title="最热"
            selectedTitleStyle={{color: "#2196F3"}}
            renderIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={styles.tabBarImg} />}
            renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.tabBarImg,{tintColor:'#2196F3'}]} />}
            onPress={() => this.setState({selectedTab: 'popular'})}
          >
            {/*...this.props路由等信息当作属性传递到组件*/}
            <PopularPage {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'user'}
            title="我的"
            selectedTitleStyle={{color: "#2196F3"}}
            renderIcon={() => <Image source={require('../../res/images/ic_my.png')} style={styles.tabBarImg} />}
            renderSelectedIcon={() => <Image source={require('../../res/images/ic_my.png')} style={[styles.tabBarImg,{tintColor:'#2196F3'}]} />}
            onPress={() => this.setState({selectedTab: 'user'})}
          >
            <UserPage {...this.props}/>
            {/*{...this.props}把路由传递给子组件*/}
          </TabNavigator.Item>
        </TabNavigator>
        <Toast ref={toast=>this.toast=toast}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabNavigator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabBarImg: {
    width: 22,
    height: 22
  }
});