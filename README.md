<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [入门知识](#%E5%85%A5%E9%97%A8%E7%9F%A5%E8%AF%86)
  - [搭建开发环境](#%E6%90%AD%E5%BB%BA%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)
    - [初始化项目 + 安装依赖](#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE--%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96)
    - [配置文件](#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
  - [组件 & props](#%E7%BB%84%E4%BB%B6--props)
    - [数据不可变性的好处](#%E6%95%B0%E6%8D%AE%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%80%A7%E7%9A%84%E5%A5%BD%E5%A4%84)
    - [函数组件](#%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6)
    - [key](#key)
  - [State & 生命周期](#state--%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
    - [state](#state)
      - [单向数据流（自上而下）](#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E8%87%AA%E4%B8%8A%E8%80%8C%E4%B8%8B)
    - [生命周期](#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  - [事件处理](#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86)
  - [条件渲染](#%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93)
  - [表单](#%E8%A1%A8%E5%8D%95)
  - [组合 vs 继承](#%E7%BB%84%E5%90%88-vs-%E7%BB%A7%E6%89%BF)
    - [组合](#%E7%BB%84%E5%90%88)
    - [继承](#%E7%BB%A7%E6%89%BF)
  - [备忘](#%E5%A4%87%E5%BF%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 入门知识

## 搭建开发环境

目标：react + ts + scss + eslint + husky

### 初始化项目 + 安装依赖

```shell
yarn create @vitejs/app hello-react --template react-ts
cd hello-react
rm package-lock.json
yarn add sass husky prettier pretty-quick doctoc -D
yarn
```

### 配置文件

[.eslintrc.js](./.eslintrc.js)<br/>
[.huskyrc.json](./.huskyrc.json)<br/>
[.prettierrc.json](./.prettierrc.json)<br/>
[.commitlintrc.json](./.commitlintrc.json)<br/>

## 组件 & props

### 数据不可变性的好处

**声明 props 的时候所有属性都设置成 readonly**

不直接修改（或改变底层数据）这种方式和前一种方式的结果是一样的，这种方式有以下几点好处：

> - 简化复杂的功能
>   - 不可变性使得复杂的特性更容易实现。在后面的章节里，我们会实现一种叫做“时间旅行”的功能。“时间旅行”可以使我们回顾井字棋的历史步骤，并且可以“跳回”之前的步骤。这个功能并不是只有游戏才会用到——撤销和恢复功能在开发中是一个很常见的需求。不直接在数据上修改可以让我们追溯并复用游戏的历史记录。
> - 跟踪数据的改变
>   - 如果直接修改数据，那么就很难跟踪到数据的改变。跟踪数据的改变需要可变对象可以与改变之前的版本进行对比，这样整个对象树都需要被遍历一次。
>   - 跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。
> - 确定在 React 中何时重新渲染
>   - 不可变性最主要的优势在于它可以帮助我们在 React 中创建 pure components ([性能优化](https://react.docschina.org/docs/optimizing-performance.html#examples))。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。

### 函数组件

如果你想写的组件只包含一个 `render` 方法，并且不包含 state，那么使用**函数组件**就会更简单。我们不需要定义一个继承于 `React.Component` 的类，我们可以定义一个函数，这个函数接收 `props` 作为参数，然后返回需要渲染的元素。函数组件写起来并不像 class 组件那么繁琐，很多组件都可以使用函数组件来写。

```jsx
// bad: component 写法
export class Square extends React.Component {
  render() {
    return (
      <div className="square" onClick={() => this.props.onCustomClick()}>
        {this.props.value}
      </div>
    );
  }
}

// good: 函数组件写法
function Square({ value, onCustomClick }: PropsType) {
  return (
    <button className="square" onClick={onCustomClick}>
      {value}
    </button>
  );
}
// 或
const Square: FC<PropsType> = ({ value, onCustomClick }) => {
  return (
    <div className="square" onClick={onCustomClick}>
      {value}
    </div>
  );
};
```

> 🤔 good 中的两种写法有什么区别呢？应用场景是？

### key

_`key` 是 React 中一个特殊的保留属性（还有一个是 `ref`，拥有更高级的特性）。_

**每次构建动态列表的时候，都要指定一个合适的 key。但是如果想要对列表进行重新排序、新增、删除操作时，把数组索引作为 key 是有问题的**。显式地使用 `key={i}` 来指定 key 确实会消除警告，但是仍然和数组索引存在同样的问题，所以大多数情况下最好不要这么做。

组件的 key 值并不需要在全局都保证唯一，只需要在当前的**同一级元素**之前保证唯一即可。

为什么 key 是必须的？详见「[diff 算法](https://react.docschina.org/docs/reconciliation.html#the-diffing-algorithm)」

## State & 生命周期

### state

props 和 state 可能会异步更新（react 可能会把多个`setState()`性能优化合并成一个调用），所以要依赖上一个 props 或 state 的值做更新，得让 setState() 接受一个函数，详见「[state 的更新可能是异步的](https://react.docschina.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)」

> :thinking: setState() 性能优化合并如何做的呢？防抖吗？
>
> :blue_heart: 见 react 的批处理机制（isPending）

#### 单向数据流（自上而下）

props 是 readonly 的，state 仅在本组件内使用

> :thinking: react 中有没有双向数据流的插件呢？输入数据，输出事件。类比 angular 中的 `[(data)]="data" 等同于 [data]="data" (dataChange)="data = $event"`
>
> :thinking: 「受控组件」和「非受控组件」有没有简化的写法呢？
>
> - 受控组件用双向数据流插件
>
> - 非受控组件用类似 formGroup 的方式
>
> :thinking: 「[状态提升](https://react.docschina.org/docs/lifting-state-up.html#lifting-state-up)」看起来也可以用 cloneDeep 传递的双向数据流解决

### 生命周期

![](https://segmentfault.com/img/remote/1460000021789251)

> 各个生命周期适合的使用的场景
>
> - mount 过程
>   - `constructor`：设置初始化 state 以及绑定类方法
>   - `render`：将 props 和 state 作为输入返回需要渲染的元素
>   - `componentDidMount`：此时 dom 节点已生成，可发起异步请求去 API 获取数据赋值 state 触发重新渲染
> - update 过程
>   - `getDerivedStateFromProps(nextProps, prevProps)`：props 更新时触发，触发一些动画/页面跳转
>   - `shouldComponentUpdate(nextProps, nextState)`：props、state 更新时触发，return false 就能阻止更新，用于性能优化（部分更新）
>   - `getSnapshotBeforeUpdate(prevProps, prevState)`：该生命周期的任何返回值都会作为参数传递给`componentDidUpdate`，在组件更改前可捕获些信息，可用于获取聊天窗口中的滚动位置
>   - `render`：创建虚拟 dom，进行 diff 算法，更新 dom 树
>   - `componentDidUpdate(prevProps, prevState)`：更新 dom 后立即调用，首次渲染不会执行此方法，可获取 dom 节点
> - Unmount 过程
>   - componentWillUnmount：组件被移除前的调用，可做些清理工作

:blue_heart: 可以用 pureComponent 来自动判断 props 是否发生变化（省略 child 组件中对`shouldComponentUpdate`的判断）

## 事件处理

*不能返回`false`来阻止默认行为，得显式使用 event.preventDefault 等*

最好都写成 `onClick={() => this.customFn()} `避免 this 指向的混乱

## 条件渲染

- 短路表达式  `{<condition> && <h2>is show this dom</h2>}`，当 condition 为 false 时不渲染此 dom

- render 返回 null 时不渲染，详见「[阻止组件渲染](https://react.docschina.org/docs/conditional-rendering.html#preventing-component-from-rendering)」

## 表单

成熟解决方案：[formik](https://formik.org/docs/overview#the-gist)

## 组合 vs 继承

### 组合

直接用`{props.children}`，类比 angular 的`<ng-content><ng-content>`和 vue 的 `slot`

```jsx
const Square: FC<PropsType> = ({ children }) => {  
  return (    
    <div className="square">
      {children}
    </div>  
  );
};
```

也可以指定洞名，不用 children，详见 https://codepen.io/gaearon/pen/gwZOJp?editors=0010

> 任何东西都可以作为 props 进行传递

### 继承

复用纯逻辑非 UI 的功能，可以抽离一个单独的 js 模块，组件可以直接 import，无须通过 extend 继承

> :thinking: 类似 angular 中的 abstract class 或者 interface，还是需要 extends 的吧？为什么只用 import 呢？

## 备忘

- [vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [webpack 5](https://www.webpackjs.com/concepts/)
- [react-fresh](https://juejin.cn/post/6890471535295856654)
- Tailwind CSS

# 高级指引

## 代码分割

### Fragment

<Fragment> 类似 <ng-container>，当没有任何属性时，可用 <></> 短语法表示，暂时 Fragment 的属性只支持 key

### 懒加载

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <OtherComponent />
</Suspense>
```

### 异常捕获边界

如果一个 class 组件中定义了 [`static getDerivedStateFromError()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromerror) 或 [`componentDidCatch()`](https://react.docschina.org/docs/react-component.html#componentdidcatch) 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 `static getDerivedStateFromError()` 渲染备用 UI ，使用 `componentDidCatch()` 打印错误信息

### 命名导出

React.lazy 目前只支持export default 的导致，如果要重命名导出，可以创建一个中间模块重命名

```jsx
export {MyComponent as default} from './ManyComponent';
// 或者
import {MyComponent} from './MangComponent';
export default MyComponent;
```

## context vs 组件组合

### [context](https://react.docschina.org/docs/context.html)

优点：很多不同层级的组件需要访问同样的数据

缺点：会使组件的复用性变差

适用场景：管理当前的 locale、theme、缓存数据等

介绍：

```tsx
// 声明
const ThemeContext = React.createContext('light'); // light 为默认值
    
// 使用
<ThemeContext.Provider value="dark">
  <OtherComponent />
</ThemeContext.Provider>

function OtherCompoent() {
  return <ThemedButton />
}

function ThemedButton() {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
	this.contextType = ThemeContext;
  return <Button theme={this.context} />
}
```



### 组件组合

如果只是想避免层层传递一些属性，组件组合比 context 更好

例如 user 和 avatarSize 数据仅顶层的 Page 组件知晓，需要在底层的 Avatar 组件中获取 user 信息进行渲染，中间组件无须知道 user 和 avatarSize，可以直接在 Page 中将 Avatar 直接渲染好，将 Avatar 层层传递下去，这样就将多个数据的 props 合成一个 children 的 props 进行传递，有效减少需要传递的 props 数量

优点：减少了应用中需要层层传递的 props 数量

缺点：

- 将子组件渲染逻辑提升到组件树的更高层次来处理，会使得高层组件变得复杂
- 可能会传递多个子组件，然后为多个子组件封装多个单独的 slots，可能用 props.children 去获取对应的 slot

> 如果children 在渲染前需要和父组件进行交流，可以用 [render props](https://react.docschina.org/docs/render-props.html)

## Refs 转发

`React.forwardRef()`

## 高阶组件

组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

HOC 在 React 的第三方库中很常见，例如 Redux 的 [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect) 和 Relay 的 [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html)

**HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能**

HOC 为组件添加特性。自身不应该大幅改变约定。HOC 返回的组件与原组件应保持类似的口，HOC 应该透传与自身无关的 props

