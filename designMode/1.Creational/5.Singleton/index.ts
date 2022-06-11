class Singleton {
	private static instance: Singleton;

	private constructor() {}

	public static getInstance(): Singleton {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton();
		}
		return Singleton.instance;
	}

	public businessFn(): void {
		console.log('调用了businessFn');
	}
}

const test2 = (): void => {
	let instance = Singleton.getInstance();
	instance.businessFn();
}

test();