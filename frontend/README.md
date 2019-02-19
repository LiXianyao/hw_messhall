#安装node.js
进入node.js官方网站，下载LTS版本  
> https://nodejs.org/zh-cn/

傻瓜式安装一直点到底就可以  
安装完成后win+R cmd打开运行窗口
输入
> npm -v  
> node -v

分别查到版本号表示下载完成
然后我们可以通过更改成淘宝源提高速度
>npm config set registry https://registry.npm.taobao.org

然后利用下面这个命令来检查更改是否成功

>npm config get registry


#安装react
> npm install -g create-react-app

然后验证一下是否安装成功
>create-react-app my-app  
>cd my-app/  
>npm start

然后从浏览器打开
>http://localhost:3000/

出现 welcome to react 界面即成功

#安装订餐项目依赖包
从github上下载订餐项目后，frontend文件夹即为react工程
进入frontend文件夹开始安装依赖包
>cd frontend/  
>npm init

一路狂按回车就可以  
react这个命令会生成初始的package.json文件，不然的话直接安装包会报save error  
然后用下面这个命令安装依赖包
>npm install --save xxx

xxx是依赖包名字  
所需依赖包列表如下  

+ react-dom
+ react-scripts
+ antd
+ react-router
+ react-router-dom
+ react-html-table-to-excel
+ react-highlight-words 

如果之后npm start还有报错提示缺的包也用同一方法安装  

#启动项目
>npm start

Compiled with warning后  
打开浏览器访问下列网址即可看到各个界面
>http://localhost:3000/login  
>http://localhost:3000/food/admin/0  
>http://localhost:3000/food/business/0
>http://localhost:3000/food/customer/0

在admin business 和 customer 页面下可以感受到权限的区分  
目前完成登录注册页面，餐品列表界面，订单列表界面，留言板界面，我的资料界面。  
购物车界面未完成，和后端通信未完成。