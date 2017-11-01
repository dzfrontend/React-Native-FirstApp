/**
* WebView
**/
'use strict'
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    WebView
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'

export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        
        let title = this.props.item.full_name
        this.url = this.props.item.html_url //路由携带过来的item数据
        this.state = {
            url: this.url,
            canGoBack: false,
            title: title,
        }
    }

    //webView返回操作
    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();//退出webView
        } else {
            this.props.navigator.pop();//返回上一个网页
        }
    }
    
    //每次开始加载和加载结束都会调用onNavigationStateChange
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    style={{backgroundColor:'#2196F3'}}
                    statusBar={{
                        backgroundColor:'#2196F3'
                    }}
                />
                <WebView
                    ref={webView=>this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})
