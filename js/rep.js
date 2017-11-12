// 加载http模块
var http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');
var fs = require('fs');

// 定义网络爬虫的目标地址：自如友家的主页
var url = 'http://www.jianshu.com/';

http.get(url, function(res) {
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    // 数据获取结束
    res.on('end', function() {
        // 通过过滤页面信息获取实际需求的内容信息信息
        // console.log(html);
        var infoListData = filterinfoList(html);
        // 打印信息
        // console.log(infoListData);
        // printInfo(infoListData);
        writeFile('test.json',infoListData);
    });
}).on('error', function() {
    console.log('获取数据出错！');
});

/* 过滤页面信息 */
function filterinfoList(html) {
    if (html) {
        // 沿用JQuery风格，定义$
        var $ = cheerio.load(html);
        // 根据class获取内容信息
        var infoList = $('#list-container .note-list');
        // 章节数据
        var infoListData = [];


        /* 内容信息列表信息遍历 */
        infoList.find('li').each(function(item) {

            var lis = $(this);
            // 右侧图片块
            var wrapImg = lis.find('img').attr('src');

            // 内容块
            var content = lis.find('.content');
            // 作者名
            var author = content.find('.author');
            // 作者模块
            var authors = [];
            var authorHead = author.find('img').attr('src');
            var authorName = author.find('.nickname').text();
            authors.push({
                authorHead: authorHead,
                authorName: authorName
            });

            // 标题
            var title = content.find('.title').text();

            // 内容
            var abstract = content.find('.abstract').text();

            // 分类
            var metas = [];
            var meta = content.find('.meta');
            var collectionTag = meta.find('.collection-tag').text();
            var read = meta.find('.ic-list-read').parent('a').text();
            var comments = meta.find('.ic-list-comments').parent('a').text();
            var like = meta.find('.ic-list-like').parent('a').text();
            metas.push({
                collectionTag: collectionTag,
                read: read,
                comments: comments,
                like: like
            });

            infoListData.push({
                wrapImg: wrapImg,
                authors : authors,
                title : title,
                abstract : abstract,
                metas : metas
            });

        });
        // 返回内容信息列表信息
        return infoListData;
    } else {
        console.log('无数据传入！');
    }
}

/* 打印信息 */
function printInfo(infoListData) {
    // 计数
    var count = 0;
    // 遍历信息列表
    infoListData.forEach(function(item) {
        // 获取文章
        var author = item.author;
        var title = item.title;
        var abstract = item.abstract;
        var meta = item.meta;

        // 打印信息
        // console.log('第' + (++count) + '个内容信息');
        // console.log(author);
        // console.log(title);
        // console.log(abstract);
        // console.log(meta);
        // console.log('\n');
    });
}

/* 把爬取到的数据存储到一个文件中，模拟后台 */
function writeFile(file,text) {
    fs.writeFile(file,JSON.stringify(text),function (err) {
        if(err){
            return console.log(err);
        }
    });
}