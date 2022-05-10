class Color {
	constructor(color) {
		this.color = color || 'white'
	}

	changeColor(color) {
		this.color = color;
	}
}

class CarBuilder {
	constructor() {
		this.colorModule = new Color();
		// ....其他汽车的零件
	}
}

const car = new CarBuilder();
console.log('车的颜色: ', car.color);
car.colorModule.changeColor('black');
console.log('车的颜色: ', car.color);

// 当前场景使用该模式，变得复杂化了