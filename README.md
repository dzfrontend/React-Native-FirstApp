# React-Native-Github

React Native实现的GitHub原生APP，用来查看GitHub最受欢迎与最热项目。
参考的是：<https://github.com/crazycodeboy/GitHubPopular>

## 技术栈

React Native + ES6 + AsyncStorage + Fetch + Native Moudules + 第三方库

## 项目运行

	1.搭建好React Native环境

	2.clone https://github.com/dzfrontend/React-Native-Github.git,然后进入该目录

	3.npm install安装依赖

	4.react-native run-android 运行安卓项目
	  react-native run-ios 运行ios项目

## React Native搭建安卓开发环境

要想学习或者开发React Native项目，搭建运行环境是必须的。下面整理了在widows平台下搭建react   native安卓开发环境。

#### 搭建环境所需要的软件分享

百度云盘：链接:<http://pan.baidu.com/s/1bpgv00R> 密码: zrjd

#### 1.安装Node.js

这个是必须的

#### 2.安装jdk

下载JDK安装包，安装。安装过程中会出现两次安装提示 。第一次是安装 jdk ，第二次是安装 jre，两个都安装在同一个文件夹中的不同文件夹中

安装好后环境变量配置，参考<http://jingyan.baidu.com/article/3c343ff70bc6ea0d377963df.html>.

#### 3.安装sdk

安装好后打开sdk的安装目录，先运行SDK Manager.exe，必须下载安装好Android SDK Tools和 Android SDK Platfo_tools，然后接下来的环境变量配置才有效。

环境变量配置，参考<http://jingyan.baidu.com/article/48b558e31fb9867f38c09a8f.html>，其中SDK_HOME应改为ANDROID_HOME，不然后面会报错

配置好后，就可以在cmd运行adb命令，用于后面的adb devices查看已连接的设备，方便调试。

#### 4.安装C++环境

编译node.js的C++模块时需要用到

#### 5.react-native-cli快速创建RN项目环境

	安装React Native命令行工具：
	npm install -g react-native-cli

	创建项目
	react-native init React-Native-Github

	启动项目
	react-native start

启动项目后可以用浏览器访问<http://localhost:8081/index.android.bundle?platform=android>看看是否可以看到打包后的脚本，有就打包成功。

#### 6.准备模拟器或真机运行android
	
	运行react-native安卓项目
	react-native run-android

问题：找不到sdk或者 无法正常化sdk路径  
解决：jdk或sdk环境变量没有配置好，返回配置。

问题：failed to find target with hash string 'android-23' in: F:\Android_SDK  
解决：打开sdk的安装目录，先运行SDK Manager.exe，更新23版本的SDK Platform 23和 Android SDK Build-Tools 23.0.1

问题： You have not accepted the license agreements of the following SDK components:[Android Support Repository].  
解决：在SDK Manager.exe里安装安卓支持库 Android Support Repository

问题：com.android.builder.testing.api.DeviceException: No connected devices!  
解决：没有设备导致的，需要连接到安卓模拟器或者手机

问题：想要运行安卓模拟器进行调试  
解决：  
1.在SDK Manager.exe里安装Intel x86 Atom_64 System Image(还没测试和这个有没有关系，可以先不安装继续后面的步骤)  
2.安装完模拟器后，要使用adb命令Android studio才能识别出来；  
打开cmd,输入：adb connect 127.0.0.1:21503，逍遥安卓模拟器的端口号是21503，其他模拟器端口看链接：<http://blog.csdn.net/qq_22078107/article/details/53229039>  
3.命令行adb devices，有设备表示sdk成功连接到安卓模拟器

#### 7.模拟器或真机运行android运行成功后

但是发现build成功后界面是红色的  

原因：模拟器需要设置一个ip地址+端口，其中ip地址为电脑wifi的ip地址，端口保持和react native运行端口一致  

解决方法：模拟器里面摇一摇，然后Dev Settings-Debug server host & port for device，输入本电脑wifi的ip地址+8081，例如：192.168.1.100:8081

在解决方法中可以先验证<http://192.168.1.100:8081/index.android.bundle?platform=android>能不能打开，这个必须要能够访问上面问题才能解决。


## 项目结构
	.
	├── index.ios.js                                // ios入口文件
	├── index.android.js                            // android入口文件
	├── android                                     // android native
	├── ios                                         // ios native项目
	├── res                                         // 全局静态资源
	├── doc                                         // 文档说明
	├── js                                          // ios native项目
	│   ├── common                                  // 可复用组件
	│   ├── expand                                  // 扩展
	│   ├── config                                  // 配置项（常量、接口地址、路由、多语言化等预置数据）
	│   ├── util                                    // 工具类（非UI组件）




	



