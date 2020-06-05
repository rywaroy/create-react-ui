# crui

[![Build Status](https://www.travis-ci.org/rywaroy/crui.svg?branch=master)](https://www.travis-ci.org/rywaroy/crui)　[![Version](https://img.shields.io/badge/npm-v1.4.3-blue.svg)](https://www.npmjs.com/package/crui)

> react 代码、模板快速生成工具

## 简介

crui的灵感来源于[umi ui](https://umijs.org/zh-CN/docs/use-umi-ui)，借鉴了其中的资产模块功能。但是在日常开发中，其中的区块、模板，绝大多数来自于ant-design官方文档中的组件demo，“添加到项目”后依然还得根据业务的需求去修改。比如添加了表单组件后，还是得根据实际业务去添加FORM.ITEM，所以显得比较鸡肋。

而crui则更是贴近业务，可以创建业务代码模板、可视化去配置中后台常用的Table Form表单组件、自动生成组件文档，让开发者快速创建中后台基础页面从而提升工作效率。

## 使用

下载crui

```
npm install crui -D
```

在项目根目录下启动

```
npx crui
```

启动成功后进入`localhost:2019`进入控制台操作


也可以去克隆crui的实例项目，能更直观看到crui的功能

*例子*

```
git clone https://github.com/rywaroy/crui-example.git
```

```
npm i
```

```
npm run start & npx crui
```

## 功能介绍

* [模板](docs/template.md)

* [代码块](docs/code.md)

* [构建发布](docs/publish.md)

* [文档生成](docs/document.md)

* [配置](docs/configlist.md)