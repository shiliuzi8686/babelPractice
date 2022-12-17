日志辅助调试

本质：
遍历 AST 的时候对 console.log、console.info 等 api 自动插入一些参数，也就是要通过 visitor 指定对 CallExpression 的 AST 做一些修改

实现：
CallExrpession 节点有两个属性，callee 和 arguments，分别对应调用的函数名和参数， 所以我们要判断当 callee 是 console.xx 时，在 arguments 的数组中中插入一个 AST 节点。


具体实现：
node 执行main.js文件，终端查看
想通过浏览器console查看，index.html引入src/main.js ，index.html在浏览器中打开，报错：require not defined
思路：安装，使用webpack来编译项目
webpack实现了require和default的转化，可以编译成浏览器能够运行的code