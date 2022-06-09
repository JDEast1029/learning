interface Chair {
	use(): void;
}
interface Sofa {
	use(): void;
}

class ModernChair implements Chair {
	use(): void {
		console.log('使用了ModernChair');
	}
}
class ClassicalChair implements Chair {
	use(): void {
		console.log('使用了ClassicalChair');
	}
}

class ModernSofa implements Sofa {
	use(): void {
		console.log('使用了ModernSofa');
	}
}
class ClassicalSofa implements Sofa {
	use(): void {
		console.log('使用了ClassicalSofa');
	}
}

interface FactoryInterface {
	createChair(): Chair;
	createSofa(): Sofa;
}

class ModernFactory implements FactoryInterface {
	createChair(): Chair {
		return new ModernChair();
	}
	createSofa(): Sofa {
		return new ModernSofa();
	}
}

class ClassicalFactory implements FactoryInterface {
	createChair(): Chair {
		return new ClassicalChair();
	}
	createSofa(): Sofa {
		return new ClassicalSofa();
	}
}

const test1 = (type: string) => {
	let factory;
	if (type === 'Modern') {
		factory = new ModernFactory();
	} else if (type === 'Classical') {
		factory = new ClassicalFactory();
	}
	if (factory) {
		let chair = factory.createChair();
		let sofa = factory.createSofa();
		chair.use();
		sofa.use();
	}
}

test1('Modern')
test1('Classical')
