## 介绍

i18n-cli 是一个自动国际化脚本，通过执行命令，自动提取代码里面的中文，自动调用百度或谷歌翻译接口，自动将翻译结果以 key-value 形式存入\*.json 语言包里。

## 使用

### 0、环境

请确保你的node版本大于15.0.0，因为老的node版本不支持`replaceAll`方法

### 1、安装

```node
npm install @tenado/i18n-cli -D
或
yarn add  @tenado/i18n-cli -D
```

### 2、初始化

```node
npx i18n-cli init
```

### 3、获取并配置百度翻译 api

进入百度翻译开放平台[https://fanyi-api.baidu.com/manage/developer](https://fanyi-api.baidu.com/manage/developer)，申请 `APP ID` 和`秘钥`。

### 4、配置 i18n.config.js

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
| ignoreText          | String | 注释对应的文本                            | i18n-disable                 |
| ignoreMethods       | Array  | 需要被忽略的方法，例如 console.log        | []                           |
| ignoreAttributes    | Array  | 需要被忽略的属性                          | []                           |
| translate           | Object | 翻译相关配置                              | -                            |
| translate.type      | String | 翻译的类型，baidu、google                 | -                            |
| translate.appId     | String | 翻译 appId                                | -                            |
| translate.secretKey | String | 翻译 secretKey                            | -                            |
| translate.interval  | Number | 翻译接口调用间隔，防止太频繁              | 1000                         |

### 5、自动转换

```node
npx i18n-cli sync
```

## 转换示例

转换前

```vue
<template>
  <div class="empty-data">
    <div class="name">{{ name }}</div>
    <template>
      <div class="empty-image-wrap">
        <img class="empty-image" :src="emptyImage" />
      </div>
      <div class="empty-title">暂无数据</div>
    </template>
  </div>
</template>

<script lang="js">
import Vue from "vue";
export default Vue.extend({
  data(){
    return {
      name: "测试"
    }
  },
});
</script>
```

转换后

```vue
<template>
  <div class="empty-data">
    <div class="name">{{ name }}</div>
    <template>
      <div class="empty-image-wrap">
        <img class="empty-image" :src="emptyImage" />
      </div>
      <div class="empty-title">{{ $t("zan-wu-shu-ju") }}</div>
    </template>
  </div>
</template>

<script lang="js">
import { i18n } from 'i18n';
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      name: i18n.t('ce-shi')
    };
  }
});
</script>
```

## TODO issue

- [x] 处理在转换 html 的时候，大写的标签会自动转换为小写

- [x] 已经转换的代码，不需要再次转换

- [x] 处理格式为`:name="'测试'"`类型的数据

- [x] 大写的属性被转换掉了，例如`<div originType="WORKSPACE"></div>`

- [x] 自闭和标签的解析，例如`<Toast />`

- [x] console.log 不需要翻译

- [x] disabled-i18n 添加

- [x] 多个 template 标签解析报错

- [x] form 里面的规则报错，:rules="{ required: true, message: '请输入名称', trigger: 'blur' }"
