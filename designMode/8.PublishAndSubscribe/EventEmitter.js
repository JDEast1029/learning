class EventEmitter {
	constructor() {
		this.events = new Map();
	}

	on(type, callback) {
		let list = this.events.get(type) || [];
		list.push(callback);
		this.events.set(type, list);
	}

	off(type, callback) {
		if (!this.events.has(type)) return;
		let list = this.events.get(type).filter((it) => it !== callback);
		this.events.set(type, list);
	}

	once(type, callback) {
		const fn = (payload) => {
			callback.applay(this, payload);
			this.off(type);
		}
		this.on(type, fn);
	}

	emit(type, ...payload) {
		if (!this.events.has(type)) return;
		const list = this.events.get(type);
		list.forEach(callback => {
			callback.applay(this, payload)
		});
	}
}