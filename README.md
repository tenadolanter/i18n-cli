## 介绍

i18n-cli 是一个自动国际化脚本，通过执行命令，自动提取代码里面的中文，自动调用百度或谷歌翻译接口，自动将翻译结果以 key-value 形式存入\*.json 语言包里。

支持 vue 语法，支持 react 语法，支持 jsx 语法，支持 html 语法，i18n-cli 是一个和库无关的国际化脚本。

## 使用

### 0、环境

node > 15.0.0

### 1、安装

```node
npm install @tenado/i18n-cli -D
或
yarn add  @tenado/i18n-cli -D
```

### 2、初始化

执行如下命令，会在项目目录下生成一个`i18n.config.js`文件，里面记录了脚本执行时候需要的配置

```node
npx i18n-cli init
```

### 3、获取并配置百度翻译 api

- 进入百度翻译开放平台[https://fanyi-api.baidu.com/manage/developer](https://fanyi-api.baidu.com/manage/developer)，申请 `APP ID` 和`秘钥`。

- 将获取到的`APP ID` 和`秘钥`填入`i18n.config.js`文件下的`translate.appId`和`translate.secretKey`并保存

### 4、配置 i18n.config.js

| 名称                | 类型    | 说明                                                               | 默认值                       |
| ------------------- | ------- | ------------------------------------------------------------------ | ---------------------------- |
| entry               | Array   | 入口                                                               | src                          |
| exclude             | Array   | 排除文件夹：'src/exclude/\*\*'，排除文件：'src/exclude/\*\*/\*.js' | []                           |
| local               | String  | 本地语言                                                           | zh-CN                        |
| localPath           | String  | 语言存放位置                                                       | src/locales                  |
| langs               | Array   | 需要翻译的语言列表                                                 | ['en-US']                    |
| keyPrefix           | String  | 生成翻译 key 时候的默认前缀                                        | -                            |
| keygenStrategy      | String  | 生成翻译 key 的算法，可选值为 random、original 或不填，更多算法等待后面扩充  | -                            |
| keyShowOrigin       | Boolean | 生成的 key 后面是否显示中文，格式为 i18n.t('test', '测试')         | false                        |
| i18nImport          | String  | 引入 i18n                                                          | import { i18n } from 'i18n'; |
| i18nObject          | String  | i18n 对象                                                          | i18n                         |
| i18nMethod          | String  | i18n 方法                                                          | t                            |
| ignoreText          | String  | 注释，如// i18n-disable，则注释所在行的中文不会被翻译              | i18n-disable                 |
| ignoreMethods       | Array   | 需要被忽略的方法，例如 console.log                                 | []                           |
| ignoreAttributes    | Array   | 需要被忽略的属性，例如标签上的 id、name 等属性                     | []                           |
| translate           | Object  | 翻译配置对象                                                       | -                            |
| translate.type      | String  | 翻译的类型，baidu、youdao、google                                  | -                            |
| translate.appId     | String  | 翻译 appId                                                         | -                            |
| translate.secretKey | String  | 翻译 secretKey                                                     | -                            |
| translate.interval  | Number  | 翻译接口调用间隔，防止太频繁                                       | 1000                         |

语言 key 映射：

| 语言名称 | 语言 key |
| -------- | -------- |
| 简体中文 | zh-CN    |
| 繁体中文 | zh-TW    |
| 英语     | en-US    |
| 日语     | ja-JP    |
| 西班牙   | es-ES    |
| 俄语     | ru-RU    |
| 韩语     | ko-KR    |
| 法语     | fr-FR    |
| 德语     | de-DE    |

### 5、自动转换

```node
npx i18n-cli sync
```

特别说明：可以使用`npx i18n-cli extract`和`npx i18n-cli translate`代替如上命令，分步骤执行，1)提取代码里面的中文部分，2)翻译提取到的中文

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

- [x] html 里面标签转换错误，`<datasetDetailsDialog></datasetDetailsDialog>`

- [x] 已经转换的代码，不需要再次转换

- [x] 处理格式为`:name="'测试'"`类型的数据

- [x] 大写的属性被转换掉了，例如`<div originType="WORKSPACE"></div>`

- [x] 自闭和标签的解析，例如`<Toast />`

- [x] console.log 不需要翻译

- [x] disabled-i18n 添加

- [x] 多个 template 标签解析报错

- [x] form 里面的规则报错，:rules="{ required: true, message: '请输入名称', trigger: 'blur' }"

- [x] ts 里面强制类型转换`const arrs = <any>[]arr`

## 常见问题

[常见问题与报错](./QA.md)

## 特别提示

提示：**以脚手架的形式安装 i18n-cli，可能会因为依赖版本冲突的问题导致转换失败，这种情况下可以下载 github 上的仓库代码，配置 i18n.config.js 后，将需要翻译的文件夹拷贝到仓库下，然后执行 npm run sync**
