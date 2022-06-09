interface ProductInterface {
	use(): void;
}

abstract class Factory {
	abstract createProduct(): ProductInterface;

	method() {
		let product = this.createProduct();
		product.use();
	}
}

class FactoryA extends Factory {
	createProduct(): ProductInterface {
		return new ProductA()
	}
}

class FactoryB extends Factory {
	createProduct(): ProductInterface {
		return new ProductB()
	}
}

class ProductA implements ProductInterface {
	use(): void {
		console.log('使用了ProductA');
	}
}

class ProductB implements ProductInterface {
	use(): void {
		console.log('使用了ProductB');
	}
}


const test = (type: string) => {
	let factory;
	if (type === 'A') {
		factory = new FactoryA();
	} else if (type === 'B') {
		factory = new FactoryB();
	}
	factory && factory.method();
}

test('A');
test('B');