class Subject {
	constructor() {
		this.observers = []
	}

	add(observer) {
		this.observers.push(observer)
	}

	notify() {
		this.observers.forEach((observer) => {
			observer.update()
		})
	}
}

class Observer {
	constructor(name) {
		this.name = name;
	}

	update() {
		console.log(`${this.name}被更新了`);
	}
}

const ob1 = new Observer('A')
const ob2 = new Observer('B')
const subject = new Subject();

subject.add(ob1);
subject.add(ob2);

subject.notify();