# React-Native-Github

下面是本项目中用到的react-native知识点

## react-native项目准备工作

#### 底部菜单TabBar 第三方组件

>用的是第三方组件react-native-tab-navigator  
>文档：<https://github.com/happypancake/react-native-tab-navigator>

#### Navigator路由组件

>用的是react-native内置组件Navigator

initialRoute初始化的时候显示某个组件，renderScene将route和navigator当作外部参数传入组件，该组件需要的时候就可以用到navigator和route。

	export default class TabBar extends Component {
	  render() {
	    return (
	      <View>
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

#### 自定义NavigationBar

>在Navigator的基础上加上顶部导航栏
	
#### ListView

>ListView列表、下拉刷新

ListView列表组件

#### Fetch

fetch是react native内置的，也不需要导入直接使用。

> Fetch封装

	/**
	 * fetch get和post封装
	 * 使用：
		HttpUtils.get(url).then( result => {})
	 	HttpUtils.post(url,data).then( result => {})
	**/
	
	export default class HttpUtils{
	  static get(url){
	    return new Promise( (resolve,reject) => { //用Promise处理fetch后的then操作
	      fetch(url)
	      .then(response => response.json())
	      .then( result => {
	        resolve(result)
	      })
	      .catch( error => {
	        reject(error)
	      })
	    })
	  }
	  static post(url,data){
	    return new Promise( (resolve,reject) => {
	      fetch(url,{
	        method: 'POST',
	        header: {
	          'Accept':'application/json',
	          'Content-Type':'application/json'
	        },
	        body: JSON.stingify(data)
	      })
	      .then(response => response.json())
	      .then( result => {
	        resolve(result)
	      })
	      .catch( error => {
	        reject(error)
	      })
	    })
	  }
	}

## react-native项目开始

#### react-native-scrollable-tab-view 第三方组件

>可滑动tab切换，用法查看github。

#### ListView上拉刷新

>用到react-native的RefreshControl组件

RefreshControl组件中属性refreshing和onRefresh：  
  refreshing为true显示loading，false隐藏loading  
  onRefresh在上拉操作的时候触发
	
	constructor(props) {
	  super(props);
	  this.state = {
	    dataSource:new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2 }),
	    isLoading:false,
	  }
	}
	loadData = () => {
	  this.setState({
	    isLoading: true
	  })
	  //数据请求成功后
	  this.setState({
	    dataSource: this.state.dataSource.cloneWithRows('请求成功后的数据'),
	    isLoading: false
	  })
	}
	render(){
	  return <View>
	    <ListView
	      dataSource={this.state.dataSource}
	      renderRow={ data => this.renderRowHandle(data)}
	      refreshControl={
	        <RefreshControl
	          refreshing={this.state.isLoading}
	          onRefresh={() => this.loadData()}
	        />
	      }
	    />
	  </View>
	}

#### AsyncStorage

>异步的，持久化的key-value存储系统,React Native官方推荐的数据存储方式，旨在代替LocalStorage

>用法和LocalStorage类似，具体查看文档。

#### 离线缓存

>在react-native中，有必要对网络请求后的数据存储到AsyncStorage，这样可以优化体验，设置一个时间段，在这个时间段内使用本地存储数据，过时后再请求网络数据。

#### react-native-check-box第三方组件

>这是第三方复选框组件，用在订阅标签模块

#### react-native-sortable-listview第三方组件

>第三方拖拽排序组件

#### react-native-easy-toast

>第三方消息提示插件
