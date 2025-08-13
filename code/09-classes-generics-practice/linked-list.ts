class ListNode<T> {   // Generic class for a node in the linked list
  next?: ListNode<T>; // Pointer to the next node in the list

  constructor(public value: T) {} // Constructor to initialize the node with a value, typescript will add the property value automatically
}

class LinkedList<T> {
  private root?: ListNode<T>;
  private tail?: ListNode<T>;
  private length = 0;

  add(value: T) {
    const node = new ListNode(value);
    if (this.length === 0) {  // Check if the list is empty
      this.root = node;
      this.tail = node;
    } else {
      this.tail!.next = node; // Use non-null assertion since we know tail exists
      this.tail = node;
    }
    this.length++;
  }

  insertAt(pos: number, value: T) {
    if (pos > -1 && pos < this.length && this.root) { 
      let current = this.root;
      let index = 0;
      let previous = current;
      let node = new ListNode(value);

      if (pos === 0) {           // Insert at the beginning
        node.next = this.root;
        this.root = node;
      } else {                   // Insert in the middle or at the end
        let current = this.root;
        while (index++ < pos && current.next) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      this.length++;
      return true;
    } else {                // If position is out of bounds
      this.add(value);
      return true;
    }
  }

  removeAt(pos: number) {
    if (pos > -1 && pos < this.length && this.root) {
      let current = this.root;
      let previous: ListNode<T> = current;
      let index = 0;

      if (pos === 0) {
        this.root = current.next;
      } else {
        while (index++ < pos && current.next) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      this.length--;
      return current;
    } else {
      return null;
    }
  }

  getNumberOfElements() {
    return this.length;
  }

  print() {
    let current = this.root;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

const numberList = new LinkedList<number>();

numberList.add(10);
numberList.add(5);
numberList.add(-3);

console.log('Length: ' + numberList.getNumberOfElements());
numberList.print();

console.log('--- NOW REMOVING INDEX 1 ---');
numberList.removeAt(1);
console.log('Length: ' + numberList.getNumberOfElements());
numberList.print();

console.log('--- NOW INSERTING AT INDEX 1 ---');
numberList.insertAt(1, 100);
console.log('Length: ' + numberList.getNumberOfElements());
numberList.print();

numberList.insertAt(0, 35);
console.log('Length: ' + numberList.getNumberOfElements());
numberList.print();

numberList.insertAt(40, 50); // This will add 50 at the end since 40 is out of bounds
console.log('Length: ' + numberList.getNumberOfElements());
numberList.print();

const nameList = new LinkedList<string>();
