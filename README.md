## Web-Manga-Watcher
> 说明：自用看漫画小工具，练习用。
>
> 使用 node.js + Express + mySql | vue-cli + vantUi 搭建

#### 使用说明

```shell
git clone 本项目
# 后端
cd server
npm install
node app.js
# 前端
cd www
npm install
npm run serve
```



#### 目录结构

```
.
├── server                  # 后端
│   ├── config              # 配置文件
│   ├── routes              # 接口
│   ├── ...
│   └── app.js              # 主程序
├── www                     # 前端
│   ├── src                 # 资源目录
│   │   ├── api             # axios二次封装
│   │   ├── assets          # 静态资源
│   │   │	├── ...
│   │   │	└── iconfont    # 阿里图标字体
│   │   ├── components      # 自定义组件
│   │   ├── router          # vue-router
│   │   ├── store           # vuex
│   │   ├── utils           # 第三方组件
│   │   ├── views           # 页面资源
│   │   ├── ...
│   │   └── App.vue	        # 主程序
│   ├── ...
│   └── vue.config.js       # vue配置文件 (less)
├── db.sql                  # mysql测试文件
├── projectManga.pdman.json # pdman存档
└── README.md               # 说明文档
```



#### 注意事项
- 引入了两个组件库elementUi & vantUi 由于移动端应用，element没有使用，可从package.json中移除
- ~~vant搜索框去掉了padding属性，通过less-loader，在vue.config.js中配置 (已作废)~~
- less插件可能也不需要
- 搭配vantUi，使用了iconfont的自定义图标<a src='https://www.csdn.net/tags/Mtzagg0sNjIzMy1ibG9n.html'>参考教程</a>