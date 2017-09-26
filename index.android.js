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
  Navigator
} from 'react-native';

import Boy from './NavigatorBoy'
export default class TabBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        {/*renderScene渲染路由*/}
        <Navigator
          initialRoute={{
            component: Boy
          }}
          renderScene={ (route,navigator) => {
            let Component = route.component
            return <Component navigator={navigator} {...route.params} />
          }}
        ></Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
});

AppRegistry.registerComponent('TabBar', () => TabBar);
