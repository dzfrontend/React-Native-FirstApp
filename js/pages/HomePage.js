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
import PopularPage from './PopularPage'

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Home
        </Text>
      </View>
    )
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
      </View>
    )
  }
}
export default class HomePage extends Component {

  
  constructor(props) {
    super(props);
    this.state= {
      selectedTab: 'home'
    };
  }
  render() {
    return (
      <TabNavigator style={styles.container}>
        {/*可以用样式对renderIcon图片进行着色*/}
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="最热"
          selectedTitleStyle={{color: "#2196F3"}}
          renderIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={styles.tabBarImg} />}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.tabBarImg,{tintColor:'#2196F3'}]} />}
          selectedTitleStyle={{color:'#2196F3'}}
          onPress={() => this.setState({selectedTab: 'home'})}>
          <PopularPage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          selectedTitleStyle={{color: "#2196F3"}}
          renderIcon={() => <Image source={require('../../res/images/ic_trending.png')} style={styles.tabBarImg} />}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_trending.png')} style={[styles.tabBarImg,{tintColor:'#2196F3'}]} />}
          selectedTitleStyle={{color:'#2196F3'}}
          onPress={() => this.setState({selectedTab: 'profile'})}>
          <Profile/>
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