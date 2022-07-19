//https://segmentfault.com/a/1190000017961297
//https://www.bilibili.com/video/BV1UC4y1h7xi?from=search&seid=16752754184482279828 视频

/*
源码在浏览器中都会作文纯文本被解析成AST 抽象语法树 abstract syntax tree
这个过程分成两部
第一步叫 词法分析
第一步会扫描所有代码，把代码根据既定的规程分成一个一个标识 就是所谓的token
这个过程中会把空白，换行，注释都去掉，然后把token放进数组中

第二步叫语法分析，也就是解析器
会把词法分析中数组的结构转换为树形表达式
*/

/*
Babel原理
                     
     parse 解析    Transform 转译        Generator
Code     ==>      AST     ==>       AST      ==>          Code
ES6/7  babylon       babel-traverse    babel-generator    ES5

     源代码先被解析成语法树，然后通过babel转变成更为简练的语法树，然后通过generator再转变成能被读取的代码
     这就是babel可以转化和压缩js的原理，包括webpack也是根据AST原理实现的


*/
