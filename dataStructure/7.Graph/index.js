class Vertex {
	constructor(key, value) {
		this.key = key;
		this.value = value;
	}
}

class Edge {
	constructor(startVertex, endVertex, weight) {
		this.startVertex = startVertex;
		this.endVertex = endVertex;
		this.weight = weight;
	}
}

class Graph {
	constructor(directed = true) {
		this.directed = directed;
		this.vertices = new Set(); // 顶点集合

		this.adjacentList = new Map(); // 邻接表
	}

	addVertex(vertex) {
		if (this.vertices.has(vertex) || !vertex) return;
		this.vertices.add(vertex);
		this.adjacentList.set(vertex, new Set());
	}

	addEdge(startVertex, endVertex, weight = 1) {
		this.addVertex(startVertex);
		this.addVertex(endVertex);
		this.adjacentList.set(startVertex).add({ vertex: endVertex, weight });
		if (!this.directed) {
			this.adjacentList.set(endVertex).add({ vertex: startVertex, weight });
		}
	}

	removeVertex(vertex) {
		this.vertices.delete(vertex);
		this.adjacentList.delete(vertex);
	}

	removeEdge(startVertex, endVertex) {
		this.adjacentList.delete(startVertex);
		if (!this.directed) this.adjacentList.delete(endVertex);
	}
	
	// 广度优先搜索
	bfs(fromVertex, callback) {
		if (!this.vertices.size()) return;
		if (!this.vertices.has(fromVertex)) return;

		// 记录被访问过的顶点
		const visited = new Map();
		
		const queue = [];
		queue.push(fromVertex);
		
		while(queue.length) {
			const v = queue.shift();
			visited.set(v, true);
			const nearVertices = this.adjacentList.get(v);

			nearVertices.forEach((w) => {
				if (!visited.get(w)) {
					queue.push(w);
				}
			});

			callback && callback(v);
		}
	}

	// 深度优先搜索
	dfs(fromVertex, callback) {
		if (!this.vertices.size()) return;
		if (!this.vertices.has(fromVertex)) return;

		// 记录被访问过的顶点
		const visited = new Map();
		visited.set(fromVertex, true);

		const visit = (v) => {
			if (!visited.get(v)) {
				callback && callback(v);
				visited.set(v, true);
				this.adjacentList.get(v).forEach(visit);
			}
		}
		this.adjacentList.get(fromVertex).forEach(visit)
	}
}

export default Graph;