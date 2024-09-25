export const packageManager = {
     id: '包管理器',
     children: [
        {id:'什么是包管理器'},
        {id:'解决的问题'},
        {id:'组成部分'},
        {id:'语义化版本控制'},
        {id:'脚本功能'},
        {id:'依赖解析'},
        {id:'包安装'},
        {id:'命令行界面'},
        {id:'Npm、Yarn 和 Pnpm 对比'},
     ]
}

export const scaffold = {
    id: '脚手架',
    children: [
        {id:'什么是脚手架'},
        {id:'发展历史'},
        {id:'脚手架工作原理'},
        {id:'脚手架解决的问题'},
        {id:'常见脚手架'},
        {id:'如何使用'},
        {id:'优势'},
        {id:'问题'},
        {id:'以后的发展'},
     ]
}

export const codeSpecifications = {
    id: '代码规范'
}

export const develop = {
    id: '开发'
}

export const test = {
    id: '测试'
}

export const build = {
    id: '构建'
}

export const cicd ={
    id: 'CI & CD'
}

export const developMap = {
    id:'研发链路',
    children:[
        packageManager,
        scaffold,
        codeSpecifications,
        develop,
        test,
        build,
        cicd
    ]
}

export const indicator = {
    id:'指标',
}

export const performanceTool = {
    id:'工具',
}

export const performance = {
    id:'性能优化',
    children:[
        indicator,
        performanceTool
    ]
}

export const domAndCssom = {
    id:'DOM Tree && CSSOM',
    children: [
        {id:'DOM Tree',children:[{id:'DOM Tree形成过程'},{id:'DOM Tree内部结构'},{id:'DOM Tree影响'},]},
        {id:'CSSOM',children:[{id:'形成过程'},{id:'内部结构'},{id:'影响'}]},
        {id:'两者关系',children:[{id:'并行构建'},{id:'形成渲染树'},{id:'JS 对两者的影响'}]},
     ]
}

export const browser = {
    id:'浏览器',
    children: [
        domAndCssom
    ]
}


export const allData = {
    id: '前端知识图谱',
    children:[
        developMap,
        performance,
        browser
    ]
}