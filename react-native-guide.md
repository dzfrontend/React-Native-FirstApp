# React-Native-Github

下面是本项目中用到的react-native知识点

## react-native-guide

#### 底部菜单TabBar

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





	



