# i18n

脚本实现自动国际化

## 安装

```node
npm install @tenado/i18n -D

yarn add  @tenado/i18n -D
```

## 初始化

```node
npx i18n-cli init
```

## 转换

```node
npx i18n-cli sync
```

## 配置 i18n.config.js

| 名称                | 类型   | 说明                                      | 默认值                       |
| ------------------- | ------ | ----------------------------------------- | ---------------------------- |
| entry               | Array  | 入口                                      | src                          |
| local               | String | 本地语言                                  | zh-CN                        |
| localPath           | String | 语言存放位置                              | src/locales                  |
| langs               | Array  | 需要翻译的语言                            | en-US                        |
| keyPrefix           | String | 给生成的 key 添加前缀                     | -                            |
| keygenStrategy      | String | 生成多语言 key 的规则，可以为 random 或空 | -                            |
| i18nImport          | String | 引入 i18n                                 | import { i18n } from 'i18n'; |
| i18nObject          | String | i18n 对象                                 | i18n                         |
| i18nMethod          | String | i18n 方法                                 | t                            |
| translate           | Object | 翻译相关配置                              | -                            |
| translate.type      | String | 翻译的类型，baidu、google                 | -                            |
| translate.appId     | String | 翻译 appId                                | -                            |
| translate.secretKey | String | 翻译 secretKey                            | -                            |
| translate.interval  | Number | 翻译接口调用间隔                          | 1000                         |

## TODO issue

- 处理在转换 html 的时候，大写的标签会自动转换为小写

- 已经转换的代码，不需要再次转换

- 生成多语言 key 的配置

- vue 的 props 属性默认值，翻译显示

- 处理格式为`:name="'测试'"`类型的数据

- vue模板里面使用$t
