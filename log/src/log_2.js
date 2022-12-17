const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const types = require('@babel/types')

const sourceCode = `
    let a = 'shiliu'
        console.log(a)
`

const ast = parser.parse(sourceCode, {
    sourceType:'unambiguous',
    plugins: ['jsx']
})

const targetCalleeName = ['log', 'info', 'error', 'debug'].map( item => `console.${item}`)

traverse(ast, { //传入一个对象，每个属性是一个配置项，表示访问AST的什么节点
    CallExpression(path, state) {
        const calleeName = generate(path.node.callee).code
        if(targetCalleeName.includes(calleeName)) { //说明当前节点表示的源码就是console.${item}部分
            const { line, column } = path.node.loc.start //拿出当前节点的loc属性里包含的开始的行列信息
            path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`)) //使用stringLiteral构建AST，并插入整个AST结构中
        }
    }
})
const { code } = generate(ast)

console.log(code)