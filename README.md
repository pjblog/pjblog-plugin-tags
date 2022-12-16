一套用于`PJBlog`插件开发的完整模板。它支持两种开发模式：

- `Base development` 基础开发，用于定义插件后端逻辑。
- `Advance development` 高级开发，用于定义插件后台管理界面的开发。

## Clone repository

```bash
$ git clone git@github.com:pjblog/pjblog-template-plugin.git
$ cd pjblog-template-plugin
$ rm -rf .git
$ npm i
```

模板项目包含了`Base development`与`Advance development`两种开发模式。这两种模式分别对应`packages`下面的2个文件夹

## Config Blog

首先，对`package.json`的进行配置。在`orm`字段中选择开发的数据库。

目前支持以下几种数据库

- mysql
- mssql
- mongodb
- oracle
- postgres

具体的配置请参考NPM模块 [typeorm](https://www.npmjs.com/typeorm)

在`package.json`中以下的字段是必须配置的：

- `name` 必须以 `pjblog-plugin-` 开头
- `version` 版本号
- `description` 插件描述
- `repository` 代码仓库地址，一般使用`github`仓库地址
- `homepage` 插件主页地址，一般是`npmjs.com`上的模块网络地址

> 注意： 如果本插件依赖其他插件，那么必须在`pjblog.extends`中说明。

其他的配置不需要改动，默认即可。

## Base development

代码地址: `/packages/widget/`。你可以根据插件文档开发。

开发过程需要新开命令行窗口

```bash
# 开发
$ npm run widget:watch 

# 编译
$ npm run widget:build
```

## Advance development

代码地址: `/packages/advance/`。这里是一个前端项目，我们采用微前端方案进行页面注入，具体参考[qiankun](https://npmjs.com/qiankun)。

首先，如果你的插件需要用到高级功能，那么你需要在`package.json`的`pjblog.advance`指定编译后的文件夹地址。如果使用本项目，那么不需要改动。如果不需要高级功能，请将`pjblog.advance`字段删除。

其次，我们使用`react@18.x`开发，目前没有支持其他框架的开发。比如`vue@3.x`，后续我们会跟进补充扩展。理论上，基于微前端开发，那么这个插件不局限使用什么框架来开发，应用项目本就隔离。

> 如果基于非官方推荐的项目编译，那么参考[qiankun](https://npmjs.com/qiankun)模块的应用开发说明。

最后，我们需要使用以下的命令开发（基于新开命令行窗口）：

```bash
# 开发
$ npm run advance:watch

# 编译
$ npm run advance:build
```

> 在开发高级用用页面的时候，我们推荐使用`antd@5.x` + `@pjblog/hooks`模块进行开发。请将高级项目开发中的模块依赖全部写入`devDependencies`中，而非`dependencies`，这点很重要。

## Start PJBlog

基于新开命令行窗口

```bash
$ pjblog start
```

你可以在`插件 -> 高级 -> 页面`中实时查看效果。

## Compile

```bash
$ npm run build
```

## Publish

在发布前，首先要确保你已经登录NPM命令行

```bash
$ npm whoami
```

如果没有登录，你需要

```bash
$ npm login
```

登录完毕后，你通过

```bash
$ npm run publish
```

进行发布，系统将自动到处需要的内容到`.publish`文件夹，进行发布。

> 注意： 发布前请修改你的项目的版本 `package.json` 中的 `version`字段。
