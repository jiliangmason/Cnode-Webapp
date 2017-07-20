Cnode客户端：

运行方式：

npm install

npm run start

或者直接打开dist/index.html

浏览器打开本地8088端口

功能：
1. 登录退出
2. 列表分页，下拉自动加载
3. 发帖(成功后跳转到详情页)，回复帖子,点赞
4. 查看消息
5. 个人中心
6. 查看别人的资料


项目概述：
1. webpack移动端antd-mobile的配置，热替换，代码压缩，CSS分离等plugin
2. 布局方面flex盒模型布局，less负责每一个相应的Component
3. 每一个container组件都有一个相应的reducer，比如Login组件的Login(reducer)
4. 采用了redux-thunk，使action返回一个函数，实现了异步
5. 与后台的交互采用fetch，Promise异步处理结果，后台Api来源Cnode官网
6. React-Router负责个人/他人详情页面跳转，暂时采用React-Router2.0以后更改为4
7. 多分辨率适配还存在一些问题，后台Api中的编辑发布功能不支持修改测试区的主题，所以暂时未做这部分


未登陆时可查看：

![frontpage](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/首页.png)  ![frontpage2](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/首页2.png)  ![details1](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/详情1.png)  ![details2](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/详情2.png)  ![details3](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/他人详情.png)  ![myinfo](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/我的.png)  ![publish](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/发布.png)


登陆状态下：

![my](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/个人详情.png)  ![publish1](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/发布1.png)  ![publish2](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/发布2.png)  ![reply](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/回复他人.png)  ![up](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/点赞.png)  ![collect](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/收藏.png)  ![message](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/消息.png)  ![logfront](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/登陆首页.png)  ![logout](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/退出登陆.png)


redux的状态树一览：

![state1](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/state一览图.png)

![state2](https://github.com/jiliangmason/Cnode-Webapp/blob/master/show/state一览图2.png)


