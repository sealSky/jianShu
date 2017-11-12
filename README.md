# jianShu
主要是用node.js爬简书首页的数据，然后用来练习Vue

使用的依赖包cheerio包，利用cheerio进行数据筛选，把需要的文章列表以数组的形式存储

最后为了方便获取数据，使用fs把数据写入一个tess.json文件中

在Vue中使用resource插件获取数据，主要使用v-for来把数据渲染到html中
