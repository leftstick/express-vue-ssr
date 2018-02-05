# 本地调试

```bash
#进入项目地址
cd express-vue-ssr

#安装依赖
npm i

#启动
npm run dev
```

> 然后，你就可以通过[http://localhost:9000](http://localhost:9000)访问项目了

**注意事项**：

本地调试时会有[hot-module-replacement](https://webpack.js.org/concepts/hot-module-replacement/)，这个功能仅对`web_app`目录下的代码生效，也就是说，如果你修改了`web_server`目录下的代码，那就必须重启上面指定的服务命令了
