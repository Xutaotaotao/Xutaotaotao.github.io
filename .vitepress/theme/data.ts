export type GraphLocale = 'zh' | 'en'

export type GraphNode = {
  id: string
  labelZh: string
  labelEn: string
  children?: GraphNode[]
}

function node(id: string, labelZh: string, labelEn: string, children?: GraphNode[]): GraphNode {
  return {
    id,
    labelZh,
    labelEn,
    children,
  }
}

export const packageManager = node('package-manager', '包管理器', 'Package Manager', [
  node('what-is-package-manager', '什么是包管理器', 'What is a package manager?'),
  node('problems-solved', '解决的问题', 'Problems it solves'),
  node('core-parts', '组成部分', 'Core parts'),
  node('semver', '语义化版本控制', 'Semantic versioning'),
  node('scripts', '脚本功能', 'Scripts'),
  node('dependency-resolution', '依赖解析', 'Dependency resolution'),
  node('package-installation', '包安装', 'Package installation'),
  node('cli', '命令行界面', 'Command-line interface'),
  node('npm-yarn-pnpm', 'Npm、Yarn 和 Pnpm 对比', 'Npm vs Yarn vs Pnpm'),
])

export const scaffold = node('scaffold', '脚手架', 'Scaffolding', [
  node('what-is-scaffold', '什么是脚手架', 'What is scaffolding?'),
  node('scaffold-history', '发展历史', 'History'),
  node('how-scaffold-works', '脚手架工作原理', 'How scaffolding works'),
  node('scaffold-problems-solved', '脚手架解决的问题', 'Problems it solves'),
  node('common-scaffolds', '常见脚手架', 'Common scaffolding tools'),
  node('how-to-use-scaffold', '如何使用', 'How to use it'),
  node('scaffold-advantages', '优势', 'Advantages'),
  node('scaffold-issues', '问题', 'Issues'),
  node('scaffold-future', '以后的发展', 'Future direction'),
])

export const codeSpecifications = node('code-specifications', '代码规范', 'Code standards', [
  node('popular-style-guides', '业界流行规范', 'Popular style guides', [
    node('airbnb-style-guide', 'Airbnb Style Guide', 'Airbnb Style Guide'),
    node('standard-js', 'StandardJS', 'StandardJS'),
    node('google-style-guide', 'Google Style Guide', 'Google Style Guide'),
  ]),
  node('css-naming-conventions', 'CSS 命名规范', 'CSS naming conventions', [
    node('bem', 'BEM', 'BEM'),
    node('oocss', 'OOCSS', 'OOCSS'),
    node('smacss', 'SMACSS', 'SMACSS'),
  ]),
  node('code-tools', '代码规范工具', 'Code quality tools', [
    node('eslint', 'ESLint', 'ESLint'),
    node('stylelint', 'stylelint', 'stylelint'),
    node('commitlint', 'commitlint', 'commitlint'),
    node('prettier', 'prettier', 'prettier'),
    node('husky-lint-staged', 'husky & lint-staged', 'husky & lint-staged'),
  ]),
])

export const develop = node('development', '开发', 'Development', [
  node('dev-server', '开发服务器', 'Dev server'),
  node('hot-reload', '热更新', 'Hot reload'),
  node('mock-data', '数据模拟', 'Mock data'),
  node('proxy', '代理', 'Proxy'),
])

export const test = node('testing', '测试', 'Testing')

export const build = node('build', '构建', 'Build')

export const cicd = node('ci-cd', 'CI & CD', 'CI & CD')

export const developMap = node('engineering-workflow', '研发链路', 'Engineering workflow', [
  packageManager,
  scaffold,
  codeSpecifications,
  develop,
  test,
  build,
  cicd,
])

export const indicator = node('performance-metrics', '指标', 'Metrics')

export const performanceTool = node('performance-tools', '工具', 'Tools')

export const performance = node('performance', '性能优化', 'Performance optimization', [
  indicator,
  performanceTool,
])

export const domAndCssom = node('dom-cssom', 'DOM Tree && CSSOM', 'DOM Tree && CSSOM', [
  node('dom-tree', 'DOM Tree', 'DOM Tree', [
    node('dom-tree-process', 'DOM Tree形成过程', 'DOM tree creation process'),
    node('dom-tree-structure', 'DOM Tree内部结构', 'DOM tree structure'),
    node('dom-tree-impact', 'DOM Tree影响', 'DOM tree impact'),
  ]),
  node('cssom', 'CSSOM', 'CSSOM', [
    node('cssom-process', '形成过程', 'Creation process'),
    node('cssom-structure', '内部结构', 'Internal structure'),
    node('cssom-impact', '影响', 'Impact'),
  ]),
  node('dom-cssom-relation', '两者关系', 'Their relationship', [
    node('parallel-build', '并行构建', 'Parallel construction'),
    node('render-tree', '形成渲染树', 'Render tree construction'),
    node('js-impact', 'JS 对两者的影响', 'JavaScript impact'),
  ]),
])

export const browser = node('browser', '浏览器', 'Browser', [
  domAndCssom,
])

export const allData = node('frontend-knowledge-map', '前端知识图谱', 'Frontend knowledge map', [
  developMap,
  performance,
  browser,
])
