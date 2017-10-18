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
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage' //最热组件
import UserPage from './UserPage'


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state= {
      selectedTab: 'popular'
    };
  }
  render() {
    return (
      <TabNavigator style={styles.container}>
        {/*可以用样式对renderIcon图片进行着色*/}
        <TabNavigator.Item
          selected={this.state.selectedTab === 'popular'}
          title="最热"
          selectedTitleStyle={{color: "#2196F3"}}
          renderIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={styles.tabBarImg} />}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.tabBarImg,{tintColor:'#2196F3'}]} />}
          onPress={() => this.setState({selectedTab: 'popular'})}
        >
          <PopularPage/>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
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