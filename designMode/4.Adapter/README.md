# 适配器模式(Adapter)
数据适配。通常会用来将后端返回的数据格式转换成前端所需要的；还有插件库内配置的对参数配置也会使用这种方法
> 例如一个公用组件，但是因为后端不同的接口里面返回的数据格式和字段不统一，所以前端自己定义一套该组件的数据格式和字段，并转换后端的数据
```js
// 参数适配
const DEFAULT_CONFIG = {
	name: 'adapter',
	color: 'red',
	size: 'big'
}
class AdapterTest {
	constructor(config) {
		// 也可以用第三方库 extend来处理: extend(DEFAULT_CONFIG, config)
		for (let key in DEFAULT_CONFIG) {
			config = config[key] || DEFAULT_CONFIG[key]
		}
	}
}
```