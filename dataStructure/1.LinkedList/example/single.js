import SingleLinkedList, { Node } from '../singleLinkedList'

const list = new SingleLinkedList();
const node1 = new Node('1');
const node2 = new Node('2');
const node3 = new Node('3');
const node4 = new Node('4');

list.append(node1, node2, node3);
list.insert(node4, node1)

console.log(list);

for (const node of list) {
	console.log('node: ', node);
}