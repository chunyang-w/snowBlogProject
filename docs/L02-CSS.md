# CSS 知识

## 字体

### 字体大小

可以通过设置 `font-size` 来控制字体的大小。

## 通过 webpack 加载 css

### 踩坑记录：如何加载 antd

今天在引入 antd 样式的时候发生了一些问题：样式已经引入了，但是却无法正确显示，这是为什么呢？

这其中的原因是：在加载 css 的时候，在本地项目中开启了 css 模块模式。

```javascript
{
  test: /\.css$/i,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }
  ],
  exclude: /node_modules/
},
```
这样的话会使将本地文件中的 css 类名进行自动转换。但是我们引入的 antd 组件所应用的类并不知道类名转换机制，所以无法找到自己所需样式被转换后的类名。

所以，我们需要对 antd 样式关闭类名转换功能。通过关闭 css 模块模式就可以做到。所以我们单独为 node_modules 内的模块配置一下：

```javascript
{
  test: /\.css$/i,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: false
      }
    }
  ],
  include: /node_modules/
}
```

这时候再运行项目就可以了。

## CSS 变换

### transform

#### 放大

通过 tansform: scale(number: x) 可以将原来的图形/文字变为 x 倍

#### 放大动画：

```css
div {
  width: 70%;
  height: 100px;
  margin:  50px auto;
  background: white
}
div:hover {
  transform: scale(2.1);
}

```

#### 沿轴倾斜

通过 tansform: skewX/skewY(-/+ number: X deg)
可以使得图形沿着坐标轴倾斜

```css
div {
  width: 70%;
  height: 100px;
  margin:  50px auto;
}
#top {
  background-color: red;
}
#bottom {
  background-color: blue;
  transform: skewX(-32deg)
}
```
####



## CSS 动画

控制动画的两个基本元素：

1. animation 属性：包括 animation-name, animation-duration... 等。这些用于制定动画的名称和特性

   1. animation-name：指定动画的名称
   2. animation-duration:指定动画的持续时间
   3. animation-fill-mode:
      1. forward: 结束后使得动画维持
   4. animation-iteration-count:(number: x / string: infinite): 控制动画循环次数。 infinite 为无限播放动画
   5. animation-timing-function: 
      1. linear,
      2. ease-out
      3. cubic-bezier(0.25,0.25,0.75,0.75) (这就是 linear)

2. @keyframe ：用于制定各个进度下动画的行为。

   1. top/ bottom/ left/ right: 在元素的 position 已经有制定值的时候可以控制元素的位移
   2. 使用 opacity: 0.1;等控制元素的透明度

一个基本的动画：

```css
.container {
  font-size: 15px;
  padding: 0px 10px;
}

.container:hover{
  animation-name: underline;
  animation-duration: 0.25s;
}

@keyframes underline {
  0% {
    background-color: black;
  }
  100% {
    background-color: aqua;
  }
}
```

## CSS 定位

## CSS 伪元素和伪类

伪元素和伪类严格来说并非是同一个概念。

伪元素根据规范使用 `::`进行选择，而伪类使用`:`来表示。但是多数浏览器不做区分，均可使用`:`来表示。

伪类是对元素不同状态下样式的定义。而伪元素多是用于根据位置关系制定特殊的元素。

伪元素表示对选择的元素的特定的部分的修改。*伪元素默认是inline元素* 以下例举一些常用的伪元素：

+ div::after{/* style */} 用于指定被选元素的最后一个子元素
+ div::before{/* style */} 用于指定被选元素的第一个子元素
+ 以上两个伪元素均需要搭配 content 来使用。如果没有 content，需要将其置空

## CSS 定位

CSS 选择的元素主要是通过 position 这一属性进行定位的。position 可以取 5 个不同的值来让元素产生不同的定位效果：

1. static (default value)
   1. 这个属性就是每个元素的默认定位属性。
   2. 在该样式下，每个元素不会重叠，且在网页上按照代码编写的顺序排列。BFC 自动换行，IFC 按照顺序横向排列。
2. relative
   1. 相对于正常流偏移定位。即相对于元素在默认情况下（static）的定位按照指定方向偏移
   2. 其中可以通过 `top` `bottom` `left` `right` 来制定其举例四个边缘偏离的位置
   3. demo：
  ```css
  div {
    position: relative;
    top: 20px;
  }
  ```
3. fixed
   1. 基于视口进行定位（左上角）
   2. 使得元素脱离文档流
   3. 基于页面位置定位，不会随着窗口的滚动而改变位置。
4. absolute
   1. 相对于父元素左上角的位置进行偏移
   2. *注意：副元素不能是 static 定位！！！*（必须制定 position 属性且不是 static）
      1. 否则定位基点会成为根元素：html
   3. 被 absolute 定位的元素会从文档流中脱离出去，默认的位置不占空间，可以被其他元素使用
   4. 常见的使用方法是：
      1. 将父元素制定为 relative 并且指定偏移量（这样父元素等于位置没有偏移）
      2. 为子元素设置 position：absolute 并偏移子元素
5. sticky

## CSS z-index 

*注意：z-index 使用时必须确保元素 position 属性不是 static*

z-index 用于控制*定位元素*的堆叠层级。

堆叠层级较高的元素会自动堆叠在层级较低的元素上。

z-index 为 auto 时，不会产生堆叠上下文，元素会在当前堆叠上下文中生成，拥有和父级元素相同的堆叠层级。

z-index 如果为一个整数，则产生一个全新的堆叠上下文，其子元素在这个堆叠上下文中进行堆叠。此元素在新的堆叠上下文中层级为 0

## CSS 毛玻璃特效

## CSS 多边形

使用 clip-path 来裁剪图形。可以是圆形、多边形、椭圆等多种形状



