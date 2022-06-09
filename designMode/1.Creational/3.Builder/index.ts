interface Builder {
	productPartA(): void;
	productPartB(): void;
	productPartC(): void;
}

class Product {
	public parts: string[] = [];
	public listParts() {
		console.log(this.parts.join('-'))
	}
}

class ProductBuilder implements Builder {
	product!: Product; // !  非空断言
	constructor() {
		this.reset();
	}

	reset() {
		this.product = new Product();
	}

	productPartA(): void {
		this.product.parts.push('PartA');
	}
	productPartB(): void {
		this.product.parts.push('PartB');
	}
	productPartC(): void {
		this.product.parts.push('PartC');
	}

	getProduct() {
		const result = this.product;
		this.reset();
		return result;
	}
}

class Director {
	builder!: Builder;

	setBuilder(builder: Builder) {
		this.builder = builder;
	} 

	buildMinimalViableProduct(): void {
		if (!this.builder) return;
		this.builder.productPartA();
	}

	buildFullFeaturedProduct(): void {
		if (!this.builder) return;
		this.builder.productPartA();
		this.builder.productPartB();
		this.builder.productPartC();
	}
}

const test = () => {
	const director = new Director();
	let builder = new ProductBuilder()
	director.setBuilder(builder);
	director.buildFullFeaturedProduct();

	builder.getProduct().listParts();
}

test();