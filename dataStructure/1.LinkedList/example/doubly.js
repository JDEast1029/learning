import DoublyLinkedList, { Node } from '../doublyLinkedList'

const list = new DoublyLinkedList();
const node1 = new Node('1');
const node2 = new Node('2');
const node3 = new Node('3');
const node4 = new Node('4');

list.append(node1, node2, node3);
list.insert(node4, node1)

list.remove(node4);

list.reverse();

console.log(list);

for (const node of list) {
	console.log('node: ', node);
}