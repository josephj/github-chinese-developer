# 模组加载方式具体实现范例
## 范例名称：两岸三地的 GitHub 开发者

## Branch 所代表的意义

* master: 简单用 jQuery + Handlebar.js 所实作的传统加载模式。
* yui: 简单用 YUI 所实作的传统加载模式。
* page-level: 使用 Mini 工具做页层级加载。
* module-level: 使用 YUI Loader + PHP Minify + Static Loader 三个工具达到模块层级加载。

## 依赖性

* 切换到 page-level 需要安装 YUI Compressor (命令列直接打 yuicompressor 要可以执行)
* 切换到 page-level 需要设定 Apache DEVROOT 环境变数
* 切换到 page-level 与 module-level 都需要有 PHP 支持、并修改 Apache 让它支持 Minify 工具。
* 切换到 module-level 需要设定 conf/static-loader/config.conf
